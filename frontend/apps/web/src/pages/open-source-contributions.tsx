import { useEffect } from "react"
import { ArrowRight } from "lucide-react"
import { Page } from "@/components/page"
import { PageHeader } from "@/components/page-header"
import { PageSection } from "@/components/page-section"
import { SurfaceLink } from "@/components/surface"
import { LinkCard } from "@/components/cards"

const INITIATIVES = [
  {
    name: "Google Summer of Code",
    url: "https://summerofcode.withgoogle.com/",
    description:
      "Google's flagship summer programme funding open-source contributions. Start early and get a few small contributions in beforehand to maximise your chances.",
  },
]

export const OpenSourceContributionsPage = () => {
  useEffect(() => {
    document.title = "Open Source Contributions"
  }, [])

  return (
    <Page>
      <PageHeader
        title="Open Source Contributions"
        subtitle="Contributing to open-source projects: why, how, and where to start."
      />

      <p className="mb-10 max-w-3xl text-muted-foreground">
        Open-source contributions are a great way to build real coding
        experience outside of coursework: work on a live codebase, get code
        review from experienced maintainers, and end up with public work
        recruiters can actually inspect.
      </p>

      <PageSection title="Finding projects" className="mb-10">
        <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">
              Contribute to tools you already use:
            </strong>{" "}
            libraries, dev tools, editor plugins. You already know the pain
            points, and you'll appreciate the fixes.
          </li>
          <li>
            <strong className="text-foreground">
              Look for "good first issue" labels:
            </strong>{" "}
            GitHub's global search for{" "}
            <em className="text-foreground not-italic">"good first issue"</em>{" "}
            surfaces beginner-friendly issues across every public repo.
          </li>
          <li>
            <strong className="text-foreground">Warwick projects:</strong>{" "}
            UWCS repos and this site are both open to contributions.
          </li>
        </ul>
      </PageSection>

      <PageSection title="Open Source Initiatives" className="mb-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {INITIATIVES.map((i) => (
            <LinkCard key={i.name} link={i} />
          ))}
        </div>
      </PageSection>

      <PageSection title="Getting started" className="mb-10">
        <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">
              Read CONTRIBUTING.md first:
            </strong>{" "}
            most projects have one. It saves you (and the maintainers) a
            lot of back-and-forth.
          </li>
          <li>
            <strong className="text-foreground">Start small:</strong> typo
            fixes, docs improvements, small bug fixes. Get familiar with
            the review process before tackling anything larger.
          </li>
          <li>
            <strong className="text-foreground">
              Open an issue before a large PR:
            </strong>{" "}
            maintainers may already have plans for the area you want to
            touch, or reasons for the current design. A quick issue avoids
            a rejected PR.
          </li>
        </ul>
      </PageSection>

      <PageSection title="Contribute to this site" className="mb-10">
        <p className="mb-4 text-muted-foreground">
          Warwick CS Notes is itself open source and welcomes
          contributions. Content (notes, solutions, quizzes) is just as
          valuable as code.
        </p>
        <SurfaceLink
          to="/resources/how-to-contribute"
          className="p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="mb-2 flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold !text-foreground">
              How to Contribute
            </h3>
            <ArrowRight className="mt-1 h-4 w-4 shrink-0 opacity-60" />
          </div>
          <p className="text-sm text-muted-foreground">
            Step-by-step guides for adding notes, exam paper solutions,
            quizzes, and external resources.
          </p>
        </SurfaceLink>
      </PageSection>
    </Page>
  )
}
