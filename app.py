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
                return {**mod, "code": mod_code, "year": year_num}
    abort(404)


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
