import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import { Page } from "@/components/page"
import { PageHeader } from "@/components/page-header"
import { SurfaceLink } from "@/components/surface"

type YearModule = {
  name: string
  tagline?: string
  description?: string
  Term?: string | number
  CATS?: string | number
}

type YearData = {
  title: string
  modules: Record<string, YearModule>
}

type TermGroupKey = "term1" | "term2" | "multiterm"

const TERM_GROUPS: { key: TermGroupKey; title: string }[] = [
  { key: "term1", title: "Term 1" },
  { key: "term2", title: "Term 2" },
  { key: "multiterm", title: "Multiterm" },
]

function termGroup(term: string | number | undefined): TermGroupKey {
  const normalized = String(term ?? "").trim()
  if (normalized === "1") return "term1"
  if (normalized === "2") return "term2"
  return "multiterm"
}

const InlineMarkdown = ({ children }: { children: string }) => (
  <ReactMarkdown
    components={{
      p: ({ children }) => <>{children}</>,
    }}
  >
    {children}
  </ReactMarkdown>
)

export const YearPage = () => {
  const { year } = useParams()
  const [data, setData] = useState<YearData | null>(null)

  useEffect(() => {
    fetch(`/api/year/${year}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        localStorage.setItem("last-year", String(year))
      })
  }, [year])

  useEffect(() => {
    document.title = `Year ${year}`
  }, [year])

  if (!data) return <Page>Loading...</Page>

  const groupedModules = Object.entries(data.modules).reduce<
    Record<TermGroupKey, [string, YearModule][]>
  >(
    (groups, entry) => {
      groups[termGroup(entry[1].Term)].push(entry)
      return groups
    },
    { term1: [], term2: [], multiterm: [] }
  )

  return (
    <Page>
      <PageHeader title={data.title} back={{ to: "/", label: "Dashboard" }} />
      <div className="space-y-8">
        {TERM_GROUPS.map(({ key, title }) => {
          const modules = groupedModules[key]
          if (modules.length === 0) return null

          return (
            <section key={key}>
              <h2 className="mb-3 text-2xl font-semibold">{title}</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {modules.map(([code, mod]) => (
                  <SurfaceLink
                    key={code}
                    to={`/module/${code}`}
                    className="min-h-36 p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <h6 className="text-sm font-semibold text-primary">
                      {code}
                    </h6>
                    <h5 className="font-bold">{mod.name}</h5>
                    <p className="mt-1 text-sm text-muted-foreground">
                      <InlineMarkdown>{mod.tagline ?? ""}</InlineMarkdown>
                    </p>
                    <div className="mt-2 flex gap-3">
                      {mod.Term && (
                        <span className="text-xs font-medium text-detail">
                          Term {mod.Term}
                        </span>
                      )}
                      {mod.CATS && (
                        <span className="text-xs font-medium text-detail">
                          {mod.CATS} CATS
                        </span>
                      )}
                    </div>
                  </SurfaceLink>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </Page>
  )
}
