import { useEffect } from "react"
import { Link } from "react-router-dom"
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

      <PageSection title="LinkedIn" className="mb-10">
        <div className="text-muted-foreground">
          <p className="mb-3">
            LinkedIn is your extended CV. Use it to sell yourself: show
            that you go to events, ship side projects, and care about the
            CS world. Recruiters look you up here, and a lively profile
            signals you take the field seriously.
          </p>
          <p>
            The{" "}
            <Link
              to="/careers/linkedin-maxxing"
              className="text-primary underline hover:opacity-80"
            >
              LinkedIn Maxxing
            </Link>{" "}
            guide covers how to nail your{" "}
            <Link
              to="/careers/linkedin-maxxing#profile"
              className="text-primary underline hover:opacity-80"
            >
              profile setup
            </Link>{" "}
            and{" "}
            <Link
              to="/careers/linkedin-maxxing#making-posts"
              className="text-primary underline hover:opacity-80"
            >
              making posts
            </Link>
            .
          </p>
        </div>
      </PageSection>

      <PageSection title="GitHub" className="mb-10">
        <div className="text-muted-foreground">
          <p className="mb-3">
            People often just use GitHub for work or to dump code, but it
            can effectively be an extension of your CV!
          </p>
          <p className="mb-6">
            A nicely set-up GitHub profile with contributions to
            high-impact repositories can make a real difference to your
            image with recruiters.
          </p>

          <h3 className="mb-2 text-lg font-semibold text-foreground">
            Optimising projects
          </h3>
          <p className="mb-6">
            Ensure they have a nice README. A recruiter clicking through
            should see what the project does, how to run it, and ideally
            a screenshot or GIF.
          </p>

          <h3 className="mb-2 text-lg font-semibold text-foreground">
            Profile README
          </h3>
          <p className="mb-3">
            GitHub lets you have a README on your profile page itself,
            which is a nice place to introduce yourself. See{" "}
            <a
              href="https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme"
              target="_blank"
              rel="noreferrer"
              className="text-primary underline hover:opacity-80"
            >
              GitHub's docs
            </a>{" "}
            for how to set one up.
          </p>
          <p className="mb-6">
            You can add contribution streaks and other embeds to it too,
            e.g.{" "}
            <a
              href="https://streak-stats.demolab.com/demo/"
              target="_blank"
              rel="noreferrer"
              className="text-primary underline hover:opacity-80"
            >
              streak stats
            </a>
            .
          </p>

          <h3 className="mb-2 text-lg font-semibold text-foreground">
            Pinned repositories
          </h3>
          <p className="mb-3">
            You can pin anything you've contributed to! Good things to
            pin:
          </p>
          <ul className="ml-6 list-disc space-y-2">
            <li>Personal projects you're proud of</li>
            <li>Large open-source projects you've made a contribution to</li>
            <li>Group projects you've worked on</li>
          </ul>
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
