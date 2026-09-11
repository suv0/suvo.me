// Generated from career-profile.yaml — do not edit by hand.
// Run: npm run build (in career-data) or npm run sync:career (in suvo.me)

export const CAREER_START_YEAR = 2009;
export const CHALDAL_START_YEAR = 2017;
export const DWETECH_URL = "https://dwetech.com";
export const FREELANCER_PROFILE_URL = "https://www.freelancer.com/u/N0B0DY";

export const profileCore = {
  "name": "Abdul Hamid Shuvo",
  "title": "Senior Software Engineer",
  "roleStack": "React · React Native · TypeScript · F# · Systems at scale",
  "location": "Dhaka, Bangladesh. Open to remote roles.",
  "email": "me@suvo.me",
  "website": "https://suvo.me",
  "linkedin": "https://www.linkedin.com/in/shuv0",
  "github": "https://github.com/suv0",
  "heroSummary": "I build and own products end to end, from first release to long term production support. Since 2017 at Chaldal, I have worked across mobile web, native shopper apps, Chalao ride sharing, Chalao Driver logistics, and Protocol.",
  "about": "I started freelancing in 2009 and later co founded Dwetech. From 2009 to 2016, we delivered more than 60 projects for clients in the USA, UK, Canada, and Australia. In January 2017, I joined Chaldal (YC S15, about 2,200 staff) when the company had only a minimal desktop site and no production mobile web or native shopper apps. I built the mobile web from zero, rebuilt the desktop experience, and shipped Android and iOS shopper apps as primary engineer."
} as const;

export const strengths = [
  "Frontend and mobile product ownership across React, React Native, Next.js, TypeScript, and accessibility-minded UI.",
  "Production systems judgment from grocery, logistics, payments, dispatch, and unstable-network field operations.",
  "Backend and platform fluency with F#, .NET, Node.js, REST APIs, PostgreSQL, Redis, PHP, and MySQL.",
  "Cross-functional delivery: product shaping, release management, code review, mentoring, regulatory documentation, and stakeholder communication."
] as const;

export const experiencesCore = [
  {
    "role": "Senior Software Engineer",
    "company": "Chaldal (YC S15)",
    "period": "Jan 2017 to Present",
    "location": "Dhaka, Bangladesh",
    "highlights": [
      "Joined Chaldal in January 2017 when the platform had a limited desktop experience and no production mobile web or native shopper apps. Built mobile web from zero, modernized desktop, and shipped Android and iOS shopper apps as a primary engineer.",
      "Built Chalao ride sharing under Chaldal licensing. Shipped the app and led BRTA and government side work, including meetings, documentation, and enlistment.",
      "Own Chalao Driver for logistics operations. Built and maintain the React Native app used by last mile drivers in production conditions.",
      "Build and maintain GogoBangla, a merchant fulfillment app for ecommerce and f commerce workflows across picking, warehousing, and shipping.",
      "Shipped Protocol for over 1,000 internal users, maintained multiple operations apps, and shaped early frontend architecture on Subject and EggShell."
    ]
  },
  {
    "role": "Co-founder & Lead Developer",
    "company": "Dwetech",
    "period": "Jun 2009 to Dec 2016",
    "location": "Bangladesh (remote client delivery)",
    "highlights": [
      "Co founded a software company and delivered 60+ projects for clients across the USA, UK, Canada, and Australia.",
      "Built product and client systems across PHP, JavaScript, CMS ecosystems, integrations, and automation-heavy workflows.",
      "Built in house SaaS products, including a CRM and mobile credit recharge tools, alongside client delivery. Maintained a 5.0 rating across 63 completed projects on Freelancer.com, including multi year engagements with repeat enterprise clients."
    ]
  }
] as const;

export const skillGroupsCore = [
  {
    "title": "Frontend",
    "items": [
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Accessibility",
      "Performance"
    ]
  },
  {
    "title": "Mobile",
    "items": [
      "React Native",
      "Android Releases",
      "iOS Releases",
      "Location Systems",
      "Field operations"
    ]
  },
  {
    "title": "Backend & Data",
    "items": [
      "F#",
      ".NET",
      "Node.js",
      "REST APIs",
      "PostgreSQL",
      "Redis",
      "PHP",
      "MySQL"
    ]
  },
  {
    "title": "Engineering practice",
    "items": [
      "System Design",
      "Release Management",
      "Code Review",
      "CI/CD",
      "Mentorship"
    ]
  }
] as const;

export const projectsCore = [
  {
    "id": "chaldal-shopper",
    "name": "Chaldal Shopper App",
    "description": "Consumer grocery app for Chaldal national delivery platform. Primary engineer on the original Android and iOS build from the ground up, with ongoing releases and production ownership across the shopper stack.",
    "impact": "Android: 1M+ downloads and 4.4 stars. iOS: 4.8 stars. Supports national scale traffic, payments, and fulfillment in a regulated retail environment.",
    "links": {
      "playStore": "https://play.google.com/store/apps/details?id=com.chaldal.poached",
      "appStore": "https://apps.apple.com/us/app/chaldal-online-grocery/id1104493220"
    }
  },
  {
    "id": "gogobangla",
    "name": "GogoBangla",
    "description": "Merchant facing fulfillment app for Chaldal B2B logistics platform. Ecommerce and f commerce sellers use it for picking, storage, and last mile delivery on the same network used for national grocery scale.",
    "impact": "Live on Google Play with ongoing releases. Supports merchant order fulfillment, pickups, and exchanges across Chaldal logistics footprint, including dozens of large stores and hundreds of online merchants.",
    "links": {
      "playStore": "https://play.google.com/store/apps/details?id=com.gogobangla"
    }
  },
  {
    "id": "chalao-rideshare",
    "name": "Chalao (ride-sharing)",
    "description": "Consumer ride-hailing app licensed under Chaldal. I built the application and owned the regulatory path: BRTA meetings, documentation, and enlistment so we could operate in that category.",
    "impact": "Chaldal was listed among operators receiving BRTA enlistment certificates in The Daily Star (Dec 2019). The ride sharing line did not continue.",
    "links": {
      "press": "https://www.thedailystar.net/country/news/uber-pathao-and-shohoz-get-brta-certificate-1835719"
    }
  },
  {
    "id": "chalao-driver",
    "name": "Chalao Driver (logistics)",
    "description": "Production React Native app for Chaldal own last mile drivers. Covers dispatch, navigation, earnings, and field operations.",
    "impact": "Designed for real world constraints such as unstable connectivity, location reliability, and battery limits. Full product ownership from specification through production.",
    "links": {
      "playStore": "https://play.google.com/store/apps/details?id=app.chalao.driver"
    }
  },
  {
    "id": "protocol",
    "name": "Protocol by Chaldal",
    "description": "Internal and mobile collaboration platform used by operations, finance, HR, and engineering teams.",
    "impact": "Improved task visibility and coordination at scale with a practical workflow model used by 1,000+ internal users.",
    "links": {
      "playStore": "https://play.google.com/store/apps/details?id=com.chaldal.protocol"
    }
  },
  {
    "id": "subject-eggshell",
    "name": "Subject / EggShell",
    "description": "Open-source application stack contribution focused on frontend layer APIs and foundational component patterns.",
    "impact": "Shaped early architecture decisions and reusable building blocks for the frontend layer.",
    "links": {
      "github": "https://github.com/chaldal/subject"
    }
  }
] as const;
