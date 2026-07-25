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
      "The default place recruiters look you up after (or before) reading your CV. A blank profile is worse than none.",
  },
]

const PORTFOLIO: Resource[] = [
  {
    name: "Vercel",
    url: "https://vercel.com/",
    description:
      "Free hosting for static and Next.js sites with a custom domain. The easiest way to get a portfolio online.",
  },
  {
    name: "GitHub Pages",
    url: "https://pages.github.com/",
    description:
      "Free static hosting straight from a GitHub repo. Zero cost, zero config for a simple site.",
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
        subtitle="Your CV gets you through the filter, but recruiters will also Google you and click your LinkedIn. Your public presence is part of the pitch."
        back={{ to: "/careers", label: "Careers" }}
      />

      <PageSection
        title="LinkedIn"
        subtitle="LinkedIn is where recruiters find you and verify what your CV claims. Keep it consistent with the CV and easy to skim."
        className="mb-10"
      >
        <div className="mb-4 text-muted-foreground">
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <strong className="text-foreground">Complete the profile:</strong>{" "}
              headshot, headline, summary, experience, education, and skills.
              Empty sections read as low effort.
            </li>
            <li>
              <strong className="text-foreground">Mirror the CV:</strong> the
              roles, dates, and achievements should match. Recruiters
              cross-reference; inconsistencies raise flags.
            </li>
            <li>
              <strong className="text-foreground">Open to work:</strong> use the
              recruiter-only "Open to Work" setting so it doesn't broadcast to
              your current employer or peers.
            </li>
            <li>
              <strong className="text-foreground">Post occasionally:</strong>{" "}
              projects, hackathon wins, or interesting things you've learned.
              Even one post a term keeps the profile from looking abandoned.
            </li>
            <li>
              <strong className="text-foreground">Connect deliberately:</strong>{" "}
              recruiters at companies you're targeting, alumni in roles you
              want, people you actually meet. Personalise the connection note.
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
              <strong className="text-foreground">Keep it simple:</strong>{" "}
              recruiters skim; a clean single-page site with your projects,
              contact info, and links beats a slow, over-designed one.
            </li>
            <li>
              <strong className="text-foreground">Show, don't tell:</strong>{" "}
              each project needs a short description, the tech used, a live
              demo or screenshot, and a link to the code.
            </li>
            <li>
              <strong className="text-foreground">Own the domain:</strong>{" "}
              a custom domain (yourname.com or similar) looks more professional
              than a free subdomain and is cheap.
            </li>
            <li>
              <strong className="text-foreground">Make it fast:</strong>{" "}
              a slow-loading site is worse than no site. Static hosting is
              free and instant.
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
