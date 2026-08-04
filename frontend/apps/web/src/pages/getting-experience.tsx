import { useEffect } from "react"
import { Link } from "react-router-dom"
import { Page } from "@/components/page"
import { PageHeader } from "@/components/page-header"
import { PageSection } from "@/components/page-section"

export const GettingExperiencePage = () => {
  useEffect(() => {
    document.title = "Getting Experience"
  }, [])

  return (
    <Page>
      <PageHeader
        title="Getting Experience"
        subtitle="Ways to stack up real experience beyond coursework."
        back={{ to: "/careers", label: "Careers" }}
      />

      <p className="mb-10 max-w-3xl text-muted-foreground">
        Coursework alone won't fill a CV. Internships and graduate roles
        are the biggest single boost, and both have their own guides (
        <Link
          to="/careers/internships"
          className="text-primary underline hover:opacity-80"
        >
          Internships
        </Link>
        ,{" "}
        <Link
          to="/careers/graduate-roles"
          className="text-primary underline hover:opacity-80"
        >
          Graduate Roles
        </Link>
        ). Plenty else worth doing alongside them.
      </p>

      <PageSection title="Applying" className="mb-10">
        <p className="text-muted-foreground">
          Two guides worth reading before you start applications:{" "}
          <Link
            to="/careers/writing-your-cv"
            className="text-primary underline hover:opacity-80"
          >
            Writing your CV
          </Link>{" "}
          covers the CV itself, and{" "}
          <Link
            to="/careers/selling-yourself"
            className="text-primary underline hover:opacity-80"
          >
            Selling Yourself
          </Link>{" "}
          covers your wider online presence.
        </p>
      </PageSection>

      <PageSection title="Societies" className="mb-10">
        <div className="text-muted-foreground">
          <p className="mb-3">
            Two ways to get experience through Warwick's CS societies:
          </p>
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <strong className="text-foreground">
                Committee/exec positions:
              </strong>{" "}
              leadership experience, event organisation, and something
              concrete to put on a CV.
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
          <p className="mb-3">A few worth watching out for:</p>
          <ul className="mb-3 ml-6 list-disc space-y-2">
            <li>
              <strong className="text-foreground">WHACK:</strong>{" "}
              Warwick's own hackathon.
            </li>
            <li>
              <strong className="text-foreground">ICHACK:</strong> the
              biggest student-run hackathon in the UK/Europe, run by
              Imperial College.
            </li>
            <li>
              <strong className="text-foreground">HackEurope:</strong> a
              European hackathon.
            </li>
            <li>
              <strong className="text-foreground">Junction:</strong> a
              large Finland-based hackathon.
            </li>
          </ul>
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
