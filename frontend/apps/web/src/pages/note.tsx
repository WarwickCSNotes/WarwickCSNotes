import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

export const NotePage = () => {
  const { code, note } = useParams();
  const [content, setContent] = useState("");

  useEffect(() => {
    let filename = note;
    if (filename && !filename.includes('.')) {
      filename += '.md';
    }
    fetch(`/data/NoteData/${filename}`)
      .then(res => res.text())
      .then(setContent);
  }, [note]);

  const isTex = note.endsWith('.tex');

  if (isTex) return <div className="container mx-auto p-4"><pre className="whitespace-pre-wrap font-mono p-4 bg-muted rounded">{content}</pre></div>;

  return (
    <div className="container mx-auto p-4 max-w-4xl prose dark:prose-invert">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm, remarkMath]} 
        rehypePlugins={[rehypeKatex]}
        components={{
          h1: ({ children, ...props }) => <h1 {...props} className="text-4xl font-bold mt-8 mb-4" id={String(children).toLowerCase().replace(/\s+/g, '-')}>{children}</h1>,
          h2: ({ children, ...props }) => <h2 {...props} className="text-3xl font-semibold mt-6 mb-3" id={String(children).toLowerCase().replace(/\s+/g, '-')}>{children}</h2>,
          h3: ({ children, ...props }) => <h3 {...props} className="text-2xl font-medium mt-5 mb-2" id={String(children).toLowerCase().replace(/\s+/g, '-')}>{children}</h3>,
          h4: ({ children, ...props }) => <h4 {...props} className="text-xl font-medium mt-4 mb-2" id={String(children).toLowerCase().replace(/\s+/g, '-')}>{children}</h4>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};