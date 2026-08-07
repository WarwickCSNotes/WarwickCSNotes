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
]

export const LinkedInMaxxingPage = () => {
  useEffect(() => {
    document.title = "LinkedIn Maxxing"
  }, [])

  return (
    <Page>
      <PageHeader
        title="LinkedIn Maxxing"
        subtitle="Getting the most out of LinkedIn: profile, connecting, posts, and job searching."
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

      <PageSection
        id="connecting"
        title="Connecting"
        className="mb-10"
      />

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

      <PageSection
        id="job-searching"
        title="Job Searching"
        className="mb-10"
      />

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
