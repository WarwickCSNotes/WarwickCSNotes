import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import { Page } from "@/components/page"
import { PageHeader } from "@/components/page-header"
import { AiSummaryPanel } from "@/components/ai-summary"
import { useAiSummary } from "@/lib/use-ai-summary"
import { Pill, SurfaceCard, TextButton } from "@/components/surface"

type ReviewSummary = { count: number; average: Record<string, number> }

type Review = {
  Author?: string
  Title?: string
  AcademicYear?: string
  Reflection: [string, string][]
  Ratings: Record<string, number>
}

type ReviewsResponse = {
  module: string
  page: number
  perPage: number
  total: number
  reviews: Review[]
  summary: ReviewSummary
}

function formatRatingKey(key: string): string {
  return key.charAt(0).toUpperCase() + key.slice(1)
}

/** Stored as the starting calendar year (e.g. "2023"); display as the
 *  full academic-year range "2023-24" since "2023" alone is ambiguous. */
function formatAcademicYear(year: string): string {
  const n = parseInt(year, 10)
  if (Number.isNaN(n)) return year
  return `${n}-${String((n + 1) % 100).padStart(2, "0")}`
}

function MetricBadge({
  label,
  value,
}: {
  label: string
  value: string | number
}) {
  return (
    <SurfaceCard className="px-3 py-2 text-sm">
      <span className="text-muted-foreground">{label}</span>{" "}
      <span className="font-semibold">{value}</span>
    </SurfaceCard>
  )
}

function ReviewCard({ review, idx }: { review: Review; idx: number }) {
  return (
    <SurfaceCard as="article" className="p-4">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-3">
        <div className="flex flex-wrap items-baseline gap-3">
          <h3 className="text-sm font-semibold text-muted-foreground">
            {review.Title ?? `Review #${idx}`}
          </h3>
          {review.Author && (
            <span className="text-xs text-muted-foreground">
              by <span className="font-medium">{review.Author}</span>
            </span>
          )}
          {review.AcademicYear && (
            <span className="text-xs text-muted-foreground italic">
              taken {formatAcademicYear(review.AcademicYear)}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(review.Ratings ?? {}).map(([key, val]) => (
            <Pill key={key} className="bg-background text-foreground">
              {formatRatingKey(key)}:{" "}
              <span className="font-semibold">{val}</span>
            </Pill>
          ))}
        </div>
      </div>
      <dl className="space-y-3">
        {review.Reflection.map(([heading, body], i) => (
          <div key={i}>
            <dt className="text-sm font-medium">{heading}</dt>
            <dd className="mt-1 text-sm whitespace-pre-wrap text-muted-foreground">
              {body}
            </dd>
          </div>
        ))}
      </dl>
    </SurfaceCard>
  )
}

export const ReviewsPage = () => {
  const { code = "" } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1)

  const [state, setState] = useState<{
    key: string
    data: ReviewsResponse | null
    error: boolean
  }>({ key: "", data: null, error: false })
  const aiSummary = useAiSummary(code)
  const requestKey = `${code}:${page}`

  useEffect(() => {
    fetch(`/api/reviews/${code}?page=${page}`)
      .then((res) =>
        res.ok ? (res.json() as Promise<ReviewsResponse>) : Promise.reject()
      )
      .then((data) => setState({ key: requestKey, data, error: false }))
      .catch(() => setState({ key: requestKey, data: null, error: true }))
  }, [code, page, requestKey])

  useEffect(() => {
    document.title = `${code.toUpperCase()} Reviews`
  }, [code])

  if (state.key !== requestKey) return <Page>Loading reviews...</Page>
  if (state.error) return <Page>Reviews not found.</Page>
  if (!state.data) return <Page>Loading reviews...</Page>

  const data = state.data
  const totalPages = Math.max(1, Math.ceil(data.total / data.perPage))
  const goToPage = (p: number) => setSearchParams({ page: String(p) })
  const startIdx = (data.page - 1) * data.perPage + 1

  return (
    <Page>
      <PageHeader
        title={`${data.module} Reviews`}
        subtitle={
          data.summary.count === 0
            ? "No reviews yet."
            : `${data.summary.count} review${data.summary.count === 1 ? "" : "s"}`
        }
        back={{ to: `/module/${code}`, label: code.toUpperCase() }}
      />

      {data.summary.count > 0 && (
        <div className="mb-6 flex flex-wrap gap-3">
          {Object.entries(data.summary.average).map(([key, val]) => (
            <MetricBadge
              key={key}
              label={`Avg ${formatRatingKey(key)}`}
              value={val}
            />
          ))}
        </div>
      )}

      {data.total > 0 && <AiSummaryPanel state={aiSummary} />}

      {data.total === 0 ? (
        <p className="text-muted-foreground">
          There are no reviews for this module yet.
        </p>
      ) : (
        <>
          <div className="space-y-4">
            {data.reviews.map((r, i) => (
              <ReviewCard key={startIdx + i} review={r} idx={startIdx + i} />
            ))}
          </div>

          {totalPages > 1 && (
            <nav
              className="mt-8 flex items-center justify-between"
              aria-label="Pagination"
            >
              <TextButton
                disabled={data.page <= 1}
                onClick={() => goToPage(data.page - 1)}
              >
                &larr; Previous
              </TextButton>
              <span className="text-sm text-muted-foreground">
                Page {data.page} of {totalPages}
              </span>
              <TextButton
                disabled={data.page >= totalPages}
                onClick={() => goToPage(data.page + 1)}
              >
                Next &rarr;
              </TextButton>
            </nav>
          )}
        </>
      )}
    </Page>
  )
}
