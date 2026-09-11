import type { MetadataRoute } from "next";

const SITE = "https://suvo.me";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/cv`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/cv.pdf`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/kids`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
