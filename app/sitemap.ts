import type { MetadataRoute } from "next";
import { getPublishedStories } from "@/lib/stories";

const SITE = "https://suvo.me";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const stories = await getPublishedStories();

  return [
    { url: SITE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/cv`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/cv.pdf`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/kids`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/stories`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    ...stories.map((story) => ({
      url: `${SITE}/stories/${story.slug}`,
      lastModified: story.updatedAt ? new Date(story.updatedAt) : now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
