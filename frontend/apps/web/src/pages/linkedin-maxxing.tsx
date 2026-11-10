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

const LINKEDIN: Resource[] = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/",
    description:
      "The default place recruiters look you up after (or before) reading your CV.",
  },
]

const EXAMPLES: Resource[] = [
  {
    name: "Edward Denton",
    url: "https://www.linkedin.com/in/edwardden/",
    description:
      "My LinkedIn is pretty standard and mostly follows the advice here (since I wrote the advice lol).",
  },
  {
    name: "Louis Tanak",
    url: "https://www.linkedin.com/in/louis-tanak/",
    description:
      "My friend Louis' profile is very solid, with several additional sections (Projects, Licenses, Honors & Awards etc).",
  },
  {
    name: "Crystal Ng Shu Lu",
    url: "https://www.linkedin.com/in/crystalng2005/",
    description:
      "Verified, with the Projects and Volunteering sections filled in, good work experience, and career-oriented posts.",
  },
  {
    name: "Michael Tan-Sikorski",
    url: "https://www.linkedin.com/in/michael-tan-sikorski/",
    description:
      "Actively posts (career and projects), and filled in projects, experience, education, certification, and volunteering.",
  },
]

export const LinkedInMaxxingPage = () => {
  useEffect(() => {
    document.title = "LinkedIn Maxxing"
  }, [])

  return (
    <Page>
      <PageHeader
        title="LinkedIn Maxxing"
        subtitle="Getting the most out of LinkedIn: profile, networking, posts, and job searching."
      />

      <p className="mb-8 max-w-3xl text-muted-foreground">
        LinkedIn is where recruiters find you and verify what your CV
        claims. Treat it as an extended CV: keep it consistent, active,
        and easy to skim.
      </p>

      <div className="mb-10 grid grid-cols-1 gap-4">
        {LINKEDIN.map((s) => (
          <LinkCard key={s.name} link={s} />
        ))}
      </div>

      <PageSection id="profile" title="Profile" className="mb-10">
        <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">Complete the profile:</strong>{" "}
            headshot, headline, summary, experience, education, and skills.
            Nice images and layout go a long way!
          </li>
          <li>
            <strong className="text-foreground">Add your projects:</strong>{" "}
            fill in the Projects section with your technical projects.
          </li>
          <li>
            <strong className="text-foreground">Mirror the CV:</strong> the
            roles, dates, and achievements should match, since inconsistencies
            are a red flag. Some recruiters run a tool to check this and
            instantly reject rather than reach out to ask why.
          </li>
          <li>
            <strong className="text-foreground">Post:</strong> projects,
            hackathon wins, or interesting things you've learned. Semi-frequent
            posts are ideal, but not necessary!
          </li>
        </ul>
      </PageSection>

      <PageSection id="networking" title="Networking" className="mb-10">
        <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">Explore career paths:</strong>{" "}
            reach out to people in roles you're interested in to find out how
            they got there.
          </li>
          <li>
            <strong className="text-foreground">Ask for referrals:</strong>{" "}
            people working at a company can refer you for job applications.
          </li>
          <li>
            <strong className="text-foreground">Get application tips:</strong>{" "}
            ask about the application process, e.g. the interview types and
            what they look for.
          </li>
        </ul>
      </PageSection>

      <PageSection id="making-posts" title="Making Posts" className="mb-10">
        <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">Lead with a hook:</strong>{" "}
            start with a line that captures the central idea, e.g.{" "}
            <em className="text-foreground not-italic">
              "Feeling inflexible and unmotivated? I built X"
            </em>{" "}
            or{" "}
            <em className="text-foreground not-italic">
              "I struggled with XYZ and it sucked, so I built W"
            </em>
            . People decide whether to keep reading in half a second.
          </li>
          <li>
            <strong className="text-foreground">Use photos:</strong> a
            screenshot, demo GIF, or a photo of you at the event stops the
            scroll and gives the post something to render as a preview.
          </li>
          <li>
            <strong className="text-foreground">Link to projects:</strong>{" "}
            if you're posting about a build, link to the repo or live demo
            so readers can dig deeper.
          </li>
          <li>
            <strong className="text-foreground">Use AI to polish:</strong>{" "}
            run the post through AI for spellcheck and grammar-check, then
            do a final read-through yourself before hitting post.
          </li>
        </ul>
      </PageSection>

      <PageSection id="job-searching" title="Job Searching" className="mb-10">
        <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">
              Exclusive opportunities:
            </strong>{" "}
            recruiters reach out with opportunities you won't find by
            searching, e.g. the Bloomberg Women in Tech Lab.
          </li>
          <li>
            <strong className="text-foreground">Fast-tracking:</strong> when a
            recruiter reaches out to you, they can fast-track you through the
            process, e.g. by letting you skip the recruiter screening.
          </li>
          <li>
            <strong className="text-foreground">Part of your application:</strong>{" "}
            recruiters often view your profile when they review an application,
            so keep it up to date while you're applying.
          </li>
        </ul>
      </PageSection>

      <PageSection title="Examples" className="mb-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {EXAMPLES.map((s) => (
            <LinkCard key={s.name} link={s} />
          ))}
        </div>
      </PageSection>
    </Page>
  )
}
