import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Story } from "@/payload-types";
import { mediaSrc } from "@/lib/media";
import { profile } from "@/lib/portfolio-data";
import { SITE_ORIGIN } from "@/lib/seo";

function payloadSecretConfigured(): boolean {
  return Boolean(process.env.PAYLOAD_SECRET?.trim());
}

/** Serverless has no durable SQLite disk — require Postgres on Vercel. */
function payloadDbReady(): boolean {
  if (!payloadSecretConfigured()) return false;
  if (process.env.VERCEL && !process.env.POSTGRES_URL?.trim() && !process.env.DATABASE_URL?.trim()) {
    return false;
  }
  return true;
}

export async function getPublishedStories(): Promise<Story[]> {
  if (!payloadDbReady()) {
    console.error("Payload DB not configured; skipping published stories query");
    return [];
  }

  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "stories",
      where: { _status: { equals: "published" } },
      sort: "-publishedAt",
      depth: 1,
      limit: 100,
      draft: false,
    });
    return result.docs as Story[];
  } catch (error) {
    console.error("Failed to read published stories:", error);
    return [];
  }
}

export const getPublishedStory = cache(async (slug: string): Promise<Story | null> => {
  if (!payloadDbReady()) {
    console.error("Payload DB not configured; skipping published story query");
    return null;
  }

  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "stories",
      where: {
        and: [{ slug: { equals: slug } }, { _status: { equals: "published" } }],
      },
      depth: 2,
      limit: 1,
      draft: false,
    });
    return (result.docs[0] as Story | undefined) ?? null;
  } catch (error) {
    console.error("Failed to read published story:", error);
    return null;
  }
});

export function storyDateLabel(story: Story): string | null {
  const raw = story.publishedAt;
  if (!raw) return null;
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function getStoryJsonLd(story: Story) {
  const url = `${SITE_ORIGIN}/stories/${story.slug}`;
  const image = mediaSrc(story.cover, "og") ?? mediaSrc(story.cover);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: story.title,
    description: story.excerpt || undefined,
    datePublished: story.publishedAt || undefined,
    dateModified: story.updatedAt || undefined,
    url,
    mainEntityOfPage: url,
    image: image ? [image.startsWith("http") ? image : `${SITE_ORIGIN}${image}`] : undefined,
    author: {
      "@type": "Person",
      name: profile.name,
      url: SITE_ORIGIN,
    },
    publisher: {
      "@type": "Person",
      name: profile.name,
      url: SITE_ORIGIN,
    },
  };
}
