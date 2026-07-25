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

const TEMPLATES: Resource[] = [
  {
    name: "Jake's Resume Template (Overleaf)",
    url: "https://www.overleaf.com/latex/templates/jakes-resume/syzfjbzwjncs",
    description:
      "A widely-recommended LaTeX resume template. Single page, ATS-friendly, and easy to skim.",
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

export const WritingYourCVPage = () => {
  useEffect(() => {
    document.title = "Writing your CV"
  }, [])

  return (
    <Page>
      <PageHeader
        title="Writing your CV"
        subtitle="Your CV is often the first thing a recruiter sees, and it's usually scanned by AI first. After that, the recruiter will skim-read it for maybe 10-15 seconds to decide whether to reject you or continue the process."
        back={{ to: "/careers", label: "Careers" }}
      />

      <PageSection
        title="Templates"
        subtitle="Using a widely recognised template helps recruiters (and AI) read your CV."
        className="mb-10"
      >
        <div className="grid grid-cols-1 gap-4">
          {TEMPLATES.map((s) => (
            <ResourceCard key={s.name} link={s} />
          ))}
        </div>
      </PageSection>

      <PageSection title="Format" className="mb-10">
        <div className="text-muted-foreground">
          <p className="mb-3">
            Using a template as recommended above will eliminate most of this
            advice. But generally:
          </p>
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <strong className="text-foreground">
                Keep the CV to a page long:
              </strong>{" "}
              Recruiters are just skimming and you should write concisely
              enough to fit everything on a page. If you need 2 pages for
              whatever reason, don't leave half-pages: they look weird.
            </li>
            <li>
              <strong className="text-foreground">Consistent format:</strong>{" "}
              It's jarring to see a font change mid-CV, or spacing that varies
              between sections.
            </li>
            <li>
              <strong className="text-foreground">Highlight stuff:</strong>{" "}
              Recruiters skim, so bold stuff that sounds impressive: things
              like statistics, relevant tools, and interesting concepts.
            </li>
            <li>
              <strong className="text-foreground">Break stuff up:</strong>{" "}
              Don't use big paragraphs. To make it easier for recruiters to
              skim: use bullet points, one-line sentences, and keywords (e.g.
              in Jake's template, key technologies right next to the project
              title).
            </li>
            <li>
              <strong className="text-foreground">
                Include contact information
              </strong>{" "}
              somewhere: GitHub, LinkedIn, a portfolio website if you have
              one, etc. Everything linked from your CV should be professional
              though.
            </li>
          </ul>
        </div>
      </PageSection>

      <PageSection title="CV Sections" className="mb-10">
        <div className="text-muted-foreground">
          <h3 className="mb-2 text-lg font-semibold text-foreground">
            Education
          </h3>
          <p className="mb-3">
            <strong className="text-foreground">Pre-University:</strong> worth
            noting A-Levels and any relevant things you did (e.g. I started a
            CS club during secondary school).
          </p>
          <p className="mb-3">
            <strong className="text-foreground">Tip:</strong> you can be a
            little sneaky with grades. If you had A*AAA, you can write "A-A*
            in Subject 1, Subject 2, ...".
          </p>
          <p className="mb-6">
            <strong className="text-foreground">University:</strong> note
            relevant modules, standout scores/prizes, and current/predicted
            grade. Highly recommend putting your current/predicted grade
            first: there's no standard for how to predict it, so why not put
            the highest?
          </p>

          <h3 className="mb-2 text-lg font-semibold text-foreground">
            Experience
          </h3>
          <p className="mb-6">
            Worth filling in even if you don't have a lot. Society positions
            fit well here.
          </p>

          <h3 className="mb-2 text-lg font-semibold text-foreground">
            Projects
          </h3>
          <p className="mb-3">
            Alongside experience, shows you're interested beyond the degree.
          </p>
          <p className="mb-3">
            <strong className="text-foreground">Tip:</strong> you can
            repackage coursework. That data structures coursework? That was
            an interactive movie viewer where 100% unit test coverage was
            achieved.
          </p>
          <p className="mb-6">
            If you're struggling to fit everything into Projects, add a line
            like "Other projects available at <em>your GitHub</em>". This
            signals there's much more to show. Worth prettying up your GitHub
            profile to advertise those projects!
          </p>

          <h3 className="mb-2 text-lg font-semibold text-foreground">
            Technical Skills
          </h3>
          <p className="mb-6">
            A good place to smash keywords to pass AI filters. Debatable
            whether it's needed, since you can shove all the
            skills/technologies into Experience and Projects entries anyway.
          </p>

          <h3 className="mb-2 text-lg font-semibold text-foreground">
            Interests
          </h3>
          <p>
            The small bit where you show you're not a Computer Science robot.
            Just mention your cool hobbies, and add specific details to
            demonstrate dedication. For example, I've written "Climbing
            (Bouldering V6)" to show I actually climb. I like to keep this to
            just one line.
          </p>
        </div>
      </PageSection>

      <PageSection title="Style of writing" className="mb-10">
        <div className="text-muted-foreground">
          <p className="mb-3">
            Two things to keep in mind when writing the bullet points
            themselves:
          </p>
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <strong className="text-foreground">
                Action-oriented language:
              </strong>{" "}
              start each bullet with a strong verb (Built, Led, Designed,
              Shipped, Optimised). Avoid filler like "Responsible for", "Worked
              on", or "Helped with": they hide what you actually did. Focus on
              the outcome (what you shipped, what improved) not the activity.
            </li>
            <li>
              <strong className="text-foreground">Save space:</strong> every
              line competes for room on a single page. Cut articles ("the",
              "a") where it still reads, drop "I" (it's implicit), and prefer
              numerals and symbols ("50%", "&") over spelled-out words. Terse
              is skimmable; long sentences get glossed over.
            </li>
          </ul>
        </div>
      </PageSection>

      <PageSection title="Tailoring" className="mb-10">
        <div className="text-muted-foreground">
          <p className="mb-3">
            You'll likely have to tailor your CV for different roles,
            especially if you're applying across a lot of different fields
            (e.g. SWE, research, and Product Management).
          </p>
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <strong className="text-foreground">
                Use keywords from the job listing
              </strong>{" "}
              in your tailored CV. Make sure every key skill/technology is
              mentioned so they have no reason to bin your CV.
            </li>
            <li>
              <strong className="text-foreground">
                Keep multiple variants
              </strong>{" "}
              of your CV for different roles (e.g. one for data science, one
              for web design). Makes tailoring a lot quicker.
            </li>
          </ul>
        </div>
      </PageSection>

      <PageSection
        title="Don't fake it till you make it (too much)"
        className="mb-10"
      >
        <div className="text-muted-foreground">
          <p>
            Don't write anything that you can't back up in an interview with
            the employer. It's okay to exaggerate a little if you can defend
            it, but don't write anything false: getting caught lying in an
            interview is a horrible way to go, and can get you blacklisted.
          </p>
        </div>
      </PageSection>

      <PageSection title="General Tips" className="mb-10">
        <div className="text-muted-foreground">
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <strong className="text-foreground">Keep copies</strong> of your
              CV, tied to the applications you've submitted. You want to
              remember what you wrote down when it comes to the interview!
            </li>
          </ul>
        </div>
      </PageSection>
    </Page>
  )
}
