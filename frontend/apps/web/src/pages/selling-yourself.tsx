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

const LINKEDIN: Resource[] = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/",
    description:
      "The default place recruiters look you up after (or before) reading your CV.",
  },
]

const PORTFOLIO: Resource[] = [
  {
    name: "GitHub Pages",
    url: "https://pages.github.com/",
    description:
      "Free static hosting straight from a GitHub repo - good for a nice and simple portfolio!",
  },
  {
    name: "Vercel",
    url: "https://vercel.com/",
    description:
      "Another option for free hosting for your site.",
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

export const SellingYourselfPage = () => {
  useEffect(() => {
    document.title = "Selling Yourself"
  }, [])

  return (
    <Page>
      <PageHeader
        title="Selling Yourself"
        subtitle="Optimising your online presence to sell yourself."
        back={{ to: "/careers", label: "Careers" }}
      />

      <div className="mb-8 max-w-3xl text-muted-foreground">
        <p className="mb-3">
          Your CV is a highly polished snapshot of what you've done, but
          there's only so much you can convey through it.
        </p>
        <p>
          Portfolio sites and social media like LinkedIn are a perfect way
          to tell employers more, and in a less constrained way.
        </p>
      </div>

      <PageSection
        title="LinkedIn"
        subtitle="LinkedIn is where recruiters find you and verify what your CV claims. Keep it consistent with the CV and easy to skim."
        className="mb-10"
      >
        <h3 className="mb-3 text-lg font-semibold text-foreground">
          Profile
        </h3>
        <div className="mb-6 text-muted-foreground">
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <strong className="text-foreground">Complete the profile:</strong>{" "}
              headshot, headline, summary, experience, education, and skills. 
              Nice images and layout go a long way!
            </li>
            <li>
              <strong className="text-foreground">Mirror the CV:</strong> the
              roles, dates, and achievements should match, since inconsistencies are a red flag.
              Some recruiters might just run a tool to check this as well and instantly reject rather than reach out to you to ask why there's an inconsistency.
            </li>
            <li>
              <strong className="text-foreground">Post:</strong>{" "}
              projects, hackathon wins, or interesting things you've learned.
              Semi-frequent posts are ideal, but not necessary!
            </li>
          </ul>
        </div>

        <h3 className="mb-6 text-lg font-semibold text-foreground">
          Connecting
        </h3>

        <h3 className="mb-3 text-lg font-semibold text-foreground">
          Making Posts
        </h3>
        <div className="mb-6 text-muted-foreground">
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <strong className="text-foreground">Lead with a hook:</strong>{" "}
              start with a line that captures the central idea, e.g.{" "}
              <em className="text-foreground not-italic">
                "Feeling inflexible and unmotivated? I built X"
              </em>{" "}
              or{" "}
              <em className="text-foreground not-italic">
                "I struggled with XYZ and it sucked, so I built W"
              </em>
              . People decide whether to keep reading in half a second.
            </li>
            <li>
              <strong className="text-foreground">Use photos:</strong> a
              screenshot, demo GIF, or a photo of you at the event stops the
              scroll and gives the post something to render as a preview.
            </li>
            <li>
              <strong className="text-foreground">Link to projects:</strong>{" "}
              if you're posting about a build, link to the repo or live demo
              so readers can dig deeper.
            </li>
            <li>
              <strong className="text-foreground">Use AI to polish:</strong>{" "}
              run the post through AI for spellcheck and grammar-check, then
              do a final read-through yourself before hitting post.
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {LINKEDIN.map((s) => (
            <ResourceCard key={s.name} link={s} />
          ))}
        </div>
      </PageSection>

      <PageSection
        title="Portfolio Website"
        subtitle="A personal site is the one link on your CV that you fully control. Use it to show projects in more depth than a CV allows."
        className="mb-10"
      >
        <div className="mb-4 text-muted-foreground">
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <strong className="text-foreground">Show, don't tell:</strong>{" "}
              each project needs a short description, the tech used, a live
              demo or screenshot, and ideally a link to the code.
            </li>
            <li>
              <strong className="text-foreground">Own the domain:</strong>{" "}
              a custom domain (yourname.com or similar) looks more professional
              than a free subdomain and is cheap.
            </li>
            <li>
              <strong className="text-foreground">Make it fast:</strong>{" "}
              slow-loading sites (or broken URLs) are a bad signal. Static hosting is
              free and instant and is preferable over an over-engineered site which doesn't work half the time!
            </li>
          </ul>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {PORTFOLIO.map((s) => (
            <ResourceCard key={s.name} link={s} />
          ))}
        </div>
      </PageSection>
    </Page>
  )
}
