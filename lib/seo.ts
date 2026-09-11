import {
  DWETECH_URL,
  FREELANCER_PROFILE_URL,
  educationCore,
  experiences,
  foundedProducts,
  getProfileTenure,
  profile,
  skillGroups,
} from "@/lib/portfolio-data";

export const SITE_ORIGIN = "https://suvo.me";

const PERSON_ID = `${SITE_ORIGIN}/#person`;
const WEBSITE_ID = `${SITE_ORIGIN}/#website`;
const PAGE_ID = `${SITE_ORIGIN}/#page`;

function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}

export function getOgPortrait() {
  return {
    url: profile.profileImage,
    width: 1536,
    height: 1024,
    alt: `${profile.name} portrait`,
  };
}

export function getSameAsProfiles(): string[] {
  return [profile.linkedin, profile.github, FREELANCER_PROFILE_URL, DWETECH_URL];
}

export function getHomeJsonLd(year?: number) {
  const tenure = getProfileTenure(year);
  const current = experiences.find((job) => job.current) ?? experiences[0];
  const chaldal = experiences.find((job) => job.company.startsWith("Chaldal"));

  const personLd = {
    "@type": "Person",
    "@id": PERSON_ID,
    name: profile.name,
    givenName: "Abdul Hamid",
    familyName: "Shuvo",
    additionalName: "Shuvo",
    alternateName: ["Shuvo", "suv0"],
    jobTitle: profile.title,
    url: SITE_ORIGIN,
    email: profile.email,
    image: absoluteUrl(profile.profileImage),
    sameAs: getSameAsProfiles(),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressCountry: "BD",
    },
    knowsAbout: skillGroups.flatMap((group) => group.items),
    description: `${tenure.careerYearsLabel} building software. Currently ${profile.title} at ${current?.company}. Prior work includes Dwetech from 2009 to 2016 and ${tenure.chaldalYearsLabel} at Chaldal (YC S15). Founder of Precious and PRism.`,
    worksFor: current?.url
      ? { "@type": "Organization", name: current.company, url: current.url }
      : { "@type": "Organization", name: current?.company ?? profile.title },
    alumniOf: educationCore.map((item) => ({
      "@type": "CollegeOrUniversity",
      name: item.institution,
    })),
  };

  const dwetechOrg = {
    "@type": "Organization",
    name: "Dwetech",
    url: DWETECH_URL,
    founder: { "@id": PERSON_ID },
  };

  const chaldalOrg = chaldal
    ? {
        "@type": "Organization",
        name: chaldal.company,
        ...(chaldal.url ? { url: chaldal.url } : {}),
        employee: { "@id": PERSON_ID },
      }
    : null;

  const softwareLd = foundedProducts.map((item) => ({
    "@type": "SoftwareSourceCode",
    "@id": item.github ?? `${SITE_ORIGIN}/#${item.id}`,
    name: item.name,
    description: item.description,
    url: `${SITE_ORIGIN}/#${item.id}`,
    codeRepository: item.github,
    programmingLanguage: "TypeScript",
    license: "https://opensource.org/licenses/MIT",
    author: { "@id": PERSON_ID },
    creator: { "@id": PERSON_ID },
  }));

  const websiteLd = {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_ORIGIN,
    name: "suvo.me",
    alternateName: ["Abdul Hamid Shuvo", "Shuvo portfolio"],
    description: `${profile.name} is a ${profile.title} with ${tenure.careerYearsLabel} of experience. Currently at ${current?.company}. Based in Dhaka and open to remote roles.`,
    inLanguage: "en",
    publisher: { "@id": PERSON_ID },
    author: { "@id": PERSON_ID },
  };

  const pageLd = {
    "@type": "ProfilePage",
    "@id": PAGE_ID,
    url: SITE_ORIGIN,
    name: `${profile.name} | ${profile.title}`,
    description: websiteLd.description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
    mainEntity: { "@id": PERSON_ID },
    inLanguage: "en",
  };

  return {
    "@context": "https://schema.org",
    "@graph": [websiteLd, pageLd, personLd, dwetechOrg, ...(chaldalOrg ? [chaldalOrg] : []), ...softwareLd],
  };
}
