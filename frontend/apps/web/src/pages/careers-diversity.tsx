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

const WOMEN_IN_COMPUTING: Resource[] = [
  {
    name: "ACM-W Scholarships",
    url: "https://women.acm.org/scholarships/",
    description:
      "ACM's Council on Women in Computing offers scholarships for women to attend research conferences.",
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

export const CareersDiversityPage = () => {
  useEffect(() => {
    document.title = "Diversity (Careers)"
  }, [])

  return (
    <Page>
      <PageHeader
        title="Diversity"
        subtitle="Career-related opportunities for marginalised groups in tech: scholarships, programmes, and pipelines."
      />

      <p className="mb-10 max-w-3xl text-muted-foreground">
        Scholarships, communities, and programmes aimed at underrepresented
        and marginalised groups in tech. These can open doors
        (conferences, funding, mentorship, recruiter pipelines) that are
        otherwise hard to find.
      </p>

      <PageSection title="Women in Computing" className="mb-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {WOMEN_IN_COMPUTING.map((s) => (
            <ResourceCard key={s.name} link={s} />
          ))}
        </div>
      </PageSection>
    </Page>
  )
}
