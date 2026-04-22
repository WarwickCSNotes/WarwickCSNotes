import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { QuizRunner, type Question } from "@/components/quiz-runner";
import { InstaCheckToggle } from "@/components/insta-check-toggle";
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

  if (error) return <div className="container mx-auto p-4">Quiz not found.</div>;
  if (!quiz) return <div className="container mx-auto p-4">Loading quiz...</div>;

  const backTo = quiz.module ? `/module/${quiz.module}` : `/quizzes`;
  const backLabel = quiz.module ?? "All quizzes";

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <Link
          to={backTo}
          className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
        >
          &larr; {backLabel}
        </Link>
        <InstaCheckToggle />
      </div>

      <h1 className="text-3xl font-bold mb-1">{quiz.title}</h1>
      {quiz.module && <p className="text-sm text-muted-foreground">{quiz.module}</p>}
      {quiz.description && <p className="text-muted-foreground mt-2 mb-6">{quiz.description}</p>}

      <QuizRunner questions={quiz.questions} instaCheck={instaCheck} />
    </div>
  );
};
