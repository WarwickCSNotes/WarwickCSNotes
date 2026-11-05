import { useEffect } from "react"
import { Page } from "@/components/page"
import { PageHeader } from "@/components/page-header"
import { PageSection } from "@/components/page-section"
import { LinkCard } from "@/components/cards"

const SPONSOR_REGISTER = {
  name: "Register of Licensed Sponsors (GOV.UK)",
  url: "https://www.gov.uk/government/publications/register-of-licensed-sponsors-workers",
  description:
    "The UK government's list of every organisation licensed to sponsor workers. Check it to see if a company you're applying to can sponsor your visa.",
}

const ADVICE: { title: string; text: string }[] = [
  {
    title: "Sponsorship:",
    text: "visa sponsorship varies by employer and role. Check the vacancy's sponsorship policy and the employer's Skilled Worker sponsor licence; being on the register does not mean every role is sponsored.",
  },
  {
    title: "First-year internships:",
    text: "UK companies tend not to hire interns in first year, but companies in many students' home countries do. Any internship experience is valuable, and having one as a first year makes you more competitive.",
  },
  {
    title: "Your country's societies:",
    text: "join them and their group chats, and look out for opportunities such as on-campus interviews.",
  },
]

export const InternationalStudentsPage = () => {
  useEffect(() => {
    document.title = "International Students"
  }, [])

  return (
    <Page>
      <PageHeader
        title="International Students"
        subtitle="Visa routes and career advice for international students."
      />

      <PageSection
        title="Visa routes"
        subtitle="There are two common routes to working in the UK after your degree:"
        className="mb-10"
      >
        <ul className="ml-6 list-disc space-y-1 text-muted-foreground">
          <li>Student Visa → Skilled Worker Visa</li>
          <li>Student Visa → Graduate Visa → Skilled Worker Visa</li>
        </ul>
      </PageSection>

      <PageSection title="Advice" className="mb-10">
        <ul className="mb-4 ml-6 list-disc space-y-2 text-muted-foreground">
          {ADVICE.map((a) => (
            <li key={a.title}>
              <strong className="text-foreground">{a.title}</strong> {a.text}
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <LinkCard link={SPONSOR_REGISTER} />
        </div>
      </PageSection>
    </Page>
  )
}
