import type { MetadataRoute } from "next";

const SITE = "https://suvo.me";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE}/cv`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/kids`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
  ];
}
