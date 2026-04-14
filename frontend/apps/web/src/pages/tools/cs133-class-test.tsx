import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type TextQuestion = {
  type: "text";
  prompt: string;
  accepted: string[];
};

type CheckboxQuestion = {
  type: "checkbox";
  prompt: string;
  options: string[];
  correct: number[];
};

type MatchQuestion = {
  type: "match";
  prompt: string;
  left: string[];
  right: string[];
  correct: number[];
};

type Question = TextQuestion | CheckboxQuestion | MatchQuestion;

const QUESTIONS: Question[] = [
  {
    type: "text",
    prompt: "State the name of the official in the UK whose job it is to uphold information rights in the public interest.",
    accepted: ["information commissioner", "ico", "information commissioner's office", "the information commissioner"],
  },
  {
    type: "checkbox",
    prompt: "Under the Regulation of Investigatory Powers Act 2000, for which of the following reasons may an organisation monitor (but not record) communications?",
    options: [
      "Employee supervision",
      "Confidential phone lines",
      "Detection of unauthorised use",
      "Compliance with regulation",
      "Prevention or detection of crime",
      "Whether communication is related to the business",
      "Effective system use",
      "Standards purposes",
    ],
    correct: [1, 5],
  },
  {
    type: "match",
    prompt: "Match the three arms of US governance to their functions.",
    left: ["Executive", "Judiciary", "Legislature"],
    right: [
      "Applies and enforces laws",
      "Carries on daily business of government (President)",
      "Makes laws (Congress)",
    ],
    correct: [1, 0, 2],
  },
  {
    type: "checkbox",
    prompt: "Which of the following is/are NOT protected by copyright (in the UK)?",
    options: [
      "Wiki",
      "Blog",
      "Website",
      "Program code",
      "Open source program",
      "Business logic",
    ],
    correct: [5],
  },
  {
    type: "text",
    prompt: "John Stuart Mill promoted which ethical theory?",
    accepted: ["utilitarianism", "utilitarian", "utilitarian ethics"],
  },
  {
    type: "checkbox",
    prompt: "The BCS lists in its Code of Conduct four duties that members must uphold – what are they?",
    options: [
      "Duty to the Profession",
      "Duties to Employers and Clients",
      "Public Interest",
      "Payment of Fees",
      "Professional Qualifications",
      "Professional Competence and Integrity",
      "Duty to Relevant Authority",
      "Continued Professional Development",
      "Duty to Practice within the Law",
    ],
    correct: [0, 2, 5, 6],
  },
  {
    type: "text",
    prompt: "Name the professional qualification awarded by the BCS on behalf of the Engineering Council.",
    accepted: ["ceng", "chartered engineer"],
  },
];

type Answer = string | number[] | number[];

function isCorrect(q: Question, ans: Answer | undefined): boolean {
  if (ans === undefined) return false;
  if (q.type === "text") {
    const normalised = String(ans).trim().toLowerCase();
    return q.accepted.some(a => a.toLowerCase() === normalised);
  }
  if (q.type === "checkbox") {
    const selected = (ans as number[]).slice().sort();
    const correct = q.correct.slice().sort();
    return selected.length === correct.length && selected.every((v, i) => v === correct[i]);
  }
  // match
  const choice = ans as number[];
  return q.correct.every((c, i) => choice[i] === c);
}

const NUM_QUESTIONS = 5;

function pickRandomQuestions(): Question[] {
  const pool = QUESTIONS.slice();
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j]!, pool[i]!];
  }
  return pool.slice(0, Math.min(NUM_QUESTIONS, pool.length));
}

export const CS133ClassTest = () => {
  const [selected, setSelected] = useState<Question[]>(() => pickRandomQuestions());
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { document.title = "CS133 Class Test Simulator"; }, []);

  const score = selected.filter((q, i) => isCorrect(q, answers[i])).length;

  const allAnswered = selected.every((q, i) => {
    const a = answers[i];
    if (a === undefined) return false;
    if (q.type === "text") return String(a).trim().length > 0;
    if (q.type === "checkbox") return (a as number[]).length > 0;
    return (a as number[]).length === q.left.length && (a as number[]).every(v => v !== -1);
  });

  const reset = () => {
    setSelected(pickRandomQuestions());
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <Link
        to="/module/CS133"
        className="inline-flex items-center gap-2 mb-6 px-4 py-2 border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
      >
        &larr; CS133
      </Link>

      <h1 className="text-3xl font-bold mb-2">Class Test Simulator</h1>
      <p className="text-muted-foreground mb-6">Practice questions for CS133 Professional Skills.</p>

      <div className="space-y-6">
        {selected.map((q, i) => {
          const correct = submitted && isCorrect(q, answers[i]);
          const wrong = submitted && !correct;
          return (
            <div
              key={i}
              className={`p-4 bg-surface text-surface-foreground border rounded-lg ${
                correct ? "border-green-500" : wrong ? "border-red-500" : ""
              }`}
            >
              <p className="font-medium mb-3">{i + 1}. {q.prompt}</p>

              {q.type === "text" && (
                <div>
                  <input
                    type="text"
                    disabled={submitted}
                    value={(answers[i] as string) ?? ""}
                    onChange={e => setAnswers(a => ({ ...a, [i]: e.target.value }))}
                    className="w-full p-2 border rounded bg-background text-foreground"
                    placeholder="Type your answer..."
                  />
                  {submitted && !correct && (
                    <p className="text-sm text-muted-foreground mt-2">Accepted: {q.accepted[0]}</p>
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
                        {opt}
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
                        className={`flex items-center gap-3 p-2 border rounded ${
                          itemCorrect ? "border-green-500 bg-green-500/10" :
                          itemWrong ? "border-red-500 bg-red-500/10" : ""
                        }`}
                      >
                        <span className="font-medium w-32 shrink-0">{leftItem}</span>
                        <span>→</span>
                        <select
                          disabled={submitted}
                          value={choice}
                          onChange={e => setAnswers(a => {
                            const cur = ((a[i] as number[]) ?? Array(q.left.length).fill(-1)).slice();
                            cur[li] = Number(e.target.value);
                            return { ...a, [i]: cur };
                          })}
                          className="flex-1 p-1 border rounded bg-background text-foreground"
                        >
                          <option value={-1}>-- choose --</option>
                          {q.right.map((r, ri) => (
                            <option key={ri} value={ri}>{r}</option>
                          ))}
                        </select>
                      </div>
                    );
                  })}
                  {submitted && !correct && (
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
            disabled={!allAnswered}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Submit
          </button>
        ) : (
          <>
            <span className="text-lg font-semibold">Score: {score} / {selected.length}</span>
            <button
              onClick={reset}
              className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-muted cursor-pointer"
            >
              Try again
            </button>
          </>
        )}
      </div>
    </div>
  );
};
