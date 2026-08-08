import { useEffect } from "react"
import { Link } from "react-router-dom"
import { ChevronRight, Github, MessageSquare, Linkedin } from "lucide-react"
import { Page } from "@/components/page"
import { PageHeader } from "@/components/page-header"
import { PageSection } from "@/components/page-section"
import { GuideCard } from "@/components/cards"

const YEARS = [1, 2, 3, 4]

const PAGES = [
  {
    name: "Careers",
    to: "/careers",
    description: "Internships, CVs, interviews and getting found.",
  },
  {
    name: "Resources",
    to: "/resources",
    description: "Handbooks, society material and open-source guides.",
  },
  {
    name: "Quizzes",
    to: "/quizzes",
    description: "Practice quizzes across every module.",
  },
  {
    name: "Credits",
    to: "/acknowledgements",
    description: "The people who wrote all this.",
  },
]

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

/** Columns shared by every Explore row. Below `md` the row stacks instead. */
const ROW_COLUMNS =
  "md:grid md:grid-cols-[9rem_minmax(0,1fr)_1rem] md:items-center md:gap-4"

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

      <PageSection title="Years" className="mb-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {YEARS.map((year) => (
            <GuideCard
              key={year}
              guide={{
                name: `Year ${year}`,
                to: `/year/${year}`,
                action: "View year",
              }}
            />
          ))}
        </div>
      </PageSection>

      {/* Careers, Resources and Quizzes previously had no route in from this
          page at all — they existed only in the nav bar. Rows rather than more
          cards, so they don't compete with the years above. */}
      <PageSection title="Explore" className="mb-10">
        <div className="border-t">
          {PAGES.map(({ name, to, description }) => (
            <Link
              key={name}
              to={to}
              className={`group block border-b px-3 py-3 transition-colors hover:bg-surface-hover md:py-2.5 ${ROW_COLUMNS}`}
            >
              <span className="font-medium group-hover:underline">{name}</span>
              <span className="mt-0.5 block text-sm text-muted-foreground md:mt-0">
                {description}
              </span>
              <ChevronRight
                aria-hidden="true"
                className="hidden h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground md:block"
              />
            </Link>
          ))}
        </div>
      </PageSection>

      <PageSection title="Get in touch">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          {SOCIALS.map(({ name, url, Icon }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              <Icon className="h-4 w-4 shrink-0" />
              {name}
            </a>
          ))}
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
