// Pre-render every ```tikz``` fenced code block found under Data/Resources/**
// to a static SVG in Data/Resources/Images/tikz/<hash>.svg using
// node-tikzjax. The browser then loads those SVGs as plain <img> instead of
// pulling the ~6 MB tikzjax WASM bundle on every page that contains a
// diagram. <hash> is sha256(preamble + tidied source) truncated to 16 hex
// chars, so a change to either the preamble or the source produces a new
// filename and any previous SVG becomes orphaned (`npm run tikz:clean`
// removes them all).
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

// Bail early in CI / Docker builds where node-tikzjax would blow the memory
// budget (the LaTeX WASM kernel can easily push a small container OOM when
// 10+ diagrams render back-to-back). The script is wired into `prebuild` for
// local DX so authors get auto-rendered SVGs before `vite build`, but in
// constrained container builds we rely on the committed SVGs in
// Data/Resources/Images/tikz/ instead.
if (process.env.SKIP_TIKZ_PRERENDER === "1") {
  console.log("SKIP_TIKZ_PRERENDER=1 — skipping tikz pre-render.");
  process.exit(0);
}

// node-tikzjax is published as CJS with `module.exports.default = tex2svg`,
// so Node's ESM interop hands us the whole module-exports object as the
// default — unwrap it to get the function.
const nodeTikzjax = (await import("node-tikzjax")).default;
const tex2svg = nodeTikzjax.default ?? nodeTikzjax;

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..", "..", "..", "..");
const PREAMBLE_PATH = join(__dirname, "..", "src", "tikz-preamble.tex");
const RESOURCES_DIR = join(REPO_ROOT, "Data", "Resources");
const OUT_DIR = join(RESOURCES_DIR, "Images", "tikz");

const PREAMBLE = readFileSync(PREAMBLE_PATH, "utf8").replace(/\r/g, "");

mkdirSync(OUT_DIR, { recursive: true });

function walkMarkdown(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) out.push(...walkMarkdown(p));
    else if (name.endsWith(".md")) out.push(p);
  }
  return out;
}

// Same cleanup the browser TikzBlock applies, so the hash and rendered output
// match exactly. We additionally strip a leading `> ` from every line: when a
// tikz fenced block is nested inside an Obsidian callout (`>[!check]- ...`),
// the raw markdown text on disk has every line prefixed with `> `. The
// browser doesn't need this — by the time react-markdown reaches our code
// renderer the blockquote markers are already stripped — but the regex
// scanner here sees the raw bytes. Stripping in both places (it's a no-op
// browser-side) keeps the hashes identical.
function tidyTikzSource(source) {
  return source
    .replace(/\r/g, "")
    .replace(/&nbsp;/g, "")
    .split("\n")
    .map((l) => l.replace(/^>\s?/, "").trim())
    .filter((l) => l.length > 0)
    .join("\n");
}

function hashOf(s) {
  return createHash("sha256").update(s).digest("hex").slice(0, 16);
}

// Rewrite the raw tikzjax SVG so themes can recolour the diagram without
// regenerating the file:
//   - Black strokes / black fills (arrows, node borders, text labels) get
//     `class="tikz-arrow"` and `stroke|fill="currentColor"`. CSS `color` on
//     any ancestor of the inlined SVG controls the colour, so light themes
//     inherit the foreground colour automatically.
//   - `gray!10` node-interior fills (#f3f3f3) get `class="tikz-fill"` and
//     `fill="var(--tikz-fill, #f3f3f3)"`. Themes can override `--tikz-fill`
//     to change the shading without touching the SVGs.
//   - Text elements that ship without an explicit `fill` inherit black via
//     the SVG default — we add `fill="currentColor"` so those labels follow
//     the theme too.
// This depends on the SVG being inlined in the page (so cross-document CSS
// applies); the browser-side TikzBlock fetches and embeds the SVG via
// dangerouslySetInnerHTML rather than referencing it through <img src=…>.
function themeSvg(svg) {
  svg = svg.replaceAll(
    /stroke="(?:#000|black)"/g,
    'class="tikz-arrow" stroke="currentColor"',
  );
  svg = svg.replaceAll(
    /fill="(?:#000|black)"/g,
    'class="tikz-arrow" fill="currentColor"',
  );
  svg = svg.replaceAll(
    /fill="#f3f3f3"/g,
    'class="tikz-fill" fill="var(--tikz-fill, #f3f3f3)"',
  );
  // The inner stroke of an `accepting` node's double-circle (the gap between
  // the two borders) is drawn at the same light-grey as the node fill.
  // Route it through the same CSS variable so it follows the theme.
  svg = svg.replaceAll(
    /stroke="#f3f3f3"/g,
    'class="tikz-fill" stroke="var(--tikz-fill, #f3f3f3)"',
  );
  svg = svg.replaceAll(
    /<text(?![^>]*\sfill=)([^>]*)>/g,
    '<text class="tikz-arrow" fill="currentColor"$1>',
  );
  return svg;
}

// Match a ```tikz fenced block. The closing fence may be `> ```` (blockquote
// prefix) when the block lives inside an Obsidian callout like
// `>[!check]- Solution`, so we allow an optional `>` before the closing
// backticks. tidyTikzSource then strips the `> ` prefix from every captured
// line, so the bytes we hash and feed to node-tikzjax match what the browser
// sees after react-markdown has parsed the blockquote.
const TIKZ_RE = /```tikz\r?\n([\s\S]*?)\r?\n(?:>\s?)?```/g;

const files = walkMarkdown(RESOURCES_DIR);
let rendered = 0;
let skipped = 0;
let failed = 0;

for (const file of files) {
  const rel = relative(REPO_ROOT, file);
  const content = readFileSync(file, "utf8");
  for (const match of content.matchAll(TIKZ_RE)) {
    const tidied = tidyTikzSource(match[1]);
    const hash = hashOf(PREAMBLE + "\n" + tidied);
    const out = join(OUT_DIR, `${hash}.svg`);
    if (existsSync(out)) {
      skipped++;
      continue;
    }
    process.stdout.write(`rendering ${hash} (${rel})… `);
    try {
      const rawSvg = await tex2svg(
        `\\begin{document}\n${tidied}\n\\end{document}`,
        { addToPreamble: PREAMBLE },
      );
      writeFileSync(out, themeSvg(rawSvg));
      process.stdout.write("ok\n");
      rendered++;
    } catch (err) {
      process.stdout.write("FAILED\n");
      console.error(`  ${err?.message ?? err}`);
      failed++;
    }
  }
}

console.log(
  `\ndone. rendered=${rendered} skipped=${skipped} failed=${failed} → ${relative(REPO_ROOT, OUT_DIR)}`,
);
if (failed > 0) process.exit(1);
