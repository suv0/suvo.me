import type { Metadata } from "next";
import { JournalExperience } from "@/components/journal/journal-experience";
import { JournalFooter } from "@/components/journal/journal-cta-footer";
import { JournalFounded } from "@/components/journal/journal-founded";
import { JournalHero } from "@/components/journal/journal-hero";
import { JournalLab } from "@/components/journal/journal-lab";
import { JournalNav } from "@/components/journal/journal-nav";
import { JournalPhilosophy } from "@/components/journal/journal-philosophy";
import { JournalProjects } from "@/components/journal/journal-projects";
import { JournalSkills } from "@/components/journal/journal-skills";
import { getFoundedProductsForSite } from "@/lib/github-founded";
import {
  experiences,
  featuredProjects,
  getCurrentYear,
  skillGroups,
} from "@/lib/portfolio-data";
import { getHomeJsonLd, jsonLdScript } from "@/lib/seo";

/** Match `TENURE_REVALIDATE_SECONDS` in `@/lib/portfolio-data`. Must be a literal for Next segment config. */
export const revalidate = 86_400;

export const metadata: Metadata = {
  alternates: {
    canonical: "https://suvo.me",
  },
  openGraph: {
    type: "profile",
    firstName: "Abdul Hamid",
    lastName: "Shuvo",
    username: "suv0",
    url: "https://suvo.me",
  },
};

export default async function Home() {
  const currentYear = getCurrentYear();
  const founded = await getFoundedProductsForSite();
  const structuredData = getHomeJsonLd(currentYear, founded);

  return (
    <div className="journal-site overflow-x-hidden font-body-md text-body-md text-on-surface antialiased">
      <JournalNav />

      <JournalHero currentYear={currentYear} />

      <main className="mx-auto max-w-[1440px]">
        <JournalPhilosophy />
        <JournalProjects projects={featuredProjects} />
        <JournalExperience items={experiences} />
        <JournalFounded items={founded} />
        <JournalSkills groups={skillGroups} />
        <JournalLab groups={skillGroups} />
      </main>

      <JournalFooter year={currentYear} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(structuredData) }} />
    </div>
  );
}
