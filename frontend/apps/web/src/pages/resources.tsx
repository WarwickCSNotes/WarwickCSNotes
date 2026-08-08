import { useEffect } from "react"
import { Page } from "@/components/page"
import { PageHeader } from "@/components/page-header"
import { PageSection } from "@/components/page-section"
import { LinkCard, GuideCard } from "@/components/cards"

type ResourceLink = {
  name: string
  url: string
  description: string
}

type InternalGuide = {
  name: string
  to: string
  description: string
}

const GUIDES: InternalGuide[] = [
  {
    name: "Open Source Contributions",
    to: "/resources/open-source-contributions",
    description:
      "How to start contributing to open-source projects, including this site.",
  },
  {
    name: "Diversity",
    to: "/diversity",
    description:
      "Communities and opportunities for underrepresented groups at Warwick and beyond.",
  },
  {
    name: "Disability & Support",
    to: "/disability-support",
    description: "Resources and support for disabled students at Warwick.",
  },
]

const DCS_RESOURCES: ResourceLink[] = [
  {
    name: "DCS Student Handbook",
    url: "https://warwick.ac.uk/fac/sci/dcs/teaching/handbook/",
    description:
      "The department's official handbook for undergraduates. Covers module structure, assessment policies, and support.",
  },
  {
    name: "Exam Feedback",
    url: "https://warwick.ac.uk/fac/sci/dcs/teaching/examinationsfeedback/",
    description:
      "Cohort-level examiner feedback for past DCS exams. Useful for spotting recurring mistakes before revising.",
  },
]

const SOCIETY_RESOURCES: ResourceLink[] = [
  {
    name: "UWCS Resources",
    url: "https://uwcs.co.uk/resources/",
    description:
      "Resources collected by the University of Warwick Computing Society: talks, workshops, language courses, and more.",
  },
]

export const ResourcesPage = () => {
  useEffect(() => {
    document.title = "Resources"
  }, [])

  return (
    <Page>
      <PageHeader
        title="Resources"
        subtitle="Non-module-specific resources: departmental references, society material, and external guides."
      />

      <p className="mb-8 max-w-3xl text-muted-foreground">
        An entrypoint to resources that aren't tied to a single module or tied to academia.
      </p>

      <PageSection title="Guides" className="mb-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {GUIDES.map((g) => (
            <GuideCard key={g.name} guide={g} />
          ))}
        </div>
      </PageSection>

      <PageSection title="DCS" className="mb-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {DCS_RESOURCES.map((r) => (
            <LinkCard key={r.name} link={r} />
          ))}
        </div>
      </PageSection>

      <PageSection title="Society" className="mb-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {SOCIETY_RESOURCES.map((r) => (
            <LinkCard key={r.name} link={r} />
          ))}
        </div>
      </PageSection>
    </Page>
  )
}
