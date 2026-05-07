import { useEffect } from "react";
import { ExternalLink } from "lucide-react";
import { Page } from "@/components/page";
import { PageHeader } from "@/components/page-header";
import { PageSection } from "@/components/page-section";

type CareerLink = {
  name: string;
  url: string;
  description: string;
};

const DCS: CareerLink = {
  name: "DCS Application Advice",
  url: "https://warwick.ac.uk/fac/sci/dcs/teaching/applicationadvice/",
  description: "Official Warwick DCS guidance on internships, placements, and graduate applications. Start here.",
};

const SOCIETIES: CareerLink[] = [
  {
    name: "Warwick Coding Society",
    url: "https://www.warwickcodingsociety.com",
    description: "Side projects, weekly workshops, and coding-focused socials. Great for building your portfolio.",
  },
  {
    name: "UWCS",
    url: "https://uwcs.co.uk/",
    description: "Talks, Language Courses, and Workshops (including for building a CV).",
  },
  {
    name: "Warwick AI",
    url: "https://warwick.ai/",
    description: "AI/ML-focused society with projects, education, and a yearly AI summit.",
  },
  {
    name: "Warwick Cyber Society",
    url: "https://warwickcybersoc.com/",
    description: "CTFs, talks, socials, and shenanigans. Great for picking up offensive/defensive security skills.",
  },
];

function CareerCard({ link }: { link: CareerLink }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noreferrer"
      className="block p-5 bg-surface text-surface-foreground border rounded-lg hover:bg-surface-hover transition-colors"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-lg font-semibold">{link.name}</h3>
        <ExternalLink className="h-4 w-4 opacity-60 shrink-0 mt-1" />
      </div>
      <p className="text-sm text-muted-foreground">{link.description}</p>
    </a>
  );
}

export const CareersPage = () => {
  useEffect(() => { document.title = "Careers"; }, []);

  return (
    <Page>
      <PageHeader
        title="Careers"
        subtitle="Resources for internships, placements, CV support, and side projects."
        back={{ to: "/", label: "Dashboard" }}
      />

      <PageSection title="From the Department" className="mb-10">
        <CareerCard link={DCS} />
      </PageSection>

      <PageSection
        title="Student Societies"
        subtitle="Societies run by students. They host CV workshops, industry talks, hackathons, and side-project groups; all great for building experience and networks."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SOCIETIES.map(s => <CareerCard key={s.name} link={s} />)}
        </div>
      </PageSection>
    </Page>
  );
};
