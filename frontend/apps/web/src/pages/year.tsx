import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { ChevronRight } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { Page } from "@/components/page"
import { PageHeader } from "@/components/page-header"
import { DcsModuleLink } from "@/components/dcs-module-link"

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

type ModuleEntry = [string, YearModule]

/** A module's Term is a slash-separated list of term numbers — "1", "2",
 *  "1/2/3". */
function termsOf(term: string | number | undefined): string[] {
  return String(term ?? "")
    .split("/")
    .map((t) => t.trim())
    .filter(Boolean)
}

/** Group modules by term, listing a module that spans several terms once under
 *  each of them, so a section is the complete set of modules running in that
 *  term rather than only the ones running *solely* in it.
 *
 *  Anything with no usable term still gets a home, so a module can never
 *  silently vanish from the page because of a malformed field. */
function groupByTerm(
  modules: Record<string, YearModule>
): { key: string; title: string; modules: ModuleEntry[] }[] {
  const OTHER = "other"
  const groups = new Map<string, ModuleEntry[]>()

  for (const entry of Object.entries(modules)) {
    const terms = termsOf(entry[1].Term)
    for (const term of terms.length > 0 ? terms : [OTHER]) {
      const bucket = groups.get(term)
      if (bucket) bucket.push(entry)
      else groups.set(term, [entry])
    }
  }

  const sections = [...groups.keys()]
    .filter((key) => key !== OTHER)
    .sort((a, b) => {
      const [na, nb] = [Number(a), Number(b)]
      if (Number.isNaN(na) || Number.isNaN(nb)) return a.localeCompare(b)
      return na - nb
    })
    .map((key) => ({ key, title: `Term ${key}`, modules: groups.get(key)! }))

  const other = groups.get(OTHER)
  if (other) sections.push({ key: OTHER, title: "Other", modules: other })

  return sections
}

/** Emphasis markers would show up literally in a `title` tooltip, which takes
 *  plain text rather than the markdown the tagline is authored in. */
function plainText(markdown: string): string {
  return markdown.replace(/[*_`]/g, "")
}

/** Shared by the column headings and every row, so the two can't drift apart.
 *  Below `md` the row falls back to stacked blocks and this doesn't apply. */
const LEDGER_COLUMNS =
  "md:grid md:grid-cols-[5rem_minmax(13rem,1.35fr)_minmax(0,1.4fr)_4.5rem_5rem_2.75rem_1rem] md:items-center md:gap-4"

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

  const sections = groupByTerm(data.modules)

  return (
    <Page>
      <PageHeader title={data.title} />
      <div className="space-y-8">
        {sections.map(({ key, title, modules }) => (
          <section key={key}>
            <h2 className="mb-3 text-2xl font-semibold">{title}</h2>

            <div
              className={`hidden border-b px-3 pb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase ${LEDGER_COLUMNS}`}
            >
              <span>Code</span>
              <span>Module</span>
              <span>Tagline</span>
              <span>Term</span>
              <span>Credits</span>
              <span>DCS</span>
              <span />
            </div>

            <div>
              {modules.map(([code, mod]) => (
                // The row is a plain grid so the columns line up with the
                // headings above; the link is stretched across it rather than
                // wrapping it, because the DCS link inside can't be nested in
                // another anchor.
                <div
                  key={code}
                  className={`group relative cursor-pointer border-b px-3 py-3 transition-colors hover:bg-surface-hover md:py-2.5 ${LEDGER_COLUMNS}`}
                >
                  <Link
                    to={`/module/${code}`}
                    className="absolute inset-0 rounded-sm focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
                  >
                    <span className="sr-only">
                      {code} {mod.name}
                    </span>
                  </Link>

                  {/* `md:contents` drops these wrappers on wide screens so
                      their children become grid cells in their own right,
                      while still sitting inline on a narrow one. */}
                  <div className="flex items-baseline gap-2 md:contents">
                    <span className="text-sm font-semibold text-primary">
                      {code}
                    </span>
                    <span
                      className="font-medium group-hover:underline md:truncate"
                      title={mod.name}
                    >
                      {mod.name}
                      {year === "4" && (
                        <span
                          className="ml-2 leading-none select-none"
                          title="Under construction"
                          aria-label="Under construction"
                        >
                          🚧
                        </span>
                      )}
                    </span>
                  </div>

                  {/* Truncated rather than wrapped so every row stays the same
                      height; the full text is on the tooltip. */}
                  <span
                    className="mt-0.5 block text-sm text-muted-foreground md:mt-0 md:truncate"
                    title={plainText(mod.tagline ?? "")}
                  >
                    <InlineMarkdown>{mod.tagline ?? ""}</InlineMarkdown>
                  </span>

                  <div className="mt-1 flex gap-3 text-xs font-medium text-detail md:mt-0 md:contents">
                    <span>{mod.Term ? `Term ${mod.Term}` : ""}</span>
                    <span>{mod.CATS ? `${mod.CATS} CATS` : ""}</span>
                  </div>

                  <DcsModuleLink
                    code={code}
                    className="absolute top-3 right-3 z-10 h-6 w-6 md:static md:justify-self-start"
                  />

                  {/* The row's only at-rest sign that it goes anywhere. The
                      DCS icon can't do that job — it points off-site, so on
                      its own it implies the row leads to Warwick's page. */}
                  <ChevronRight
                    aria-hidden="true"
                    className="hidden h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground md:block"
                  />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </Page>
  )
}
