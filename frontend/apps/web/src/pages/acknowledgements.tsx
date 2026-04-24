import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Github, Linkedin } from "lucide-react";

type Person = {
  id: string;
  name: string;
  role: string;
  github?: string;
  linkedin?: string;
  image?: string;
};

type Credits = { dev?: Person[]; content?: Person[] };

function PersonCard({ person }: { person: Person }) {
  return (
    <div id={person.id} className="flex gap-4 p-5 border rounded-xl bg-card">
      {person.image && (
        <img
          src={person.image}
          alt={person.name}
          className="w-16 h-16 rounded-full object-cover shrink-0"
        />
      )}
      <div className="flex flex-col justify-between min-w-0">
        <div>
          <p className="font-semibold text-lg leading-tight">{person.name}</p>
          <p className="text-sm text-muted-foreground">{person.role}</p>
        </div>
        <div className="flex gap-3 mt-3">
          {person.github && (
            <a
              href={person.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label={`${person.name} on GitHub`}
            >
              <Github className="w-5 h-5" />
            </a>
          )}
          {person.linkedin && (
            <a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label={`${person.name} on LinkedIn`}
            >
              <Linkedin className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export const AcknowledgementsPage = () => {
  const [credits, setCredits] = useState<Credits>({});
  const location = useLocation();

  useEffect(() => {
    fetch("/api/credits")
      .then(res => res.json())
      .then(setCredits);
  }, []);

  // Devs are listed first, then content contributors — but rendered as a single
  // flat grid with no section headings.
  const people = [...(credits.dev ?? []), ...(credits.content ?? [])];

  // Scroll to anchor after credits load
  useEffect(() => {
    if (!location.hash || people.length === 0) return;
    const el = document.getElementById(location.hash.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [people, location.hash]);

  return (
    <>
    <title>Acknowledgements</title>
    <div className="mx-auto max-w-6xl p-4">
      <h1 className="text-4xl font-bold mb-2">Acknowledgements</h1>
      <p className="text-muted-foreground mb-8">The people behind Warwick CS Notes.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {people.map(person => (
          <PersonCard key={person.id} person={person} />
        ))}
      </div>
    </div>
    </>
  );
};
