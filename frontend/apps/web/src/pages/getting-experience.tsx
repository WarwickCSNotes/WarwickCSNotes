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

const HACKATHONS: Resource[] = [
  {
    name: "WHACK",
    url: "https://warwickhack.co.uk/",
    description: "Our uni's hackathon.",
  },
  {
    name: "ICHACK",
    url: "https://ichack.org/",
    description: "The largest student-run hackathon in Europe.",
  },
  {
    name: "HackEurope",
    url: "https://www.hackeurope.com/",
    description: "The largest hackathon for students in Europe.",
  },
  {
    name: "Junction",
    url: "https://www.hackjunction.com/",
    description: "The largest hackathon in the EU.",
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

export const GettingExperiencePage = () => {
  useEffect(() => {
    document.title = "Getting Experience"
  }, [])

  return (
    <Page>
      <PageHeader
        title="Getting Experience"
        subtitle="Getting experience outside of the coursework."
        back={{ to: "/careers", label: "Careers" }}
      />

      <div className="mb-10 max-w-3xl text-muted-foreground">
        <p className="mb-3">
          The degree should be the start: join societies, make projects,
          and take on jobs/placements to boost your CV!
        </p>
        <p>
          See the{" "}
          <Link
            to="/careers/internships"
            className="text-primary underline hover:opacity-80"
          >
            Internships
          </Link>{" "}
          guide for finding roles, and the{" "}
          <Link
            to="/resources/open-source-contributions"
            className="text-primary underline hover:opacity-80"
          >
            Open Source Contributions
          </Link>{" "}
          guide for a different route to hands-on experience.
        </p>
      </div>

      <PageSection title="Societies" className="mb-10">
        <div className="text-muted-foreground">
          <p className="mb-3">
            Two ways to get experience through Warwick's CS societies:
          </p>
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <strong className="text-foreground">Exec positions:</strong>{" "}
              leadership experience, event organisation, and something
              concrete to put on a CV. Do not become an exec just for the
              CV though: it's more impressive if you actually have an
              impact on the organisation and do something cool like run
              events and maybe even create your own!
            </li>
            <li>
              <strong className="text-foreground">Society projects:</strong>{" "}
              UWCS in particular runs open-source projects you can
              contribute to.
            </li>
          </ul>
        </div>
      </PageSection>

      <PageSection title="Hackathons" className="mb-10">
        <div className="text-muted-foreground">
          <p className="mb-3">
            Hackathons are essentially a way to build a small personal
            project in a weekend, with the potential to win awards to
            polish it off, and to showcase presenting and teamworking
            skills. They go into the Projects section of the CV, but the
            experience is valuable beyond the bullet: the presenting and
            collaboration side shows up in interviews too.
          </p>
          <p className="mb-4">A few worth watching out for:</p>
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {HACKATHONS.map((s) => (
              <ResourceCard key={s.name} link={s} />
            ))}
          </div>
          <p>
            Upcoming events are tracked in the{" "}
            <a
              href="https://discord.gg/ZvuSskkkDn"
              target="_blank"
              rel="noreferrer"
              className="text-primary underline hover:opacity-80"
            >
              Hackathon Radar
            </a>{" "}
            Discord.
          </p>
        </div>
      </PageSection>
    </Page>
  )
}
