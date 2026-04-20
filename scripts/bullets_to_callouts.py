"""One-off tool: converts each top-level '- ' bullet in a markdown file into a
collapsible [!note]+ callout. Sub-content (indented 4 spaces) is un-indented
into the callout body. Run with `python bullets_to_callouts.py <file>...`.
"""
import sys


def transform(content: str) -> str:
    trailing_nl = content.endswith("\n")
    lines = content.splitlines()
    out: list[str] = []
    i = 0
    n = len(lines)

    while i < n:
        line = lines[i]

        # Top-level bullet (column 0)?
        if line.startswith("- ") or line.startswith("* "):
            title = line[2:].rstrip()

            body: list[str] = []
            i += 1
            while i < n:
                nl = lines[i]
                if nl.startswith("- ") or nl.startswith("* ") or nl.startswith("#"):
                    break
                body.append(nl)
                i += 1

            # Trim trailing blank lines from body
            while body and body[-1].strip() == "":
                body.pop()

            # Un-indent 4 spaces from each body line
            body = [bl[4:] if bl.startswith("    ") else bl for bl in body]

            out.append(f"> [!note]+ {title}")
            for bl in body:
                out.append(">" if bl == "" else f"> {bl}")
            out.append("")  # blank line after callout
        else:
            out.append(line)
            i += 1

    return "\n".join(out) + ("\n" if trailing_nl else "")


def main() -> None:
    for path in sys.argv[1:]:
        with open(path, encoding="utf-8") as f:
            src = f.read()
        dst = transform(src)
        with open(path, "w", encoding="utf-8") as f:
            f.write(dst)
        print(f"Transformed {path}")


if __name__ == "__main__":
    main()
