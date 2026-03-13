import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const NotePreview = ({ url, title }: { url: string; title: string }) => {
  const [preview, setPreview] = useState("Loading...");
  useEffect(() => {
    if (url === "#" || !url.startsWith("/notes/")) {
      setPreview("No content available");
      return;
    }
    // Fetch the note content from the public folder based on the file name inferred from the URL
    let parts = url.split('/');
    let filename = parts[parts.length - 1];
    if (!filename.includes('.')) {
      filename += '.md';
    }
    fetch(`/data/NoteData/${filename}`)
      .then(res => {
        if (!res.ok) throw new Error('Note not found');
        return res.text();
      })
      .then(text => setPreview(text.slice(0, 100) + "..."))
      .catch(() => setPreview("Failed to load preview"));
  }, [url]);
  if (url === "#" || !url.startsWith("/notes/")) {
    return (
      <div className="mb-3 p-3 border rounded bg-card opacity-50">
        <span className="font-semibold block">{title}</span>
        <p className="text-xs text-muted-foreground mt-1 truncate">No content available</p>
      </div>
    );
  }

  return (
    <Link to={url} className="block mb-3 p-3 border rounded bg-card hover:border-primary transition-colors">
      <span className="font-semibold text-primary block">{title}</span>
      <p className="text-xs text-muted-foreground mt-1 truncate">{preview}</p>
    </Link>
  );
};

export const ModulePage = () => {
  const { code } = useParams();
  const [mod, setMod] = useState<any>(null);

  useEffect(() => {
    Promise.all([1, 2, 3].map(y => fetch(`/data/YearData/year${y}.json`).then(r => r.json())))
      .then(years => {
        for (const y of years) {
          const found = y.modules.find((m: any) => m.code.toUpperCase() === code?.toUpperCase());
          if (found) {
              setMod(found);
              return;
          }
        }
      });
  }, [code]);

  if (!mod) return <div className="container mx-auto p-4">Loading module...</div>;

  return (
    <div className="container mx-auto p-4">
        <Link to="/" className="text-sm underline mb-4 block">&larr; Back to Dashboard</Link>
        <h1 className="text-3xl font-bold">{mod.code}</h1>
        <h4 className="text-xl text-muted-foreground">{mod.name}</h4>
        <p className="italic my-4">{mod.tagline}</p>
        {mod.description && <p className="mb-4">{mod.description}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border p-4 rounded">
                <h5 className="font-bold mb-2">Notes</h5>
                {mod.notes?.map((note: any) => (
                    <NotePreview key={note.title} title={note.title} url={note.url} />
                ))}
            </div>
            <div className="border p-4 rounded">
                <h5 className="font-bold mb-2">Past Papers</h5>
                <div className="space-y-2">
                    {mod.past_papers?.map((paper: any) => (
                        <div key={paper.year} className="grid grid-cols-2 gap-2">
                            <a 
                                href={paper.url} 
                                className="block p-3 border rounded bg-card hover:border-primary transition-colors text-center text-sm font-medium"
                            >
                                {paper.year} Paper
                            </a>
                            <a 
                                href={paper.solution_url || "#"} 
                                className={`block p-3 border rounded bg-card text-center text-sm font-medium ${paper.solution_url ? "hover:border-primary transition-colors" : "opacity-50 cursor-not-allowed"}`}
                            >
                                Solution
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};