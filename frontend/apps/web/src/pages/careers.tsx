import { useEffect } from "react"
import { Page } from "@/components/page"
import { PageHeader } from "@/components/page-header"
import { PageSection } from "@/components/page-section"
import { LinkCard, GuideCard } from "@/components/cards"

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

export const CareersPage = () => {
  useEffect(() => {
    document.title = "Careers"
  }, [])

  return (
    <Page>
      <PageHeader
        title="Careers"
        subtitle={
          <span className="block max-w-3xl">
            The degree by itself isn't enough to get employed in this job
            market. Learn to market yourself and stack your CV with
            opportunities like internships, hackathons, and other credentials.
          </span>
        }
      />

      <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {GUIDES.map((g) => (
          <GuideCard key={g.name} guide={g} />
        ))}
      </div>

      <PageSection title="From the Department" className="mb-10">
        {/* In the same grid as every other section so it's a card of the same
            size, rather than one stretched across the full width. */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <LinkCard link={DCS} />
        </div>
      </PageSection>

      <PageSection
        title="Student Societies"
        subtitle="Societies run by students. They host CV workshops, industry talks, hackathons, and hack nights; all great for building experience and networks."
        className="mb-10"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {SOCIETIES.map((s) => (
            <LinkCard key={s.name} link={s} />
          ))}
        </div>
      </PageSection>

      <PageSection
        title="Trackers & Opportunities"
        subtitle="External communities and lists that surface events (hackathons, residencies, conferences) you can apply to."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {TRACKERS.map((s) => (
            <LinkCard key={s.name} link={s} />
          ))}
        </div>
      </PageSection>
    </Page>
  )
}
