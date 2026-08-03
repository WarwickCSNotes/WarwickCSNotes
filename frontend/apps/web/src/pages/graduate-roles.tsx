import { useEffect } from "react"
import { ArrowRight, ExternalLink } from "lucide-react"
import { Page } from "@/components/page"
import { PageHeader } from "@/components/page-header"
import { PageSection } from "@/components/page-section"
import { SurfaceAnchor, SurfaceLink } from "@/components/surface"

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
]

const RELATED_GUIDES: InternalGuide[] = [
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

function GuideLink({ guide }: { guide: InternalGuide }) {
  return (
    <SurfaceLink
      to={guide.to}
      className="p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="mb-2 flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold !text-foreground">{guide.name}</h3>
        <ArrowRight className="mt-1 h-4 w-4 shrink-0 opacity-60" />
      </div>
      <p className="text-sm text-muted-foreground">{guide.description}</p>
    </SurfaceLink>
  )
}

export const GraduateRolesPage = () => {
  useEffect(() => {
    document.title = "Graduate Roles"
  }, [])

  return (
    <Page>
      <PageHeader
        title="Graduate Roles"
        subtitle="Finding and applying for graduate roles."
        back={{ to: "/careers", label: "Careers" }}
      />

      <p className="mb-8 max-w-3xl text-muted-foreground">
        Graduate roles are the first full-time job after your degree.
        Applications typically open in autumn of your final year, and
        deadlines can be earlier than you'd expect. Check trackers
        regularly.
      </p>

      <PageSection
        title="Finding where to apply"
        subtitle="Trackers of open graduate applications so you don't miss deadlines."
        className="mb-10"
      >
        <div className="grid grid-cols-1 gap-4">
          {FINDING_ROLES.map((s) => (
            <ResourceCard key={s.name} link={s} />
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
            <GuideLink key={g.name} guide={g} />
          ))}
        </div>
      </PageSection>
    </Page>
  )
}
