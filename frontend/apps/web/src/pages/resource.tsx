import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { MarkdownContent } from "@/components/markdown-content";
import { useContent } from "@/lib/use-content";

// Per-category chrome. Adding a new category is a matter of extending this map.
const CATEGORY_LABEL: Record<string, string> = {
  Notes: "Notes",
  Solutions: "Solution",
};

export const ResourcePage = () => {
  const { category = "", code, filename } = useParams();
  const url = `/resources/${category}/${code}/${filename}`;
  const { content, extension } = useContent(url);
  const [modName, setModName] = useState<string>("");

  useEffect(() => {
    fetch(`/api/module/${code}`)
      .then(res => res.ok ? res.json() : null)
      .then(mod => {
        if (!mod) return;
        setModName(mod.name);
        localStorage.setItem('last-year', String(mod.year));
      });
  }, [code]);

  useEffect(() => {
    if (filename && code) {
      const label = CATEGORY_LABEL[category] ?? category;
      document.title = `${filename}: ${code} ${label}`;
    }
  }, [filename, code, category]);

  if (!extension) return <div className="mx-auto max-w-6xl p-4">Loading...</div>;

  return (
    <div className="mx-auto max-w-6xl p-4">
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <Link
          to={`/module/${code}`}
          className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
        >
          &larr; {code}
        </Link>
        {modName && (
          <span className="text-muted-foreground text-sm">
            {modName} - {CATEGORY_LABEL[category] ?? category}
          </span>
        )}
      </div>

      {extension === 'pdf' ? (
        <iframe
          src={url}
          title={`${filename}.pdf`}
          className="w-full h-[85vh] border rounded"
        />
      ) : (
        <MarkdownContent content={content} extension={extension} />
      )}
    </div>
  );
};
