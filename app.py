import json
import os
import markdown
import pypandoc
from flask import Flask, render_template, abort
from jinja2 import ChoiceLoader, FileSystemLoader

app = Flask(__name__, template_folder="Pages", static_folder="Stylesheets")
app.jinja_loader = ChoiceLoader([
    FileSystemLoader("Pages"),
    FileSystemLoader("components"),
])

YEAR_DATA_DIR = os.path.join(os.path.dirname(__file__), "YearData")
NOTE_DATA_DIR = os.path.join(os.path.dirname(__file__), "NoteData")

@app.route("/")
def index():
    return render_template("Welcome.html")

@app.route("/year/<int:year_num>")
def year(year_num):
    if year_num not in (1, 2, 3):
        abort(404)

    path = os.path.join(YEAR_DATA_DIR, f"year{year_num}.json")
    with open(path) as f:
        year_data = json.load(f)

    return render_template("Year.html", year_data=year_data)

@app.route("/module/<code>")
def module(code):
    for year_num in (1, 2, 3):
        path = os.path.join(YEAR_DATA_DIR, f"year{year_num}.json")
        with open(path) as f:
            year_data = json.load(f)
        for mod in year_data["modules"]:
            if mod["code"].upper() == code.upper():
                return render_template("Module.html", module=mod, year=year_num, year_data=year_data)
    abort(404)

def load_note_content(note_name):
    """Try .md then .tex. Returns HTML content string, or None if not found."""
    md_path = os.path.join(NOTE_DATA_DIR, f"{note_name}.md")
    tex_path = os.path.join(NOTE_DATA_DIR, f"{note_name}.tex")

    if os.path.isfile(md_path):
        with open(md_path, encoding="utf-8") as f:
            raw = f.read()
        return markdown.markdown(raw, extensions=["tables", "fenced_code", "toc"])

    if os.path.isfile(tex_path):
        with open(tex_path, encoding="utf-8") as f:
            raw = f.read()
        return pypandoc.convert_text(raw, "html", format="latex", extra_args=["--mathjax"])

    return None


@app.route("/notes/<module_code>/<note_name>")
def note(module_code, note_name):
    content = load_note_content(note_name)
    if content is None:
        abort(404)

    # Find the module for back-button and navbar context
    for year_num in (1, 2, 3):
        path = os.path.join(YEAR_DATA_DIR, f"year{year_num}.json")
        with open(path) as f:
            year_data = json.load(f)
        for mod in year_data["modules"]:
            if mod["code"].upper() == module_code.upper():
                return render_template(
                    "Notes.html",
                    content=content,
                    note_title=note_name,
                    module=mod,
                    year=year_num,
                    year_data=year_data,
                )
    abort(404)

if __name__ == "__main__":
    app.run(debug=True)
