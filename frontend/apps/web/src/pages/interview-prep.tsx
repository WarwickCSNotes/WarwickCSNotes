import { useEffect } from "react"
import { Page } from "@/components/page"
import { PageHeader } from "@/components/page-header"
import { PageSection } from "@/components/page-section"
import { LinkCard } from "@/components/cards"

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

        <h3 className="mb-3 text-lg font-semibold text-foreground">
          System Design
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SYSTEM_DESIGN.map((s) => (
            <LinkCard key={s.name} link={s} />
          ))}
        </div>
      </PageSection>

      <PageSection
        title="Behavioural"
        subtitle="Interviewers want to know how you work with other people. The default framework here is STAR (Situation, Task, Action, Result)."
        className="mb-10"
      >
        <div className="text-muted-foreground">
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
              <strong className="text-foreground">Practise STAR out loud:</strong>{" "}
              it's much harder to structure a story on the spot than it
              looks. Practising with a friend (or even yourself in the
              mirror) makes a big difference.
            </li>
            <li>
              <strong className="text-foreground">
                Research the company's values:
              </strong>{" "}
              most companies publish their principles/values. Interviewers
              often score you against these, so having stories that map to
              them is a cheat code.
            </li>
          </ul>
        </div>
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
