import { useEffect, useState } from "react"
import { Page } from "@/components/page"
import { PageHeader } from "@/components/page-header"
import { SurfaceLink } from "@/components/surface"

type QuizMeta = {
  id: string
  title: string
  module?: string
  description?: string
}

export const QuizzesPage = () => {
  const [quizzes, setQuizzes] = useState<QuizMeta[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = "Quizzes"
  }, [])

  useEffect(() => {
    fetch("/api/quizzes")
      .then((res) => res.json())
      .then((data: QuizMeta[]) => {
        setQuizzes(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  // Group by module for nicer browsing
  const byModule: Record<string, QuizMeta[]> = {}
  for (const q of quizzes) {
    const key = q.module ?? "Other"
    if (!byModule[key]) byModule[key] = []
    byModule[key].push(q)
  }
  const moduleKeys = Object.keys(byModule).sort()

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

      {moduleKeys.map((mod) => (
        <section key={mod} className="mb-8">
          <h2 className="mb-3 text-2xl font-semibold">{mod}</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {byModule[mod]!.map((q) => (
              <SurfaceLink key={q.id} to={`/quizzes/${q.id}`} className="p-4">
                <h3 className="font-semibold">{q.title}</h3>
                {q.description && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {q.description}
                  </p>
                )}
              </SurfaceLink>
            ))}
          </div>
        </section>
      ))}
    </Page>
  )
}
