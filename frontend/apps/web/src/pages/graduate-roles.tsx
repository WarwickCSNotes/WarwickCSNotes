import { useEffect } from "react"
import { Link } from "react-router-dom"
import { Page } from "@/components/page"
import { PageHeader } from "@/components/page-header"
import { PageSection } from "@/components/page-section"
import { LinkCard, GuideCard } from "@/components/cards"

type Resource = {
  name: string
  url: string
  description: string
}

type InternalGuide = {
  name: string
  to: string
  description: string
}

const FINDING_ROLES: Resource[] = [
  {
    name: "Trackr",
    url: "https://the-trackr.com/trackers/",
    description:
      "A collection of spring weeks, internships and graduate opportunities for Tech and Finance across the US, EU, and the UK.",
  },
  {
    name: "Gradcracker",
    url: "https://www.gradcracker.com/",
    description:
      "Job board for STEM internships, placements and graduate roles.",
  },
  {
    name: "Bright Network",
    url: "https://www.brightnetwork.co.uk/",
    description:
      "Careers platform listing internships and graduate jobs across the UK.",
  },
  {
    name: "LinkedIn Jobs",
    url: "https://www.linkedin.com/jobs/",
    description:
      "Search for roles directly, and set up alerts for the companies you're interested in.",
  },
]

const RELATED_GUIDES: InternalGuide[] = [
  {
    name: "Getting Experience",
    to: "/careers/getting-experience",
    description:
      "Ways to stack up real experience beyond coursework: societies, hackathons, and more.",
  },
  {
    name: "Writing your CV",
    to: "/careers/writing-your-cv",
    description: "Get your CV past filters and standout to recruiters.",
  },
  {
    name: "Interview Prep",
    to: "/careers/interview-prep",
    description: "Prep for the behavioural and technical rounds.",
  },
  {
    name: "Selling Yourself",
    to: "/careers/selling-yourself",
    description: "Optimising your online presence to sell yourself.",
  },
]

export const GraduateRolesPage = () => {
  useEffect(() => {
    document.title = "Graduate Roles"
  }, [])

  return (
    <Page>
      <PageHeader
        title="Graduate Roles"
        subtitle="Finding and applying for graduate roles."
      />

      <p className="mb-8 max-w-3xl text-muted-foreground">
        Graduate roles are the first full-time job after your degree.
        Applications typically open in autumn of your final year, and
        deadlines can be earlier than you'd expect. Check trackers
        regularly, and see the{" "}
        <Link
          to="/careers/internships#timeline"
          className="text-primary underline hover:opacity-80"
        >
          application timeline
        </Link>{" "}
        for how the recruitment year runs.
      </p>

      <PageSection
        title="Finding where to apply"
        subtitle="Trackers of open graduate applications so you don't miss deadlines."
        className="mb-10"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {FINDING_ROLES.map((s) => (
            <LinkCard key={s.name} link={s} />
          ))}
        </div>
      </PageSection>

      <PageSection
        title="Related guides"
        subtitle="The application → interview → offer process shares almost everything with internships. Use the same guides."
        className="mb-10"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {RELATED_GUIDES.map((g) => (
            <GuideCard key={g.name} guide={g} />
          ))}
        </div>
      </PageSection>
    </Page>
  )
}
