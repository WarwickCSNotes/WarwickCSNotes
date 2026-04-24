import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { QuizRunner, type Question } from "@/components/quiz-runner";
import { InstaCheckToggle } from "@/components/insta-check-toggle";
import { Page } from "@/components/page";
import { PageHeader } from "@/components/page-header";
import { useInstaCheck } from "@/lib/use-insta-check";

type Quiz = {
  title: string;
  module?: string;
  description?: string;
  questions: Question[];
};

type Person = { name: string };

export const QuizPage = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [error, setError] = useState(false);
  const [instaCheck] = useInstaCheck();
  const [people, setPeople] = useState<Record<string, Person>>({});
  const [credits, setCredits] = useState<Record<string, string[]>>({});

  useEffect(() => {
    setQuiz(null);
    setError(false);
    fetch(`/api/quizzes/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("not found");
        return res.json();
      })
      .then(setQuiz)
      .catch(() => setError(true));
  }, [id]);

  useEffect(() => {
    fetch("/api/credits")
      .then(res => res.json())
      .then((data: { dev?: { id: string; name: string }[]; content?: { id: string; name: string }[] }) => {
        const byId: Record<string, Person> = {};
        for (const p of data.dev ?? []) byId[p.id] = { name: p.name };
        for (const p of data.content ?? []) byId[p.id] = { name: p.name };
        setPeople(byId);
      });
    fetch("/api/credits/quizzes").then(res => res.json()).then(setCredits);
  }, []);

  useEffect(() => {
    if (quiz) document.title = `${quiz.title} Quiz`;
  }, [quiz]);

  if (error) return <Page>Quiz not found.</Page>;
  if (!quiz) return <Page>Loading quiz...</Page>;

  const backTo = quiz.module ? `/module/${quiz.module}` : `/quizzes`;
  const backLabel = quiz.module ?? "All quizzes";

  const authors = credits[`${id}.json`] ?? [];

  return (
    <Page>
      <PageHeader
        title={quiz.title}
        subtitle={quiz.module}
        back={{ to: backTo, label: backLabel }}
      >
        <InstaCheckToggle />
      </PageHeader>
      {authors.length > 0 && (
        <p className="text-xs text-muted-foreground italic -mt-4">
          Created by{" "}
          {authors.map((authorId, idx) => (
            <span key={authorId}>
              {idx > 0 && ", "}
              <Link
                to={`/acknowledgements#${authorId}`}
                className="hover:text-primary hover:underline transition-colors"
              >
                {people[authorId]?.name ?? authorId}
              </Link>
            </span>
          ))}
        </p>
      )}
      {quiz.description && <p className="text-muted-foreground mt-2 mb-6">{quiz.description}</p>}

      <QuizRunner questions={quiz.questions} instaCheck={instaCheck} />
    </Page>
  );
};
