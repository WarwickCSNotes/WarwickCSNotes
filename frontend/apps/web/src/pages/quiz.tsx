import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { QuizRunner, type Question } from "@/components/quiz-runner"
import { InstaCheckToggle } from "@/components/insta-check-toggle"
import { Page } from "@/components/page"
import { PageHeader } from "@/components/page-header"
import { useInstaCheck } from "@/lib/use-insta-check"

type Quiz = {
  title: string
  module?: string
  description?: string
  questions: Question[]
}

export const QuizPage = () => {
  const { id } = useParams()
  const [state, setState] = useState<{
    id?: string
    quiz: Quiz | null
    error: boolean
  }>({ quiz: null, error: false })
  const [instaCheck] = useInstaCheck()

  useEffect(() => {
    fetch(`/api/quizzes/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("not found")
        return res.json() as Promise<Quiz>
      })
      .then((quiz) => setState({ id, quiz, error: false }))
      .catch(() => setState({ id, quiz: null, error: true }))
  }, [id])

  useEffect(() => {
    if (state.quiz) document.title = `${state.quiz.title} Quiz`
  }, [state.quiz])

  if (state.id !== id) return <Page>Loading quiz...</Page>
  if (state.error) return <Page>Quiz not found.</Page>
  if (!state.quiz) return <Page>Loading quiz...</Page>

  const backTo = state.quiz.module ? `/module/${state.quiz.module}` : `/quizzes`
  const backLabel = state.quiz.module ?? "All quizzes"

  return (
    <Page>
      <PageHeader
        title={state.quiz.title}
        subtitle={state.quiz.module}
        back={{ to: backTo, label: backLabel }}
      >
        <InstaCheckToggle />
      </PageHeader>
      {state.quiz.description && (
        <p className="mt-2 mb-6 text-muted-foreground">
          {state.quiz.description}
        </p>
      )}

      <QuizRunner questions={state.quiz.questions} instaCheck={instaCheck} />
    </Page>
  )
}
