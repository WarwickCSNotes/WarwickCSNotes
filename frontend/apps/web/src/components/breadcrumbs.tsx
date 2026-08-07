import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { humanise } from "@/lib/humanise"

export type Crumb = {
  label: string
  /** Omitted for the current page, which renders as plain text. */
  to?: string
}

/** Slug -> display label. Anything not listed falls back to `humanise`. */
const LABELS: Record<string, string> = {
  acknowledgements: "Acknowledgements",
  careers: "Careers",
  "getting-experience": "Getting Experience",
  internships: "Internships",
  "graduate-roles": "Graduate Roles",
  "writing-your-cv": "Writing your CV",
  "interview-prep": "Interview Prep",
  "selling-yourself": "Selling Yourself",
  "linkedin-maxxing": "LinkedIn Maxxing",
  diversity: "Diversity",
  "disability-support": "Disability & Support",
  resources: "Resources",
  "open-source-contributions": "Open Source Contributions",
  quizzes: "Quizzes",
  reviews: "Reviews",
  "class-test": "Class Test",
}

function label(slug: string): string {
  return LABELS[slug] ?? humanise(slug)
}

const HOME: Crumb = { label: "Home", to: "/" }

// A module's year isn't in the URL, so it has to be looked up. Cached per code
// for the session — the same module is revisited constantly while revising.
const yearCache = new Map<string, number>()
const inflight = new Map<string, Promise<void>>()

function useModuleYear(code: string | undefined): number | undefined {
  const key = code?.toUpperCase()
  // The cache is the source of truth and is read during render, so a revisit
  // resolves synchronously. This only forces a re-render once a fetch lands.
  const [, bump] = useState(0)

  useEffect(() => {
    if (!key || yearCache.has(key)) return
    let cancelled = false
    let request = inflight.get(key)
    if (!request) {
      request = fetch(`/api/module/${key}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((mod: { year?: number } | null) => {
          if (mod?.year !== undefined) yearCache.set(key, mod.year)
        })
        .catch(() => {})
        .finally(() => inflight.delete(key))
      inflight.set(key, request)
    }
    request.then(() => {
      if (!cancelled) bump((n) => n + 1)
    })
    return () => {
      cancelled = true
    }
  }, [key])

  return key ? yearCache.get(key) : undefined
}

/** The module crumb, preceded by its year once that's known. */
function moduleTrail(code: string, year: number | undefined): Crumb[] {
  const trail: Crumb[] = [HOME]
  if (year !== undefined) {
    trail.push({ label: `Year ${year}`, to: `/year/${year}` })
  }
  trail.push({ label: code.toUpperCase(), to: `/module/${code.toUpperCase()}` })
  return trail
}

/** Pages whose parent isn't their URL parent. `/diversity` lives under
 *  Resources, not at the top level, and the careers guides sit under Careers. */
const PARENT: Record<string, Crumb> = {
  diversity: { label: "Resources", to: "/resources" },
  "disability-support": { label: "Resources", to: "/resources" },
}

function buildTrail(pathname: string, moduleYear: number | undefined): Crumb[] {
  const seg = pathname.split("/").filter(Boolean)

  if (seg.length === 0) return [{ label: "Home" }]

  // /year/:year
  if (seg[0] === "year" && seg[1]) {
    return [HOME, { label: `Year ${seg[1]}` }]
  }

  // /module/:code
  if (seg[0] === "module" && seg[1]) {
    const trail = moduleTrail(seg[1], moduleYear)
    delete trail[trail.length - 1]!.to
    return trail
  }

  // /resources/:category/:code/:filename — a note or solution
  if (seg[0] === "resources" && seg.length === 4) {
    const [, category, code, filename] = seg as [string, string, string, string]
    return [
      ...moduleTrail(code, moduleYear),
      { label: label(category), to: `/module/${code.toUpperCase()}` },
      { label: humanise(filename) },
    ]
  }

  // /reviews/:code
  if (seg[0] === "reviews" && seg[1]) {
    return [
      ...moduleTrail(seg[1], moduleYear),
      { label: "Reviews" },
    ]
  }

  // /quizzes/:id — ids are prefixed with the module code, e.g. cs130-sets
  if (seg[0] === "quizzes" && seg[1]) {
    const title = humanise(seg[1].replace(/^cs\d+-/i, ""))
    return [HOME, { label: "Quizzes", to: "/quizzes" }, { label: title }]
  }

  // /tools/CS133/class-test
  if (seg[0] === "tools" && seg.length === 3) {
    const [, code, tool] = seg as [string, string, string]
    return [
      ...moduleTrail(code, moduleYear),
      { label: label(tool) },
    ]
  }

  // Everything else: walk the path, honouring any re-parented page.
  const trail: Crumb[] = [HOME]
  const reparent = PARENT[seg[0]!]
  if (reparent) trail.push(reparent)

  seg.forEach((s, i) => {
    const isLast = i === seg.length - 1
    const to = "/" + seg.slice(0, i + 1).join("/")
    trail.push(isLast ? { label: label(s) } : { label: label(s), to })
  })

  return trail
}

/** The code whose year we need for this route, if any. */
function moduleCodeFor(pathname: string): string | undefined {
  const seg = pathname.split("/").filter(Boolean)
  if (seg[0] === "module" && seg[1]) return seg[1]
  if (seg[0] === "reviews" && seg[1]) return seg[1]
  if (seg[0] === "resources" && seg.length === 4) return seg[2]
  if (seg[0] === "tools" && seg.length === 3) return seg[1]
  return undefined
}

/** Rendered by `Page`, so it sits in exactly the same spot on every route —
 *  including home, where it's the single "Home" crumb.
 *
 *  The row has a fixed height on purpose: the module year arrives from a fetch
 *  a moment after first paint, and without a reserved line the whole page would
 *  shift down as the crumb appears. */
export function Breadcrumbs() {
  const { pathname } = useLocation()
  const year = useModuleYear(moduleCodeFor(pathname))
  const crumbs = buildTrail(pathname, year)

  return (
    <nav aria-label="Breadcrumb" className="mb-4 flex h-6 items-center">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {crumbs.map((crumb, i) => (
          <li key={`${crumb.label}-${i}`} className="flex items-center gap-1.5">
            {i > 0 && (
              <span aria-hidden="true" className="text-muted-foreground/50">
                /
              </span>
            )}
            {crumb.to ? (
              <Link
                to={crumb.to}
                className="rounded-sm text-muted-foreground underline-offset-2 transition-colors hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {crumb.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-foreground">
                {crumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
