import {
  CAREER_START_YEAR,
  CHALDAL_START_YEAR,
  DWETECH_URL,
  FREELANCER_PROFILE_URL,
  experiencesCore,
  profileCore,
  projectsCore,
  skillGroupsCore,
} from "@/lib/career-profile.generated";
import { portfolioUi, projectEnrichment } from "@/lib/portfolio-enrichment";

export type SkillGroup = {
  title: string;
  items: string[];
};

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
};

export type ProjectItem = {
  name: string;
  description: string;
  impact: string;
  brand?: string;
  brandLogo?: string;
  link?: string;
  linkLabel?: string;
  extraLinks?: { label: string; href: string }[];
  coverImage: string;
  coverAlt: string;
  badge: string;
};

export { CAREER_START_YEAR, CHALDAL_START_YEAR, DWETECH_URL, FREELANCER_PROFILE_URL };

export const getCurrentYear = (): number => new Date().getFullYear();
export const getElapsedYears = (startYear: number, year: number = getCurrentYear()): number =>
  Math.max(1, year - startYear);

/** ISR: recompute tenure copy daily so a new calendar year does not require redeploy. */
export const TENURE_REVALIDATE_SECONDS = 86_400;

export const getProfileTenure = (year: number = getCurrentYear()) => {
  const careerYears = getElapsedYears(CAREER_START_YEAR, year);
  const chaldalYears = getElapsedYears(CHALDAL_START_YEAR, year);

  return {
    careerYears,
    chaldalYears,
    careerYearsLabel: `${careerYears}+ years`,
    chaldalYearsLabel: `${chaldalYears}+ years`,
  };
};

export const getHeroTagline = (name: string, year: number = getCurrentYear()): string => {
  const { careerYears, chaldalYears } = getProfileTenure(year);
  return `I'm ${name}. I have spent ${careerYears} years building software, including ${chaldalYears} years at Chaldal (YC S15), where I built and shipped national scale grocery and logistics products from scratch.`;
};

export const getCvSummary = (year: number = getCurrentYear()): string => {
  const { careerYearsLabel, chaldalYearsLabel } = getProfileTenure(year);
  return `Staff level product engineer with ${careerYearsLabel} in software. I co founded Dwetech and delivered 60+ international client projects from 2009 to 2016. I have spent ${chaldalYearsLabel} at Chaldal (YC S15), with hands on ownership across shopper products, mobile apps, logistics, and internal platforms.`;
};

export const profile = {
  ...profileCore,
  cvPdfPath: portfolioUi.cvPdfPath,
  profileImage: portfolioUi.profileImage,
};

export const getSiteMetadata = (year: number = getCurrentYear()) => {
  const tenure = getProfileTenure(year);
  const ogTitle = `${profile.name} | Senior Software Engineer | ${tenure.careerYearsLabel}`;
  const ogDescription = `${tenure.careerYearsLabel} in software. Experience across Dwetech (2009 to 2016) and Chaldal (YC S15), with work in web, mobile, logistics, and platform engineering.`;
  const description = `${profile.name} is a senior software engineer with ${tenure.careerYearsLabel} of experience. Focus areas include Chaldal (YC S15), React, React Native, TypeScript, F#, and logistics products at scale. Based in Dhaka and open to remote roles.`;
  return { ogTitle, ogDescription, description };
};

export const skillGroups: SkillGroup[] = skillGroupsCore.map((group) => ({
  title: group.title,
  items: [...group.items],
}));

export const experiences: ExperienceItem[] = experiencesCore.map((job) => ({
  role: job.role,
  company: job.company,
  period: job.period,
  location: job.location,
  highlights: [...job.highlights],
}));

export const featuredProjects: ProjectItem[] = projectsCore.map((project) => {
  const ui = projectEnrichment[project.id];
  if (!ui) {
    throw new Error(`Missing portfolio enrichment for project id: ${project.id}`);
  }

  return {
    name: project.name,
    description: project.description,
    impact: project.impact,
    brand: ui.brand,
    brandLogo: ui.brandLogo,
    link: ui.link,
    linkLabel: ui.linkLabel,
    extraLinks: ui.extraLinks,
    coverImage: ui.coverImage,
    coverAlt: ui.coverAlt,
    badge: ui.badge,
  };
});
