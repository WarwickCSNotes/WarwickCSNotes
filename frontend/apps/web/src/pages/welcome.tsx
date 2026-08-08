import { useEffect } from "react"
import { ArrowRight, ExternalLink, Github, Linkedin, MessageSquare } from "lucide-react"
import { Page } from "@/components/page"
import { PageHeader } from "@/components/page-header"
import { PageSection } from "@/components/page-section"
import { SurfaceLink } from "@/components/surface"

/** Every destination on this page is a card you can click, grouped under the
 *  section it belongs to. Each card names the thing, says what's on the other
 *  side of it, and ends with the action it performs — the page is a set of
 *  buttons rather than a set of sentences with links buried in them. */

const YEARS = [1, 2, 3, 4]

const SOCIALS = [
  {
    name: "Discord",
    url: "https://discord.gg/wdQxub7z9V",
    Icon: MessageSquare,
  },
  {
    name: "GitHub",
    url: "https://github.com/WarwickCSNotes/WarwickCSNotes",
    Icon: Github,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/warwick-cs-notes",
    Icon: Linkedin,
  },
]

type Tile = {
  name: string
  to: string
  description: string
  /** Footer wording — what clicking the card does. */
  action: string
}

/** Careers and Resources keep their own guides on their own pages, so each is
 *  one card here. The description lists what those pages contain. */
const HUBS: Tile[] = [
  {
    name: "Careers",
    to: "/careers",
    description:
      "Guides on internships, CVs, interviews and graduate roles, plus societies and job trackers.",
    action: "Open careers",
  },
  {
    name: "Resources",
    to: "/resources",
    description:
      "Department handbooks, exam feedback, society material, and support for disabled and underrepresented students.",
    action: "Open resources",
  },
]

const ABOUT: Tile[] = [
  {
    name: "Credits",
    to: "/acknowledgements",
    description: "The students who wrote the notes, quizzes and solutions.",
    action: "Open credits",
  },
  {
    name: "Contribute",
    to: "/resources/open-source-contributions",
    description: "How to add notes or fix a mistake in the ones already here.",
    action: "Read guide",
  },
]

/** A solid, unmissable call to action. Built from tokens so it survives the
 *  dragon/cat/contrast themes. */
const primaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"

/** The card's action, sized like a shadcn `sm` button and pinned bottom-right.
 *
 *  It's a span, not a button: the whole card is already an anchor, and an
 *  interactive element can't be nested inside one. The hover state therefore
 *  hangs off the card's `group` rather than the span's own `:hover`, which is
 *  what makes the button light up when you're anywhere on the card. */
const cardActionClass =
  "inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors group-hover:bg-primary/80"

const socialButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg border bg-surface px-3 py-1.5 text-xs font-medium text-surface-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:bg-surface-hover hover:shadow-md"

const yearGrid = "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
/** Two hubs, so two columns — a three-up row would leave a hole. */
const hubGrid = "grid grid-cols-1 gap-4 sm:grid-cols-2"
const grid = "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"

/** The card used everywhere on the page. Identical footprint whatever it links
 *  to, so scanning the page is scanning one shape.
 *
 *  `h-full` opts into the grid's stretch and `mt-auto` pins the footer to the
 *  bottom, which is what makes every card in a row the same height however
 *  long its description runs. */
function ActionCard({ tile }: { tile: Tile }) {
  return (
    <SurfaceLink
      to={tile.to}
      className="group flex h-full flex-col p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="mb-5">
        <h3 className="text-lg font-semibold !text-foreground">{tile.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{tile.description}</p>
      </div>
      <div className="mt-auto flex justify-end">
        <span className={cardActionClass}>
          {tile.action}
          <ArrowRight className="h-3.5 w-3.5 shrink-0" />
        </span>
      </div>
    </SurfaceLink>
  )
}

/** Years get a larger treatment than the cards below: they're the reason most
 *  people are here, so they shouldn't look like the eighth card of the same
 *  size. */
function YearTile({ year }: { year: number }) {
  return (
    <SurfaceLink
      to={`/year/${year}`}
      className="group flex h-full flex-col p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <span className="text-3xl font-bold">Year {year}</span>
      <span className="mt-1 mb-5 text-sm text-muted-foreground">
        Modules, notes, past papers and solutions.
      </span>
      <div className="mt-auto flex justify-end">
        <span className={cardActionClass}>
          Browse modules
          <ArrowRight className="h-3.5 w-3.5 shrink-0" />
        </span>
      </div>
    </SurfaceLink>
  )
}

export const Welcome = () => {
  useEffect(() => {
    document.title = "CS Notes"
  }, [])

  return (
    <Page>
      <PageHeader
        title="Warwick CS Notes"
        subtitle={
          <span className="block max-w-2xl">
            Student-written notes, past papers and quizzes for the Warwick
            Computer Science course.
          </span>
        }
      />

      <PageSection title="Study" className="mb-10">
        <div className={yearGrid}>
          {YEARS.map((year) => (
            <YearTile key={year} year={year} />
          ))}
        </div>

        {/* Quizzes sit with the years because they're the same job — one
            destination rather than four, so a full-width row across the
            bottom of the section rather than a fifth tile. */}
        <SurfaceLink
          to="/quizzes"
          className="mt-4 flex flex-wrap items-center justify-between gap-4 p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          <span>
            <span className="block font-semibold">Quizzes</span>
            <span className="mt-0.5 block text-sm text-muted-foreground">
              Multiple-choice practice questions, grouped by module.
            </span>
          </span>
          <span className={primaryButtonClass}>
            Open quizzes
            <ArrowRight className="h-4 w-4 shrink-0" />
          </span>
        </SurfaceLink>
      </PageSection>

      <PageSection title="Beyond the notes" className="mb-10">
        <div className={hubGrid}>
          {HUBS.map((tile) => (
            <ActionCard key={tile.name} tile={tile} />
          ))}
        </div>
      </PageSection>

      <PageSection title="Community" className="mb-10">
        <div className={grid}>
          {ABOUT.map((tile) => (
            <ActionCard key={tile.name} tile={tile} />
          ))}

          {/* Socials take a card of their own rather than a line of text links
              at the foot of the page, so they're the same size as everything
              else you're asked to click. */}
          <div className="flex h-full flex-col rounded-lg border bg-surface p-5 text-surface-foreground shadow-sm">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Contact</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Ask a question or report a mistake in the notes.
              </p>
            </div>
            <div className="mt-auto flex flex-wrap justify-end gap-2">
              {SOCIALS.map(({ name, url, Icon }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className={socialButtonClass}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  {name}
                  <ExternalLink className="h-3 w-3 shrink-0 opacity-60" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </PageSection>

      {/* A caveat belongs at the foot of the page, not above the content. */}
      <p className="mt-12 border-t pt-6 text-xs text-muted-foreground">
        These notes are student-made and are not officially endorsed by the
        University of Warwick. They may contain errors or omissions — always
        cross-reference with official lecture materials and module resources.
      </p>
    </Page>
  )
}
