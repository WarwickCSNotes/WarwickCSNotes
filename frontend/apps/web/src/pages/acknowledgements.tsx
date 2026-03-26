import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Github, Linkedin } from "lucide-react";

export const AcknowledgementsPage = () => {
  const [credits, setCredits] = useState<Record<string, any>>({});
  const location = useLocation();

  useEffect(() => {
    fetch("/api/credits")
      .then(res => res.json())
      .then(setCredits);
  }, []);

  // Scroll to anchor after credits load
  useEffect(() => {
    if (!location.hash || Object.keys(credits).length === 0) return;
    const el = document.getElementById(location.hash.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [credits, location.hash]);

  return (
    <>
    <title>Acknowledgements</title>
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-4xl font-bold mb-2">Acknowledgements</h1>
      <p className="text-muted-foreground mb-8">The people behind Warwick CS Notes.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(credits).map(([id, person]) => (
          <div key={id} id={id} className="flex gap-4 p-5 border rounded-xl bg-card">
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
        ))}
      </div>
    </div>
    </>
  );
};
