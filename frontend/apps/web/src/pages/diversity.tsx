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

const COMMUNITIES: Resource[] = [
  {
    name: "UWCS Wildcards",
    url: "https://uwcs.co.uk/",
    description:
      "A UWCS community. Check the UWCS site for current meet-ups and how to get involved.",
  },
  {
    name: "The Pack (Warwick Esports)",
    url: "https://www.warwickesports.com/thepack/",
    description:
      "Warwick Esports' community for underrepresented gamers.",
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

export const DiversityPage = () => {
  useEffect(() => {
    document.title = "Diversity"
  }, [])

  return (
    <Page>
      <PageHeader
        title="Diversity"
        subtitle="Communities and opportunities for underrepresented groups at Warwick and beyond."
        back={{ to: "/resources", label: "Resources" }}
      />

      <p className="mb-10 max-w-3xl text-muted-foreground">
        Communities and opportunities for underrepresented groups in and
        around Warwick CS. For career-specific programmes (scholarships,
        pipelines, professional communities), see the Careers version of
        this guide below.
      </p>

      <PageSection title="Communities" className="mb-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {COMMUNITIES.map((s) => (
            <ResourceCard key={s.name} link={s} />
          ))}
        </div>
      </PageSection>

      <PageSection title="Careers" className="mb-10">
        <SurfaceLink
          to="/careers/diversity"
          className="p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="mb-2 flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold !text-foreground">
              Diversity (Careers)
            </h3>
            <ArrowRight className="mt-1 h-4 w-4 shrink-0 opacity-60" />
          </div>
          <p className="text-sm text-muted-foreground">
            Career-related opportunities for marginalised groups in tech:
            scholarships, programmes, and pipelines.
          </p>
        </SurfaceLink>
      </PageSection>
    </Page>
  )
}
