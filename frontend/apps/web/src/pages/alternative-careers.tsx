import { useEffect } from "react"
import { Page } from "@/components/page"
import { PageHeader } from "@/components/page-header"
import { PageSection } from "@/components/page-section"

const OTHER_ROLES = [
  "IT and Networking",
  "Game Development",
  "Data Analyst",
  "Technical Sales Engineer or Solutions Architect",
  "UX Researcher or Designer",
  "Product or Project Manager",
  "Consultant",
  "Mongolian Goat Farmer",
]

export const AlternativeCareersPage = () => {
  useEffect(() => {
    document.title = "Alternative Careers"
  }, [])

  return (
    <Page>
      <PageHeader
        title="Alternative Careers"
        subtitle="Software Engineering Adjacent careers that are accessible through a Computer Science degree."
      />

      <p className="mb-10 max-w-3xl text-muted-foreground">
        Software engineering isn't the only option: you can shift into almost
        any field. The sooner you work out what you want the better, but
        there's no time limit (except application deadlines).
      </p>

      <PageSection
        title="Roles that aren't software engineering"
        subtitle="A CS degree opens plenty of doors beyond writing code all day:"
        className="mb-10"
      >
        <ul className="ml-6 list-disc space-y-1 text-muted-foreground">
          {OTHER_ROLES.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </PageSection>

      <PageSection
        title="Leaving tech altogether"
        subtitle="You're not locked in. You could:"
        className="mb-10"
      >
        <ul className="ml-6 list-disc space-y-1 text-muted-foreground">
          <li>Become a business student</li>
          <li>Do more maths</li>
          <li>Switch to English</li>
        </ul>
      </PageSection>
    </Page>
  )
}
