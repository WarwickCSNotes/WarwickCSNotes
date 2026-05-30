import { Children, isValidElement, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import tikzPreambleRaw from "../tikz-preamble.tex?raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import {
  Info,
  Lightbulb,
  AlertTriangle,
  AlertOctagon,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Quote,
  BookOpen,
  FileText,
  Flame,
  ListChecks,
  ChevronDown,
} from "lucide-react";

/** Reserved keywords in Haskell 2010 (plus the wildcard `_`). */
const HASKELL_KEYWORDS = new Set([
  "case", "class", "data", "default", "deriving", "do", "else",
  "foreign", "if", "import", "in", "infix", "infixl", "infixr",
  "instance", "let", "module", "newtype", "of", "then", "type", "where",
  "_",
]);

/** Lightweight, regex-based Haskell syntax highlighter. Wraps each token in
 *  a span with a colour class. Designed to be self-contained (no external
 *  highlighting library) and to handle the constructs we use in CS141 code
 *  blocks: comments, strings, char literals, type names, keywords, numbers,
 *  identifiers and the usual symbolic operators. */
function highlightHaskell(code: string) {
  // One regex with alternation, longest-first so e.g. `::` beats `:`.
  const tokenRe = /(\{-[\s\S]*?-\}|--[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])'|[A-Z][\w']*|[a-z_][\w']*|\d+(?:\.\d+)?|::|->|=>|<-|\|\||&&|[!@#$%^&*+=|<>?/\\.~,;:()\[\]{}-]|\s+)/g;
  const tokens: { value: string; cls: string }[] = [];
  let m: RegExpExecArray | null;
  while ((m = tokenRe.exec(code)) !== null) {
    const t = m[0];
    let cls = "";
    if (t.startsWith("{-") || t.startsWith("--")) {
      cls = "italic text-muted-foreground";
    } else if (t.startsWith('"') || t.startsWith("'")) {
      cls = "text-emerald-600 dark:text-emerald-400";
    } else if (/^[A-Z]/.test(t)) {
      cls = "text-blue-600 dark:text-blue-400";
    } else if (HASKELL_KEYWORDS.has(t)) {
      cls = "text-purple-600 dark:text-purple-400 font-semibold";
    } else if (/^\d/.test(t)) {
      cls = "text-orange-600 dark:text-orange-400";
    } else if (/^[a-z_]/.test(t)) {
      cls = "";
    } else if (/^\s+$/.test(t)) {
      cls = "";
    } else {
      // Symbolic operator (`::`, `->`, `=>`, `=`, ...).
      cls = "text-pink-600 dark:text-pink-400";
    }
    tokens.push({ value: t, cls });
  }
  return tokens.map((tok, i) =>
    tok.cls
      ? <span key={i} className={tok.cls}>{tok.value}</span>
      : <span key={i}>{tok.value}</span>
  );
}

function latexToMarkdown(tex: string): string {
  let md = tex;
  md = md.replace(/\\documentclass(\[.*?\])?\{.*?\}/g, '');
  md = md.replace(/\\usepackage(\[.*?\])?\{.*?\}/g, '');
  md = md.replace(/\\begin\{document\}/g, '');
  md = md.replace(/\\end\{document\}/g, '');
  md = md.replace(/(?<!\\)%.*$/gm, '');
  md = md.replace(/\\section\*?\{(.+?)\}/g, '## $1');
  md = md.replace(/\\subsection\*?\{(.+?)\}/g, '### $1');
  md = md.replace(/\\subsubsection\*?\{(.+?)\}/g, '#### $1');
  md = md.replace(/\\begin\{itemize\}/g, '');
  md = md.replace(/\\end\{itemize\}/g, '');
  md = md.replace(/\\begin\{enumerate\}/g, '');
  md = md.replace(/\\end\{enumerate\}/g, '');
  md = md.replace(/\\item\s/g, '- ');
  md = md.replace(/\\textbf\{(.+?)\}/g, '**$1**');
  md = md.replace(/\\textit\{(.+?)\}/g, '*$1*');
  md = md.replace(/\\emph\{(.+?)\}/g, '*$1*');
  md = md.replace(/\\underline\{(.+?)\}/g, '<u>$1</u>');
  md = md.replace(/\\newline\b/g, '  \n');
  md = md.replace(/\\\\\n/g, '  \n');
  return md.trim();
}

type CalloutStyle = {
  label: string;
  icon: typeof Info;
  container: string;
  title: string;
};

type MarkdownNode = {
  type?: string;
  value?: string;
  url?: string;
  alt?: string;
  children?: MarkdownNode[];
  data?: {
    hProperties?: Record<string, unknown>;
  };
};

const CALLOUT_TYPES: Record<string, CalloutStyle> = {
  note:      { label: "Note",      icon: FileText,      container: "border-blue-500/50 bg-blue-500/10",   title: "text-blue-600 dark:text-blue-400" },
  info:      { label: "Info",      icon: Info,          container: "border-cyan-500/50 bg-cyan-500/10",   title: "text-cyan-600 dark:text-cyan-400" },
  tip:       { label: "Tip",       icon: Lightbulb,     container: "border-teal-500/50 bg-teal-500/10",   title: "text-teal-600 dark:text-teal-400" },
  hint:      { label: "Hint",      icon: Lightbulb,     container: "border-teal-500/50 bg-teal-500/10",   title: "text-teal-600 dark:text-teal-400" },
  important: { label: "Important", icon: Flame,         container: "border-purple-500/50 bg-purple-500/10", title: "text-purple-600 dark:text-purple-400" },
  warning:   { label: "Warning",   icon: AlertTriangle, container: "border-amber-500/50 bg-amber-500/10", title: "text-amber-600 dark:text-amber-400" },
  caution:   { label: "Caution",   icon: AlertTriangle, container: "border-amber-500/50 bg-amber-500/10", title: "text-amber-600 dark:text-amber-400" },
  danger:    { label: "Danger",    icon: AlertOctagon,  container: "border-red-500/50 bg-red-500/10",     title: "text-red-600 dark:text-red-400" },
  error:     { label: "Error",     icon: AlertOctagon,  container: "border-red-500/50 bg-red-500/10",     title: "text-red-600 dark:text-red-400" },
  success:   { label: "Success",   icon: CheckCircle2,  container: "border-green-500/50 bg-green-500/10", title: "text-green-600 dark:text-green-400" },
  check:     { label: "Check",     icon: CheckCircle2,  container: "border-green-500/50 bg-green-500/10", title: "text-green-600 dark:text-green-400" },
  done:      { label: "Done",      icon: CheckCircle2,  container: "border-green-500/50 bg-green-500/10", title: "text-green-600 dark:text-green-400" },
  failure:   { label: "Failure",   icon: XCircle,       container: "border-red-500/50 bg-red-500/10",     title: "text-red-600 dark:text-red-400" },
  fail:      { label: "Fail",      icon: XCircle,       container: "border-red-500/50 bg-red-500/10",     title: "text-red-600 dark:text-red-400" },
  missing:   { label: "Missing",   icon: XCircle,       container: "border-red-500/50 bg-red-500/10",     title: "text-red-600 dark:text-red-400" },
  question:  { label: "Question",  icon: HelpCircle,    container: "border-amber-500/50 bg-amber-500/10", title: "text-amber-600 dark:text-amber-400" },
  help:      { label: "Help",      icon: HelpCircle,    container: "border-amber-500/50 bg-amber-500/10", title: "text-amber-600 dark:text-amber-400" },
  faq:       { label: "FAQ",       icon: HelpCircle,    container: "border-amber-500/50 bg-amber-500/10", title: "text-amber-600 dark:text-amber-400" },
  quote:     { label: "Quote",     icon: Quote,         container: "border-muted bg-muted/30",            title: "text-muted-foreground" },
  cite:      { label: "Cite",      icon: Quote,         container: "border-muted bg-muted/30",            title: "text-muted-foreground" },
  example:   { label: "Example",   icon: BookOpen,      container: "border-purple-500/50 bg-purple-500/10", title: "text-purple-600 dark:text-purple-400" },
  abstract:  { label: "Abstract",  icon: FileText,      container: "border-cyan-500/50 bg-cyan-500/10",   title: "text-cyan-600 dark:text-cyan-400" },
  summary:   { label: "Summary",   icon: FileText,      container: "border-cyan-500/50 bg-cyan-500/10",   title: "text-cyan-600 dark:text-cyan-400" },
  tldr:      { label: "TL;DR",     icon: FileText,      container: "border-cyan-500/50 bg-cyan-500/10",   title: "text-cyan-600 dark:text-cyan-400" },
  todo:      { label: "Todo",      icon: ListChecks,    container: "border-blue-500/50 bg-blue-500/10",   title: "text-blue-600 dark:text-blue-400" },
};

// Serialise a list of mdast inline nodes back to markdown source. Good enough
// for round-tripping the title of a callout so that things like `code`,
// **bold**, and $math$ survive.
function inlineToMarkdown(nodes: MarkdownNode[] = []): string {
  let out = '';
  for (const node of nodes) {
    if (!node) continue;
    switch (node.type) {
      case 'text': out += node.value; break;
      case 'inlineCode': out += '`' + node.value + '`'; break;
      case 'strong': out += '**' + inlineToMarkdown(node.children) + '**'; break;
      case 'emphasis': out += '*' + inlineToMarkdown(node.children) + '*'; break;
      case 'delete': out += '~~' + inlineToMarkdown(node.children) + '~~'; break;
      case 'link': out += '[' + inlineToMarkdown(node.children) + '](' + (node.url ?? '') + ')'; break;
      case 'image': out += '![' + (node.alt ?? '') + '](' + (node.url ?? '') + ')'; break;
      case 'inlineMath': out += '$' + node.value + '$'; break;
      case 'break': out += ' '; break;
      default:
        if (Array.isArray(node.children)) out += inlineToMarkdown(node.children);
        break;
    }
  }
  return out;
}

// Obsidian-style callouts: a blockquote whose first line is `[!type] Optional Title`.
// The title ends at the first newline — anything past that in the same paragraph
// (Obsidian allows body content on the next line without a blank separator) is
// split out into a new body paragraph so only the title survives in the header.
// The title can contain inline markdown (code, bold, math, ...), so we serialise
// the title children back to markdown and stash it on the node; the blockquote
// renderer parses it again via ReactMarkdown.
function remarkObsidianCallouts() {
  return (tree: MarkdownNode) => {
    const visit = (node: MarkdownNode) => {
      if (node?.type === 'blockquote') {
        const blockChildren = node.children;
        const firstChild = blockChildren?.[0];
        if (firstChild?.type === 'paragraph' && blockChildren) {
          const paragraphChildren = firstChild.children;
          const firstText = paragraphChildren?.[0];
          if (firstText?.type === 'text' && typeof firstText.value === "string" && paragraphChildren) {
            // Match only the `[!type][fold] ` prefix; the title is whatever
            // remains on the first line, possibly spanning several inline children.
            const prefixMatch = firstText.value.match(/^\[!(\w+)\]([+-]?)[ \t]*/);
            if (prefixMatch) {
              const [matched, type, fold] = prefixMatch;
              firstText.value = firstText.value.slice(matched.length);

              // Find the newline that ends the title. The title can be split
              // across multiple inline children (e.g. text + math + text) when
              // it contains inline elements, so scan every text child until we
              // find one with a `\n`.
              let splitIdx = -1;
              let nlIdx = -1;
              for (let i = 0; i < paragraphChildren.length; i++) {
                const c = paragraphChildren[i];
                if (c.type === 'text' && typeof c.value === "string") {
                  const idx = c.value.indexOf('\n');
                  if (idx >= 0) { splitIdx = i; nlIdx = idx; break; }
                }
              }

              const bodyChildren: MarkdownNode[] = [];
              if (splitIdx >= 0) {
                const splitChild = paragraphChildren[splitIdx];
                if (typeof splitChild.value !== "string") return;
                const bodyText = splitChild.value.slice(nlIdx + 1);
                splitChild.value = splitChild.value.slice(0, nlIdx);
                if (bodyText) bodyChildren.push({ type: 'text', value: bodyText });
                bodyChildren.push(...paragraphChildren.slice(splitIdx + 1));
                paragraphChildren.length = splitIdx + 1;
                if (splitChild.value === '') paragraphChildren.pop();
              }

              if (paragraphChildren[0]?.type === 'text' && paragraphChildren[0].value === '') {
                paragraphChildren.shift();
              }
              const titleMarkdown = inlineToMarkdown(paragraphChildren);
              // First paragraph is fully consumed by the title; replace with
              // a body paragraph if anything was split off.
              blockChildren.shift();
              if (bodyChildren.length > 0) {
                blockChildren.unshift({ type: 'paragraph', children: bodyChildren });
              }
              node.data = {
                ...(node.data || {}),
                hProperties: {
                  ...(node.data?.hProperties || {}),
                  'data-callout': type.toLowerCase(),
                  'data-callout-title': titleMarkdown,
                  'data-callout-fold': fold ?? '',
                },
              };
            }
          }
        }
      }
      if (Array.isArray(node?.children)) node.children.forEach(visit);
    };
    visit(tree);
  };
}

// TikZ rendering. Production strategy: every ```tikz``` block in the repo is
// pre-rendered to a static SVG at build time (see scripts/render-tikz.mjs)
// and served as `/Resources/Images/tikz/<hash>.svg`. <hash> is
// sha256(preamble + tidied source) truncated to 16 hex chars, computed both
// here and in the render script so the URLs line up.
//
// Fallback path: if the pre-rendered SVG is missing (e.g. dev environment, or
// a newly-authored block that hasn't been rendered yet), we fall back to the
// in-browser tikzjax CDN bundle. tikzjax has its own quirks:
//   - It scans for <script type="text/tikz"> once via window.onload, with no
//     MutationObserver and no exposed re-process API.
//   - Its bundled `automata` library is broken (loads but never registers
//     /tikz/state), which is why our preamble re-implements the standard
//     automata styles using basic TikZ primitives.
// We poll for tikzjax's handler to appear on window.onload and re-invoke it
// ourselves after injecting a script so the fallback works on SPA navigation
// too.
//
// The preamble lives in src/tikz-preamble.tex so the build script and this
// component agree on a single source of truth — change it there, not here.
// CR normalisation matters because Git on Windows can hand us CRLF while the
// build script (running under Bun/Node) reads LF; if the bytes hashed don't
// match the bytes the script hashed, the <img> URL points at the wrong file
// and we fall back to client rendering for no good reason.
const TIKZ_PREAMBLE = tikzPreambleRaw.replace(/\r/g, "");

function runTikzjax(retries = 40) {
  if (typeof window === "undefined") return;
  const fn = window.onload as ((ev: Event) => unknown) | null;
  if (typeof fn === "function") {
    try {
      fn.call(window, new Event("load"));
    } catch {
      // tikzjax may throw if the same script has already been processed,
      // which is fine: the SVG is already in place.
    }
    return;
  }
  if (retries > 0) {
    window.setTimeout(() => runTikzjax(retries - 1), 200);
  }
}

// Lazy-load the tikzjax CDN (~6 MB including fonts) only when a fallback
// render is actually needed. Most pages hit the pre-rendered SVG path and
// never trigger this. Memoised so concurrent TikzBlocks share a single load.
let tikzjaxLoadPromise: Promise<void> | null = null;

function loadTikzjaxCdn(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (tikzjaxLoadPromise) return tikzjaxLoadPromise;
  tikzjaxLoadPromise = new Promise((resolve) => {
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "https://tikzjax.com/v1/fonts.css";
    document.head.appendChild(css);
    const script = document.createElement("script");
    script.src = "https://tikzjax.com/v1/tikzjax.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.head.appendChild(script);
  });
  return tikzjaxLoadPromise;
}

// tikzjax fails silently on stray whitespace and non-breaking spaces in the
// source (e.g. pasted content). Following the obsidian-tikzjax convention,
// trim every line, drop empty ones, and strip `&nbsp;`/`\r`. The Node render
// script applies the same transform before hashing, so the digest both sides
// compute is identical.
function tidyTikzSource(source: string): string {
  return source
    .replace(/\r/g, "")
    .replace(/&nbsp;/g, "")
    .split("\n")
    .map((l) => l.replace(/^>\s?/, "").trim())
    .filter((l) => l.length > 0)
    .join("\n");
}

// SHA-256 of `preamble + "\n" + tidied`, truncated to 16 hex chars. 64 bits
// of hash is well into "collisions never happen at this scale" territory and
// keeps URLs short.
async function tikzHash(tidied: string): Promise<string> {
  const buf = new TextEncoder().encode(TIKZ_PREAMBLE + "\n" + tidied);
  const digest = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(digest), (b) =>
    b.toString(16).padStart(2, "0"),
  )
    .join("")
    .slice(0, 16);
}

// Module-level cache so multiple TikzBlocks sharing the same hash do exactly
// one network round-trip per session. The HTTP layer is already immutable-
// cached server-side, but the JS-level cache also avoids re-parsing the SVG
// markup on remount.
const tikzSvgCache = new Map<string, string | null>();

async function fetchTikzSvg(hash: string): Promise<string | null> {
  if (tikzSvgCache.has(hash)) return tikzSvgCache.get(hash) ?? null;
  try {
    const res = await fetch(`/Resources/Images/tikz/${hash}.svg`);
    if (!res.ok) {
      tikzSvgCache.set(hash, null);
      return null;
    }
    const text = await res.text();
    tikzSvgCache.set(hash, text);
    return text;
  } catch {
    tikzSvgCache.set(hash, null);
    return null;
  }
}

function TikzBlock({ code }: { code: string }) {
  const tidied = tidyTikzSource(code);
  const [svgHtml, setSvgHtml] = useState<string | null>(null);
  const [missing, setMissing] = useState(false);
  const fallbackRef = useRef<HTMLDivElement>(null);

  // Compute hash, fetch the SVG bytes, and stash the markup. The SVG is
  // inlined via dangerouslySetInnerHTML below (rather than referenced through
  // <img src=…>) so the `tikz-arrow` / `tikz-fill` classes and the
  // `currentColor` / `var(--tikz-fill)` references inside the SVG resolve
  // against the parent document's CSS — that's what makes per-theme
  // recolouring work.
  useEffect(() => {
    let cancelled = false;
    tikzHash(tidied).then(async (h) => {
      if (cancelled) return;
      const svg = await fetchTikzSvg(h);
      if (cancelled) return;
      if (svg !== null) {
        setSvgHtml(svg);
        setMissing(false);
      } else {
        setMissing(true);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [tidied]);

  // Fallback render: if the pre-rendered SVG 404'd, lazy-load the tikzjax
  // CDN and inject a <script type="text/tikz"> for in-browser rendering.
  // Cleared on every re-render so a successful inline swap-in undoes any
  // previous fallback render.
  useEffect(() => {
    const host = fallbackRef.current;
    if (!host) return;
    host.innerHTML = "";
    if (!missing) return;
    const script = document.createElement("script");
    script.type = "text/tikz";
    script.setAttribute("data-show-console", "true");
    script.textContent = TIKZ_PREAMBLE + tidied;
    host.appendChild(script);
    loadTikzjaxCdn().then(() => runTikzjax());
  }, [missing, tidied]);

  return (
    <div className="not-prose my-4 flex justify-center overflow-x-auto tikz-svg-host">
      {svgHtml && !missing && (
        <span
          aria-label="TikZ diagram"
          role="img"
          dangerouslySetInnerHTML={{ __html: svgHtml }}
        />
      )}
      <div ref={fallbackRef} />
    </div>
  );
}

// react-markdown wraps fenced code blocks in `<pre><code class="language-...">`.
// We detect tikz in the `code` renderer (where the class is in hand) and in
// the `pre` renderer we unwrap when the rendered child IS a TikzBlock so we
// don't end up with <pre><div>...</div></pre>.
function isTikzChild(child: unknown): boolean {
  return isValidElement(child) && child.type === TikzBlock;
}

function Callout({ type, title, fold, children }: { type: string; title: string; fold: string; children: React.ReactNode }) {
  const style = CALLOUT_TYPES[type] ?? CALLOUT_TYPES.note;
  const Icon = style.icon;
  const trimmed = title?.trim() ?? '';
  const collapsible = fold === '+' || fold === '-';
  const [open, setOpen] = useState(fold !== '-');
  const toggle = () => setOpen(o => !o);
  return (
    <div className={`not-prose my-4 border-l-4 rounded-r px-4 py-3 ${style.container}`}>
      <div
        className={`flex items-center gap-2 font-semibold ${style.title} ${collapsible ? "cursor-pointer select-none" : ""}`}
        onClick={collapsible ? toggle : undefined}
        role={collapsible ? "button" : undefined}
        aria-expanded={collapsible ? open : undefined}
        tabIndex={collapsible ? 0 : undefined}
        onKeyDown={collapsible ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } } : undefined}
      >
        <Icon className="h-4 w-4" />
        <span className="flex-1">
          {trimmed ? (
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
              components={{
                // Render the title inline (strip block wrappers and heavy styles).
                p: ({ children }) => <>{children}</>,
                code: ({ children }) => (
                  <code className="bg-black/10 dark:bg-white/10 rounded px-1 py-0.5 text-sm font-mono">{children}</code>
                ),
              }}
            >
              {trimmed}
            </ReactMarkdown>
          ) : (
            style.label
          )}
        </span>
        {collapsible && <ChevronDown className={`h-4 w-4 transition-transform ${open ? '' : '-rotate-90'}`} />}
      </div>
      {/* Always render children so that things like TikZ scripts inside a
          collapsed callout still mount and get processed on page load. We
          just hide them visually when the callout is closed. */}
      <div
        className={`mt-2 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 ${collapsible && !open ? "hidden" : ""}`}
      >
        {children}
      </div>
    </div>
  );
}

export function MarkdownContent({ content, extension }: { content: string; extension: string }) {
  const rendered = extension === 'tex' ? latexToMarkdown(content) : content;
  return (
    <div className="prose dark:prose-invert">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath, remarkObsidianCallouts]}
        rehypePlugins={[rehypeKatex]}
        components={{
          h1: ({ children, ...props }) => <h1 {...props} className="text-4xl font-bold mt-8 mb-4" id={String(children).toLowerCase().replace(/\s+/g, '-')}>{children}</h1>,
          h2: ({ children, ...props }) => <h2 {...props} className="text-3xl font-semibold mt-6 mb-3" id={String(children).toLowerCase().replace(/\s+/g, '-')}>{children}</h2>,
          h3: ({ children, ...props }) => <h3 {...props} className="text-2xl font-medium mt-5 mb-2" id={String(children).toLowerCase().replace(/\s+/g, '-')}>{children}</h3>,
          h4: ({ children, ...props }) => <h4 {...props} className="text-xl font-medium mt-4 mb-2" id={String(children).toLowerCase().replace(/\s+/g, '-')}>{children}</h4>,
          p: ({ children }) => <p className="my-4 leading-7">{children}</p>,
          ul: ({ children }) => <ul className="list-disc pl-6 my-4 space-y-1">{children}</ul>,
          ol: ({ children, start }) => <ol start={start} className="list-decimal pl-6 my-4 space-y-1">{children}</ol>,
          li: ({ children }) => <li className="leading-7">{children}</li>,
          a: ({ children, href }) => <a href={href} className="text-primary underline hover:opacity-80">{children}</a>,
          img: ({ src, alt }) => <img src={src} alt={alt ?? ''} className="my-4 max-w-full rounded border" />,
          blockquote: ({ children, ...props }) => {
            const calloutProps = props as {
              "data-callout"?: string;
              "data-callout-title"?: string;
              "data-callout-fold"?: string;
            };
            const calloutType = calloutProps["data-callout"];
            if (calloutType) {
              const title = calloutProps["data-callout-title"] ?? '';
              const fold = calloutProps["data-callout-fold"] ?? '';
              return <Callout type={calloutType} title={title} fold={fold}>{children}</Callout>;
            }
            return <blockquote className="border-l-4 border-muted pl-4 italic my-4 text-muted-foreground">{children}</blockquote>;
          },
          pre: ({ children, ...props }) => {
            const arr = Children.toArray(children);
            if (arr.length === 1 && isTikzChild(arr[0])) return <>{arr[0]}</>;
            return <pre {...props}>{children}</pre>;
          },
          code: ({ children, className }) => {
            if (className === "language-tikz") {
              return <TikzBlock code={String(children).replace(/\n$/, "")} />;
            }
            if (!className) {
              return <code className="bg-muted rounded px-1.5 py-0.5 text-sm font-mono">{children}</code>;
            }
            const isHaskell = className === "language-hs" || className === "language-haskell";
            return (
              <code className={`${className} block bg-muted rounded p-4 my-4 overflow-x-auto text-sm whitespace-pre`}>
                {isHaskell ? highlightHaskell(String(children)) : children}
              </code>
            );
          },
          hr: () => <hr className="my-6 border-border" />,
          // Tables: use border-primary so grid lines pick up each theme's accent
          // (purple for cs141, red for dragon, near-black for light, etc.).
          table: ({ children }) => (
            <div className="my-4 overflow-x-auto">
              <table className="not-prose w-full border-collapse border border-primary text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-primary/10">{children}</thead>,
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => <tr className="border border-primary">{children}</tr>,
          th: ({ children }) => <th className="border border-primary px-3 py-2 text-left font-semibold">{children}</th>,
          td: ({ children }) => <td className="border border-primary px-3 py-2 align-top">{children}</td>,
        }}
      >
        {rendered}
      </ReactMarkdown>
    </div>
  );
}
