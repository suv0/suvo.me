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

export type HeroStat = {
  label: string;
  value: string;
  href?: string;
};

const DWETECH_START_YEAR = 2009;
const CHALDAL_START_YEAR = 2017;
const currentYear = new Date().getUTCFullYear();
const totalCareerYears = Math.max(1, currentYear - DWETECH_START_YEAR);
const chaldalYears = Math.max(1, currentYear - CHALDAL_START_YEAR);

export const profile = {
  name: "Abdul Hamid Shuvo",
  shortName: "Shuvo",
  title: "Senior Software Engineer",
  /** One-line role stack for hero chips / marquee context */
  roleStack: "React · React Native · TypeScript · F# · Systems at scale",
  location: "Dhaka, Bangladesh · Open to remote",
  email: "me@suvo.me",
  /** Canonical site URL — for metadata / JSON-LD only; do not use as an on-page self-link. */
  website: "https://suvo.me",
  linkedin: "https://www.linkedin.com/in/shuv0",
  /** Personal GitHub profile (hero “GitHub” button). */
  github: "https://github.com/suv0",
  /** Optional CV PDF under `public/` — add the file alongside this path. */
  cvPdfPath: "/cv.pdf",
  contactHeadline: "Open to staff-level product engineering roles",
  /** AI studio portrait (editorial crop); high-res asset in `public/`. */
  profileImage: "/hero-portrait-editorial.png",
  tagline:
    "I'm Abdul Hamid Shuvo — 16 years building software, the last 9 at Chaldal (YC S15), shipping national-scale grocery and logistics products from scratch.",
  heroSummary:
    "As a senior software engineer, I still build and own products end to end — from first mobile web through native apps to field logistics — with reliability under flaky networks, dispatch pressure, and a steady release cadence. From 2009 through 2016 I co-founded Dwetech and delivered 60+ international client projects; since January 2017 at Chaldal: mobile web from zero, native shopper apps, Chalao ride-sharing (BRTA licensing), Chalao Driver for last-mile logistics, and Protocol with platform architecture in F# and TypeScript.",
  about:
    "I started freelancing and co-founded Dwetech in 2009, delivering 60+ international projects over roughly seven years for clients across the USA, UK, Canada, and Australia. In January 2017, Chaldal (YC S15, ~2,200 staff) had minimal desktop web, no mobile web, and no production native shopper apps on a national-scale grocery and logistics platform. I built mobile web alone from zero, rebuilt and evolved the desktop experience, and led the ground-up Android and iOS shopper apps with teammates on delivery. After that foundation, I moved into Chalao as a consumer ride-sharing product under Chaldal: I built the app and carried BRTA meetings, documentation, and licensing so we could enlist; the ride business did not continue. Today the name Chalao also covers Chalao Driver, our logistics driver app for Chaldal’s own delivery network, which I own end to end with the same rigor I brought to the shopper stack — spanning logistics apps and platform architecture.",
  cta: "Open to Staff Product Engineer and Senior/Staff Software Engineer roles — remote or Dhaka-based. Reach out at me@suvo.me.",
  heroStats: [
    { label: "Career", value: `${totalCareerYears}+ yrs` },
    { label: "Chaldal · National scale · YC S15", value: `${chaldalYears}+ yrs` },
    { label: "Dwetech · 2009–2016", value: "60+ projects", href: "https://dwetech.com" },
  ] satisfies HeroStat[],
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

/** Flat list for marquee / orbit-style surfaces */
export const allSkills: string[] = skillGroups.flatMap((g) => g.items);

export const experiences: ExperienceItem[] = [
  {
    role: "Senior Software Engineer",
    company: "Chaldal (YC S15)",
    period: "Jan 2017 - Present",
    location: "Dhaka, Bangladesh",
    highlights: [
      "Joined January 2017 when Chaldal had only bare-minimum desktop web: built mobile web alone (none existed), evolved desktop into the modern production shopper site, and shipped native Android and iOS shopper apps from the ground up as the primary engineer.",
      "Built Chalao consumer ride-sharing under Chaldal licensing: shipped the app and led BRTA and government-side work (meetings, documentation, enlistment). The ride business did not continue — Chaldal was listed among operators receiving BRTA enlistment certificates (Daily Star, Dec 2019).",
      "Own Chalao Driver (logistics): React Native operations app for Chaldal’s last-mile drivers, not the same product as consumer ride-sharing. Full ownership, real-time dispatch, unreliable networks, and ongoing Play Store releases.",
      "Shipped Protocol for 1,000+ internal users (also on Play Store), maintained other Chaldal operations apps where applicable, and was an early core contributor to Subject / EggShell on the frontend layer.",
    ],
  },
  {
    role: "Co-founder & Lead Developer",
    company: "Dwetech",
    period: "Jun 2009 - Dec 2016",
    location: "Bangladesh (remote client delivery)",
    highlights: [
      "Co-founded a software company and delivered 60+ projects for clients across the USA, UK, Canada, and Australia.",
      "Built product and client systems across PHP, JavaScript, CMS ecosystems, integrations, and automation-heavy workflows.",
      "Built in-house SaaS products (CRM, mobile credit recharge) alongside client delivery. Maintained a 5.0 rating across 63 completed projects on Freelancer.com, including multi-year engagements with repeat enterprise clients.",
    ],
  },
];

export const featuredProjects: ProjectItem[] = [
  {
    name: "Chaldal Shopper App",
    description:
      "Consumer grocery app for Chaldal’s national delivery platform. Primary engineer on the original Android and iOS build from the ground up; ongoing releases and production ownership across the shopper stack.",
    impact:
      "Android: 1M+ downloads, 4.4★ · iOS: 4.8★. National-scale traffic, payments, and fulfillment UX in a regulated retail environment.",
    link: "https://play.google.com/store/apps/details?id=com.chaldal.poached",
    linkLabel: "Google Play →",
    extraLinks: [{ label: "App Store →", href: "https://apps.apple.com/us/app/chaldal-online-grocery/id1104493220" }],
    coverImage: "/projects/chaldal-shopper.png",
    coverAlt: "Chaldal shopper — consumer grocery app for national delivery",
    badge: "Production app",
  },
  {
    name: "Chalao (ride-sharing)",
    description:
      "Consumer ride-hailing app licensed under Chaldal. I built the application and owned the regulatory path: BRTA meetings, documentation, and enlistment so we could operate in that category.",
    impact:
      "Chaldal was listed among operators receiving BRTA enlistment certificates (Daily Star, Dec 2019). The ride-sharing business did not continue as an operating line; the work still shows product plus regulatory execution under pressure.",
    link: "https://www.thedailystar.net/country/news/uber-pathao-and-shohoz-get-brta-certificate-1835719",
    linkLabel: "Read press mention →",
    coverImage: "/projects/chalao-rideshare.png",
    coverAlt: "Chalao ride-sharing — regulatory and product chapter under Chaldal",
    badge: "Regulatory",
  },
  {
    name: "Chalao Driver (logistics)",
    description:
      "Production React Native app for Chaldal’s own last-mile drivers: dispatch, navigation, earnings, and field operations. Same brand family as historical Chalao ride-sharing, different product and codebase era.",
    impact:
      "Designed for real-world constraints: unstable connectivity, location reliability, battery limits, and ongoing release cadence. Full product ownership from spec through production.",
    link: "https://play.google.com/store/apps/details?id=app.chalao.driver",
    coverImage: "/projects/chalao-driver.png",
    coverAlt: "Chalao Driver — React Native app for Chaldal last-mile logistics",
    badge: "Live app",
  },
  {
    name: "Protocol by Chaldal",
    description:
      "Internal and mobile collaboration platform used by operations, finance, HR, and engineering teams.",
    impact:
      "Improved task visibility and coordination at scale with a practical workflow model used by 1,000+ internal users.",
    link: "https://play.google.com/store/apps/details?id=com.chaldal.protocol",
    coverImage: "/projects/protocol.png",
    coverAlt: "Protocol by Chaldal — internal operations collaboration platform",
    badge: "Internal · Live",
  },
  {
    name: "Subject / EggShell",
    description:
      "Open-source application stack contribution focused on frontend layer APIs and foundational component patterns.",
    impact:
      "Helped shape early architecture decisions and reusable building blocks that made product development faster and safer.",
    link: "https://github.com/chaldal/subject",
    linkLabel: "View on GitHub →",
    coverImage: "/projects/opensource.png",
    coverAlt: "Subject / EggShell — open-source frontend stack contribution",
    badge: "Open source",
  },
];
