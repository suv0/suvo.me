import { JournalExperience } from "@/components/journal/journal-experience";
import { JournalFooter } from "@/components/journal/journal-cta-footer";
import { JournalHero } from "@/components/journal/journal-hero";
import { JournalLab } from "@/components/journal/journal-lab";
import { JournalNav } from "@/components/journal/journal-nav";
import { JournalPhilosophy } from "@/components/journal/journal-philosophy";
import { JournalProjects } from "@/components/journal/journal-projects";
import { JournalSkills } from "@/components/journal/journal-skills";
import {
  experiences,
  featuredProjects,
  getCurrentYear,
  getProfileTenure,
  profile,
  skillGroups,
} from "@/lib/portfolio-data";

/** Match `TENURE_REVALIDATE_SECONDS` in `@/lib/portfolio-data`. Must be a literal for Next segment config. */
export const revalidate = 86_400;

export default function Home() {
  const currentYear = getCurrentYear();
  const tenure = getProfileTenure(currentYear);

  const personLd = {
    "@type": "Person",
    "@id": `${profile.website}/#person`,
    name: profile.name,
    jobTitle: profile.title,
    url: profile.website,
    email: profile.email,
    sameAs: [profile.linkedin, profile.github],
    worksFor: {
      "@type": "Organization",
      name: experiences[0]?.company ?? profile.title,
      ...(experiences[0]?.url ? { url: experiences[0].url } : {}),
    },
    knowsAbout: skillGroups.flatMap((group) => group.items),
    description:
      `${tenure.careerYearsLabel} building software. Currently ${profile.title} at ${experiences[0]?.company}. Prior work includes Dwetech from 2009 to 2016 and ${tenure.chaldalYearsLabel} at Chaldal (YC S15).`,
  };

  const websiteLd = {
    "@type": "WebSite",
    "@id": `${profile.website}/#website`,
    url: profile.website,
    name: `${profile.name} portfolio`,
    description:
      `${tenure.careerYearsLabel} in software. Currently ${profile.title} at ${experiences[0]?.company}. Journey includes Dwetech from 2009 to 2016 and Chaldal (YC S15).`,
    publisher: { "@id": `${profile.website}/#person` },
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [websiteLd, personLd],
  };

  return (
    <div className="journal-site overflow-x-hidden font-body-md text-body-md text-on-surface antialiased">
      <JournalNav />

      <JournalHero currentYear={currentYear} />

      <main className="mx-auto max-w-[1440px]">
        <JournalPhilosophy />
        <JournalProjects projects={featuredProjects} />
        <JournalExperience items={experiences} />
        <JournalSkills groups={skillGroups} />
        <JournalLab groups={skillGroups} />
      </main>

      <JournalFooter year={currentYear} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </div>
  );
}
