import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

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

export function MarkdownContent({ content, extension }: { content: string; extension: string }) {
  const rendered = extension === 'tex' ? latexToMarkdown(content) : content;
  return (
    <div className="prose dark:prose-invert">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          h1: ({ children, ...props }) => <h1 {...props} className="text-4xl font-bold mt-8 mb-4" id={String(children).toLowerCase().replace(/\s+/g, '-')}>{children}</h1>,
          h2: ({ children, ...props }) => <h2 {...props} className="text-3xl font-semibold mt-6 mb-3" id={String(children).toLowerCase().replace(/\s+/g, '-')}>{children}</h2>,
          h3: ({ children, ...props }) => <h3 {...props} className="text-2xl font-medium mt-5 mb-2" id={String(children).toLowerCase().replace(/\s+/g, '-')}>{children}</h3>,
          h4: ({ children, ...props }) => <h4 {...props} className="text-xl font-medium mt-4 mb-2" id={String(children).toLowerCase().replace(/\s+/g, '-')}>{children}</h4>,
          p: ({ children }) => <p className="my-4 leading-7">{children}</p>,
          ul: ({ children }) => <ul className="list-disc pl-6 my-4 space-y-1">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-6 my-4 space-y-1">{children}</ol>,
          li: ({ children }) => <li className="leading-7">{children}</li>,
          a: ({ children, href }) => <a href={href} className="text-primary underline hover:opacity-80">{children}</a>,
          blockquote: ({ children }) => <blockquote className="border-l-4 border-muted pl-4 italic my-4 text-muted-foreground">{children}</blockquote>,
          code: ({ children, className }) => className
            ? <code className={`${className} block bg-muted rounded p-4 my-4 overflow-x-auto text-sm`}>{children}</code>
            : <code className="bg-muted rounded px-1.5 py-0.5 text-sm font-mono">{children}</code>,
          hr: () => <hr className="my-6 border-border" />,
        }}
      >
        {rendered}
      </ReactMarkdown>
    </div>
  );
}
