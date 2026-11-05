import { useEffect } from "react"
import { ArrowRight } from "lucide-react"
import { Page } from "@/components/page"
import { PageHeader } from "@/components/page-header"
import { PageSection } from "@/components/page-section"
import { SurfaceLink } from "@/components/surface"
import { LinkCard } from "@/components/cards"
import { DataTable } from "@/components/data-table"

type Resource = {
  name: string
  url: string
  description: string
}

const FINDING_WHERE: Resource[] = [
  {
    name: "Bristol Trackr: UK Summer Internships",
    url: "https://app.the-trackr.com/uk-tech/summer-internships",
    description:
      "Widely-used tracker of open UK tech summer internships with deadlines and application links. Check it weekly.",
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

/** A route that's harder to land but still possible. Italic as well as
 *  coloured, so the distinction survives without colour. */
const Stretch = ({ children }: { children: React.ReactNode }) => (
  <em className="block text-sky-700 dark:text-sky-400">{children}</em>
)

export const InternshipsPage = () => {
  useEffect(() => {
    document.title = "Internships"
  }, [])

  return (
    <Page>
      <PageHeader
        title="Internships"
        subtitle="A rough guide to landing an internship: what to work on, where to apply, and how to prepare."
      />

      <div className="mb-10 text-muted-foreground">
        <p className="mb-3">
          Getting an internship generally splits into a few parts:
        </p>
        <ul className="ml-6 list-disc space-y-1">
          <li>
            <strong className="text-foreground">Building yourself up:</strong>{" "}
            getting the experience and credentials that make you a
            compelling candidate. Covered in its own guide:{" "}
            <a
              href="/careers/getting-experience"
              className="text-primary underline hover:opacity-80"
            >
              Getting Experience
            </a>
            .
          </li>
          <li>
            <strong className="text-foreground">Finding where to apply:</strong>{" "}
            knowing which companies are hiring and when.
          </li>
          <li>
            <strong className="text-foreground">Passing the filter:</strong>{" "}
            getting your CV past the initial screen. Covered in its own guide:{" "}
            <a
              href="/careers/writing-your-cv"
              className="text-primary underline hover:opacity-80"
            >
              Writing your CV
            </a>
            .
          </li>
          <li>
            <strong className="text-foreground">
              Crushing the interviews:
            </strong>{" "}
            behavioural and technical rounds. Covered in its own guide:{" "}
            <a
              href="/careers/interview-prep"
              className="text-primary underline hover:opacity-80"
            >
              Interview Prep
            </a>
            .
          </li>
          <li>
            <strong className="text-foreground">Specialisations:</strong>{" "}
            tailoring your prep for the type of role you want.
          </li>
        </ul>
      </div>

      <PageSection
        id="types"
        title="Types of opportunity"
        subtitle="Who each type is normally aimed at:"
        className="mb-10"
      >
        <DataTable
          className="mb-3"
          headers={["Type", "Aimed at"]}
          rows={[
            ["Spring Weeks", "1st years on a BSc and 2nd years on an MEng"],
            ["Internships", "Penultimate-year students"],
            ["Graduate jobs", "Final-year students"],
          ]}
        />
        <p className="text-sm text-muted-foreground">
          Spring Weeks are also called Insight Days. Some companies accept
          penultimate-year students for them too.
        </p>
      </PageSection>

      <PageSection
        id="pipeline"
        title="What to apply for each year"
        subtitle="The conventional route is in plain text. Options in blue italics are harder to find, but still possible."
        className="mb-10"
      >
        <DataTable
          headers={["Year", "1", "2", "3", "4"]}
          rows={[
            [
              "MEng",
              <>
                Spring Weeks
                <Stretch>Internships</Stretch>
              </>,
              <>
                Spring Weeks
                <br />
                Internships
              </>,
              <>
                Internships
                <Stretch>Spring Weeks</Stretch>
              </>,
              <>
                Graduate jobs
                <Stretch>Internships</Stretch>
              </>,
            ],
            [
              "BSc",
              <>
                Spring Weeks
                <Stretch>Internships</Stretch>
              </>,
              <>
                Internships
                <Stretch>Spring Weeks</Stretch>
              </>,
              <>
                Graduate jobs
                <Stretch>Internships</Stretch>
              </>,
              "(Graduated)",
            ],
          ]}
        />
      </PageSection>

      <PageSection
        id="timeline"
        title="Application timeline"
        subtitle="Roughly how the recruitment year lines up with Warwick's terms:"
        className="mb-10"
      >
        <DataTable
          className="mb-3"
          headers={["When", "What happens"]}
          rows={[
            ["August to September", "The new application season begins"],
            ["First half of Term 1", "First wave of applications opens"],
            [
              "Term 1 break to mid Term 2",
              "Second wave of applications opens",
            ],
            ["Term 2 break", "Spring Weeks take place"],
          ]}
        />
        <p className="text-sm text-muted-foreground">
          You can apply from the start of the season until around the middle
          of Term 3, so don't panic if you miss the first wave.
        </p>
      </PageSection>

      <PageSection
        title="Building yourself up"
        subtitle="The experience side of your application: societies, projects, hackathons. This has its own dedicated guide:"
        className="mb-10"
      >
        <SurfaceLink
          to="/careers/getting-experience"
          className="p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="mb-2 flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold !text-foreground">
              Getting Experience
            </h3>
            <ArrowRight className="mt-1 h-4 w-4 shrink-0 opacity-60" />
          </div>
          <p className="text-sm text-muted-foreground">
            Ways to stack up real experience beyond coursework:
            internships, societies, hackathons.
          </p>
        </SurfaceLink>
      </PageSection>

      <PageSection
        title="Finding where to apply"
        subtitle="Trackers of open internship applications so you don't miss deadlines. Check regularly; applications open in waves throughout the year."
        className="mb-10"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {FINDING_WHERE.map((s) => (
            <LinkCard key={s.name} link={s} />
          ))}
        </div>
      </PageSection>

      <PageSection
        title="Passing the filter"
        subtitle="Your CV is the first thing a recruiter sees, and often the only thing before automated filtering. This has its own dedicated guide:"
        className="mb-10"
      >
        <SurfaceLink
          to="/careers/writing-your-cv"
          className="p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="mb-2 flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold !text-foreground">
              Writing your CV
            </h3>
            <ArrowRight className="mt-1 h-4 w-4 shrink-0 opacity-60" />
          </div>
          <p className="text-sm text-muted-foreground">
            Templates and resources for writing a CV that survives the initial
            recruiter filter and applicant-tracking systems.
          </p>
        </SurfaceLink>
      </PageSection>

      <PageSection
        title="Crushing the interviews"
        subtitle="Interviews split into a behavioural round (STAR-format stories about impact, teamwork, and conflict) and a technical round (data structures, algorithms, and, for more senior positions, system design). This has its own dedicated guide:"
        className="mb-10"
      >
        <SurfaceLink
          to="/careers/interview-prep"
          className="p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="mb-2 flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold !text-foreground">
              Interview Prep
            </h3>
            <ArrowRight className="mt-1 h-4 w-4 shrink-0 opacity-60" />
          </div>
          <p className="text-sm text-muted-foreground">
            Resources and structure for the behavioural and technical rounds
            (DSA, system design, and STAR-format stories).
          </p>
        </SurfaceLink>
      </PageSection>

      <PageSection
        title="Specialisations"
        subtitle="If you already know you're aiming at a specific area, the interview prep looks very different from generic software engineering."
      >
        <div className="text-muted-foreground">
          <p className="mb-3">
            A few examples of specialised tracks worth calling out:
          </p>
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <strong className="text-foreground">Consultancy</strong>: case
              studies and market-sizing rather than coding puzzles. Different
              CV emphasis (impact, quantified results) and different mock-
              interview practice.
            </li>
            <li>
              <strong className="text-foreground">Quant / trading</strong>:
              probability, brain-teasers, and mental-maths speed rounds. Very
              high maths bar, generally very high compensation, and a very
              different applicant pool.
            </li>
            <li>
              <strong className="text-foreground">ML / research</strong>:
              expect deep questions on modelling, papers you've read, and
              evidence of applied ML work (kaggle, published projects, prior
              research).
            </li>
            <li>
              <strong className="text-foreground">Security</strong>: CTF
              performance and offensive/defensive projects carry more weight
              than generic SWE experience.
            </li>
          </ul>
        </div>
      </PageSection>
    </Page>
  )
}
