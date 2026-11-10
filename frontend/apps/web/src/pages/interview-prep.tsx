import { useEffect } from "react"
import { Page } from "@/components/page"
import { PageHeader } from "@/components/page-header"
import { PageSection } from "@/components/page-section"
import { LinkCard } from "@/components/cards"
import { DataTable } from "@/components/data-table"

type Resource = {
  name: string
  url: string
  description: string
}

const LEETCODE: Resource[] = [
  {
    name: "LeetCode",
    url: "https://leetcode.com/",
    description:
      "The massive library of coding problems most tech interviewers pull from. The default practice ground.",
  },
  {
    name: "NeetCode",
    url: "https://neetcode.io/",
    description:
      "A structured way to learn LeetCode: curated problems organised by pattern, with video walkthroughs.",
  },
]

const SYSTEM_DESIGN: Resource[] = [
  {
    name: "System Design Primer",
    url: "https://github.com/donnemartin/system-design-primer",
    description:
      "Free, exhaustive open-source reference for system-design interview prep. Aimed at slightly more advanced interviews (senior internships, new-grad SWE, second-year returning offers).",
  },
  {
    name: "Grokking the System Design Interview",
    url: "https://www.designgurus.io/course/grokking-the-system-design-interview",
    description:
      "Structured walkthroughs of common system-design questions (URL shortener, chat, feed, ...). Useful complement once you've read the primer.",
  },
  {
    name: "Hello Interview",
    url: "https://www.hellointerview.com/",
    description:
      "Detailed system-design walkthroughs with clear diagrams. Free written guides plus paid mock interviews.",
  },
]

const OTHER_TECHNICAL: {
  title: string
  description: string
  tips: string[]
}[] = [
  {
    title: "Project defence",
    description:
      "The interviewer picks a project from your CV and questions the decisions you made. They want to check that you really understand your work and did what you claim.",
    tips: [
      "Be ready to justify your choices, e.g. why you picked one technology over the alternatives.",
      "Be clear about which parts you did yourself in a group project.",
      "Re-read the code of any older projects on your CV beforehand.",
    ],
  },
  {
    title: "Language trivia",
    description:
      "Quick questions on the details of a language, usually one on your CV or used in the role, e.g. the difference between a list and a tuple in Python, or between the stack and the heap in C++.",
    tips: [
      "Revise the fundamentals of each language you list, including how it handles memory and types.",
      "Only list languages you're happy to be quizzed on.",
      "If you're unsure, say so and reason through it out loud rather than guessing.",
    ],
  },
  {
    title: "Low-level design",
    description:
      "You design the classes and interfaces for a small system, e.g. a parking garage or a library. Where system design looks at services and infrastructure, this looks at how the code itself is structured.",
    tips: [
      "Ask clarifying questions first to pin down the requirements.",
      "Identify the main entities and how they relate before you write any code.",
      "Revise object-oriented principles and common design patterns.",
      "Keep the design simple, and explain how it could be extended later.",
    ],
  },
  {
    title: "Fixing a problem",
    description:
      "You're given existing code with a bug or failing tests, and asked to find and fix the problem. It's closer to day-to-day engineering work than a LeetCode question.",
    tips: [
      "Read the code and understand what it should do before you change anything.",
      "Reproduce the bug, then narrow down where it comes from.",
      "Explain your theory of what's wrong as you go.",
      "Once it's fixed, check for edge cases and similar bugs nearby.",
      "Get used to reading unfamiliar code, e.g. by contributing to open source.",
    ],
  },
]

const ONLINE_ASSESSMENT_TIPS: { title: string; text: string }[] = [
  {
    title: "Try the platform first:",
    text: "get used to the editor and how tests run, so you don't lose time on the day.",
  },
  {
    title: "Manage your time:",
    text: "read every question first, and don't get stuck on one at the expense of the rest.",
  },
  {
    title: "Think about edge cases:",
    text: "hidden tests often check empty inputs, large inputs, and time limits.",
  },
  {
    title: "Submit something:",
    text: "a working solution that passes some of the tests is better than nothing.",
  },
  {
    title: "Set yourself up:",
    text: "check the rules, then pick a quiet time and place with a reliable connection.",
  },
]

export const InterviewPrepPage = () => {
  useEffect(() => {
    document.title = "Interview Prep"
  }, [])

  return (
    <Page>
      <PageHeader
        title="Interview Prep"
      />

      <div className="mb-10 max-w-3xl text-muted-foreground">
        <p className="mb-3">
          Generally, there are two kinds of interview: technical and
          behavioural.
        </p>
        <p className="mb-3">
          Technical interviews test your technical ability, whereas
          behavioural interviews test your interpersonal skills and whether
          you're a fit for the company's culture.
        </p>
        <p>
          There are many kinds of technical interviews and many kinds of
          behavioural interviews, with preparation varying greatly,
          especially for specialisations. There are also interviews that
          are both technical and behavioural, e.g. CV interviews that test
          your technical knowledge of topics in your CV and also ask about
          teamworking experiences (or why there aren't any, if there
          aren't).
        </p>
      </div>

      <PageSection
        id="overview"
        title="Interview types at a glance"
        subtitle="Formats in bold are the most common."
        className="mb-10"
      >
        <DataTable
          className="mb-3"
          headers={["Stage", "Formats", "How to practise"]}
          rows={[
            [
              "Behavioural",
              <>
                <strong className="text-foreground">Motivational</strong>
                <br />
                <strong className="text-foreground">STAR-based</strong>
                <br />
                Scenario-based
              </>,
              <>
                Research the company in depth
                <br />
                Practise with friends, or record yourself and ask AI for
                feedback
              </>,
            ],
            [
              "Technical",
              <>
                <strong className="text-foreground">LeetCode</strong>
                <br />
                <strong className="text-foreground">Project defence</strong>
                <br />
                Language trivia
                <br />
                Low-level design
                <br />
                Fixing a problem
                <br />
                System design
              </>,
              <>
                NeetCode 150 roadmap
                <br />
                NeetCode system design
                <br />
                Hello Interview (for system design)
                <br />
                Advice from LinkedIn connections
                <br />
                Glassdoor and Reddit
              </>,
            ],
            [
              "Online assessments (OAs)",
              "Timed problems like LeetCode",
              <>
                LeetCode
                <br />
                OA platforms, e.g.{" "}
                <a
                  href="https://www.hackerrank.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary underline hover:opacity-80"
                >
                  HackerRank
                </a>
              </>,
            ],
          ]}
        />
      </PageSection>

      <PageSection
        title="Technical"
        subtitle="Data structures and algorithms, and sometimes system design (at intern/graduate level, system design will be fairly intuitive)."
        className="mb-10"
      >
        <h3 className="mb-3 text-lg font-semibold text-foreground">
          LeetCode
        </h3>
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {LEETCODE.map((s) => (
            <LinkCard key={s.name} link={s} />
          ))}
        </div>

        <div className="mb-6 text-muted-foreground">
          <p className="mb-3">How to prepare:</p>
          <ul className="mb-4 ml-6 list-disc space-y-2">
            <li>
              <strong className="text-foreground">
                Work through the roadmap:
              </strong>{" "}
              complete most of the{" "}
              <a
                href="https://neetcode.io/roadmap"
                target="_blank"
                rel="noreferrer"
                className="text-primary underline hover:opacity-80"
              >
                NeetCode 150 roadmap
              </a>
              .
            </li>
            <li>
              <strong className="text-foreground">Learn complexities:</strong>{" "}
              know the time and space complexity of common things (binary
              search, linked lists, DFS, BFS, DP) and why they have those
              complexities.
            </li>
            <li>
              <strong className="text-foreground">
                Focus on common topics:
              </strong>{" "}
              graphs and trees come up a lot.
            </li>
          </ul>
          <p className="mb-3">
            In the interview, talk through your thoughts clearly as you follow
            these steps:
          </p>
          <ol className="ml-6 list-decimal space-y-1">
            <li>Write down your plan as comments</li>
            <li>Write the code</li>
            <li>State the time and space complexities</li>
            <li>Test your code</li>
          </ol>
        </div>

        <h3 className="mb-3 text-lg font-semibold text-foreground">
          System Design
        </h3>
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SYSTEM_DESIGN.map((s) => (
            <LinkCard key={s.name} link={s} />
          ))}
        </div>

        {OTHER_TECHNICAL.map((t) => (
          <div key={t.title} className="mb-6 text-muted-foreground last:mb-0">
            <h3 className="mb-2 text-lg font-semibold text-foreground">
              {t.title}
            </h3>
            <p className="mb-3">{t.description}</p>
            <ul className="ml-6 list-disc space-y-2">
              {t.tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </div>
        ))}
      </PageSection>

      <PageSection
        title="Behavioural"
        subtitle="Interviewers want to know how you work with other people, and why you want the job."
        className="mb-10"
      >
        <div className="text-muted-foreground">
          <h3 className="mb-2 text-lg font-semibold text-foreground">
            Motivational questions
          </h3>
          <p className="mb-3">
            These test why you want this role at this company, e.g. "Why do you
            want to work here?" or "Why this role?"
          </p>
          <ul className="mb-6 ml-6 list-disc space-y-2">
            <li>
              <strong className="text-foreground">Be specific:</strong> mention
              things that are particular to the company, like its products,
              its values, or what you've heard from people who work there. If
              your answer would work for any company, it's too generic.
            </li>
            <li>
              <strong className="text-foreground">
                Link it back to yourself:
              </strong>{" "}
              connect those reasons to your own projects, interests, and
              experience.
            </li>
            <li>
              <strong className="text-foreground">Look ahead:</strong> explain
              what you want to learn in the role and how it fits where you want
              to go.
            </li>
          </ul>

          <h3 className="mb-2 text-lg font-semibold text-foreground">
            STAR questions
          </h3>
          <p className="mb-3">
            These ask about a real experience, usually starting "Tell me about
            a time you...". STAR is the default framework for answering them:
          </p>
          <ul className="mb-4 ml-6 list-disc space-y-1">
            <li>
              <strong className="text-foreground">Situation:</strong> the
              context
            </li>
            <li>
              <strong className="text-foreground">Task:</strong> what you
              needed to achieve
            </li>
            <li>
              <strong className="text-foreground">Action:</strong> what you did
            </li>
            <li>
              <strong className="text-foreground">Result:</strong> the outcome,
              ideally with numbers
            </li>
          </ul>
          <p className="mb-3">
            A few things worth doing before the interview:
          </p>
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <strong className="text-foreground">
                Prepare 3-5 strong stories:
              </strong>{" "}
              covering common themes like impact, teamwork, conflict,
              failure, and leadership. Each one should be flexible enough
              to answer several questions.
            </li>
            <li>
              <strong className="text-foreground">
                Write your stories down:
              </strong>{" "}
              put each one into STAR format so the structure is ready before
              you need it.
            </li>
            <li>
              <strong className="text-foreground">Practise STAR out loud:</strong>{" "}
              it's much harder to structure a story on the spot than it
              looks. Practising with a friend (or even yourself in the
              mirror) makes a big difference. You can also record yourself
              and ask AI for feedback.
            </li>
            <li>
              <strong className="text-foreground">
                Research the company's values:
              </strong>{" "}
              most companies publish their principles/values. Interviewers
              often score you against these, so having stories that map to
              them is a cheat code.
            </li>
            <li>
              <strong className="text-foreground">
                Use technical examples for SWE roles:
              </strong>{" "}
              software engineering experience makes the best stories for these
              interviews.
            </li>
            <li>
              <strong className="text-foreground">Know your audience:</strong>{" "}
              avoid overly technical terms with recruiters, but show them off
              wherever you can with software engineers.
            </li>
          </ul>

          <h3 className="mt-6 mb-2 text-lg font-semibold text-foreground">
            Scenario questions
          </h3>
          <p className="mb-3">
            These are hypothetical, for example:{" "}
            <em className="text-foreground">
              "You're working in the app team at our company. Due to [X],
              there's a new, earlier deadline your team has to meet for the new
              product. How would you deal with this situation?"
            </em>
          </p>
          <ol className="ml-6 list-decimal space-y-2">
            <li>
              <strong className="text-foreground">
                Clarify any uncertainties,
              </strong>{" "}
              e.g. "Am I leading this team?"
            </li>
            <li>
              <strong className="text-foreground">
                Describe the issues and conflicts between stakeholders.
              </strong>{" "}
              Think about:
              <ul className="mt-2 ml-6 list-[circle] space-y-1">
                <li>Your team</li>
                <li>Adjacent teams (Product, Sales, etc.)</li>
                <li>The company as a whole (know its values)</li>
                <li>The final customer</li>
                <li>Sometimes, the clients</li>
              </ul>
            </li>
            <li>
              <strong className="text-foreground">
                Explain the options you could take,
              </strong>{" "}
              e.g. cutting features, using freelancers, or asking for a
              deadline extension.
            </li>
            <li>
              <strong className="text-foreground">
                Argue why one option is better,
              </strong>{" "}
              e.g. "Company X prioritises customer satisfaction, so cutting
              features isn't a good idea, and bringing in freelancers is best
              because..."
            </li>
          </ol>
        </div>
      </PageSection>

      <PageSection
        id="online-assessments"
        title="Online assessments"
        subtitle="Timed coding problems, similar to LeetCode, that you complete online and on your own. They're often an early stage of the process, used to filter applicants before any interviews."
        className="mb-10"
      >
        <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
          {ONLINE_ASSESSMENT_TIPS.map((t) => (
            <li key={t.title}>
              <strong className="text-foreground">{t.title}</strong> {t.text}
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection
        title="Mixed"
        subtitle="Interviews that are part-technical, part-behavioural. CV interviews are the classic example."
        className="mb-10"
      >
        <div className="text-muted-foreground">
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <strong className="text-foreground">Know your CV cold:</strong>{" "}
              anything on there is fair game. Expect deep follow-ups on
              projects, technologies, and prior roles. If you can't defend
              a line, don't put it on your CV (see{" "}
              <a
                href="/careers/writing-your-cv"
                className="text-primary underline hover:opacity-80"
              >
                Writing your CV
              </a>
              ).
            </li>
            <li>
              <strong className="text-foreground">
                Pre-write project deep-dives:
              </strong>{" "}
              for each project, know the architecture, the hardest
              technical problem you hit, and what you'd do differently.
              These questions come up almost every time.
            </li>
            <li>
              <strong className="text-foreground">
                Have teamwork stories ready:
              </strong>{" "}
              even in a technical CV interview, expect a behavioural pivot
              (or the "why there aren't any" question if your CV is
              solo-project heavy).
            </li>
          </ul>
        </div>
      </PageSection>

      <PageSection
        title="Research your company"
        subtitle="A little research on the company (and the interviewer) goes a long way. This applies to every interview type."
        className="mb-10"
      >
        <div className="text-muted-foreground">
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <strong className="text-foreground">
                Read past interview reports:
              </strong>{" "}
              <a
                href="https://www.glassdoor.com/"
                target="_blank"
                rel="noreferrer"
                className="text-primary underline hover:opacity-80"
              >
                Glassdoor
              </a>{" "}
              and Blind often have people posting the exact questions they
              got asked and how the process was structured. Sometimes even
              the interviewer's name.
            </li>
            <li>
              <strong className="text-foreground">
                Look up your interviewer:
              </strong>{" "}
              LinkedIn tells you their background. A former founder will
              ask different things to someone from a research background.
            </li>
            <li>
              <strong className="text-foreground">Know the company:</strong>{" "}
              recent news, product launches, and how they make money. It
              doesn't take much to look prepared, and a lot to look
              unprepared.
            </li>
          </ul>
        </div>
      </PageSection>
    </Page>
  )
}
