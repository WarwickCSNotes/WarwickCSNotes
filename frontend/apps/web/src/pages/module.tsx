import { useParams, Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { BadgeCheck, Construction } from "lucide-react"
import { Page } from "@/components/page"
import { PageHeader } from "@/components/page-header"
import { AiSummaryPanel } from "@/components/ai-summary"
import { useAiSummary } from "@/lib/use-ai-summary"
import {
  Panel,
  Pill,
  SurfaceAnchor,
  SurfaceCard,
  SurfaceLink,
} from "@/components/surface"
import {
  disabledCompactTileClass,
  interactiveCompactTileClass,
} from "@/components/surface-styles"
import { cn } from "@workspace/ui/lib/utils"

type CreditPerson = { id: string; name?: string }
type CreditsResponse = { dev?: CreditPerson[]; content?: CreditPerson[] }
type ResourceEntry = {
  title: string
  url: string
  verified?: boolean
  unfinished?: boolean
}
type SolutionEntry = {
  url?: string
  verified?: boolean
  unfinished?: boolean
}
type PaperEntry = ResourceEntry & { solution?: SolutionEntry }
type ExternalResource = {
  name: string
  url?: string
  description?: string
}
type ReviewSummary = {
  count: number
  average: Record<string, number>
}
type ModuleData = {
  code: string
  name: string
  year: string | number
  Term?: string | number
  CATS?: string | number
  tagline?: string
  description?: string
  notes?: ResourceEntry[]
  past_papers?: PaperEntry[]
  exercise_solutions?: PaperEntry[]
  quizzes?: ResourceEntry[]
  external_resources?: ExternalResource[]
  extras?: ResourceEntry[]
  review_summary?: ReviewSummary
}

/** Link-like card that can safely contain other interactive children
 *  (e.g. author links). Implemented as a div + onClick to avoid nesting
 *  <a> inside <a>. Inner links should call e.stopPropagation() to prevent
 *  double navigation. */
function ResourceCard({
  to,
  className,
  children,
}: {
  to: string
  className?: string
  children: React.ReactNode
}) {
  const navigate = useNavigate()
  const activate = () => navigate(to)
  return (
    <div
      role="link"
      tabIndex={0}
      onClick={activate}
      onKeyDown={(e) => {
        if (e.target !== e.currentTarget) return
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          activate()
        }
      }}
      className={className}
    >
      {children}
    </div>
  )
}

function Badge({
  icon,
  colorClass,
  label,
  tooltip,
}: {
  icon: React.ReactNode
  colorClass: string
  label: string
  tooltip: string
}) {
  const [open, setOpen] = useState(false)
  return (
    <span className="relative inline-flex">
      <span
        role="button"
        aria-label={label}
        tabIndex={0}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setOpen((o) => !o)
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className={`inline-flex cursor-help items-center justify-center ${colorClass}`}
      >
        {icon}
      </span>
      {open && (
        <span className="absolute top-full right-0 z-20 mt-1 rounded border bg-popover px-2 py-1 text-xs whitespace-nowrap text-popover-foreground shadow">
          {tooltip}
        </span>
      )}
    </span>
  )
}

function VerifiedBadge() {
  return (
    <Badge
      icon={<BadgeCheck className="h-4 w-4" />}
      colorClass="text-green-500"
      label="Verified"
      tooltip="This was checked by a tutor or module organiser"
    />
  )
}

function UnfinishedBadge() {
  return (
    <Badge
      icon={<Construction className="h-4 w-4" />}
      colorClass="text-amber-500"
      label="Unfinished"
      tooltip="This resource is still being worked on"
    />
  )
}

function Badges({
  verified,
  unfinished,
}: {
  verified?: boolean
  unfinished?: boolean
}) {
  if (!verified && !unfinished) return null
  return (
    <span className="absolute top-2 right-2 z-10 inline-flex items-center gap-1">
      {unfinished && <UnfinishedBadge />}
      {verified && <VerifiedBadge />}
    </span>
  )
}

export const ModulePage = () => {
  const { code } = useParams()
  const [mod, setMod] = useState<ModuleData | null>(null)
  const [people, setPeople] = useState<Record<string, CreditPerson>>({})
  const [noteCredits, setNoteCredits] = useState<Record<string, string[]>>({})
  const [solutionCredits, setSolutionCredits] = useState<
    Record<string, string[]>
  >({})
  const [quizCredits, setQuizCredits] = useState<Record<string, string[]>>({})
  const aiSummary = useAiSummary(code)

  useEffect(() => {
    fetch(`/api/module/${code}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found")
        return res.json()
      })
      .then((mod: ModuleData) => {
        setMod(mod)
        localStorage.setItem("last-year", String(mod.year))
      })
  }, [code])

  useEffect(() => {
    fetch("/api/credits")
      .then((res) => res.json())
      .then((data: CreditsResponse) => {
        // People come grouped (dev / content); flatten to an id→person map
        // since credit lookups are by author id, not group.
        const byId: Record<string, CreditPerson> = {}
        for (const p of data.dev ?? []) byId[p.id] = p
        for (const p of data.content ?? []) byId[p.id] = p
        setPeople(byId)
      })
    fetch("/api/credits/notes")
      .then((res) => res.json())
      .then(setNoteCredits)
    fetch("/api/credits/solutions")
      .then((res) => res.json())
      .then(setSolutionCredits)
    fetch("/api/credits/quizzes")
      .then((res) => res.json())
      .then(setQuizCredits)
  }, [])

  useEffect(() => {
    if (mod) document.title = `${mod.code} Notes`
  }, [mod])

  if (!mod) return <Page>Loading module...</Page>

  // For any resource URL (/resources/<Category>/<Code>/<Filename>), match the
  // filename against a credits dict whose keys are filenames (with extension).
  function getContributors(
    credits: Record<string, string[]>,
    resourceUrl: string
  ): string[] {
    const basename = resourceUrl.split("/").pop() ?? ""
    for (const [filename, authors] of Object.entries(credits)) {
      if (filename.replace(/\.[^.]+$/, "") === basename)
        return authors as string[]
    }
    return []
  }

  function Contributors({ authorIds }: { authorIds: string[] }) {
    if (authorIds.length === 0) return null
    return (
      <span className="mt-1 block">
        <em className="text-xs text-muted-foreground not-italic">
          Created by{" "}
        </em>
        {authorIds.map((authorId, i) => (
          <span key={authorId}>
            {i > 0 && <em className="text-xs text-muted-foreground">, </em>}
            <Link
              to={`/acknowledgements#${authorId}`}
              // Prevent the outer ResourceCard from also navigating.
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
              className="text-xs text-muted-foreground italic transition-colors hover:text-primary hover:underline"
            >
              {people[authorId]?.name ?? authorId}
            </Link>
          </span>
        ))}
      </span>
    )
  }

  const exerciseSolutions = mod.exercise_solutions ?? []
  const quizzes = mod.quizzes ?? []
  const externalResources = mod.external_resources ?? []
  const extras = mod.extras ?? []
  const reviewSummary = mod.review_summary
  const reviewCount = reviewSummary?.count ?? 0

  return (
    <Page>
      <PageHeader
        title={mod.code}
        subtitle={mod.name}
        back={{ to: `/year/${mod.year}`, label: `Year ${mod.year}` }}
      />
      <div className="-mt-4 mb-2 flex gap-4">
        {mod.Term && (
          <span className="text-sm font-medium text-detail">
            Term {mod.Term}
          </span>
        )}
        {mod.CATS && (
          <span className="text-sm font-medium text-detail">
            {mod.CATS} CATS
          </span>
        )}
      </div>
      <p className="my-4 italic">{mod.tagline}</p>
      {mod.description && <p className="mb-4">{mod.description}</p>}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Panel>
          <h5 className="mb-2 font-bold">Notes</h5>
          {mod.notes?.map((note) => {
            if (note.url === "#") {
              return (
                <div
                  key={note.title}
                  className={cn(disabledCompactTileClass, "mb-2")}
                >
                  {note.title}
                </div>
              )
            }
            return (
              <ResourceCard
                key={note.title}
                to={note.url}
                className={cn(
                  interactiveCompactTileClass,
                  "mb-2"
                )}
              >
                {note.title}
                <Badges verified={note.verified} unfinished={note.unfinished} />
                <Contributors
                  authorIds={getContributors(noteCredits, note.url)}
                />
              </ResourceCard>
            )
          })}
        </Panel>
        <Panel>
          <h5 className="mb-2 font-bold">Past Papers</h5>
          <div className="space-y-2">
            {mod.past_papers?.map((paper) => {
              const solutionUrl = paper.solution?.url
              const solutionContributors = solutionUrl
                ? getContributors(solutionCredits, solutionUrl)
                : []
              const solutionIsInternal = solutionUrl?.startsWith(
                "/resources/Solutions/"
              )
              return (
                <div key={paper.title} className="grid grid-cols-2 gap-2">
                  <a
                    href={paper.url}
                    target={paper.url.startsWith("http") ? "_blank" : undefined}
                    rel={
                      paper.url.startsWith("http") ? "noreferrer" : undefined
                    }
                    className={cn(interactiveCompactTileClass, "text-center")}
                  >
                    {paper.title}
                    <Badges
                      verified={paper.verified}
                      unfinished={paper.unfinished}
                    />
                  </a>
                  {solutionUrl && solutionIsInternal ? (
                    <ResourceCard
                      to={solutionUrl}
                      className={cn(interactiveCompactTileClass, "text-center")}
                    >
                      Solution
                      <Badges
                        verified={paper.solution?.verified}
                        unfinished={paper.solution?.unfinished}
                      />
                      <Contributors authorIds={solutionContributors} />
                    </ResourceCard>
                  ) : (
                    <a
                      href={solutionUrl || "#"}
                      target={
                        solutionUrl?.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        solutionUrl?.startsWith("http")
                          ? "noreferrer"
                          : undefined
                      }
                      className={cn(
                        solutionUrl
                          ? interactiveCompactTileClass
                          : disabledCompactTileClass,
                        "text-center"
                      )}
                    >
                      Solution
                      <Badges
                        verified={paper.solution?.verified}
                        unfinished={paper.solution?.unfinished}
                      />
                    </a>
                  )}
                </div>
              )
            })}
          </div>
        </Panel>
      </div>

      {exerciseSolutions.length > 0 && (
        <Panel className="mt-4">
          <h5 className="mb-2 font-bold">Exercise Solutions</h5>
          <div className="space-y-2">
            {exerciseSolutions.map((exercise) => {
              const solutionUrl = exercise.solution?.url
              const solutionContributors = solutionUrl
                ? getContributors(solutionCredits, solutionUrl)
                : []
              const solutionIsInternal = solutionUrl?.startsWith(
                "/resources/Solutions/"
              )
              return (
                <div key={exercise.title} className="grid grid-cols-2 gap-2">
                  <a
                    href={exercise.url}
                    target={
                      exercise.url.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      exercise.url.startsWith("http") ? "noreferrer" : undefined
                    }
                    className={cn(interactiveCompactTileClass, "text-center")}
                  >
                    {exercise.title}
                    <Badges
                      verified={exercise.verified}
                      unfinished={exercise.unfinished}
                    />
                  </a>
                  {solutionUrl && solutionIsInternal ? (
                    <ResourceCard
                      to={solutionUrl}
                      className={cn(interactiveCompactTileClass, "text-center")}
                    >
                      Solution
                      <Badges
                        verified={exercise.solution?.verified}
                        unfinished={exercise.solution?.unfinished}
                      />
                      <Contributors authorIds={solutionContributors} />
                    </ResourceCard>
                  ) : (
                    <a
                      href={solutionUrl || "#"}
                      target={
                        solutionUrl?.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        solutionUrl?.startsWith("http")
                          ? "noreferrer"
                          : undefined
                      }
                      className={cn(
                        solutionUrl
                          ? interactiveCompactTileClass
                          : disabledCompactTileClass,
                        "text-center"
                      )}
                    >
                      Solution
                      <Badges
                        verified={exercise.solution?.verified}
                        unfinished={exercise.solution?.unfinished}
                      />
                    </a>
                  )}
                </div>
              )
            })}
          </div>
        </Panel>
      )}

      {quizzes.length > 0 && (
        <Panel className="mt-4">
          <h5 className="mb-2 font-bold">Quizzes</h5>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {quizzes.map((quiz) => (
              <ResourceCard
                key={quiz.title}
                to={quiz.url}
                className={interactiveCompactTileClass}
              >
                {quiz.title}
                <Badges verified={quiz.verified} unfinished={quiz.unfinished} />
                <Contributors
                  authorIds={getContributors(quizCredits, quiz.url)}
                />
              </ResourceCard>
            ))}
          </div>
        </Panel>
      )}

      {externalResources.length > 0 && (
        <Panel className="mt-4">
          <h5 className="mb-2 font-bold">External Resources</h5>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {externalResources.map((r) => {
              const body = (
                <>
                  <div className="font-medium">{r.name}</div>
                  {r.description && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {r.description}
                    </p>
                  )}
                </>
              )
              return r.url ? (
                <SurfaceAnchor
                  key={r.name}
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 text-sm"
                >
                  {body}
                </SurfaceAnchor>
              ) : (
                <SurfaceCard key={r.name} className="p-3 text-sm">
                  {body}
                </SurfaceCard>
              )
            })}
          </div>
        </Panel>
      )}

      {extras.length > 0 && (
        <Panel className="mt-4">
          <h5 className="mb-2 font-bold">Extras</h5>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {extras.map((extra) => (
              <SurfaceLink
                key={extra.title}
                to={extra.url}
                className="relative p-3 text-sm font-medium"
              >
                {extra.title}
                <Badges
                  verified={extra.verified}
                  unfinished={extra.unfinished}
                />
              </SurfaceLink>
            ))}
          </div>
        </Panel>
      )}

      <Panel className="mt-4">
        <div className="mb-2 flex flex-wrap items-baseline justify-between gap-3">
          <h5 className="font-bold">Reviews</h5>
          {reviewCount > 0 ? (
            <Link
              to={`/reviews/${mod.code}`}
              className="text-sm font-medium text-primary hover:underline"
            >
              See all {reviewCount} review{reviewCount === 1 ? "" : "s"} &rarr;
            </Link>
          ) : (
            <span className="text-sm text-muted-foreground">0 reviews</span>
          )}
        </div>
        {reviewCount > 0 && reviewSummary ? (
          <>
            <div className="flex flex-wrap gap-2">
              {Object.entries(reviewSummary.average).map(([key, val]) => (
                <Pill key={key}>
                  Avg {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
                  <span className="font-semibold">{val}</span>
                </Pill>
              ))}
            </div>
            <AiSummaryPanel state={aiSummary} bordered={false} />
          </>
        ) : (
          <p className="text-sm text-muted-foreground italic">
            No reviews for this module yet.
          </p>
        )}
      </Panel>
    </Page>
  )
}
