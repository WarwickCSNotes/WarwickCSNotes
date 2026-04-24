import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Github, MessageSquare, Linkedin } from "lucide-react";

export const Welcome = () => {
  useEffect(() => { document.title = "CS Notes"; }, []);

  return (
    <div className="mx-auto max-w-6xl p-4">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>

      <div className="mb-8 p-4 border rounded-lg bg-surface text-surface-foreground text-sm">
        <strong>Disclaimer:</strong> These notes are student-made and
        are not officially endorsed by the University of Warwick. They may contain errors or
        omissions. Always cross-reference with official lecture materials and module resources.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(y => (
          <Link
            key={y}
            to={`/year/${y}`}
            className="block p-6 bg-surface text-surface-foreground border rounded-lg hover:brightness-110 transition"
          >
            <h2 className="text-2xl font-semibold">Year {y}</h2>
          </Link>
        ))}
      </div>

      <section className="mt-12 text-center">
        <h3 className="text-3xl font-semibold mb-6">Get in touch</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://discord.gg/wdQxub7z9V"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 bg-surface text-surface-foreground border rounded-lg text-lg font-medium hover:brightness-110 transition"
          >
            <MessageSquare className="h-6 w-6" /> Discord
          </a>
          <a
            href="https://github.com/WarwickCSNotes/WarwickCSNotes"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 bg-surface text-surface-foreground border rounded-lg text-lg font-medium hover:brightness-110 transition"
          >
            <Github className="h-6 w-6" /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/company/warwick-cs-notes"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 bg-surface text-surface-foreground border rounded-lg text-lg font-medium hover:brightness-110 transition"
          >
            <Linkedin className="h-6 w-6" /> LinkedIn
          </a>
        </div>
      </section>
    </div>
  );
};
