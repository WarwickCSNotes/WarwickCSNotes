import { useEffect, useState } from "react";
import { Info } from "lucide-react";

export type AiSummaryState =
  | { kind: "loading" }
  | { kind: "ok"; text: string }
  | { kind: "unavailable" }
  | { kind: "error" }
  | { kind: "no-reviews" };

/** Fetch the AI-generated summary for a module's reviews.
 *  Returns a tagged-union state so callers can render the right placeholder. */
export function useAiSummary(moduleCode: string | undefined): AiSummaryState {
  const [state, setState] = useState<AiSummaryState>({ kind: "loading" });
  useEffect(() => {
    if (!moduleCode) return;
    let cancelled = false;
    setState({ kind: "loading" });
    fetch(`/api/reviews/${moduleCode}/ai-summary`)
      .then(async res => {
        if (cancelled) return null;
        if (res.status === 503) { setState({ kind: "unavailable" }); return null; }
        if (res.status === 404) { setState({ kind: "no-reviews" }); return null; }
        if (!res.ok) { setState({ kind: "error" }); return null; }
        return res.json();
      })
      .then(body => {
        if (cancelled) return;
        if (body && typeof body.summary === "string") {
          setState({ kind: "ok", text: body.summary });
        }
      })
      .catch(() => { if (!cancelled) setState({ kind: "error" }); });
    return () => { cancelled = true; };
  }, [moduleCode]);
  return state;
}

/** Inline info badge whose body shows on hover (mouse) or click/Enter
 *  (keyboard/touch). Used to label the AI summary panel. */
export function InfoTooltip({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-flex">
      <span
        role="button"
        tabIndex={0}
        aria-label={text}
        onClick={() => setOpen(o => !o)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(o => !o); } }}
        className="inline-flex items-center justify-center cursor-help text-muted-foreground hover:text-foreground transition-colors"
      >
        <Info className="h-4 w-4" />
      </span>
      {open && (
        <span className="absolute z-20 left-0 top-full mt-1 whitespace-nowrap px-2 py-1 rounded bg-popover text-popover-foreground text-xs border shadow">
          {text}
        </span>
      )}
    </span>
  );
}

/** Renders the four non-trivial states of the AI summary. The `no-reviews`
 *  state intentionally renders nothing so callers can show their own
 *  "no reviews" copy elsewhere. Pass `bordered={false}` when the panel is
 *  embedded inside another card to avoid nested boxes. */
export function AiSummaryPanel({
  state,
  bordered = true,
}: {
  state: AiSummaryState;
  bordered?: boolean;
}) {
  if (state.kind === "no-reviews") return null;
  const wrapperClass = bordered
    ? "border rounded-lg p-4 bg-surface text-surface-foreground mb-6"
    : "mt-3";

  if (state.kind === "loading") {
    return (
      <div className={wrapperClass}>
        <p className="text-sm text-muted-foreground italic">Generating AI summary...</p>
      </div>
    );
  }
  if (state.kind === "unavailable") {
    return (
      <div className={wrapperClass}>
        <p className="text-sm text-muted-foreground italic">Review summary not available.</p>
      </div>
    );
  }
  if (state.kind === "error") {
    return (
      <div className={wrapperClass}>
        <p className="text-sm text-muted-foreground italic">Couldn't load AI summary.</p>
      </div>
    );
  }
  return (
    <div className={wrapperClass}>
      <div className="flex items-center gap-2 mb-2">
        <h2 className="text-sm font-semibold">Summary</h2>
        <InfoTooltip text="This is an AI summary" />
      </div>
      <p className="text-sm whitespace-pre-wrap">{state.text}</p>
    </div>
  );
}
