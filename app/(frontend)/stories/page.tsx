import type { Metadata } from "next";
import Link from "next/link";
import { JournalSectionEyebrow, JournalSymbol } from "@/components/journal/journal-symbol";
import { StoryMediaImage } from "@/components/stories/story-media-image";
import { journalLinkMotion } from "@/lib/journal-motion";
import { getPublishedStories, storyDateLabel } from "@/lib/stories";

export const dynamic = "force-dynamic";

const title = "Stories";
const description = "Life writing from Abdul Hamid Shuvo — memory, photos, and the occasional film.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: true, follow: true },
  alternates: { canonical: "https://suvo.me/stories" },
  openGraph: {
    title,
    description,
    type: "website",
    url: "https://suvo.me/stories",
    siteName: "suvo.me",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const panelClass = "overflow-hidden rounded-xl border border-border-muted bg-surface-charcoal";

export default async function StoriesPage() {
  const stories = await getPublishedStories();

  return (
    <div className="journal-site min-h-screen min-w-0 overflow-x-hidden font-body-md text-body-md text-on-surface antialiased">
      <section className="border-b border-border-muted px-grid-margin pb-10 pt-24 sm:pb-12 md:pt-28 max-lg:pl-[max(1rem,env(safe-area-inset-left,0px))] max-lg:pr-[max(1rem,env(safe-area-inset-right,0px))]">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 sm:mb-8">
            <Link
              href="/"
              className={`${journalLinkMotion} inline-flex items-center gap-1.5 font-mono-label text-mono-label text-text-dim`}
            >
              <JournalSymbol name="arrow_back" />
              Home
            </Link>
          </p>
          <header className="space-y-3 sm:space-y-4">
            <JournalSectionEyebrow icon="auto_stories" className="tracking-[0.2em]">
              Life writing
            </JournalSectionEyebrow>
            <h1 className="font-headline-lg text-balance text-headline-lg text-white sm:text-4xl lg:text-[2.75rem]">
              Stories
            </h1>
            <p className="font-body-lg text-body-lg max-w-lg text-pretty text-text-dim">
              Memory, photographs, and a film when there is one. Written here so search can find the person, not just
              the resume.
            </p>
          </header>
        </div>
      </section>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-grid-margin py-10 max-lg:pl-[max(1rem,env(safe-area-inset-left,0px))] max-lg:pr-[max(1rem,env(safe-area-inset-right,0px))] md:gap-12 md:py-14">
        {stories.length === 0 ? (
          <section className={`${panelClass} p-6 sm:p-8`}>
            <p className="font-body-lg text-body-lg text-pretty text-text-dim">
              Nothing published yet. When a story is ready, it will live on this page.
            </p>
          </section>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2">
            {stories.map((story) => {
              const dateLabel = storyDateLabel(story);
              return (
                <li key={story.id}>
                  <Link
                    href={`/stories/${story.slug}`}
                    className={`${panelClass} group flex h-full flex-col transition-[border-color] duration-[480ms] hover:border-chaldal-green`}
                  >
                    {story.cover ? (
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <StoryMediaImage
                          media={story.cover}
                          size="card"
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, 50vw"
                        />
                      </div>
                    ) : null}
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      {dateLabel ? (
                        <p className="font-mono-label text-mono-label uppercase tracking-widest text-chaldal-green">
                          {dateLabel}
                        </p>
                      ) : null}
                      <h2 className="font-headline-md text-headline-md mt-2 text-white group-hover:text-chaldal-green">
                        {story.title}
                      </h2>
                      {story.excerpt ? (
                        <p className="mt-3 flex-1 font-body-md text-body-md leading-relaxed text-text-dim">
                          {story.excerpt}
                        </p>
                      ) : null}
                      <p className="mt-4 inline-flex items-center gap-1.5 font-mono-label text-mono-label text-text-dim">
                        Read
                        <JournalSymbol name="arrow_forward" />
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </div>
  );
}
