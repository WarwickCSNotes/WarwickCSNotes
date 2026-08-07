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

const WOMEN_IN_COMPUTING: Resource[] = [
  {
    name: "ACM-W Scholarships",
    url: "https://women.acm.org/scholarships/",
    description:
      "ACM's Council on Women in Computing offers scholarships for women to attend research conferences.",
  },
]

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
            <LinkCard key={s.name} link={s} />
          ))}
        </div>
      </PageSection>
    </Page>
  )
}
