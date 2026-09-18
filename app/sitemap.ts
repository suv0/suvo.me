import type { MetadataRoute } from "next";
import { getPublishedStories } from "@/lib/stories";

const SITE = "https://suvo.me";

/** Request-time so a missing Payload secret cannot fail `next build` on preview. */
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  let stories: Awaited<ReturnType<typeof getPublishedStories>> = [];
  try {
    stories = await getPublishedStories();
  } catch (error) {
    console.error("Sitemap skipped published stories", error);
  }

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
