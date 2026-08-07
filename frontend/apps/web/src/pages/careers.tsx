import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowRight, ExternalLink } from "lucide-react"
import { Page } from "@/components/page"
import { PageHeader } from "@/components/page-header"
import { PageSection } from "@/components/page-section"
import { SurfaceAnchor, SurfaceCard } from "@/components/surface"

type CareerLink = {
  name: string
  url: string
  description: string
}

type InternalGuide = {
  name: string
  to: string
  description: string
  author?: { id: string; name: string }
}

const DCS: CareerLink = {
  name: "DCS Application Advice",
  url: "https://warwick.ac.uk/fac/sci/dcs/teaching/applicationadvice/",
  description:
    "Official Warwick DCS guidance on internships, placements, and graduate applications.",
}

const GUIDES: InternalGuide[] = [
  {
    name: "Getting Experience",
    to: "/careers/getting-experience",
    description: "Getting experience outside of the coursework.",
  },
  {
    name: "Internships",
    to: "/careers/internships",
    description:
      "A guide to landing an internship: find roles and interview prep.",
  },
  {
    name: "Graduate Roles",
    to: "/careers/graduate-roles",
    description:
      "Finding and applying for graduate roles.",
  },
  {
    name: "Writing your CV",
    to: "/careers/writing-your-cv",
    description:
      "Write a CV to pass filters and standout to recruiters.",
  },
  {
    name: "Interview Prep",
    to: "/careers/interview-prep",
    description:
      "Prep for behavioural and technical.",
  },
  {
    name: "Selling Yourself",
    to: "/careers/selling-yourself",
    description: "Optimising your online presence to sell yourself.",
  },
  {
    name: "LinkedIn Maxxing",
    to: "/careers/linkedin-maxxing",
    description:
      "Get the most out of LinkedIn: profile, connections, posts, and job search.",
  },
  {
    name: "Diversity",
    to: "/careers/diversity",
    description:
      "Scholarships and opportunities for underrepresented groups in tech.",
  },
]

const TRACKERS: CareerLink[] = [
  {
    name: "Hackathon Radar (Discord)",
    url: "https://discord.gg/ZvuSskkkDn",
    description:
      "Community Discord that tracks events like hackathons, residencies, and conferences.",
  },
  {
    name: "Trackr",
    url: "https://the-trackr.com/trackers/",
    description:
      "A collection of spring weeks, internships and graduate opportunities for Tech and Finance in the US, EU and the UK.",
  },
  {
    name: "HackathonHub",
    url: "https://hackathonhub.eu/",
    description: "Tracker for hackathons across Europe.",
  }
]

const SOCIETIES: CareerLink[] = [
  {
    name: "Warwick Coding Society",
    url: "https://www.warwickcodingsociety.com",
    description:
      "Side projects, weekly workshops, and coding-focused socials. Great for building your portfolio.",
  },
  {
    name: "UWCS",
    url: "https://uwcs.co.uk/",
    description:
      "Talks, Language Courses, and Workshops (including for building a CV).",
  },
  {
    name: "Warwick AI",
    url: "https://warwick.ai/",
    description:
      "AI/ML-focused society with projects, education, and a yearly AI summit.",
  },
  {
    name: "Warwick Cyber Society",
    url: "https://warwickcybersoc.com/",
    description:
      "CTFs, talks, socials, and shenanigans. Great for picking up offensive/defensive security skills.",
  },
]

function CareerCard({ link }: { link: CareerLink }) {
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

function GuideCard({ guide }: { guide: InternalGuide }) {
  const navigate = useNavigate()
  const activate = () => navigate(guide.to)
  return (
    <SurfaceCard
      interactive
      role="link"
      tabIndex={0}
      onClick={activate}
      onKeyDown={(e) => {
        if (e.target !== e.currentTarget) return
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          activate()
        }
      }}
      className="block cursor-pointer p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="mb-2 flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold !text-foreground">{guide.name}</h3>
        <ArrowRight className="mt-1 h-4 w-4 shrink-0 opacity-60" />
      </div>
      <p className="text-sm text-muted-foreground">{guide.description}</p>
      {guide.author && (
        <p className="mt-3 text-xs text-muted-foreground">
          Written by{" "}
          <Link
            to={`/acknowledgements#${guide.author.id}`}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            className="italic transition-colors hover:text-primary hover:underline"
          >
            {guide.author.name}
          </Link>
        </p>
      )}
    </SurfaceCard>
  )
}

export const CareersPage = () => {
  useEffect(() => {
    document.title = "Careers"
  }, [])

  return (
    <Page>
      <PageHeader
        title="Careers"
        subtitle="Resources for internships/placements, CV support, and side projects."
      />

      <p className="mb-6 max-w-3xl text-muted-foreground">
        The degree by itself isn't enough to get employed in this job market.
        Learn to market yourself and stack your CV with opportunities like
        internships, hackathons, and other credentials.
      </p>

      <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {GUIDES.map((g) => (
          <GuideCard key={g.name} guide={g} />
        ))}
      </div>

      <PageSection title="From the Department" className="mb-10">
        <CareerCard link={DCS} />
      </PageSection>

      <PageSection
        title="Student Societies"
        subtitle="Societies run by students. They host CV workshops, industry talks, hackathons, and hack nights; all great for building experience and networks."
        className="mb-10"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {SOCIETIES.map((s) => (
            <CareerCard key={s.name} link={s} />
          ))}
        </div>
      </PageSection>

      <PageSection
        title="Trackers & Opportunities"
        subtitle="External communities and lists that surface events (hackathons, residencies, conferences) you can apply to."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {TRACKERS.map((s) => (
            <CareerCard key={s.name} link={s} />
          ))}
        </div>
      </PageSection>
    </Page>
  )
}
