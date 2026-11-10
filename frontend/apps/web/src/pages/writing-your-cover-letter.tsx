import { useEffect } from "react"
import { Page } from "@/components/page"
import { PageHeader } from "@/components/page-header"
import { PageSection } from "@/components/page-section"

export const WritingYourCoverLetterPage = () => {
  useEffect(() => {
    document.title = "Writing your Cover Letter"
  }, [])

  return (
    <Page>
      <PageHeader
        title="Writing your Cover Letter"
        subtitle="A quick, repeatable way to write cover letters."
      />

      <p className="mb-8 max-w-3xl text-muted-foreground">
        Cover letters are often optional, and plenty of people say they're not
        much use. They're still worth doing if you can, and a template makes
        them quick.
      </p>

      <PageSection title="Using a template" className="mb-10">
        <ol className="ml-6 list-decimal space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">
              Create a template for each category
            </strong>{" "}
            of company you're applying to, e.g. fintech, game dev, big tech,
            and start-ups.
          </li>
          <li>
            <strong className="text-foreground">Add placeholders</strong> for
            the parts that change, e.g. [Company Name] and [Relevant Projects].
          </li>
          <li>
            <strong className="text-foreground">
              Use AI to fill in the placeholders
            </strong>{" "}
            for each company.
          </li>
          <li>
            <strong className="text-foreground">Write it in LaTeX</strong> for
            cleaner formatting.
          </li>
        </ol>
      </PageSection>

      <PageSection
        title="Format"
        subtitle="Stick to the standard letter layout:"
        className="mb-10"
      >
        <ul className="ml-6 list-disc space-y-1 text-muted-foreground">
          <li>Your name, location and contact details at the top right</li>
          <li>The date</li>
          <li>The recipient: team, company and location</li>
          <li>A greeting, e.g. "Dear [Company Name] Hiring Manager,"</li>
          <li>
            A short opening saying which role you're interested in and why
          </li>
          <li>
            A few paragraphs on what draws you to the company and how your
            experience fits, using specifics rather than generic praise
          </li>
          <li>A brief thank you, then your sign-off and name</li>
        </ul>
      </PageSection>
    </Page>
  )
}
