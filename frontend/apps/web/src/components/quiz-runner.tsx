import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

/** Renders a short piece of text with inline markdown + LaTeX (via $...$).
 *  No block wrapping, so it can sit inside buttons, labels, option rows. */
function InlineRendered({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        // Strip the default <p> wrapper so this stays inline.
        p: ({ children }) => <>{children}</>,
      }}
    >
      {children}
    </ReactMarkdown>
  );
}

export type TextQuestion = {
  type: "text";
  prompt: string;
  accepted: string[];
};

export type CheckboxQuestion = {
  type: "checkbox";
  prompt: string;
  options: string[];
  correct: number[];
};

export type MatchQuestion = {
  type: "match";
  prompt: string;
  left: string[];
  right: string[];
  correct: number[];
};

/** "Name N things" question: N text slots, any order. Each accepted answer
 *  can only satisfy one slot (no duplicates). */
export type MultiTextQuestion = {
  type: "multitext";
  prompt: string;
  slots: number;
  accepted: string[];
};

export type Question =
  | TextQuestion
  | CheckboxQuestion
  | MatchQuestion
  | MultiTextQuestion;

type Answer = string | number[] | string[];
type Correctness = "correct" | "partial" | "wrong";

/** A partial match against a single accepted answer. Intentionally strict so
 *  that "o" doesn't count for "soma". Accepts:
 *   1. last letter missing       ("som"   -> "soma")
 *   2. extra last letter added   ("somas" -> "soma")
 *   3. accepted answer contained within the user's input ("the soma" -> "soma") */
function isPartialMatch(user: string, accepted: string): boolean {
  if (user.length + 1 === accepted.length && accepted.startsWith(user)) return true;
  if (user.length === accepted.length + 1 && user.startsWith(accepted)) return true;
  if (user.length > accepted.length && user.includes(accepted)) return true;
  return false;
}

function gradeText(q: TextQuestion, ans: string): Correctness {
  const user = ans.trim().toLowerCase();
  if (user === "") return "wrong";
  for (const a of q.accepted) {
    if (a.toLowerCase() === user) return "correct";
  }
  for (const a of q.accepted) {
    if (isPartialMatch(user, a.toLowerCase())) return "partial";
  }
  return "wrong";
}

type SlotResult = { state: Correctness; acceptedIdx: number };

/** For a multitext question, grades each slot independently. Each accepted
 *  answer can only satisfy one slot. Prefers exact matches first so a partial
 *  match on one slot doesn't steal an accepted answer that another slot could
 *  match exactly. */
function matchMultiText(q: MultiTextQuestion, slots: string[]): SlotResult[] {
  const results: SlotResult[] = slots.map(() => ({ state: "wrong", acceptedIdx: -1 }));
  const claimed = new Set<number>();
  const normalisedSlots = slots.map(s => s.trim().toLowerCase());
  const normalisedAccepted = q.accepted.map(a => a.toLowerCase());

  // Pass 1: exact matches
  for (let s = 0; s < slots.length; s++) {
    const user = normalisedSlots[s]!;
    if (user === "") continue;
    for (let a = 0; a < q.accepted.length; a++) {
      if (claimed.has(a)) continue;
      if (normalisedAccepted[a] === user) {
        results[s] = { state: "correct", acceptedIdx: a };
        claimed.add(a);
        break;
      }
    }
  }

  // Pass 2: strict partials (one-off spelling or accepted contained in user)
  // for slots not yet matched. See isPartialMatch for the exact rules.
  for (let s = 0; s < slots.length; s++) {
    if (results[s]!.state !== "wrong") continue;
    const user = normalisedSlots[s]!;
    if (user === "") continue;
    for (let a = 0; a < q.accepted.length; a++) {
      if (claimed.has(a)) continue;
      if (isPartialMatch(user, normalisedAccepted[a]!)) {
        results[s] = { state: "partial", acceptedIdx: a };
        claimed.add(a);
        break;
      }
    }
  }

  return results;
}

function grade(q: Question, ans: Answer | undefined): Correctness {
  if (ans === undefined) return "wrong";
  if (q.type === "text") return gradeText(q, String(ans));
  if (q.type === "checkbox") {
    const selected = (ans as number[]).slice().sort();
    const correct = q.correct.slice().sort();
    const allCorrect =
      selected.length === correct.length && selected.every((v, i) => v === correct[i]);
    return allCorrect ? "correct" : "wrong";
  }
  if (q.type === "multitext") {
    const slots = (ans as string[]);
    const matches = matchMultiText(q, slots);
    const exact = matches.filter(m => m.state === "correct").length;
    const anyMatch = matches.filter(m => m.state !== "wrong").length;
    if (exact === q.slots) return "correct";
    if (anyMatch > 0) return "partial";
    return "wrong";
  }
  const choice = ans as number[];
  return q.correct.every((c, i) => choice[i] === c) ? "correct" : "wrong";
}

/** Points awarded for a question. Most question types are all-or-nothing,
 *  but multitext is graded per-slot so a quiz total reflects actual progress. */
function pointsFor(q: Question, ans: Answer | undefined): number {
  if (ans === undefined) return 0;
  if (q.type === "multitext") {
    const slots = ans as string[];
    const matches = matchMultiText(q, slots);
    const hits = matches.filter(m => m.state !== "wrong").length;
    return hits / q.slots;
  }
  return grade(q, ans) === "wrong" ? 0 : 1;
}

function formatScore(n: number): string {
  // Round to 2dp, strip trailing zeros so "3", "3.5", "3.33" all look clean.
  const rounded = Math.round(n * 100) / 100;
  if (Number.isInteger(rounded)) return String(rounded);
  return rounded.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
}

function shuffle<T>(arr: T[]): T[] {
  const pool = arr.slice();
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j]!, pool[i]!];
  }
  return pool;
}

/** Custom dropdown that wraps long option text, unlike a native <select>. */
function WrappingSelect({
  options,
  value,
  onChange,
  disabled,
  placeholder,
}: {
  options: string[];
  value: number;
  onChange: (next: number) => void;
  disabled: boolean;
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const label = value >= 0 ? options[value]! : placeholder;
  const isPlaceholder = value < 0;

  return (
    <div ref={ref} className="relative flex-1 min-w-0">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(o => !o)}
        className="w-full p-2 border rounded bg-background text-foreground text-left flex items-start gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <span className="flex-1 min-w-0 whitespace-normal break-words">
          {isPlaceholder ? label : <InlineRendered>{label}</InlineRendered>}
        </span>
        <ChevronDown className="h-4 w-4 mt-0.5 shrink-0 opacity-70" />
      </button>
      {open && (
        <div className="absolute z-20 top-full left-0 right-0 mt-1 border rounded bg-popover text-popover-foreground shadow-lg max-h-72 overflow-y-auto">
          <button
            type="button"
            className="w-full p-2 text-left text-sm hover:bg-muted text-muted-foreground"
            onClick={() => { onChange(-1); setOpen(false); }}
          >
            {placeholder}
          </button>
          {options.map((opt, i) => (
            <button
              key={i}
              type="button"
              className={`w-full p-2 text-left text-sm hover:bg-muted whitespace-normal break-words ${i === value ? "bg-muted" : ""}`}
              onClick={() => { onChange(i); setOpen(false); }}
            >
              <InlineRendered>{opt}</InlineRendered>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export type QuizRunnerProps = {
  questions: Question[];
  /** If set, picks a random subset of this size. Otherwise uses all questions in order. */
  pickCount?: number;
  /** If true, Enter/blur on a text input shows that input's feedback immediately
   *  without needing to submit the whole quiz. */
  instaCheck?: boolean;
};

export function QuizRunner({ questions, pickCount, instaCheck = false }: QuizRunnerProps) {
  const pick = () =>
    pickCount !== undefined
      ? shuffle(questions).slice(0, Math.min(pickCount, questions.length))
      : questions;

  const [selected, setSelected] = useState<Question[]>(pick);
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [submitted, setSubmitted] = useState(false);
  // Snapshot of each input's value at the last insta-check trigger (Enter/blur).
  // Keys: "text-<questionIdx>" for single text, "slot-<questionIdx>-<slotIdx>" for multitext.
  // Feedback is graded against the snapshot so it doesn't update live while
  // the user keeps typing; it only updates on the next Enter/blur.
  const [snapshots, setSnapshots] = useState<Record<string, string>>({});

  useEffect(() => {
    setSelected(pick());
    setAnswers({});
    setSubmitted(false);
    setSnapshots({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions]);

  // If insta-check turns off, drop snapshots so the UI goes back to
  // "no feedback until submit".
  useEffect(() => {
    if (!instaCheck) setSnapshots({});
  }, [instaCheck]);

  const hasText = (v: unknown) => typeof v === "string" && v.trim() !== "";
  const snap = (key: string, value: string) => setSnapshots(s => ({ ...s, [key]: value }));
  const showText = (i: number) =>
    submitted || (instaCheck && snapshots[`text-${i}`] !== undefined);
  const showSlot = (i: number, si: number) =>
    submitted || (instaCheck && snapshots[`slot-${i}-${si}`] !== undefined);
  /** Value to grade against: live answer after a full submit, snapshot otherwise. */
  const gradeTextValue = (i: number): string =>
    submitted ? ((answers[i] as string) ?? "") : (snapshots[`text-${i}`] ?? "");
  const gradeSlotValue = (i: number, si: number): string =>
    submitted
      ? (((answers[i] as string[] | undefined) ?? [])[si] ?? "")
      : (snapshots[`slot-${i}-${si}`] ?? "");

  // Score: pointsFor gives 0-1 per question (fractional for multitext so partial
  // answers contribute proportionally). Totals always add up against selected.length.
  const score = selected.reduce((acc, q, i) => acc + pointsFor(q, answers[i]), 0);
  const scoreLabel = formatScore(score);

  const reset = () => {
    setSelected(pick());
    setAnswers({});
    setSubmitted(false);
    setChecked({});
  };

  // Tailwind colour map: partial answers share the correct (green) colour
  // since they score full marks. The "exact answer: X" feedback still
  // distinguishes partial from correct in text.
  const stateBorder = (s: Correctness) =>
    s === "wrong" ? "border-red-500" : "border-green-500";
  const stateBg = (s: Correctness) =>
    s === "wrong" ? "bg-red-500/10" : "bg-green-500/10";

  return (
    <>
      <div className="space-y-6">
        {selected.map((q, i) => {
          const g = submitted ? grade(q, answers[i]) : undefined;
          const cardBorder = g ? stateBorder(g) : "";
          return (
            <div
              key={i}
              className={`p-4 bg-surface text-surface-foreground border rounded-lg ${cardBorder}`}
            >
              <p className="font-medium mb-3">
                {i + 1}. <InlineRendered>{q.prompt}</InlineRendered>
              </p>

              {q.type === "text" && (() => {
                const show = showText(i);
                const inputG = show ? grade(q, gradeTextValue(i)) : undefined;
                return (
                  <div>
                    <input
                      type="text"
                      disabled={submitted}
                      value={(answers[i] as string) ?? ""}
                      onChange={e => setAnswers(a => ({ ...a, [i]: e.target.value }))}
                      onKeyDown={e => { if (instaCheck && e.key === 'Enter' && hasText(e.currentTarget.value)) snap(`text-${i}`, e.currentTarget.value); }}
                      onBlur={e => { if (instaCheck && hasText(e.currentTarget.value)) snap(`text-${i}`, e.currentTarget.value); }}
                      className={`w-full p-2 border rounded bg-background text-foreground ${inputG ? stateBorder(inputG) : ""}`}
                      placeholder="Type your answer..."
                    />
                    {show && inputG !== "correct" && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {inputG === "partial" ? "Pretty much, exact answer: " : "Accepted: "}
                        <InlineRendered>{q.accepted[0] ?? ""}</InlineRendered>
                      </p>
                    )}
                  </div>
                );
              })()}

              {q.type === "checkbox" && (
                <div className="space-y-2">
                  {q.options.map((opt, j) => {
                    const isChecked = ((answers[i] as number[]) ?? []).includes(j);
                    const isCorrectChoice = submitted && q.correct.includes(j);
                    const isWrongChoice = submitted && isChecked && !q.correct.includes(j);
                    return (
                      <label
                        key={j}
                        className={`block p-2 border rounded cursor-pointer transition-colors ${
                          isCorrectChoice ? "border-green-500 bg-green-500/10" :
                          isWrongChoice ? "border-red-500 bg-red-500/10" :
                          isChecked ? "border-primary bg-primary/10" :
                          "hover:bg-muted"
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="mr-2"
                          disabled={submitted}
                          checked={isChecked}
                          onChange={() => setAnswers(a => {
                            const cur = ((a[i] as number[]) ?? []).slice();
                            const idx = cur.indexOf(j);
                            if (idx >= 0) cur.splice(idx, 1); else cur.push(j);
                            return { ...a, [i]: cur };
                          })}
                        />
                        <InlineRendered>{opt}</InlineRendered>
                      </label>
                    );
                  })}
                </div>
              )}

              {q.type === "multitext" && (() => {
                const liveSlots: string[] = (answers[i] as string[]) ?? Array(q.slots).fill("");
                // Grade against snapshots when not submitted, live values after submit.
                const gradingSlots: string[] = Array.from({ length: q.slots }).map(
                  (_, si) => gradeSlotValue(i, si)
                );
                const slotResults = matchMultiText(q, gradingSlots);
                const used = new Set(
                  slotResults
                    .filter(r => r.acceptedIdx >= 0)
                    .map(r => r.acceptedIdx)
                );
                const missing = q.accepted.filter((_, idx) => !used.has(idx));
                return (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-3">
                    {Array.from({ length: q.slots }).map((_, si) => {
                      const show = showSlot(i, si);
                      const slotResult = show ? slotResults[si] : undefined;
                      const slotG: Correctness | undefined = slotResult?.state;
                      return (
                        <div key={si}>
                          <input
                            type="text"
                            disabled={submitted}
                            value={liveSlots[si] ?? ""}
                            onChange={e => setAnswers(a => {
                              const cur = ((a[i] as string[]) ?? Array(q.slots).fill("")).slice();
                              cur[si] = e.target.value;
                              return { ...a, [i]: cur };
                            })}
                            onKeyDown={e => { if (instaCheck && e.key === 'Enter' && hasText(e.currentTarget.value)) snap(`slot-${i}-${si}`, e.currentTarget.value); }}
                            onBlur={e => { if (instaCheck && hasText(e.currentTarget.value)) snap(`slot-${i}-${si}`, e.currentTarget.value); }}
                            className={`w-full p-2 border rounded bg-background text-foreground ${slotG ? stateBorder(slotG) : ""}`}
                            placeholder={`Answer ${si + 1}...`}
                          />
                          {slotResult && slotResult.state === "partial" && slotResult.acceptedIdx >= 0 && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Pretty much, exact answer:{" "}
                              <InlineRendered>{q.accepted[slotResult.acceptedIdx] ?? ""}</InlineRendered>
                            </p>
                          )}
                          {submitted && slotResult && slotResult.state === "wrong" && missing.length > 0 && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Accepted: {missing.join(", ")}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })()}

              {q.type === "match" && (
                <div className="space-y-2">
                  {q.left.map((leftItem, li) => {
                    const choice = ((answers[i] as number[]) ?? Array(q.left.length).fill(-1))[li] ?? -1;
                    const correctIdx = q.correct[li];
                    const itemCorrect = submitted && choice === correctIdx;
                    const itemWrong = submitted && choice !== correctIdx;
                    return (
                      <div
                        key={li}
                        className={`flex items-start gap-3 p-2 border rounded ${
                          itemCorrect ? `border-green-500 ${stateBg("correct")}` :
                          itemWrong ? `border-red-500 ${stateBg("wrong")}` : ""
                        }`}
                      >
                        <span className="font-medium w-32 sm:w-40 shrink-0 whitespace-normal break-words">
                          <InlineRendered>{leftItem}</InlineRendered>
                        </span>
                        <span className="pt-2">→</span>
                        <WrappingSelect
                          options={q.right}
                          value={choice}
                          disabled={submitted}
                          placeholder="-- choose --"
                          onChange={(v) => setAnswers(a => {
                            const cur = ((a[i] as number[]) ?? Array(q.left.length).fill(-1)).slice();
                            cur[li] = v;
                            return { ...a, [i]: cur };
                          })}
                        />
                      </div>
                    );
                  })}
                  {submitted && g !== "correct" && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Correct: {q.left.map((l, li) => `${l} → ${q.right[q.correct[li]!]}`).join("; ")}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex gap-3 items-center">
        {!submitted && !instaCheck && (
          <button
            onClick={() => setSubmitted(true)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium cursor-pointer"
          >
            Submit
          </button>
        )}
        {submitted && (
          <>
            <span className="text-lg font-semibold">Score: {scoreLabel} / {selected.length}</span>
            <button
              onClick={reset}
              className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-muted cursor-pointer"
            >
              Try again
            </button>
          </>
        )}
      </div>
    </>
  );
}
