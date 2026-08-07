import hashlib
import json
import os
import urllib.error
import urllib.request

from flask import Flask, Response, abort, request, send_from_directory

app = Flask(__name__)
BASE_DIR = os.path.dirname(__file__)
DIST_DIR = os.path.join(BASE_DIR, "frontend", "apps", "web", "dist")
DATA_DIR = os.path.join(BASE_DIR, "Data")
RESOURCES_DIR = os.path.join(DATA_DIR, "Resources")
YEAR_DATA_DIR = os.path.join(DATA_DIR, "YearData")
QUIZ_DIR = os.path.join(DATA_DIR, "Quizzes")
CREDITS_DIR = os.path.join(DATA_DIR, "Credits")
CREDITS_FILE = os.path.join(CREDITS_DIR, "people.json")
CREDITS_IMAGES_DIR = os.path.join(CREDITS_DIR, "Images")
REVIEWS_DIR = os.path.join(DATA_DIR, "Reviews")
REVIEWS_PER_PAGE = 10
# AI summary support. Two providers are wired up: Claude (CLAUDE_API key) and
# Gemini (GEMINI_KEY key). LLM_PROVIDER picks one explicitly; if it's unset,
# we prefer Gemini when its key is present, then Claude. With neither key
# configured, the endpoint returns 503 "unavailable".
# Summaries are cached in-process keyed by (module, provider, hash-of-reviews)
# so we don't re-call the upstream LLM on every page load and only refresh
# when either the review data or the chosen provider changes.
CLAUDE_MODEL = "claude-haiku-4-5-20251001"
CLAUDE_API_URL = "https://api.anthropic.com/v1/messages"
GEMINI_MODEL = "gemini-2.5-flash"
GEMINI_API_URL_TEMPLATE = (
    "https://generativelanguage.googleapis.com/v1beta/models/"
    "{model}:generateContent?key={key}"
)
REVIEW_AI_CACHE: "dict[tuple[str, str], tuple[str, str]]" = {}

# Resources are shared content files (notes, solutions, ...) stored under
# Data/Resources/<Category>/. All resource files obey the same rules:
#   - extension is one of CONTENT_EXTENSIONS
#   - served via the same endpoint with an X-Content-Extension header
CONTENT_EXTENSIONS = ("md", "tex", "typ", "pdf")
RESOURCE_CATEGORIES = ("Notes", "Solutions")


def serve_content(directory, filename):
    """Serve a resource file from `directory`, probing extensions if none given."""
    if "." in filename:
        path = os.path.join(directory, filename)
        ext = filename.rsplit(".", 1)[-1]
    else:
        path = None
        ext = None
        for e in CONTENT_EXTENSIONS:
            p = os.path.join(directory, f"{filename}.{e}")
            if os.path.exists(p):
                path = p
                ext = e
                break

    if not path or not os.path.exists(path):
        abort(404)

    if ext == "pdf":
        return send_from_directory(
            os.path.dirname(path),
            os.path.basename(path),
            mimetype="application/pdf",
        )

    with open(path, encoding="utf-8") as f:
        content = f.read()
    return Response(
        content,
        content_type="text/plain",
        headers={"X-Content-Extension": ext, "X-Note-Extension": ext},
    )


def _review_summary(reviews):
    """Average each numeric rating across all reviews; report total count."""
    if not reviews:
        return {"count": 0, "average": {}}
    sums, counts = {}, {}
    for r in reviews:
        for key, val in (r.get("Ratings") or {}).items():
            if isinstance(val, (int, float)):
                sums[key] = sums.get(key, 0) + val
                counts[key] = counts.get(key, 0) + 1
    averages = {k: round(sums[k] / counts[k], 1) for k in sums}
    return {"count": len(reviews), "average": averages}


def _load_reviews(module_code):
    """Read raw reviews list for a module (case-insensitive). Returns []
    if no review file exists or the file is malformed."""
    path = os.path.join(REVIEWS_DIR, f"{module_code.lower()}.json")
    if not os.path.exists(path):
        return []
    try:
        with open(path, encoding="utf-8") as f:
            data = json.load(f)
    except (OSError, json.JSONDecodeError):
        return []
    return data if isinstance(data, list) else []


def _compute_all_review_summaries():
    """Pre-compute average ratings and counts per module at startup, so the
    module page can show review metrics without re-reading every review file
    on each request."""
    summaries = {}
    if not os.path.isdir(REVIEWS_DIR):
        return summaries
    for fname in os.listdir(REVIEWS_DIR):
        if not fname.endswith(".json") or fname.startswith("_"):
            continue
        module = fname[:-5].upper()
        summaries[module] = _review_summary(_load_reviews(module))
    return summaries


REVIEW_SUMMARIES = _compute_all_review_summaries()


@app.route("/api/year/<int:year_num>")
def api_year(year_num):
    if year_num not in (1, 2, 3, 4):
        abort(404)
    with open(os.path.join(YEAR_DATA_DIR, f"year{year_num}.json")) as f:
        return json.load(f)


@app.route("/api/module/<code>")
def api_module(code):
    for year_num in (1, 2, 3, 4):
        with open(os.path.join(YEAR_DATA_DIR, f"year{year_num}.json")) as f:
            year_data = json.load(f)
        for mod_code, mod in year_data["modules"].items():
            if mod_code.upper() == code.upper():
                review_summary = REVIEW_SUMMARIES.get(
                    mod_code.upper(), {"count": 0, "average": {}}
                )
                return {
                    **mod,
                    "code": mod_code,
                    "year": year_num,
                    "review_summary": review_summary,
                }
    abort(404)


def _reviews_hash(reviews):
    """Stable digest of a reviews list, used as the cache key for AI summaries.
    Sorting keys ensures the digest is independent of dict ordering."""
    return hashlib.sha256(
        json.dumps(reviews, sort_keys=True, ensure_ascii=False).encode("utf-8")
    ).hexdigest()


def _build_review_summary_prompt(module, reviews):
    """Render the reviews into a plain-text prompt for Claude."""
    parts = [f"Module: {module.upper()}", "", "Student reviews follow.", ""]
    for i, r in enumerate(reviews, 1):
        parts.append(f"Review {i}:")
        for heading, body in r.get("Reflection") or []:
            parts.append(f"  {heading}: {body}")
        ratings = r.get("Ratings") or {}
        if ratings:
            rating_str = ", ".join(f"{k}={v}" for k, v in ratings.items())
            parts.append(f"  Ratings (out of 100): {rating_str}")
        parts.append("")
    parts.append(
        "Write a concise 2-3 sentence summary of these reviews, capturing the "
        "overall sentiment and any common themes. Don't add disclaimers, "
        "preamble, or markdown formatting; just the summary text."
    )
    return "\n".join(parts)


def _call_claude(prompt, api_key, *, max_tokens=400, timeout=30):
    """POST a single user message to Claude and return the text reply.
    Raises urllib.error.HTTPError or urllib.error.URLError on failure."""
    body = json.dumps({
        "model": CLAUDE_MODEL,
        "max_tokens": max_tokens,
        "messages": [{"role": "user", "content": prompt}],
    }).encode("utf-8")
    req = urllib.request.Request(
        CLAUDE_API_URL,
        data=body,
        headers={
            "x-api-key": api_key,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json",
        },
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        data = json.loads(resp.read().decode("utf-8"))
    blocks = data.get("content") or []
    return "".join(b.get("text", "") for b in blocks if b.get("type") == "text").strip()


def _call_gemini(prompt, api_key, *, max_tokens=800, timeout=30):
    """POST a single prompt to Google's Gemini API and return the text reply.

    Gemini 2.5 models have thinking enabled by default, and those thinking
    tokens are subtracted from `maxOutputTokens` *before* the visible reply,
    so a short max_tokens silently truncates the summary mid-sentence. We
    disable thinking here (`thinkingBudget: 0`) since a 2-3 sentence summary
    doesn't need internal reasoning, and keep a comfortable token budget."""
    url = GEMINI_API_URL_TEMPLATE.format(model=GEMINI_MODEL, key=api_key)
    body = json.dumps({
        "contents": [{"role": "user", "parts": [{"text": prompt}]}],
        "generationConfig": {
            "maxOutputTokens": max_tokens,
            "thinkingConfig": {"thinkingBudget": 0},
        },
    }).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=body,
        headers={"content-type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        data = json.loads(resp.read().decode("utf-8"))
    candidates = data.get("candidates") or []
    if not candidates:
        return ""
    parts = (candidates[0].get("content") or {}).get("parts") or []
    return "".join(p.get("text", "") for p in parts).strip()


def _resolve_llm_provider():
    """Return (provider_name, callable, api_key) for the configured LLM, or
    None if no provider is available.

    Resolution order:
      1. If LLM_PROVIDER is set explicitly, honour it (errors if its key is missing).
      2. Otherwise pick Gemini if GEMINI_KEY is set; else Claude if CLAUDE_API is set.
      3. If nothing is configured, return None and the route returns 503.
    """
    explicit = (os.environ.get("LLM_PROVIDER") or "").strip().lower()
    candidates = []
    if explicit:
        candidates.append(explicit)
    else:
        # Default: prefer Gemini, fall back to Claude.
        if os.environ.get("GEMINI_KEY"):
            candidates.append("gemini")
        if os.environ.get("CLAUDE_API"):
            candidates.append("claude")
    for provider in candidates:
        if provider == "gemini":
            key = os.environ.get("GEMINI_KEY")
            if key:
                return "gemini", _call_gemini, key
        elif provider == "claude":
            key = os.environ.get("CLAUDE_API")
            if key:
                return "claude", _call_claude, key
    return None

@app.route("/api/reviews/<module>/ai-summary")
def api_reviews_ai_summary(module):
    """AI-generated 2-3 sentence summary of a module's reviews. Returns 503 if
    no LLM provider is configured (see _resolve_llm_provider), 404 if the
    module has no reviews, 502 if the upstream LLM call fails. Cached
    in-process per (module, provider, review-hash)."""
    resolved = _resolve_llm_provider()
    if resolved is None:
        return {
            "error": "unavailable",
            "reason": "AI summaries are not configured on this server.",
        }, 503
    provider, caller, api_key = resolved

    reviews = _load_reviews(module)
    if not reviews:
        return {"error": "no-reviews"}, 404

    rhash = _reviews_hash(reviews)
    cache_key = (module.upper(), provider)
    cached = REVIEW_AI_CACHE.get(cache_key)
    if cached and cached[0] == rhash:
        return {"summary": cached[1], "provider": provider, "cached": True}

    try:
        summary = caller(_build_review_summary_prompt(module, reviews), api_key)
    except (urllib.error.HTTPError, urllib.error.URLError, TimeoutError) as exc:
        return {"error": "upstream", "reason": str(exc)}, 502

    if not summary:
        return {"error": "upstream", "reason": f"empty response from {provider}"}, 502

    REVIEW_AI_CACHE[cache_key] = (rhash, summary)
    return {"summary": summary, "provider": provider, "cached": False}


@app.route("/api/reviews/<module>")
def api_reviews(module):
    """Paginated reviews for a module. Page size is fixed at REVIEWS_PER_PAGE.
    Always includes the summary so the reviews page can show the headline
    metrics without a second round-trip."""
    try:
        page = max(1, int(request.args.get("page", 1)))
    except ValueError:
        page = 1
    reviews = _load_reviews(module)
    total = len(reviews)
    start = (page - 1) * REVIEWS_PER_PAGE
    end = start + REVIEWS_PER_PAGE
    return {
        "module": module.upper(),
        "page": page,
        "perPage": REVIEWS_PER_PAGE,
        "total": total,
        "reviews": reviews[start:end],
        "summary": REVIEW_SUMMARIES.get(
            module.upper(), {"count": 0, "average": {}}
        ),
    }


@app.route("/api/credits")
def api_credits():
    with open(CREDITS_FILE) as f:
        return json.load(f)


@app.route("/api/credits/<category>")
def api_credits_category(category):
    path = os.path.join(CREDITS_DIR, f"{category.lower()}.json")
    if not os.path.exists(path):
        abort(404)
    with open(path) as f:
        return json.load(f)


@app.route("/api/credits/images/<filename>")
def api_credits_image(filename):
    """Serve a contributor photo from Data/Credits/Images/.
    Used as the `image` URL for people who supply their own avatar instead
    of falling back to the GitHub-hosted convention."""
    if "/" in filename or "\\" in filename or filename.startswith("."):
        abort(404)
    path = os.path.join(CREDITS_IMAGES_DIR, filename)
    if not os.path.isfile(path):
        abort(404)
    return send_from_directory(CREDITS_IMAGES_DIR, filename)


@app.route("/api/quizzes")
def api_quizzes():
    """List quizzes available under Data/Quizzes as {id, title, module, description}."""
    if not os.path.isdir(QUIZ_DIR):
        return []
    out = []
    for name in sorted(os.listdir(QUIZ_DIR)):
        if not name.endswith(".json"):
            continue
        qid = name[:-5]
        try:
            with open(os.path.join(QUIZ_DIR, name)) as f:
                data = json.load(f)
        except (OSError, json.JSONDecodeError):
            continue
        out.append({
            "id": qid,
            "title": data.get("title", qid),
            "module": data.get("module"),
            "description": data.get("description", ""),
        })
    return out


@app.route("/api/quizzes/<quiz_id>")
def api_quiz(quiz_id):
    path = os.path.join(QUIZ_DIR, f"{quiz_id}.json")
    if not os.path.exists(path):
        abort(404)
    with open(path) as f:
        return json.load(f)


def _load_resource_map():
    """Optional per-module rewrite from a short resource name to its on-disk
    path inside a category directory. Lets us keep URLs flat
    (`/resources/Solutions/CS143/SeminarExercise1`) while files live in
    subfolders (`Data/Resources/Solutions/Formal/SeminarExercise1.md`).

    Shape: {category: {module_code: {name: "subdir/name"}}}. Missing file or
    invalid JSON degrades silently to the empty map (no rewrites)."""
    path = os.path.join(RESOURCES_DIR, "ResourceMap.json")
    if not os.path.exists(path):
        return {}
    try:
        with open(path, encoding="utf-8") as f:
            data = json.load(f)
    except (OSError, json.JSONDecodeError):
        return {}
    return data if isinstance(data, dict) else {}


def _find_in_tree(directory, filename):
    """Locate a resource by name anywhere inside `directory`. If `filename`
    already carries an extension we look for an exact match; otherwise we
    probe CONTENT_EXTENSIONS. Returns the matching path relative to
    `directory`, or None if nothing matches.

    Used as the fallback when ResourceMap.json doesn't carry an entry for the
    requested name, so files dropped into a subfolder under Notes/ or
    Solutions/ are reachable without first registering them in the map."""
    if "." in filename:
        target_names = {filename}
    else:
        target_names = {f"{filename}.{ext}" for ext in CONTENT_EXTENSIONS}
    for root, _dirs, files in os.walk(directory):
        for tname in target_names:
            if tname in files:
                return os.path.relpath(os.path.join(root, tname), directory)
    return None


@app.route("/resources/<category>/<module_code>/<filename>")
def resource(category, module_code, filename):
    """Unified resource endpoint.

    URL: /resources/<Category>/<ModuleCode>/<Filename>
    File: Data/Resources/<Category>/<Filename>.<ext>

    `filename` is a flat name in the URL. Lookup order:
      1. ResourceMap.json[category][module_code][filename], if present.
      2. Tree search through the category directory, matching any file whose
         name (with or without one of CONTENT_EXTENSIONS) equals `filename`.

    Browser navigations (Accept: text/html) get the SPA shell so the
    frontend can render the page. Fetch/XHR requests get the raw file.
    """
    if "text/html" in request.headers.get("Accept", ""):
        return send_from_directory(DIST_DIR, "index.html")
    if category not in RESOURCE_CATEGORIES:
        abort(404)
    directory = os.path.join(RESOURCES_DIR, category)
    rmap = _load_resource_map()
    mapped = rmap.get(category, {}).get(module_code, {}).get(filename)
    if mapped is None:
        mapped = _find_in_tree(directory, filename)
        if mapped is None:
            abort(404)
    if not isinstance(mapped, str) or ".." in mapped.replace("\\", "/").split("/"):
        abort(404)
    return serve_content(directory, mapped)


@app.route("/Resources/Images/tikz/<filename>")
def tikz_image(filename):
    """Serve a pre-rendered TikZ SVG with an immutable cache header.

    Filenames are SHA-256 content addresses (see scripts/render-tikz.mjs), so
    the bytes for a given URL never change — `immutable` lets the browser
    skip revalidation forever."""
    if "/" in filename or "\\" in filename or filename.startswith("."):
        abort(404)
    directory = os.path.join(DIST_DIR, "Resources", "Images", "tikz")
    if not os.path.isfile(os.path.join(directory, filename)):
        abort(404)
    response = send_from_directory(directory, filename)
    response.headers["Cache-Control"] = "public, max-age=31536000, immutable"
    return response


@app.route("/")
@app.route("/<path:path>")
def serve(path=""):
    if path and os.path.exists(os.path.join(DIST_DIR, path)):
        return send_from_directory(DIST_DIR, path)
    return send_from_directory(DIST_DIR, "index.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=3000)
