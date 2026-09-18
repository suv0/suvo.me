import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JournalSectionEyebrow, JournalSymbol } from "@/components/journal/journal-symbol";
import { StoryLayout } from "@/components/stories/story-layout";
import { StoryMediaImage } from "@/components/stories/story-media-image";
import { journalLinkMotion } from "@/lib/journal-motion";
import { mediaAlt, mediaSrc } from "@/lib/media";
import { jsonLdScript } from "@/lib/seo";
import { getPublishedStory, getStoryJsonLd, storyDateLabel } from "@/lib/stories";

export const dynamic = "force-dynamic";

type StoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = await getPublishedStory(slug);
  if (!story) {
    return { title: "Story", robots: { index: false, follow: false } };
  }

  const description = story.excerpt || `${story.title} — a story from Abdul Hamid Shuvo.`;
  const image = mediaSrc(story.cover, "og") ?? mediaSrc(story.cover);
  const canonical = `https://suvo.me/stories/${story.slug}`;

  return {
    title: story.title,
    description,
    robots: { index: true, follow: true },
    alternates: { canonical },
    openGraph: {
      title: story.title,
      description,
      type: "article",
      url: canonical,
      siteName: "suvo.me",
      publishedTime: story.publishedAt ?? undefined,
      modifiedTime: story.updatedAt ?? undefined,
      images: image
        ? [{ url: image, alt: mediaAlt(story.cover, story.title) }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: story.title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = await getPublishedStory(slug);
  if (!story) notFound();

  const dateLabel = storyDateLabel(story);
  const jsonLd = getStoryJsonLd(story);

  return (
    <div className="journal-site min-h-screen min-w-0 overflow-x-hidden font-body-md text-body-md text-on-surface antialiased">
      <section className="border-b border-border-muted px-grid-margin pb-10 pt-24 sm:pb-12 md:pt-28 max-lg:pl-[max(1rem,env(safe-area-inset-left,0px))] max-lg:pr-[max(1rem,env(safe-area-inset-right,0px))]">
        <div className="mx-auto max-w-3xl">
          <p className="mb-6 sm:mb-8">
            <Link
              href="/stories"
              className={`${journalLinkMotion} inline-flex items-center gap-1.5 font-mono-label text-mono-label text-text-dim`}
            >
              <JournalSymbol name="arrow_back" />
              Stories
            </Link>
          </p>
          <header className="space-y-3 sm:space-y-4">
            <JournalSectionEyebrow icon="auto_stories" className="tracking-[0.2em]">
              {dateLabel ?? "A story"}
            </JournalSectionEyebrow>
            <h1 className="font-headline-lg text-balance text-headline-lg text-white sm:text-4xl lg:text-[2.75rem]">
              {story.title}
            </h1>
            {story.excerpt ? (
              <p className="font-body-lg text-body-lg text-pretty text-text-dim">{story.excerpt}</p>
            ) : null}
          </header>
        </div>
      </section>

      <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-grid-margin py-10 max-lg:pl-[max(1rem,env(safe-area-inset-left,0px))] max-lg:pr-[max(1rem,env(safe-area-inset-right,0px))] md:gap-12 md:py-14">
        {story.cover ? (
          <figure className="space-y-3">
            <div className="overflow-hidden rounded-xl border border-border-muted bg-surface-charcoal">
              <StoryMediaImage
                media={story.cover}
                className="h-auto w-full object-cover"
                sizes="(max-width: 768px) 100vw, 48rem"
                priority
              />
            </div>
          </figure>
        ) : null}

        <StoryLayout blocks={story.layout} />
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />
    </div>
  );
}
