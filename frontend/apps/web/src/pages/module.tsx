import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const ModulePage = () => {
  const { code } = useParams();
  const [mod, setMod] = useState<any>(null);
  const [people, setPeople] = useState<Record<string, any>>({});
  const [noteCredits, setNoteCredits] = useState<Record<string, string[]>>({});

  useEffect(() => {
    fetch(`/api/module/${code}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(mod => {
        setMod(mod);
        localStorage.setItem('last-year', String(mod.year));
      });
  }, [code]);

  useEffect(() => {
    fetch("/api/credits").then(res => res.json()).then(setPeople);
    fetch("/api/credits/notes").then(res => res.json()).then(setNoteCredits);
  }, []);

  useEffect(() => {
    if (mod) document.title = `${mod.code} Notes`;
  }, [mod]);

  if (!mod) return <div className="container mx-auto p-4">Loading module...</div>;

  // Match a note URL basename against the notes.json key (which includes extension)
  function getContributors(noteUrl: string): string[] {
    const basename = noteUrl.split('/').pop() ?? '';
    for (const [filename, authors] of Object.entries(noteCredits)) {
      if (filename.replace(/\.[^.]+$/, '') === basename) return authors as string[];
    }
    return [];
  }

  return (
    <div className="container mx-auto p-4">
      <Link
        to={`/year/${mod.year}`}
        className="inline-flex items-center gap-2 mb-6 px-4 py-2 border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
      >
        &larr; Year {mod.year}
      </Link>

      <h1 className="text-3xl font-bold">{mod.code}</h1>
      <h4 className="text-xl text-muted-foreground">{mod.name}</h4>
      <div className="flex gap-4 mt-1 mb-2">
        {mod.Term && <span className="text-sm text-muted-foreground">Term {mod.Term}</span>}
        {mod.CATS && <span className="text-sm text-muted-foreground">{mod.CATS} CATS</span>}
      </div>
      <p className="italic my-4">{mod.tagline}</p>
      {mod.description && <p className="mb-4">{mod.description}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border p-4 rounded">
          <h5 className="font-bold mb-2">Notes</h5>
          {mod.notes?.map((note: any) => {
            const contributors = note.url !== '#' ? getContributors(note.url) : [];
            return note.url === '#'
              ? (
                <div key={note.title} className="mb-2 p-3 border rounded opacity-50 text-sm">
                  {note.title}
                </div>
              )
              : (
                <Link key={note.title} to={note.url} className="block mb-2 p-3 border rounded text-sm hover:bg-muted transition-colors">
                  {note.title}
                  {contributors.length > 0 && (
                    <span className="block mt-1" onClick={e => e.preventDefault()}>
                      <em className="text-xs text-muted-foreground not-italic">Created by </em>
                      {contributors.map((authorId, i) => (
                        <span key={authorId}>
                          {i > 0 && <em className="text-xs text-muted-foreground">, </em>}
                          <Link
                            to={`/acknowledgements#${authorId}`}
                            className="text-xs italic text-muted-foreground hover:text-primary transition-colors"
                          >
                            {people[authorId]?.name ?? authorId}
                          </Link>
                        </span>
                      ))}
                    </span>
                  )}
                </Link>
              );
          })}
        </div>
        <div className="border p-4 rounded">
          <h5 className="font-bold mb-2">Past Papers</h5>
          <div className="space-y-2">
            {mod.past_papers?.map((paper: any) => (
              <div key={paper.year} className="grid grid-cols-2 gap-2">
                <a
                  href={paper.url}
                  className="block p-3 border rounded bg-card hover:bg-muted hover:border-primary transition-colors text-center text-sm font-medium"
                >
                  {paper.year} Paper
                </a>
                <a
                  href={paper.solution_url || "#"}
                  className={`block p-3 border rounded bg-card text-center text-sm font-medium ${paper.solution_url ? "hover:bg-muted hover:border-primary transition-colors" : "opacity-50 cursor-not-allowed"}`}
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
