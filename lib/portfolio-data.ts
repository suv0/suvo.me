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
  /** Organization or product family label shown as a subtle brand marker. */
  brand?: string;
  /** Optional brand icon used as visual cue in project header. */
  brandLogo?: string;
  /** Primary outbound link (store, article, repo, etc.) */
  link?: string;
  /** CTA label for primary link (defaults in UI if omitted) */
  linkLabel?: string;
  /** Optional secondary links (e.g. iOS + Android) */
  extraLinks?: { label: string; href: string }[];
  /** Local `/public/...` path or absolute URL for card thumbnail / OG-style art */
  coverImage: string;
  /** Descriptive alt for the cover image */
  coverAlt: string;
  /** Short pill on the card media (avoid misleading “Case study” unless it is one) */
  badge: string;
};

export const getCurrentYear = (): number => new Date().getFullYear();
export const getElapsedYears = (startYear: number, year: number = getCurrentYear()): number =>
  Math.max(1, year - startYear);

export const CAREER_START_YEAR = 2009;
export const CHALDAL_START_YEAR = 2017;
export const DWETECH_URL = "https://dwetech.com";
export const FREELANCER_PROFILE_URL = "https://www.freelancer.com/u/N0B0DY";

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
  name: "Abdul Hamid Shuvo",
  title: "Senior Software Engineer",
  /** One-line role stack for OG image and metadata. */
  roleStack: "React · React Native · TypeScript · F# · Systems at scale",
  location: "Dhaka, Bangladesh. Open to remote roles.",
  email: "me@suvo.me",
  /** Canonical site URL — for metadata / JSON-LD only; do not use as an on-page self-link. */
  website: "https://suvo.me",
  linkedin: "https://www.linkedin.com/in/shuv0",
  /** Personal GitHub profile (hero “GitHub” button). */
  github: "https://github.com/suv0",
  /** Optional CV PDF under `public/` — add the file alongside this path. */
  cvPdfPath: "/cv.pdf",
  /** AI studio portrait (editorial crop); high-res asset in `public/`. */
  profileImage: "/hero-portrait-editorial.png",
  heroSummary:
    "I build and own products end to end, from first release to long term production support. Since 2017 at Chaldal, I have worked across mobile web, native shopper apps, Chalao ride sharing, Chalao Driver logistics, and Protocol.",
  about:
    "I started freelancing in 2009 and later co founded Dwetech. From 2009 to 2016, we delivered more than 60 projects for clients in the USA, UK, Canada, and Australia. In January 2017, I joined Chaldal (YC S15, about 2,200 staff) when the company had only a minimal desktop site and no production mobile web or native shopper apps. I built the mobile web from zero, rebuilt the desktop experience, and shipped Android and iOS shopper apps as primary engineer.",
};

export const getSiteMetadata = (year: number = getCurrentYear()) => {
  const tenure = getProfileTenure(year);
  const ogTitle = `${profile.name} | Senior Software Engineer | ${tenure.careerYearsLabel}`;
  const ogDescription = `${tenure.careerYearsLabel} in software. Experience across Dwetech (2009 to 2016) and Chaldal (YC S15), with work in web, mobile, logistics, and platform engineering.`;
  const description = `${profile.name} is a senior software engineer with ${tenure.careerYearsLabel} of experience. Focus areas include Chaldal (YC S15), React, React Native, TypeScript, F#, and logistics products at scale. Based in Dhaka and open to remote roles.`;
  return { ogTitle, ogDescription, description };
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    items: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Accessibility"],
  },
  {
    title: "Mobile",
    items: ["React Native", "Android Releases", "iOS Releases", "Location Systems"],
  },
  {
    title: "Backend & Data",
    items: ["F#", ".NET", "REST APIs", "PostgreSQL", "Redis", "PHP", "MySQL"],
  },
  {
    title: "Engineering practice",
    items: ["System Design", "Release Management", "Code Review", "CI/CD", "Mentorship"],
  },
];

export const experiences: ExperienceItem[] = [
  {
    role: "Senior Software Engineer",
    company: "Chaldal (YC S15)",
    period: "Jan 2017 to Present",
    location: "Dhaka, Bangladesh",
    highlights: [
      "Joined Chaldal in January 2017 when the platform had a limited desktop experience and no production mobile web or native shopper apps. Built mobile web from zero, modernized desktop, and shipped Android and iOS shopper apps as a primary engineer.",
      "Built Chalao ride sharing under Chaldal licensing. Shipped the app and led BRTA and government side work, including meetings, documentation, and enlistment.",
      "Own Chalao Driver for logistics operations. Built and maintain the React Native app used by last mile drivers in production conditions.",
      "Build and maintain GogoBangla, a merchant fulfillment app for ecommerce and f commerce workflows across picking, warehousing, and shipping.",
      "Shipped Protocol for over 1,000 internal users, maintained multiple operations apps, and shaped early frontend architecture on Subject and EggShell.",
    ],
  },
  {
    role: "Co-founder & Lead Developer",
    company: "Dwetech",
    period: "Jun 2009 to Dec 2016",
    location: "Bangladesh (remote client delivery)",
    highlights: [
      "Co founded a software company and delivered 60+ projects for clients across the USA, UK, Canada, and Australia.",
      "Built product and client systems across PHP, JavaScript, CMS ecosystems, integrations, and automation-heavy workflows.",
      "Built in house SaaS products, including a CRM and mobile credit recharge tools, alongside client delivery. Maintained a 5.0 rating across 63 completed projects on Freelancer.com, including multi year engagements with repeat enterprise clients.",
    ],
  },
];

export const featuredProjects: ProjectItem[] = [
  {
    name: "Chaldal Shopper App",
    brand: "Chaldal",
    brandLogo: "/logos/chaldal.png",
    description:
      "Consumer grocery app for Chaldal’s national delivery platform. Primary engineer on the original Android and iOS build from the ground up, with ongoing releases and production ownership across the shopper stack.",
    impact:
      "Android: 1M+ downloads and 4.4 stars. iOS: 4.8 stars. Supports national scale traffic, payments, and fulfillment in a regulated retail environment.",
    link: "https://play.google.com/store/apps/details?id=com.chaldal.poached",
    linkLabel: "Google Play →",
    extraLinks: [{ label: "App Store →", href: "https://apps.apple.com/us/app/chaldal-online-grocery/id1104493220" }],
    coverImage: "/projects/chaldal-shopper.png",
    coverAlt: "Chaldal shopper consumer grocery app for national delivery",
    badge: "Production app",
  },
  {
    name: "GogoBangla",
    brand: "GogoBangla",
    brandLogo: "/logos/gogobangla.png",
    description:
      "Merchant facing fulfillment app for Chaldal’s B2B logistics platform. Ecommerce and f commerce sellers use it for picking, storage, and last mile delivery on the same network used for national grocery scale.",
    impact:
      "Live on Google Play with ongoing releases. Supports merchant order fulfillment, pickups, and exchanges across Chaldal’s logistics footprint, including dozens of large stores and hundreds of online merchants.",
    link: "https://play.google.com/store/apps/details?id=com.gogobangla",
    linkLabel: "Google Play →",
    coverImage: "/projects/gogobangla.png",
    coverAlt: "GogoBangla merchant fulfillment app for ecommerce and f commerce",
    badge: "B2B Live",
  },
  {
    name: "Chalao (ride-sharing)",
    brand: "Chalao",
    brandLogo: "/logos/chaldal.png",
    description:
      "Consumer ride-hailing app licensed under Chaldal. I built the application and owned the regulatory path: BRTA meetings, documentation, and enlistment so we could operate in that category.",
    impact:
      "Chaldal was listed among operators receiving BRTA enlistment certificates in The Daily Star (Dec 2019). The ride sharing line did not continue.",
    link: "https://www.thedailystar.net/country/news/uber-pathao-and-shohoz-get-brta-certificate-1835719",
    linkLabel: "Read press mention →",
    coverImage: "/projects/chalao-rideshare.png",
    coverAlt: "Chalao ride sharing project under Chaldal",
    badge: "Regulatory",
  },
  {
    name: "Chalao Driver (logistics)",
    brand: "Chalao Driver",
    brandLogo: "/logos/chalao-driver.png",
    description:
      "Production React Native app for Chaldal’s own last mile drivers. Covers dispatch, navigation, earnings, and field operations.",
    impact:
      "Designed for real world constraints such as unstable connectivity, location reliability, and battery limits. Full product ownership from specification through production.",
    link: "https://play.google.com/store/apps/details?id=app.chalao.driver",
    coverImage: "/projects/chalao-driver.png",
    coverAlt: "Chalao Driver React Native app for Chaldal logistics",
    badge: "Live app",
  },
  {
    name: "Protocol by Chaldal",
    brand: "Protocol",
    brandLogo: "/logos/protocol.png",
    description:
      "Internal and mobile collaboration platform used by operations, finance, HR, and engineering teams.",
    impact:
      "Improved task visibility and coordination at scale with a practical workflow model used by 1,000+ internal users.",
    link: "https://play.google.com/store/apps/details?id=com.chaldal.protocol",
    coverImage: "/projects/protocol.png",
    coverAlt: "Protocol by Chaldal internal operations collaboration platform",
    badge: "Internal Live",
  },
  {
    name: "Subject / EggShell",
    brand: "Subject / EggShell",
    brandLogo: "/logos/github.png",
    description:
      "Open-source application stack contribution focused on frontend layer APIs and foundational component patterns.",
    impact:
      "Shaped early architecture decisions and reusable building blocks for the frontend layer.",
    link: "https://github.com/chaldal/subject",
    linkLabel: "View on GitHub →",
    coverImage: "/projects/opensource.png",
    coverAlt: "Subject and EggShell open source frontend stack contribution",
    badge: "Open source",
  },
];
