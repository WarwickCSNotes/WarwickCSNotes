import json
import os

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


@app.route("/resources/<category>/<module_code>/<filename>")
def resource(category, module_code, filename):
    """Unified resource endpoint.

    URL: /resources/<Category>/<ModuleCode>/<Filename>
    File: Data/Resources/<Category>/<Filename>.<ext>

    module_code is for URL/breadcrumb context only; file lookup is flat
    inside each category directory. Filenames can include the module
    code themselves if they need to be unique per module (e.g. solutions
    use "CS130-2025.md").

    Browser navigations (Accept: text/html) get the SPA shell so the
    frontend can render the page.  Fetch/XHR requests get the raw file.
    """
    if "text/html" in request.headers.get("Accept", ""):
        return send_from_directory(DIST_DIR, "index.html")
    del module_code
    if category not in RESOURCE_CATEGORIES:
        abort(404)
    directory = os.path.join(RESOURCES_DIR, category)
    return serve_content(directory, filename)


@app.route("/")
@app.route("/<path:path>")
def serve(path=""):
    if path and os.path.exists(os.path.join(DIST_DIR, path)):
        return send_from_directory(DIST_DIR, path)
    return send_from_directory(DIST_DIR, "index.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=3000)
