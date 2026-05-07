import { useState } from "react"
import { Info } from "lucide-react"
import type { AiSummaryState } from "@/lib/use-ai-summary"

/** Inline info badge whose body shows on hover (mouse) or click/Enter
 *  (keyboard/touch). Used to label the AI summary panel. */
export function InfoTooltip({ text }: { text: string }) {
  const [open, setOpen] = useState(false)
  return (
    <span className="relative inline-flex">
      <span
        role="button"
        tabIndex={0}
        aria-label={text}
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            setOpen((o) => !o)
          }
        }}
        className="inline-flex cursor-help items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
      >
        <Info className="h-4 w-4" />
      </span>
      {open && (
        <span className="absolute top-full left-0 z-20 mt-1 rounded border bg-popover px-2 py-1 text-xs whitespace-nowrap text-popover-foreground shadow">
          {text}
        </span>
      )}
    </span>
  )
}

/** Renders the four non-trivial states of the AI summary. The `no-reviews`
 *  state intentionally renders nothing so callers can show their own
 *  "no reviews" copy elsewhere. Pass `bordered={false}` when the panel is
 *  embedded inside another card to avoid nested boxes. */
export function AiSummaryPanel({
  state,
  bordered = true,
}: {
  state: AiSummaryState
  bordered?: boolean
}) {
  if (state.kind === "no-reviews") return null
  const wrapperClass = bordered
    ? "border rounded-lg p-4 bg-surface text-surface-foreground mb-6"
    : "mt-3"

  if (state.kind === "loading") {
    return (
      <div className={wrapperClass}>
        <p className="text-sm text-muted-foreground italic">
          Generating AI summary...
        </p>
      </div>
    )
  }
  if (state.kind === "unavailable") {
    return (
      <div className={wrapperClass}>
        <p className="text-sm text-muted-foreground italic">
          Review summary not available.
        </p>
      </div>
    )
  }
  if (state.kind === "error") {
    return (
      <div className={wrapperClass}>
        <p className="text-sm text-muted-foreground italic">
          Couldn't load AI summary.
        </p>
      </div>
    )
  }
  return (
    <div className={wrapperClass}>
      <div className="mb-2 flex items-center gap-2">
        <h2 className="text-sm font-semibold">Summary</h2>
        <InfoTooltip text="This is an AI summary" />
      </div>
      <p className="text-sm whitespace-pre-wrap">{state.text}</p>
    </div>
  )
}
