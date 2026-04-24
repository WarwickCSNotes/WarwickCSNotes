import { useEffect } from "react";
import { QuizRunner, type Question } from "@/components/quiz-runner";
import { InstaCheckToggle } from "@/components/insta-check-toggle";
import { Page } from "@/components/page";
import { PageHeader } from "@/components/page-header";
import { useInstaCheck } from "@/lib/use-insta-check";

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

export const CS133ClassTest = () => {
  const [instaCheck] = useInstaCheck();
  useEffect(() => { document.title = "CS133 Class Test Simulator"; }, []);

  return (
    <Page>
      <PageHeader
        title="Class Test Simulator"
        subtitle="Practice questions for CS133 Professional Skills."
        back={{ to: "/module/CS133", label: "CS133" }}
      >
        <InstaCheckToggle />
      </PageHeader>

      <QuizRunner questions={QUESTIONS} pickCount={5} instaCheck={instaCheck} />
    </Page>
  );
};
