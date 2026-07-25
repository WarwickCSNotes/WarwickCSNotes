import { useEffect } from "react"
import { ExternalLink } from "lucide-react"
import { Page } from "@/components/page"
import { PageHeader } from "@/components/page-header"
import { PageSection } from "@/components/page-section"
import { SurfaceAnchor } from "@/components/surface"

type Resource = {
  name: string
  url: string
  description: string
}

const TECHNICAL: Resource[] = [
  {
    name: "NeetCode",
    url: "https://neetcode.io/",
    description:
      "Curated data-structures and algorithms practice, organised by pattern with video walkthroughs. The default starting point for the technical round.",
  },
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
]

function ResourceCard({ link }: { link: Resource }) {
  return (
    <SurfaceAnchor
      href={link.url}
      target="_blank"
      rel="noreferrer"
      className="p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="mb-2 flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold !text-foreground">{link.name}</h3>
        <ExternalLink className="mt-1 h-4 w-4 shrink-0 opacity-60" />
      </div>
      <p className="text-sm text-muted-foreground">{link.description}</p>
    </SurfaceAnchor>
  )
}

export const InterviewPrepPage = () => {
  useEffect(() => {
    document.title = "Interview Prep"
  }, [])

  return (
    <Page>
      <PageHeader
        title="Interview Prep"
        subtitle="Interviews split into a behavioural round (STAR-format stories about impact, teamwork, and conflict) and a technical round (data structures, algorithms, and, for more senior positions, system design). Both need dedicated practice."
        back={{ to: "/careers", label: "Careers" }}
      />

      <PageSection
        title="Technical"
        subtitle="Data structures and algorithms first, then system design once you're comfortable with the basics."
        className="mb-10"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {TECHNICAL.map((s) => (
            <ResourceCard key={s.name} link={s} />
          ))}
        </div>
      </PageSection>
    </Page>
  )
}
