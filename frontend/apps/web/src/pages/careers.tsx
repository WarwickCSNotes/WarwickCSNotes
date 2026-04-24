import { useEffect } from "react";
import { ExternalLink } from "lucide-react";
import { Page } from "@/components/page";
import { PageHeader } from "@/components/page-header";

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
];

function CareerCard({ link }: { link: CareerLink }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noreferrer"
      className="block p-5 bg-surface text-surface-foreground border rounded-lg hover:brightness-110 transition"
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

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">From the Department</h2>
        <CareerCard link={DCS} />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Student Societies</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Societies run by students. They host CV workshops, industry talks, hackathons, and side-project groups; all great for building experience and networks.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SOCIETIES.map(s => <CareerCard key={s.name} link={s} />)}
        </div>
      </section>
    </Page>
  );
};
