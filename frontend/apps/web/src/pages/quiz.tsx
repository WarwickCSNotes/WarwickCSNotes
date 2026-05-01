import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

export const QuizPage = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [error, setError] = useState(false);
  const [instaCheck] = useInstaCheck();

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
    if (quiz) document.title = `${quiz.title} Quiz`;
  }, [quiz]);

  if (error) return <Page>Quiz not found.</Page>;
  if (!quiz) return <Page>Loading quiz...</Page>;

  const backTo = quiz.module ? `/module/${quiz.module}` : `/quizzes`;
  const backLabel = quiz.module ?? "All quizzes";

  return (
    <Page>
      <PageHeader
        title={quiz.title}
        subtitle={quiz.module}
        back={{ to: backTo, label: backLabel }}
      >
        <InstaCheckToggle />
      </PageHeader>
      {quiz.description && <p className="text-muted-foreground mt-2 mb-6">{quiz.description}</p>}

      <QuizRunner questions={quiz.questions} instaCheck={instaCheck} />
    </Page>
  );
};
