import { useEffect } from "react"
import { ArrowRight, Github, Linkedin, MessageSquare } from "lucide-react"
import { Page } from "@/components/page"
import { PageHeader } from "@/components/page-header"
import { PageSection } from "@/components/page-section"
import { SurfaceLink } from "@/components/surface"
import { GuideCard, type GuideCardItem } from "@/components/cards"

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

/** Careers and Resources keep their own guides on their own pages, so each is
 *  one card here. The description lists what those pages contain. */
const HUBS: GuideCardItem[] = [
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

const ABOUT: GuideCardItem[] = [
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

/** The years, as ordinary cards. They had an outsized title and their own
 *  padding, which made them a second card style for no reason other than being
 *  first on the page — the section heading and the four-across row already say
 *  they matter. */
const YEAR_CARDS: GuideCardItem[] = YEARS.map((year) => ({
  name: `Year ${year}`,
  to: `/year/${year}`,
  description: "Modules, notes, past papers and solutions.",
  action: "Browse modules",
}))

/** The socials are the exception to the text-link treatment above: they're the
 *  only things on the page that leave the site, and they're what someone with
 *  a question is looking for, so they're solid buttons.
 *
 *  Sized to a shadcn `xs` button — `h-6`, so the row is only 24px tall. That
 *  height is load-bearing: see `contactFooterClass`. Written out rather than
 *  pulled from `buttonVariants` so this stays a home-page change and doesn't
 *  reach into the shared ui package. Built from tokens, so it's black on the
 *  light theme and inverts properly on dark, dragon and the rest. */
const contactButtonClass =
  "inline-flex h-6 items-center gap-1.5 rounded-md bg-primary px-2 text-xs font-medium text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:bg-primary/85 hover:shadow-md"

/** The Contact card sits in a row with two `GuideCard`s, and every card's
 *  footer is pinned with `mt-auto` — so the rule only lines up across the row
 *  if all three footers are the same height.
 *
 *  A GuideCard's is 1px border + `pt-3` (12px) + a 16px line of `text-xs` =
 *  29px. This one is 1px + `pt-1` (4px) + a 24px button = 29px, which is why
 *  the button is `h-6` and the padding is `pt-1` rather than the `pt-3` used
 *  everywhere else. Change one and the rule steps out of line. */
const contactFooterClass = "mt-auto flex flex-wrap items-center gap-2 border-t pt-1"

const yearGrid = "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
/** Two hubs, so two columns — a three-up row would leave a hole. */
const hubGrid = "grid grid-cols-1 gap-4 sm:grid-cols-2"
const grid = "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"


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
          {YEAR_CARDS.map((year) => (
            <GuideCard key={year.name} guide={year} />
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
          <span className="flex items-center gap-1.5 text-xs font-semibold text-primary">
            Open quizzes
            <ArrowRight className="h-3 w-3 shrink-0" />
          </span>
        </SurfaceLink>
      </PageSection>

      <PageSection title="Beyond the notes" className="mb-10">
        <div className={hubGrid}>
          {HUBS.map((tile) => (
            <GuideCard key={tile.name} guide={tile} />
          ))}
        </div>
      </PageSection>

      <PageSection title="Community" className="mb-10">
        <div className={grid}>
          {ABOUT.map((tile) => (
            <GuideCard key={tile.name} guide={tile} />
          ))}

          {/* Socials get a card of their own so the section is one row of
              three rather than two cards and a stray line of links. The card
              isn't itself a link, so the three inside it are ordinary ones. */}
          <div className="flex h-full flex-col rounded-lg border bg-surface p-5 text-surface-foreground shadow-sm">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Contact</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Ask a question or report a mistake in the notes.
              </p>
            </div>
            <div className={contactFooterClass}>
              {SOCIALS.map(({ name, url, Icon }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className={contactButtonClass}
                >
                  <Icon className="h-3 w-3 shrink-0" />
                  {name}
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
