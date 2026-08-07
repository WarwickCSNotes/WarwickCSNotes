import { Link } from "react-router-dom"
import { ArrowRight, ExternalLink } from "lucide-react"
import { SurfaceAnchor, SurfaceCard } from "@/components/surface"

export type LinkCardItem = {
  name: string
  url: string
  description: string
}

export type GuideCardItem = {
  name: string
  to: string
  description: string
  author?: { id: string; name: string }
  /** Footer wording. Defaults to "Read guide", which is wrong for anything
   *  that isn't one — a year of modules is browsed, not read. */
  action?: string
}

export type InfoCardItem = {
  name: string
  description: string
  /** Optional footer note — where the thing lives, who runs it, when it opens. */
  meta?: string
}

/** "https://the-trackr.com/trackers/" -> "the-trackr.com". Shown on the card so
 *  you know where a link takes you before clicking it. */
function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return url
  }
}

/** Cards are flex columns with the footer pushed to the bottom, which is what
 *  makes every card in a row the same height however long its description
 *  runs. `h-full` opts into the grid's stretch. */
const cardClass =
  "flex h-full flex-col p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"

/** Every card ends with the same element, which is both what equalises the
 *  heights and what tells you where the card goes before you click it.
 *
 *  `mt-auto` alone isn't enough: it only pushes the footer down when the card
 *  has slack, so the card with the longest description in a row — the one
 *  setting that row's height — ended up with its rule flush against the text
 *  while its shorter neighbours had 20px. The gap belongs on the content
 *  above, where it applies whether or not there's room to spare. */
const bodyClass = "mb-4"
const footerClass = "mt-auto flex items-center gap-1.5 border-t pt-3 text-xs"

/** Something that is neither a guide nor a link — a fact, a caveat, a thing
 *  that exists but has nowhere to click through to.
 *
 *  Deliberately inert: no hover lift, no pointer, no footer arrow, because
 *  every one of those would promise a destination it doesn't have. It keeps
 *  the same padding and `h-full` as the other two so it can share a grid with
 *  them without breaking the row. */
export function InfoCard({
  info,
  children,
}: {
  info: InfoCardItem
  children?: React.ReactNode
}) {
  return (
    <SurfaceCard className="flex h-full flex-col p-5 shadow-sm">
      <div className={bodyClass}>
        <h3 className="text-lg font-semibold !text-foreground">{info.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{info.description}</p>
        {children}
      </div>
      {info.meta && (
        <span className={`${footerClass} text-muted-foreground`}>
          {info.meta}
        </span>
      )}
    </SurfaceCard>
  )
}

/** A link that leaves the site. The footer names the host it will take you to
 *  — a corner icon alone only says "external", not "external to where". */
export function LinkCard({ link }: { link: LinkCardItem }) {
  return (
    <SurfaceAnchor
      href={link.url}
      target="_blank"
      rel="noreferrer"
      className={cardClass}
    >
      <div className={bodyClass}>
        <h3 className="text-lg font-semibold !text-foreground">{link.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{link.description}</p>
      </div>
      <span className={`${footerClass} text-muted-foreground`}>
        <ExternalLink className="h-3 w-3 shrink-0" />
        {hostOf(link.url)}
      </span>
    </SurfaceAnchor>
  )
}

/** A link to one of our own guides. */
export function GuideCard({ guide }: { guide: GuideCardItem }) {
  return (
    <SurfaceCard interactive className={`relative ${cardClass}`}>
      {/* Stretched across the card rather than wrapping it, so the author
          credit can stay a link of its own without nesting anchors. */}
      <Link
        to={guide.to}
        className="absolute inset-0 rounded-lg focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
      >
        <span className="sr-only">{guide.name}</span>
      </Link>
      <div className={bodyClass}>
        <h3 className="text-lg font-semibold !text-foreground">{guide.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{guide.description}</p>
        {guide.author && (
          <p className="relative z-10 mt-3 text-xs text-muted-foreground">
            Written by{" "}
            <Link
              to={`/acknowledgements#${guide.author.id}`}
              className="italic transition-colors hover:text-primary hover:underline"
            >
              {guide.author.name}
            </Link>
          </p>
        )}
      </div>
      <span className={`${footerClass} font-semibold text-primary`}>
        {guide.action ?? "Read guide"}
        <ArrowRight className="h-3 w-3 shrink-0" />
      </span>
    </SurfaceCard>
  )
}
