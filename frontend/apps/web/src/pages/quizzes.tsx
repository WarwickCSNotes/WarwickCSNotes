import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Page } from "@/components/page";
import { PageHeader } from "@/components/page-header";

type QuizMeta = {
  id: string;
  title: string;
  module?: string;
  description?: string;
};

export const QuizzesPage = () => {
  const [quizzes, setQuizzes] = useState<QuizMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { document.title = "Quizzes"; }, []);

  useEffect(() => {
    fetch("/api/quizzes")
      .then(res => res.json())
      .then((data: QuizMeta[]) => { setQuizzes(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  // Group by module for nicer browsing
  const byModule: Record<string, QuizMeta[]> = {};
  for (const q of quizzes) {
    const key = q.module ?? "Other";
    if (!byModule[key]) byModule[key] = [];
    byModule[key].push(q);
  }
  const moduleKeys = Object.keys(byModule).sort();

  return (
    <Page>
      <PageHeader
        title="Quizzes"
        subtitle="Practice quizzes across modules. Pick one and test yourself."
        back={{ to: "/", label: "Dashboard" }}
      />

      {loading && <p>Loading...</p>}

      {!loading && quizzes.length === 0 && (
        <p className="text-muted-foreground">No quizzes available yet.</p>
      )}

      {moduleKeys.map(mod => (
        <section key={mod} className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">{mod}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {byModule[mod]!.map(q => (
              <Link
                key={q.id}
                to={`/quizzes/${q.id}`}
                className="block p-4 bg-surface text-surface-foreground border rounded-lg hover:brightness-110 transition"
              >
                <h3 className="font-semibold">{q.title}</h3>
                {q.description && (
                  <p className="text-sm text-muted-foreground mt-1">{q.description}</p>
                )}
              </Link>
            ))}
          </div>
        </section>
      ))}
    </Page>
  );
};
