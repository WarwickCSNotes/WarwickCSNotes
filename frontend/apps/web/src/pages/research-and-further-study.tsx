import { useEffect } from "react"
import { Page } from "@/components/page"
import { PageHeader } from "@/components/page-header"
import { PageSection } from "@/components/page-section"
import { LinkCard } from "@/components/cards"
import { DataTable } from "@/components/data-table"

type Resource = {
  name: string
  url: string
  description: string
}

const RESEARCH_ACTIVITIES = [
  "Gathering relevant sources",
  "Understanding complex concepts",
  "Analysing data",
  "Summarising effectively",
  "Presenting results",
]

const JOB_LISTING_SKILLS = [
  "Market research",
  "Data mining",
  "Systems thinking",
  "Technical comprehension",
  "Quantitative analysis",
  "Predictive analytics",
  "Information synthesis",
  "Executive reporting",
  "Technical writing",
  "Data storytelling",
  "Data visualisation",
  "Stakeholder management",
  "Presence",
]

const URSS: Resource = {
  name: "DCS URSS Academics & Topics",
  url: "https://warwick.ac.uk/fac/sci/dcs/research/urss/",
  description:
    "Computer Science academics offering URSS supervision, and the topics they're interested in.",
}

const LOVELACE: Resource = {
  name: "BCSWomen Lovelace Colloquium",
  url: "https://bcswomenlovelace.bcs.org/",
  description:
    "The official site, with the call for abstracts and the latest dates and rules.",
}

export const ResearchAndFurtherStudyPage = () => {
  useEffect(() => {
    document.title = "Research & Further Study"
  }, [])

  return (
    <Page>
      <PageHeader
        title="Research & Further Study"
        subtitle="Research opportunities during your degree, and your options for a Master's or PhD."
      />

      <PageSection
        title="Why do research?"
        subtitle="It's fun, and the skills you build are the ones employers list in job adverts."
        className="mb-10"
      >
        <div className="grid grid-cols-1 gap-6 text-muted-foreground md:grid-cols-3">
          <div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">
              What you do in research
            </h3>
            <ul className="ml-6 list-disc space-y-1">
              {RESEARCH_ACTIVITIES.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <h3 className="mb-2 text-lg font-semibold text-foreground">
              What that looks like on a job listing
            </h3>
            <ul className="ml-6 list-disc gap-x-8 space-y-1 sm:columns-2">
              {JOB_LISTING_SKILLS.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-4 text-muted-foreground">
          Research also earns its place on a CV. The same URSS project or
          poster competition entry works whether you're applying for software
          engineering roles or for a Master's.
        </p>
      </PageSection>

      <PageSection title="Master's and PhD" className="mb-10">
        <DataTable
          headers={["Route", "What you need to know"]}
          rows={[
            [
              "Integrated Master's",
              "This is the 4th year at Warwick. You need at least 60% in 2nd year (65% for Discrete Mathematics).",
            ],
            [
              "CS Master's elsewhere",
              "Apply during 3rd year. Deadlines vary between January and August.",
            ],
            [
              "PhD",
              "Apply during your Master's. You'll need a research proposal, or to find an available project.",
            ],
          ]}
        />
      </PageSection>

      <PageSection
        title="Use your lecturers"
        subtitle="Lecturers can open the door to a lot of opportunities, so don't be afraid to contact them."
        className="mb-10"
      >
        <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">
              They want to talk about their interests:
            </strong>{" "}
            they're in academia, after all.
          </li>
          <li>
            <strong className="text-foreground">
              Don't feel discouraged by silence:
            </strong>{" "}
            a lot of them won't answer, so contact several.
          </li>
        </ul>
      </PageSection>

      <PageSection
        id="urss"
        title="Undergraduate Research Support Scheme (URSS)"
        subtitle="A research project over the summer, supervised by an academic. It's fun, good experience, and a chance to get advice from your supervisor and learn more about a topic."
        className="mb-10"
      >
        <ul className="mb-4 ml-6 list-disc space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">When:</strong> during any
            summer, any number of times.
          </li>
          <li>
            <strong className="text-foreground">Funding:</strong> up to
            £1,500, but you can only receive it once.
          </li>
          <li>
            <strong className="text-foreground">Topic:</strong> you don't need
            to come up with one yourself. Email lecturers about project ideas.
          </li>
          <li>
            <strong className="text-foreground">Supervisor:</strong> you can
            partner with any academic in any department.
          </li>
        </ul>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <LinkCard link={URSS} />
        </div>
      </PageSection>

      <PageSection
        id="lovelace"
        title="BCSWomen Lovelace Colloquium"
        subtitle="A conference and poster competition for women and non-binary computing students. Research a tech topic, then make and present a poster."
        className="mb-10"
      >
        <p className="mb-3 text-muted-foreground">
          It's a really fun experience: you meet new people, get a chance to
          present, and have a creative outlet. UWCS also runs events to help
          you prepare, so look out for those.
        </p>
        <DataTable
          className="mb-4"
          headers={["2027 colloquium", "Details"]}
          rows={[
            ["Abstract deadline", "8 February"],
            ["Poster submission", "8 March"],
            ["Event", "8 April, University of Birmingham"],
          ]}
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <LinkCard link={LOVELACE} />
        </div>
      </PageSection>

      <PageSection title="3rd and 4th year projects" className="mb-10">
        <p className="text-muted-foreground">
          You can continue your URSS or Lovelace research into your 3rd or 4th
          year project, so that early work can keep paying off.
        </p>
      </PageSection>
    </Page>
  )
}
