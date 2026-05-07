import { useEffect, useMemo, useState } from "react"
import { useLocation } from "react-router-dom"
import { Page } from "@/components/page"
import { PageHeader } from "@/components/page-header"
import { SurfaceCard } from "@/components/surface"
import { Github, Linkedin } from "lucide-react"

type Person = {
  id: string
  name: string
  role: string
  github?: string
  linkedin?: string
  image?: string
}

type Credits = { dev?: Person[]; content?: Person[] }

function PersonCard({ person }: { person: Person }) {
  return (
    <SurfaceCard
      id={person.id}
      className="flex gap-4 p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      {person.image && (
        <img
          src={person.image}
          alt={person.name}
          className="h-16 w-16 shrink-0 rounded-full object-cover"
        />
      )}
      <div className="flex min-w-0 flex-col justify-between">
        <div>
          <p className="text-lg leading-tight font-semibold !text-foreground">
            {person.name}
          </p>
          <p className="text-sm text-muted-foreground">{person.role}</p>
        </div>
        <div className="mt-3 flex gap-3">
          {person.github && (
            <a
              href={person.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label={`${person.name} on GitHub`}
            >
              <Github className="h-5 w-5" />
            </a>
          )}
          {person.linkedin && (
            <a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label={`${person.name} on LinkedIn`}
            >
              <Linkedin className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
    </SurfaceCard>
  )
}

export const AcknowledgementsPage = () => {
  const [credits, setCredits] = useState<Credits>({})
  const location = useLocation()

  useEffect(() => {
    fetch("/api/credits")
      .then((res) => res.json())
      .then(setCredits)
  }, [])

  // Devs are listed first, then content contributors — but rendered as a single
  // flat grid with no section headings.
  const people = useMemo(
    () => [...(credits.dev ?? []), ...(credits.content ?? [])],
    [credits.dev, credits.content]
  )

  // Scroll to anchor after credits load
  useEffect(() => {
    if (!location.hash || people.length === 0) return
    const el = document.getElementById(location.hash.slice(1))
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" })
  }, [people, location.hash])

  return (
    <>
      <title>Acknowledgements</title>
      <Page>
        <PageHeader
          title="Acknowledgements"
          subtitle="The people behind Warwick CS Notes."
          back={{ to: "/", label: "Dashboard" }}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {people.map((person) => (
            <PersonCard key={person.id} person={person} />
          ))}
        </div>
      </Page>
    </>
  )
}
