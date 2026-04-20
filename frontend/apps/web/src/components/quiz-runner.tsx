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

export type Question = TextQuestion | CheckboxQuestion | MatchQuestion;

type Answer = string | number[];
type Correctness = "correct" | "partial" | "wrong";

function gradeText(q: TextQuestion, ans: string): Correctness {
  const user = ans.trim().toLowerCase();
  if (user === "") return "wrong";
  for (const a of q.accepted) {
    if (a.toLowerCase() === user) return "correct";
  }
  // Partial: either side is a substring of the other (handles "mode" vs "mode bit")
  for (const a of q.accepted) {
    const lower = a.toLowerCase();
    if (lower.includes(user) || user.includes(lower)) return "partial";
  }
  return "wrong";
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
  const choice = ans as number[];
  return q.correct.every((c, i) => choice[i] === c) ? "correct" : "wrong";
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
};

export function QuizRunner({ questions, pickCount }: QuizRunnerProps) {
  const pick = () =>
    pickCount !== undefined
      ? shuffle(questions).slice(0, Math.min(pickCount, questions.length))
      : questions;

  const [selected, setSelected] = useState<Question[]>(pick);
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setSelected(pick());
    setAnswers({});
    setSubmitted(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions]);

  // Score: full marks for correct, half marks for partial, none for wrong.
  const score = selected.reduce((acc, q, i) => {
    const g = grade(q, answers[i]);
    if (g === "correct") return acc + 1;
    if (g === "partial") return acc + 0.5;
    return acc;
  }, 0);
  const scoreLabel = Number.isInteger(score) ? String(score) : score.toFixed(1);

  const reset = () => {
    setSelected(pick());
    setAnswers({});
    setSubmitted(false);
  };

  // Tailwind colour map for the three-state grading.
  const stateBorder = (s: Correctness) =>
    s === "correct" ? "border-green-500" :
    s === "partial" ? "border-yellow-500" :
    "border-red-500";
  const stateBg = (s: Correctness) =>
    s === "correct" ? "bg-green-500/10" :
    s === "partial" ? "bg-yellow-500/10" :
    "bg-red-500/10";

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

              {q.type === "text" && (
                <div>
                  <input
                    type="text"
                    disabled={submitted}
                    value={(answers[i] as string) ?? ""}
                    onChange={e => setAnswers(a => ({ ...a, [i]: e.target.value }))}
                    className={`w-full p-2 border rounded bg-background text-foreground ${g ? stateBorder(g) : ""}`}
                    placeholder="Type your answer..."
                  />
                  {submitted && g !== "correct" && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {g === "partial" ? "Close, full answer: " : "Accepted: "}
                      <InlineRendered>{q.accepted[0] ?? ""}</InlineRendered>
                    </p>
                  )}
                </div>
              )}

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
        {!submitted ? (
          <button
            onClick={() => setSubmitted(true)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium cursor-pointer"
          >
            Submit
          </button>
        ) : (
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
