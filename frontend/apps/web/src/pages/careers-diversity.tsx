import { useEffect } from "react"
import { Page } from "@/components/page"
import { PageHeader } from "@/components/page-header"
import { PageSection } from "@/components/page-section"
import { LinkCard } from "@/components/cards"

type Resource = {
  name: string
  url: string
  description: string
}

const WOMEN_IN_COMPUTING: Resource[] = [
  {
    name: "ACM-W Scholarships",
    url: "https://women.acm.org/scholarships/",
    description:
      "ACM's Council on Women in Computing offers scholarships for women to attend research conferences.",
  },
  {
    name: "Qube Scholarships for Women in Computing",
    url: "https://warwick.ac.uk/fac/sci/dcs/admissions/undergraduate/funding-opportunities/",
    description:
      "A scholarship for women in Computer Science, listed on the DCS funding opportunities page. The link is also emailed to you at the beginning of first year, so keep an eye on your Warwick inbox.",
  },
]

const COMMUNITIES: Resource[] = [
  {
    name: "Rewriting the Code",
    url: "https://rewritingthecode.org/",
    description:
      "A free community for women in tech, from university through to early career, with a large network of partner companies.",
  },
  {
    name: "Code First Girls",
    url: "https://codefirstgirls.com/",
    description:
      "A UK-founded community for women and non-binary people in tech, offering free coding courses alongside its employer partnerships.",
  },
]

const SPRING_WEEK_BENEFITS: { title: string; text: string }[] = [
  {
    title: "Fast-track opportunities:",
    text: "doing well can let you skip stages of the company's usual recruitment process.",
  },
  {
    title: "Direct internship offers:",
    text: "some Spring Weeks end with an internship offer on completion.",
  },
  {
    title: "Less competition:",
    text: "the applicant pool is smaller because places are reserved for women and non-binary people.",
  },
  {
    title: "Relevant advice:",
    text: "you'll meet lots of women and non-binary people in tech who have been through the same things and can give you career advice that applies to you.",
  },
]

const COMMUNITY_PERKS = [
  "Webinars",
  "Networking sessions",
  "Career fairs",
  "Scholarships",
  "Subsidies or reimbursement for attending events",
  "Spring Weeks, internships and graduate insight days that can fast-track you",
  "Mentorship",
  "Contact details for mentors in industry who are willing to help",
]

type Company = {
  name: string
  logo: string
  /** The logo is white, so it needs a dark tile instead of the usual white. */
  darkTile?: boolean
}

const COMPANIES: Company[] = [
  { name: "Bloomberg", logo: "bloomberg.svg" },
  { name: "HSBC", logo: "hsbc.svg" },
  { name: "Optiver", logo: "optiver.svg" },
  { name: "Jane Street", logo: "jane-street.svg" },
  { name: "Maven", logo: "maven.png", darkTile: true },
  { name: "Wise", logo: "wise.svg" },
  { name: "MongoDB", logo: "mongodb.svg" },
  { name: "NatWest", logo: "natwest.svg" },
  { name: "PA Consulting", logo: "pa-consulting.svg" },
  { name: "Capital One", logo: "capital-one.svg" },
]

export const CareersDiversityPage = () => {
  useEffect(() => {
    document.title = "Diversity (Careers)"
  }, [])

  return (
    <Page>
      <PageHeader
        title="Diversity"
        subtitle="Career-related opportunities for marginalised groups in tech: scholarships, programmes, and pipelines."
      />

      <p className="mb-10 max-w-3xl text-muted-foreground">
        Scholarships, communities, and programmes aimed at underrepresented
        and marginalised groups in tech. These can open doors
        (conferences, funding, mentorship, recruiter pipelines) that are
        otherwise hard to find.
      </p>

      <PageSection title="Women in Computing" className="mb-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {WOMEN_IN_COMPUTING.map((s) => (
            <LinkCard key={s.name} link={s} />
          ))}
        </div>
      </PageSection>

      <PageSection
        title="Women & Non-Binary Spring Weeks"
        subtitle="Why these are worth applying to:"
        className="mb-10"
      >
        <ul className="ml-6 list-disc space-y-1 text-muted-foreground">
          {SPRING_WEEK_BENEFITS.map((b) => (
            <li key={b.title}>
              <strong className="text-foreground">{b.title}</strong> {b.text}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-muted-foreground">
          <strong className="text-foreground">Check the eligibility:</strong>{" "}
          events advertised for women usually accept non-binary people too, so
          don't rule one out based on its title. Some Spring Weeks for women
          also accept students in their penultimate year.
        </p>
      </PageSection>

      <PageSection
        title="Women & Non-Binary Communities"
        subtitle="These communities have many large partner companies, which often run events exclusively for their members."
        className="mb-10"
      >
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {COMMUNITIES.map((s) => (
            <LinkCard key={s.name} link={s} />
          ))}
        </div>
        <p className="mb-3 text-muted-foreground">
          Joining can give you access to:
        </p>
        <ul className="ml-6 list-disc space-y-1 text-muted-foreground">
          {COMMUNITY_PERKS.map((perk) => (
            <li key={perk}>{perk}</li>
          ))}
        </ul>
      </PageSection>

      <PageSection
        title="Companies That Host Women & Non-Binary Events"
        subtitle="Some of the notable companies to look out for:"
        className="mb-10"
      >
        {/* Tiles stay light (or dark, for Maven) in every theme: most of these
            logos are dark and would vanish on a dark background. */}
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {COMPANIES.map((c) => (
            <li
              key={c.name}
              className={`flex h-20 items-center justify-center rounded-lg border px-6 py-5 ${
                c.darkTile ? "bg-[#1c2733]" : "bg-white"
              }`}
            >
              <img
                src={`/Resources/Images/logos/${c.logo}`}
                alt={c.name}
                loading="lazy"
                className="max-h-full max-w-full object-contain"
              />
            </li>
          ))}
        </ul>
      </PageSection>
    </Page>
  )
}
