export type ProjectEnrichment = {
  brand?: string;
  brandLogo?: string;
  link?: string;
  linkLabel?: string;
  extraLinks?: { label: string; href: string }[];
  coverImage: string;
  coverAlt: string;
  badge: string;
};

/** UI-only fields keyed by project id from career-profile.yaml */
export const projectEnrichment: Record<string, ProjectEnrichment> = {
  "chaldal-shopper": {
    brand: "Chaldal",
    brandLogo: "/logos/chaldal.png",
    link: "https://play.google.com/store/apps/details?id=com.chaldal.poached",
    linkLabel: "Google Play →",
    extraLinks: [{ label: "App Store →", href: "https://apps.apple.com/us/app/chaldal-online-grocery/id1104493220" }],
    coverImage: "/projects/chaldal-shopper.png",
    coverAlt: "Chaldal shopper consumer grocery app for national delivery",
    badge: "Production app",
  },
  gogobangla: {
    brand: "GogoBangla",
    brandLogo: "/logos/gogobangla.png",
    link: "https://play.google.com/store/apps/details?id=com.gogobangla",
    linkLabel: "Google Play →",
    coverImage: "/projects/gogobangla.png",
    coverAlt: "GogoBangla merchant fulfillment app for ecommerce and f commerce",
    badge: "B2B Live",
  },
  "chalao-rideshare": {
    brand: "Chalao",
    brandLogo: "/logos/chaldal.png",
    link: "https://www.thedailystar.net/country/news/uber-pathao-and-shohoz-get-brta-certificate-1835719",
    linkLabel: "Read press mention →",
    coverImage: "/projects/chalao-rideshare.png",
    coverAlt: "Chalao ride sharing project under Chaldal",
    badge: "Regulatory",
  },
  "chalao-driver": {
    brand: "Chalao Driver",
    brandLogo: "/logos/chalao-driver.png",
    link: "https://play.google.com/store/apps/details?id=app.chalao.driver",
    coverImage: "/projects/chalao-driver.png",
    coverAlt: "Chalao Driver React Native app for Chaldal logistics",
    badge: "Live app",
  },
  protocol: {
    brand: "Protocol",
    brandLogo: "/logos/protocol.png",
    link: "https://play.google.com/store/apps/details?id=com.chaldal.protocol",
    coverImage: "/projects/protocol.png",
    coverAlt: "Protocol by Chaldal internal operations collaboration platform",
    badge: "Internal Live",
  },
  "subject-eggshell": {
    brand: "Subject / EggShell",
    brandLogo: "/logos/github.png",
    link: "https://github.com/chaldal/subject",
    linkLabel: "View on GitHub →",
    coverImage: "/projects/opensource.png",
    coverAlt: "Subject and EggShell open source frontend stack contribution",
    badge: "Open source",
  },
};

export type ExperienceEnrichment = {
  logo?: string;
  linkLabel?: string;
};

/**
 * UI-only fields keyed by experience id from career-profile.yaml.
 * Do not put company, role, dates, or job copy here.
 */
export const experienceEnrichment: Record<string, ExperienceEnrichment> = {
  allchrono: {
    // Official AllChrono mark (ivory) from the company brand kit.
    // Site: https://allchrono.com/logo/log-only-deep-green.svg
    // Repo: ac-lockfix/packages/ui/brand/logo/logo-only-ivory.svg
    logo: "/logos/allchrono.svg",
    linkLabel: "Website",
  },
};

export type FoundedDiagramId = "precious-key" | "prsm-angles";

export type FoundedEnrichment = {
  badge: string;
  diagram?: FoundedDiagramId;
  linkLabel?: string;
};

/** UI-only fields keyed by founded product id from career-profile.yaml */
export const foundedEnrichment: Record<string, FoundedEnrichment> = {
  precious: {
    badge: "Founded",
    diagram: "precious-key",
    linkLabel: "View on GitHub →",
  },
  prsm: {
    badge: "Founded",
    diagram: "prsm-angles",
    linkLabel: "View on GitHub →",
  },
};

export const portfolioUi = {
  cvPdfPath: "/cv.pdf",
  profileImage: "/hero-portrait-editorial.png",
} as const;
