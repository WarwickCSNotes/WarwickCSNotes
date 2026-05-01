import { useState } from "react";
import ReactMarkdown from "react-markdown";
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
  Pencil,
  ChevronDown,
} from "lucide-react";

export function latexToMarkdown(tex: string): string {
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

const CALLOUT_TYPES: Record<string, CalloutStyle> = {
  note:      { label: "Note",      icon: Pencil,        container: "border-blue-500/50 bg-blue-500/10",   title: "text-blue-600 dark:text-blue-400" },
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
function inlineToMarkdown(nodes: any[]): string {
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
  return (tree: any) => {
    const visit = (node: any) => {
      if (node?.type === 'blockquote') {
        const firstChild = node.children?.[0];
        if (firstChild?.type === 'paragraph') {
          const firstText = firstChild.children?.[0];
          if (firstText?.type === 'text') {
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
              for (let i = 0; i < firstChild.children.length; i++) {
                const c = firstChild.children[i];
                if (c.type === 'text') {
                  const idx = c.value.indexOf('\n');
                  if (idx >= 0) { splitIdx = i; nlIdx = idx; break; }
                }
              }

              const bodyChildren: any[] = [];
              if (splitIdx >= 0) {
                const splitChild = firstChild.children[splitIdx];
                const bodyText = splitChild.value.slice(nlIdx + 1);
                splitChild.value = splitChild.value.slice(0, nlIdx);
                if (bodyText) bodyChildren.push({ type: 'text', value: bodyText });
                bodyChildren.push(...firstChild.children.slice(splitIdx + 1));
                firstChild.children.length = splitIdx + 1;
                if (splitChild.value === '') firstChild.children.pop();
              }

              if (firstChild.children[0]?.type === 'text' && firstChild.children[0].value === '') {
                firstChild.children.shift();
              }
              const titleMarkdown = inlineToMarkdown(firstChild.children);
              // First paragraph is fully consumed by the title; replace with
              // a body paragraph if anything was split off.
              node.children.shift();
              if (bodyChildren.length > 0) {
                node.children.unshift({ type: 'paragraph', children: bodyChildren });
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
      {(!collapsible || open) && (
        <div className="mt-2 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">{children}</div>
      )}
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
            const calloutType = (props as any)['data-callout'];
            if (calloutType) {
              const title = (props as any)['data-callout-title'] ?? '';
              const fold = (props as any)['data-callout-fold'] ?? '';
              return <Callout type={calloutType} title={title} fold={fold}>{children}</Callout>;
            }
            return <blockquote className="border-l-4 border-muted pl-4 italic my-4 text-muted-foreground">{children}</blockquote>;
          },
          code: ({ children, className }) => className
            ? <code className={`${className} block bg-muted rounded p-4 my-4 overflow-x-auto text-sm`}>{children}</code>
            : <code className="bg-muted rounded px-1.5 py-0.5 text-sm font-mono">{children}</code>,
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
