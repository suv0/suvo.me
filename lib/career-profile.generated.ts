// Generated from career-profile.yaml — do not edit by hand.
// Run: npm run build (in career-data) or npm run sync:career (in suvo.me)

export const CAREER_START_YEAR = 2009;
export const CHALDAL_START_YEAR = 2017;
export const DWETECH_URL = "https://dwetech.com";
export const FREELANCER_PROFILE_URL = "https://www.freelancer.com/u/N0B0DY";

export const profileCore = {
  "name": "Abdul Hamid Shuvo",
  "title": "Lead Full Stack Software Engineer",
  "roleStack": "TypeScript · Next.js · React · NestJS · Systems at scale",
  "location": "Dhaka, Bangladesh. Open to remote roles.",
  "email": "me@suvo.me",
  "website": "https://suvo.me",
  "linkedin": "https://www.linkedin.com/in/shuv0",
  "github": "https://github.com/suv0",
  "heroSummary": "I am Lead Full Stack Software Engineer at AllChrono, where I help build the platform behind a global luxury-watch trading marketplace. I still own products end to end, and I lead the engineering hiring loop. From 2017 at Chaldal, I worked across mobile web, native shopper apps, Chalao ride sharing, Chalao Driver logistics, and Protocol.",
  "about": "I started freelancing in 2009 and later co founded Dwetech. From 2009 to 2016, we delivered more than 60 projects for clients in the USA, UK, Canada, and Australia. In January 2017, I joined Chaldal (YC S15, about 2,200 staff) when the company had only a minimal desktop site and no production mobile web or native shopper apps. I built the mobile web from zero, rebuilt the desktop experience, and shipped Android and iOS shopper apps as primary engineer. I now lead full-stack engineering at AllChrono, including interviews and assessments for the engineering team. I also found independent tools I actually use to ship, including Precious and PRism."
} as const;

export const strengths = [
  "Frontend and mobile product ownership across React, React Native, Next.js, TypeScript, and accessibility-minded UI.",
  "Production systems judgment from grocery, logistics, payments, dispatch, and unstable-network field operations.",
  "Backend and platform fluency with F#, .NET, Node.js, NestJS, REST APIs, PostgreSQL, Prisma, Redis, PHP, and MySQL.",
  "Cross-functional delivery: product shaping, release management, code review, mentoring, regulatory documentation, and stakeholder communication.",
  "Lead engineering hiring loops and assessments, including nearly 30 senior software engineer interviews plus product and design interviews."
] as const;

export const experiencesCore = [
  {
    "id": "allchrono",
    "role": "Lead Full Stack Software Engineer",
    "company": "AllChrono",
    "period": "Present",
    "location": "Dhaka, Bangladesh (remote)",
    "url": "https://allchrono.com",
    "current": true,
    "highlights": [
      "Leading full-stack engineering at AllChrono, a global luxury-watch trading platform anchored in Saudi Arabia that provides trusted infrastructure for cross-border transactions.",
      "Lead engineering hiring at AllChrono. I run interviews and assessments for nearly 30 senior software engineers, owning the loop and the hiring bar even when other interviewers join. I have also interviewed product and design candidates.",
      "Own product architecture across the Next.js marketplace, seller, operator, and landing surfaces together with the NestJS platform API, including identity, authentication, and seller-facing workflows.",
      "Shape technical direction on TypeScript services backed by PostgreSQL and Prisma, with Dockerized delivery across the application and API layers."
    ]
  },
  {
    "id": "chaldal",
    "role": "Senior Software Engineer",
    "company": "Chaldal (YC S15)",
    "period": "Jan 2017 to 2026",
    "location": "Dhaka, Bangladesh",
    "current": false,
    "highlights": [
      "Joined Chaldal in January 2017 when the platform had a limited desktop experience and no production mobile web or native shopper apps. Built mobile web from zero, modernized desktop, and shipped Android and iOS shopper apps as a primary engineer.",
      "Built Chalao ride sharing under Chaldal licensing. Shipped the app and led BRTA and government side work, including meetings, documentation, and enlistment.",
      "Own Chalao Driver for logistics operations. Built and maintain the React Native app used by last mile drivers in production conditions.",
      "Build and maintain GogoBangla, a merchant fulfillment app for ecommerce and f commerce workflows across picking, warehousing, and shipping.",
      "Shipped Protocol for over 1,000 internal users, maintained multiple operations apps, and shaped early frontend architecture on Subject and EggShell."
    ]
  },
  {
    "id": "dwetech",
    "role": "Co-founder & Lead Developer",
    "company": "Dwetech",
    "period": "Jun 2009 to Dec 2016",
    "location": "Bangladesh (remote client delivery)",
    "current": false,
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
      "NestJS",
      "REST APIs",
      "PostgreSQL",
      "Prisma",
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
      "Docker",
      "Mentorship",
      "Technical interviews",
      "Hiring"
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

export const foundedCore = [
  {
    "id": "precious",
    "name": "Precious",
    "role": "Founder",
    "tagline": "One key to rule them all.",
    "status": "Public · MIT · self-hosted",
    "description": "Self-hosted LLM router. You add your own API keys from Groq, Gemini, OpenAI, and other providers. When one hits a rate limit, Precious fails over to the next and forwards the full conversation so chat does not start over.",
    "impact": "One prec_ key for Cursor, Python, LangChain, or any OpenAI-compatible client. Seventeen provider adapters. Keys encrypted at rest.",
    "links": {
      "github": "https://github.com/suv0/precious"
    }
  },
  {
    "id": "prsm",
    "name": "PRism",
    "role": "Founder",
    "tagline": "See every angle before you merge.",
    "status": "Public · MIT · local",
    "description": "Local multi-agent pull request review. Point the prsm CLI at a GitHub PR. Specialist passes (correctness, nitpick, devil's advocate) run through AI CLIs already on your machine.",
    "impact": "Agents run in parallel and merge into one triage queue. It never auto-posts to GitHub; you paste comments yourself. No PRism API key.",
    "links": {
      "github": "https://github.com/suv0/prsm"
    }
  }
] as const;

export const educationCore = [
  {
    "credential": "B.Sc., Computer Science & Engineering",
    "institution": "Stamford University Bangladesh",
    "period": "2008 - 2012"
  }
] as const;
