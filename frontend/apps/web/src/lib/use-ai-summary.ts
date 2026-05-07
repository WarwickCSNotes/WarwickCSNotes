import { useEffect, useState } from "react";

export type AiSummaryState =
  | { kind: "loading"; moduleCode?: string }
  | { kind: "ok"; moduleCode: string; text: string }
  | { kind: "unavailable"; moduleCode: string }
  | { kind: "error"; moduleCode: string }
  | { kind: "no-reviews"; moduleCode: string };

export function useAiSummary(moduleCode: string | undefined): AiSummaryState {
  const [state, setState] = useState<AiSummaryState>({ kind: "loading" });

  useEffect(() => {
    if (!moduleCode) return;
    let cancelled = false;
    fetch(`/api/reviews/${moduleCode}/ai-summary`)
      .then(async res => {
        if (cancelled) return null;
        if (res.status === 503) {
          setState({ kind: "unavailable", moduleCode });
          return null;
        }
        if (res.status === 404) {
          setState({ kind: "no-reviews", moduleCode });
          return null;
        }
        if (!res.ok) {
          setState({ kind: "error", moduleCode });
          return null;
        }
        return res.json() as Promise<{ summary?: unknown }>;
      })
      .then(body => {
        if (cancelled) return;
        if (body && typeof body.summary === "string") {
          setState({ kind: "ok", moduleCode, text: body.summary });
        }
      })
      .catch(() => {
        if (!cancelled) setState({ kind: "error", moduleCode });
      });
    return () => {
      cancelled = true;
    };
  }, [moduleCode]);

  if (moduleCode && state.moduleCode !== moduleCode) return { kind: "loading", moduleCode };
  return state;
}
