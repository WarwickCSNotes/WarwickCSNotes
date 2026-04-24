import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BadgeCheck, Construction } from "lucide-react";
import { Page } from "@/components/page";
import { PageHeader } from "@/components/page-header";

/** Link-like card that can safely contain other interactive children
 *  (e.g. author links). Implemented as a div + onClick to avoid nesting
 *  <a> inside <a>. Inner links should call e.stopPropagation() to prevent
 *  double navigation. */
function ResourceCard({
  to,
  className,
  children,
}: {
  to: string;
  className?: string;
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const activate = () => navigate(to);
  return (
    <div
      role="link"
      tabIndex={0}
      onClick={activate}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); } }}
      className={className}
    >
      {children}
    </div>
  );
}

function Badge({ icon, colorClass, label, tooltip }: { icon: React.ReactNode; colorClass: string; label: string; tooltip: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-flex">
      <span
        role="button"
        aria-label={label}
        tabIndex={0}
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(o => !o); }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className={`inline-flex items-center justify-center cursor-help ${colorClass}`}
      >
        {icon}
      </span>
      {open && (
        <span className="absolute z-20 right-0 top-full mt-1 whitespace-nowrap px-2 py-1 rounded bg-popover text-popover-foreground text-xs border shadow">
          {tooltip}
        </span>
      )}
    </span>
  );
}

function VerifiedBadge() {
  return <Badge icon={<BadgeCheck className="h-4 w-4" />} colorClass="text-green-500" label="Verified" tooltip="This was checked by a tutor or module organiser" />;
}

function UnfinishedBadge() {
  return <Badge icon={<Construction className="h-4 w-4" />} colorClass="text-amber-500" label="Unfinished" tooltip="This resource is still being worked on" />;
}

function Badges({ verified, unfinished }: { verified?: boolean; unfinished?: boolean }) {
  if (!verified && !unfinished) return null;
  return (
    <span className="absolute z-10 top-2 right-2 inline-flex items-center gap-1">
      {unfinished && <UnfinishedBadge />}
      {verified && <VerifiedBadge />}
    </span>
  );
}

export const ModulePage = () => {
  const { code } = useParams();
  const [mod, setMod] = useState<any>(null);
  const [people, setPeople] = useState<Record<string, any>>({});
  const [noteCredits, setNoteCredits] = useState<Record<string, string[]>>({});
  const [solutionCredits, setSolutionCredits] = useState<Record<string, string[]>>({});
  const [quizCredits, setQuizCredits] = useState<Record<string, string[]>>({});

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
    fetch("/api/credits")
      .then(res => res.json())
      .then((data: { dev?: any[]; content?: any[] }) => {
        // People come grouped (dev / content); flatten to an id→person map
        // since credit lookups are by author id, not group.
        const byId: Record<string, any> = {};
        for (const p of data.dev ?? []) byId[p.id] = p;
        for (const p of data.content ?? []) byId[p.id] = p;
        setPeople(byId);
      });
    fetch("/api/credits/notes").then(res => res.json()).then(setNoteCredits);
    fetch("/api/credits/solutions").then(res => res.json()).then(setSolutionCredits);
    fetch("/api/credits/quizzes").then(res => res.json()).then(setQuizCredits);
  }, []);

  useEffect(() => {
    if (mod) document.title = `${mod.code} Notes`;
  }, [mod]);

  if (!mod) return <Page>Loading module...</Page>;

  // For any resource URL (/resources/<Category>/<Code>/<Filename>), match the
  // filename against a credits dict whose keys are filenames (with extension).
  function getContributors(
    credits: Record<string, string[]>,
    resourceUrl: string,
  ): string[] {
    const basename = resourceUrl.split('/').pop() ?? '';
    for (const [filename, authors] of Object.entries(credits)) {
      if (filename.replace(/\.[^.]+$/, '') === basename) return authors as string[];
    }
    return [];
  }

  function Contributors({ authorIds }: { authorIds: string[] }) {
    if (authorIds.length === 0) return null;
    return (
      <span className="block mt-1">
        <em className="text-xs text-muted-foreground not-italic">Created by </em>
        {authorIds.map((authorId, i) => (
          <span key={authorId}>
            {i > 0 && <em className="text-xs text-muted-foreground">, </em>}
            <Link
              to={`/acknowledgements#${authorId}`}
              // Prevent the outer ResourceCard from also navigating.
              onClick={e => e.stopPropagation()}
              className="text-xs italic text-muted-foreground hover:text-primary transition-colors hover:underline"
            >
              {people[authorId]?.name ?? authorId}
            </Link>
          </span>
        ))}
      </span>
    );
  }

  return (
    <Page>
      <PageHeader
        title={mod.code}
        subtitle={mod.name}
        back={{ to: `/year/${mod.year}`, label: `Year ${mod.year}` }}
      />
      <div className="flex gap-4 -mt-4 mb-2">
        {mod.Term && <span className="text-sm font-medium text-detail">Term {mod.Term}</span>}
        {mod.CATS && <span className="text-sm font-medium text-detail">{mod.CATS} CATS</span>}
      </div>
      <p className="italic my-4">{mod.tagline}</p>
      {mod.description && <p className="mb-4">{mod.description}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border p-4 rounded">
          <h5 className="font-bold mb-2">Notes</h5>
          {mod.notes?.map((note: any) => {
            if (note.url === '#') {
              return (
                <div key={note.title} className="mb-2 p-3 border rounded opacity-50 text-sm">
                  {note.title}
                </div>
              );
            }
            return (
              <ResourceCard key={note.title} to={note.url} className="relative block mb-2 p-3 border rounded text-sm hover:bg-muted transition-colors cursor-pointer">
                {note.title}
                <Badges verified={note.verified} unfinished={note.unfinished} />
                <Contributors authorIds={getContributors(noteCredits, note.url)} />
              </ResourceCard>
            );
          })}
        </div>
        <div className="border p-4 rounded">
          <h5 className="font-bold mb-2">Past Papers</h5>
          <div className="space-y-2">
            {mod.past_papers?.map((paper: any) => {
              const solutionUrl = paper.solution?.url;
              const solutionContributors = solutionUrl ? getContributors(solutionCredits, solutionUrl) : [];
              const solutionIsInternal = solutionUrl?.startsWith('/resources/Solutions/');
              return (
                <div key={paper.title} className="grid grid-cols-2 gap-2">
                  <a
                    href={paper.url}
                    className="relative block p-3 border rounded bg-card hover:bg-muted hover:border-primary transition-colors text-center text-sm font-medium"
                  >
                    {paper.title}
                    <Badges verified={paper.verified} unfinished={paper.unfinished} />
                  </a>
                  {solutionIsInternal ? (
                    <ResourceCard
                      to={solutionUrl}
                      className="relative block p-3 border rounded bg-card text-center text-sm font-medium hover:bg-muted hover:border-primary transition-colors cursor-pointer"
                    >
                      Solution
                      <Badges verified={paper.solution?.verified} unfinished={paper.solution?.unfinished} />
                      <Contributors authorIds={solutionContributors} />
                    </ResourceCard>
                  ) : (
                    <a
                      href={solutionUrl || "#"}
                      className={`relative block p-3 border rounded bg-card text-center text-sm font-medium ${solutionUrl ? "hover:bg-muted hover:border-primary transition-colors" : "opacity-50 cursor-not-allowed"}`}
                    >
                      Solution
                      <Badges verified={paper.solution?.verified} unfinished={paper.solution?.unfinished} />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {mod.exercise_solutions?.length > 0 && (
        <div className="mt-4 border p-4 rounded">
          <h5 className="font-bold mb-2">Exercise Solutions</h5>
          <div className="space-y-2">
            {mod.exercise_solutions.map((exercise: any) => {
              const solutionUrl = exercise.solution?.url;
              const solutionContributors = solutionUrl ? getContributors(solutionCredits, solutionUrl) : [];
              const solutionIsInternal = solutionUrl?.startsWith('/resources/Solutions/');
              return (
                <div key={exercise.title} className="grid grid-cols-2 gap-2">
                  <a
                    href={exercise.url}
                    className="relative block p-3 border rounded bg-card hover:bg-muted hover:border-primary transition-colors text-center text-sm font-medium"
                  >
                    {exercise.title}
                    <Badges verified={exercise.verified} unfinished={exercise.unfinished} />
                  </a>
                  {solutionIsInternal ? (
                    <ResourceCard
                      to={solutionUrl}
                      className="relative block p-3 border rounded bg-card text-center text-sm font-medium hover:bg-muted hover:border-primary transition-colors cursor-pointer"
                    >
                      Solution
                      <Badges verified={exercise.solution?.verified} unfinished={exercise.solution?.unfinished} />
                      <Contributors authorIds={solutionContributors} />
                    </ResourceCard>
                  ) : (
                    <a
                      href={solutionUrl || "#"}
                      className={`relative block p-3 border rounded bg-card text-center text-sm font-medium ${solutionUrl ? "hover:bg-muted hover:border-primary transition-colors" : "opacity-50 cursor-not-allowed"}`}
                    >
                      Solution
                      <Badges verified={exercise.solution?.verified} unfinished={exercise.solution?.unfinished} />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {mod.quizzes?.length > 0 && (
        <div className="mt-4 border p-4 rounded">
          <h5 className="font-bold mb-2">Quizzes</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {mod.quizzes.map((quiz: any) => (
              <ResourceCard
                key={quiz.title}
                to={quiz.url}
                className="relative block p-3 border rounded bg-surface text-surface-foreground text-sm font-medium hover:brightness-110 transition cursor-pointer"
              >
                {quiz.title}
                <Contributors authorIds={getContributors(quizCredits, quiz.url)} />
              </ResourceCard>
            ))}
          </div>
        </div>
      )}

      {mod.external_resources?.length > 0 && (
        <div className="mt-4 border p-4 rounded">
          <h5 className="font-bold mb-2">External Resources</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {mod.external_resources.map((r: any) => {
              const body = (
                <>
                  <div className="font-medium">{r.name}</div>
                  {r.description && <p className="text-xs text-muted-foreground mt-1">{r.description}</p>}
                </>
              );
              return r.url ? (
                <a
                  key={r.name}
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block p-3 border rounded bg-surface text-surface-foreground text-sm hover:brightness-110 transition"
                >
                  {body}
                </a>
              ) : (
                <div key={r.name} className="block p-3 border rounded bg-surface text-surface-foreground text-sm">
                  {body}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {mod.extras?.length > 0 && (
        <div className="mt-4 border p-4 rounded">
          <h5 className="font-bold mb-2">Extras</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {mod.extras.map((extra: any) => (
              <Link
                key={extra.title}
                to={extra.url}
                className="relative block p-3 border rounded bg-surface text-surface-foreground text-sm font-medium hover:brightness-110 transition"
              >
                {extra.title}
                <Badges verified={extra.verified} unfinished={extra.unfinished} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </Page>
  );
};
