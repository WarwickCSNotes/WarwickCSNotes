import { useEffect } from "react"
import { Github, MessageSquare, Linkedin } from "lucide-react"
import { Page } from "@/components/page"
import { PageSection } from "@/components/page-section"
import { SurfaceAnchor, SurfaceCard, SurfaceLink } from "@/components/surface"

export const Welcome = () => {
  useEffect(() => {
    document.title = "CS Notes"
  }, [])

  return (
    <Page>
      <h1 className="mb-4 text-4xl font-bold !text-foreground">Dashboard</h1>

      <SurfaceCard className="mb-8 p-4 text-sm">
        <strong>Disclaimer:</strong> These notes are student-made and are not
        officially endorsed by the University of Warwick. They may contain
        errors or omissions. Always cross-reference with official lecture
        materials and module resources.
      </SurfaceCard>

      <PageSection title="Years" className="mb-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((y) => (
            <SurfaceLink
              key={y}
              to={`/year/${y}`}
              className="p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <h3 className="text-2xl font-bold !text-foreground">Year {y}</h3>
            </SurfaceLink>
          ))}
        </div>
      </PageSection>

      <PageSection title="Get in touch">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <SurfaceAnchor
            href="https://discord.gg/wdQxub7z9V"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-3 px-6 py-3 text-lg font-medium shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <MessageSquare className="h-6 w-6" /> Discord
          </SurfaceAnchor>
          <SurfaceAnchor
            href="https://github.com/WarwickCSNotes/WarwickCSNotes"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-3 px-6 py-3 text-lg font-medium shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <Github className="h-6 w-6" /> GitHub
          </SurfaceAnchor>
          <SurfaceAnchor
            href="https://www.linkedin.com/company/warwick-cs-notes"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-3 px-6 py-3 text-lg font-medium shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <Linkedin className="h-6 w-6" /> LinkedIn
          </SurfaceAnchor>
        </div>
      </PageSection>
    </Page>
  )
}
