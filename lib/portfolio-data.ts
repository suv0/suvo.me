import {
  CAREER_START_YEAR,
  CHALDAL_START_YEAR,
  DWETECH_URL,
  FREELANCER_PROFILE_URL,
  experiencesCore,
  foundedCore,
  educationCore,
  profileCore,
  projectsCore,
  skillGroupsCore,
} from "@/lib/career-profile.generated";
import { experienceEnrichment, foundedEnrichment, portfolioUi, projectEnrichment, type FoundedDiagramId } from "@/lib/portfolio-enrichment";

export type SkillGroup = {
  title: string;
  items: string[];
};

export type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  url?: string;
  current?: boolean;
  logo?: string;
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

export { CAREER_START_YEAR, CHALDAL_START_YEAR, DWETECH_URL, FREELANCER_PROFILE_URL, educationCore };

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

const getCurrentJob = () => experiencesCore.find((job) => job.current) ?? experiencesCore[0];

export const getHeroTagline = (name: string, year: number = getCurrentYear()): string => {
  const { careerYears, chaldalYears } = getProfileTenure(year);
  const current = getCurrentJob();
  return `I'm ${name}. I work at ${current.company} as ${current.role}. I have spent ${careerYears} years building software, including ${chaldalYears} years at Chaldal (YC S15), where I built and shipped national scale grocery and logistics products from scratch.`;
};

export const getCvSummary = (year: number = getCurrentYear()): string => {
  const { careerYearsLabel, chaldalYearsLabel } = getProfileTenure(year);
  const current = getCurrentJob();
  return `${current.role} at ${current.company}. Staff level product engineer with ${careerYearsLabel} in software. I co founded Dwetech and delivered 60+ international client projects from 2009 to 2016. I previously spent ${chaldalYearsLabel} at Chaldal (YC S15), with hands on ownership across shopper products, mobile apps, logistics, and internal platforms.`;
};

export const profile = {
  ...profileCore,
  cvPdfPath: portfolioUi.cvPdfPath,
  profileImage: portfolioUi.profileImage,
};

export const getSiteMetadata = (year: number = getCurrentYear()) => {
  const tenure = getProfileTenure(year);
  const current = getCurrentJob();
  const ogTitle = `${profile.name} | ${profile.title} | ${tenure.careerYearsLabel}`;
  const ogDescription = `${profile.name} (${tenure.careerYearsLabel} in software). ${current.role} at ${current.company}. Previously Chaldal (YC S15) and co-founder of Dwetech. Based in Dhaka, open to remote.`;
  const description = `${profile.name} is a ${profile.title} in Dhaka, Bangladesh, with ${tenure.careerYearsLabel} of experience. Currently at ${current.company}. Previously at Chaldal (YC S15). Founder of Precious and PRism. Open to remote roles.`;
  const keywords = [
    "Abdul Hamid Shuvo",
    "Shuvo",
    "suvo.me",
    "suv0",
    "Lead Full Stack Software Engineer",
    "AllChrono",
    "Chaldal",
    "Dhaka software engineer",
  ];
  return { ogTitle, ogDescription, description, name: profile.name, keywords };
};

export const skillGroups: SkillGroup[] = skillGroupsCore.map((group) => ({
  title: group.title,
  items: [...group.items],
}));

export const experiences: ExperienceItem[] = experiencesCore.map((job) => {
  const ui = experienceEnrichment[job.id];
  return {
    id: job.id,
    role: job.role,
    company: job.company,
    period: job.period,
    location: job.location,
    url: "url" in job ? job.url : undefined,
    current: job.current,
    logo: ui?.logo,
    highlights: [...job.highlights],
  };
});

export const getExperienceUrl = (company: string): string | undefined =>
  experiences.find((job) => job.company === company)?.url;

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

export type FoundedItem = {
  id: string;
  name: string;
  role: string;
  tagline?: string;
  status?: string;
  description: string;
  impact: string;
  github?: string;
  badge: string;
  diagram?: FoundedDiagramId;
  linkLabel: string;
};

export const foundedProducts: FoundedItem[] = foundedCore.map((item) => {
  const ui = foundedEnrichment[item.id];
  if (!ui) {
    throw new Error(`Missing portfolio enrichment for founded product id: ${item.id}`);
  }

  const github = "github" in item.links ? item.links.github : undefined;

  return {
    id: item.id,
    name: item.name,
    role: item.role,
    tagline: "tagline" in item ? item.tagline : undefined,
    status: "status" in item ? item.status : undefined,
    description: item.description,
    impact: item.impact,
    github,
    badge: ui.badge,
    diagram: ui.diagram,
    linkLabel: ui.linkLabel ?? "View on GitHub →",
  };
});
