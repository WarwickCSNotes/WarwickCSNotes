import { useEffect, useState } from "react"
import { ChevronDown, ExternalLink, FileText, Lightbulb } from "lucide-react"
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

const CALLOUT_STYLES = {
  note: {
    border: "border-blue-500/50",
    bg: "bg-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
    icon: FileText,
  },
  tip: {
    border: "border-teal-500/50",
    bg: "bg-teal-500/10",
    text: "text-teal-600 dark:text-teal-400",
    icon: Lightbulb,
  },
} as const

type CalloutVariant = keyof typeof CALLOUT_STYLES

function Callout({
  variant = "note",
  title,
  children,
  defaultOpen = false,
}: {
  variant?: CalloutVariant
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const style = CALLOUT_STYLES[variant]
  const Icon = style.icon
  const [open, setOpen] = useState(defaultOpen)
  const toggle = () => setOpen((o) => !o)
  return (
    <div
      className={`my-4 rounded-r border-l-4 ${style.border} ${style.bg} px-4 py-3`}
    >
      <div
        className={`flex cursor-pointer items-center gap-2 font-semibold ${style.text} select-none`}
        onClick={toggle}
        role="button"
        aria-expanded={open}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            toggle()
          }
        }}
      >
        <Icon className="h-4 w-4" />
        <span className="flex-1">{title}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "" : "-rotate-90"}`}
        />
      </div>
      <div
        className={`mt-2 text-muted-foreground [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 ${open ? "" : "hidden"}`}
      >
        {children}
      </div>
    </div>
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
        subtitle="Write a CV to pass filters and standout to recruiters."
        back={{ to: "/careers", label: "Careers" }}
      />

      <p className="mb-8 max-w-3xl text-muted-foreground">
        Your CV is often the first thing a recruiter sees, and it's usually
        scanned by AI first. After that, the recruiter will skim-read it
        for maybe 10-15 seconds to decide whether to reject you or
        continue the process.
      </p>

      <PageSection title="Templates" className="mb-10">
        <p className="mb-4 text-muted-foreground">
          Using a widely recognised template helps recruiters (and AI) read
          your CV.
        </p>
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
          <p className="mb-6">
            This is specific advice about each section of the CV; the
            sections from Jake's CV template are used, though the advice
            can be adapted for most CV formats.
          </p>
          <h3 className="mb-2 text-lg font-semibold text-foreground">
            Education
          </h3>
          <p className="mb-3">
            <strong className="text-foreground">Pre-University:</strong> worth
            noting A-Levels and any relevant things you did (e.g. I started a
            CS club during secondary school).
          </p>
          <Callout variant="tip" title="Be a little sneaky with grades">
            <p>
              If you had A*AAA, you can write "A-A* in Subject 1, Subject
              2, ...".
            </p>
          </Callout>
          <p className="mb-3">
            <strong className="text-foreground">University:</strong> note
            relevant modules, standout scores/prizes, and current/predicted
            grade. If not graduated, highly recommend putting down
            predicted grade as{" "}
            <strong className="text-foreground">first</strong>: there's no
            standard for how to predict it, so why not put the highest?
          </p>
          <Callout variant="tip" title="Warwick Award">
            <p className="mb-3">
              A decently easy award to get is the Warwick Award. You may
              even have done the tasks necessary for it without realising!
            </p>
            <p className="mb-3">
              It fits nicely in Jake's template to put it right after the
              degree, e.g.{" "}
              <em className="text-foreground not-italic">
                <strong>
                  <em>Computer Science MEng</em>
                </strong>{" "}
                | <em>Warwick Award (Silver)</em>
              </em>
              .
            </p>
            <p className="mb-3">
              It recognises hours of activity for job skills and asks you
              to do some written reflections on the activities you've
              done.
            </p>
            <p>
              You can access it{" "}
              <a
                href="https://warwick.ac.uk/services/skills/warwickaward/"
                target="_blank"
                rel="noreferrer"
                className="text-primary underline hover:opacity-80"
              >
                here
              </a>
              .
            </p>
          </Callout>
          <div className="mb-6" />

          <h3 className="mb-2 text-lg font-semibold text-foreground">
            Experience
          </h3>
          <p className="mb-3">
            Worth filling in even if you don't have a lot. Society positions
            fit well here.
          </p>
          <Callout variant="tip" title="Understand and own decisions">
            <p className="mb-3">
              If you're leading the project, you should already understand
              (at least vaguely) why you're doing everything, and be able
              to explain that on your CV or in an interview.
            </p>
            <p>
              If you're on an internship and being directed, ask your
              manager and colleagues why certain decisions were made.
              Drill them with questions and you can pick up a
              senior-level understanding of the problem and the
              solution.
            </p>
          </Callout>
          <div className="mb-6" />

          <h3 className="mb-2 text-lg font-semibold text-foreground">
            Projects
          </h3>
          <p className="mb-3">
            Alongside experience, shows you're interested beyond the degree.
          </p>
          <Callout variant="tip" title="Repackage your coursework">
            <p>
              That data structures coursework? That was an interactive movie
              viewer where 100% unit test coverage was achieved.
            </p>
          </Callout>
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
            A few things to keep in mind when writing the bullet points
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
              <strong className="text-foreground">Save space:</strong> you only have a single page. Cut articles ("the",
              "a") where it still reads, drop "I" (it's implicit), and prefer
              numerals and symbols ("50%", "&") over fully spelled-out words. In
              LaTeX,{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                {"\\vspace{-x pt}"}
              </code>{" "}
              gives you some vertical space between sections when things
              are almost fitting. Avoid long verbose sentences that get skipped while skimming.
            </li>
            <li>
              <strong className="text-foreground">Use AI to help:</strong>{" "}
              AI can optimise wording to save space and convey the right
              information in the right tone. Just check the final output
              still reads like you and highlights the skills you want it
              to.
            </li>
          </ul>

          <Callout title="XYZ method">
            <p className="mb-3">
              A common framework for structuring bullets (popularised by
              Google's own resume advice) is the XYZ method: each bullet
              reads as{" "}
              <em className="text-foreground not-italic">
                "Accomplished [X] as measured by [Y], by doing [Z]"
              </em>
              .
            </p>
            <ul className="mb-3 ml-6 list-disc space-y-1">
              <li>
                <strong className="text-foreground">X:</strong> what you
                did / the outcome
              </li>
              <li>
                <strong className="text-foreground">Y:</strong> the
                measurable impact (%, count, time saved, users reached,
                ...)
              </li>
              <li>
                <strong className="text-foreground">Z:</strong> how you
                did it (method, tools, tech)
              </li>
            </ul>
            <p>
              You don't have to hit all three every time, but X + Y is a
              strong default. It forces you to quantify impact instead of
              just listing tasks.
            </p>
          </Callout>
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

      <PageSection title="Common Mistakes" className="mb-10">
        <div className="text-muted-foreground">
          <ul className="ml-6 list-disc space-y-3">
            <li>
              <strong className="text-foreground">
                Spelling and grammar mistakes:
              </strong>{" "}
              easy way for your CV to look unprofessional, and an easy
              mistake to make in Overleaf. Use a tool like{" "}
              <a
                href="https://www.overleaf.com/blog/635-languagetool-a-free-browser-add-on-to-check-your-grammar-and-spelling"
                target="_blank"
                rel="noreferrer"
                className="text-primary underline hover:opacity-80"
              >
                LanguageTool
              </a>{" "}
              (free browser add-on) or AI to catch them.
            </li>
            <li>
              <strong className="text-foreground">Wasting space:</strong>{" "}
              whitespace matters for readability, but you should be using
              space and lines effectively:
              <ul className="mt-2 ml-6 list-[circle] space-y-1">
                <li>
                  Use{" "}
                  <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                    {"\\vspace{-x pt}"}
                  </code>{" "}
                  to reclaim a bit of vertical space when things are almost
                  fitting.
                </li>
                <li>
                  Make sure each bullet point either fits on one line, or
                  fills up its second line as much as possible.
                </li>
                <li>
                  Use AI to optimise wording to fit in space. Just make sure
                  the end output conveys the same information in the same
                  tone.
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </PageSection>

      <PageSection title="General Tips" className="mb-10">
        <div className="text-muted-foreground">
          <Callout title="Keep copies">
            <p>
              Keep copies of your CV, tied to the applications you've
              submitted. You want to remember what you wrote down when it
              comes to the interview!
            </p>
          </Callout>

          <Callout title="Varied but focused">
            <p className="mb-3">
              You only have a page to showcase the breadth of your
              experience.
            </p>
            <p className="mb-3">
              If you've got three teamworking experiences down and no
              independent work down, then why not replace one of those team
              experiences with an instance of independent work?
            </p>
            <p className="mb-3">
              For example, I did a million things as Academic Coordinator
              for UWCS, but I put down 3 bullet points:
            </p>
            <ul className="mb-3 ml-6 list-disc space-y-1">
              <li>
                Used pedagogical principles in producing resources for a
                4-session{" "}
                <strong className="text-foreground">C Course</strong> aimed
                at first year CS students
              </li>
              <li>
                Founded and led the{" "}
                <strong className="text-foreground">
                  XSoc LeetCode Workshops
                </strong>
                , a 6-week collaboration with CodeSoc, for technical
                interview prep
              </li>
              <li>
                Produced and presented{" "}
                <strong className="text-foreground">revision lectures</strong>{" "}
                (e.g. for algorithms and automata) for exams and class
                tests
              </li>
            </ul>
            <p className="mb-3">
              Each bullet point emphasises the main themes (caring about
              learning, putting in the work, and communication) and has a
              clear purpose. But each bullet point has a unique angle too:
            </p>
            <ol className="mb-3 ml-6 list-decimal space-y-2">
              <li>
                Showcases the ability to work independently for a while
                (producing a full course of 4 sessions!) on a resource that
                breaks things down simply ("aimed at first year CS
                students").
              </li>
              <li>
                Showcases the ability to work with other societies and to
                lead that. Also makes clear it's a novel idea ("founded")
                that hadn't been done before.
              </li>
              <li>
                Showcases the ability to produce lecture resources, with
                emphasis on presenting and public speaking skills. Also
                shows a unique interest in academic content.
              </li>
            </ol>
            <p>
              Obviously, keep reinforcing themes relevant to the jobs
              that you're applying for, but also ensure you're showing off
              a variety of skills and not just hammering the same couple skills
              (especially if they're common ones).
            </p>
          </Callout>

          <Callout title="Don't fake it till you make it (too much)">
            <p>
              Don't write anything that you can't back up in an interview
              with the employer. It's okay to exaggerate a little if you
              can defend it, but don't write anything false: getting caught
              lying in an interview is a horrible way to go, and can get
              you blacklisted.
            </p>
          </Callout>
        </div>
      </PageSection>
    </Page>
  )
}
