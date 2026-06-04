import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JournalMetaRow, JournalSectionEyebrow, JournalSymbol } from "@/components/journal/journal-symbol";
import { journalBtnMotion, journalLinkMotion } from "@/lib/journal-motion";

const kidsOgTitle = "Built by voice. Ages 8 and 5.";
const kidsOgDescription =
  "Two tiny games from one afternoon. My kids asked out loud, and we kept the pages unchanged.";

export const metadata: Metadata = {
  title: kidsOgTitle,
  description: kidsOgDescription,
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://suvo.me/kids",
  },
  openGraph: {
    title: kidsOgTitle,
    description: kidsOgDescription,
    type: "article",
    url: "https://suvo.me/kids",
    siteName: "suvo.me",
    images: [
      {
        url: "https://suvo.me/kids/kids-brothers-smiling-og.jpg",
        width: 1200,
        height: 1728,
        alt: "Two brothers smiling on suvo.me/kids",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: kidsOgTitle,
    description: kidsOgDescription,
    images: ["https://suvo.me/kids/kids-brothers-smiling-og.jpg"],
  },
};

const panelClass =
  "overflow-hidden rounded-xl border border-border-muted bg-surface-charcoal";

export default function KidsPage() {
  return (
    <div className="journal-site min-h-screen min-w-0 overflow-x-hidden font-body-md text-body-md text-on-surface antialiased">
      {/* Hero: color left, photo right */}
      <section
        aria-labelledby="kids-story-heading"
        className="border-b border-border-muted px-grid-margin pb-10 pt-24 sm:pb-12 md:pt-28 max-lg:pl-[max(1rem,env(safe-area-inset-left,0px))] max-lg:pr-[max(1rem,env(safe-area-inset-right,0px))]"
      >
        <div className="kids-hero-band mx-auto max-w-6xl overflow-hidden rounded-xl border border-border-muted">
          <div className="grid min-h-[clamp(22rem,58vh,34rem)] md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:min-h-[clamp(24rem,62vh,38rem)]">
            <div className="relative z-10 order-2 flex flex-col justify-end bg-journal-deep px-6 py-8 sm:px-8 sm:py-10 md:order-1 md:py-10 lg:px-10">
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
                <JournalSectionEyebrow icon="mic" className="tracking-[0.2em]">
                  A family moment
                </JournalSectionEyebrow>
                <h1
                  id="kids-story-heading"
                  className="font-headline-lg text-balance text-headline-lg text-white sm:text-4xl lg:text-[2.75rem]"
                >
                  Built by voice. Ages 8 and 5.
                </h1>
                <p className="font-body-lg text-body-lg max-w-lg text-pretty text-text-dim">
                  Two tiny games from one afternoon. The boys asked out loud. We kept the pages just as they first
                  arrived.
                </p>
              </header>
            </div>

            <div className="relative order-1 min-h-[min(40vh,18rem)] md:order-2 md:min-h-0">
              <div className="absolute inset-0">
                <Image
                  src="/kids/kids-brothers-smiling.webp"
                  alt="Two brothers smiling together outdoors"
                  fill
                  priority
                  quality={92}
                  sizes="(max-width: 768px) 100vw, 55vw"
                  className="object-cover object-[50%_18%]"
                />
              </div>
              <div
                className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-10 bg-gradient-to-r from-journal-deep to-transparent sm:w-14 md:w-16"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-grid-margin py-10 max-lg:pl-[max(1rem,env(safe-area-inset-left,0px))] max-lg:pr-[max(1rem,env(safe-area-inset-right,0px))] md:gap-12 md:py-14">
        <section className={`${panelClass} relative p-6 sm:p-8`}>
          <div className="space-y-5 text-pretty font-body-lg text-body-lg leading-relaxed text-text-dim">
            <p>
              My elder son, eight years old, grabbed the microphone and said:{" "}
              <span className="text-on-surface">“Build me an alphabet game.”</span> A playable page appeared.
            </p>
            <p>
              Minutes later, his younger brother asked for <span className="text-on-surface">“tic tac toe.”</span> Another
              page appeared.
            </p>
            <p>These are still the original files. Simple and imperfect. I keep them as a memory of home.</p>
          </div>
        </section>

        <section aria-labelledby="kids-games-heading" className="space-y-5 border-t border-border-muted pt-2">
          <div className="space-y-2">
            <h2
              id="kids-games-heading"
              className="inline-flex items-center gap-2 font-headline-md text-headline-md text-white sm:text-3xl"
            >
              <JournalSymbol name="sports_esports" className="text-chaldal-green" size="md" />
              Play the originals
            </h2>
            <p className="font-body-md text-body-md max-w-2xl text-pretty text-text-dim">
              Two little games, exactly as they first arrived.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            <li className={`${panelClass} flex flex-col p-5 sm:p-6`}>
              <p className="font-mono-label text-mono-label uppercase tracking-widest text-chaldal-green">
                First request
              </p>
              <h3 className="font-headline-md text-headline-md mt-2 inline-flex items-center gap-2 text-white">
                <JournalSymbol name="sort_by_alpha" className="text-chaldal-green" />
                Alphabet playground
              </h3>
              <JournalMetaRow icon="record_voice_over" className="mt-2 text-text-dim">
                Asked out loud, age 8
              </JournalMetaRow>
              <p className="mt-3 flex-1 font-body-md text-body-md leading-relaxed text-text-dim">
                Letters, matching, and a few modes. This page came from one sentence spoken by a child.
              </p>
              <a
                className={`${journalBtnMotion} mt-6 inline-flex w-fit items-center gap-2 bg-chaldal-green px-6 py-3 font-bold text-ink-black`}
                href="/kids/alphabet-game.html"
                target="_blank"
                rel="noreferrer"
              >
                Play
                <JournalSymbol name="open_in_new" />
              </a>
            </li>
            <li className={`${panelClass} flex flex-col p-5 sm:p-6`}>
              <p className="font-mono-label text-mono-label uppercase tracking-widest text-chaldal-green">
                Second request
              </p>
              <h3 className="font-headline-md text-headline-md mt-2 inline-flex items-center gap-2 text-white">
                <JournalSymbol name="grid_3x3" className="text-chaldal-green" />
                Tic tac toe
              </h3>
              <JournalMetaRow icon="record_voice_over" className="mt-2 text-text-dim">
                Asked out loud, age 5
              </JournalMetaRow>
              <p className="mt-3 flex-1 font-body-md text-body-md leading-relaxed text-text-dim">
                A simple canvas board with a playful title. Another spoken request, another page.
              </p>
              <a
                className={`${journalBtnMotion} mt-6 inline-flex w-fit items-center gap-2 bg-chaldal-green px-6 py-3 font-bold text-ink-black`}
                href="/kids/tictactoe.html"
                target="_blank"
                rel="noreferrer"
              >
                Play
                <JournalSymbol name="open_in_new" />
              </a>
            </li>
          </ul>
        </section>

        <p className="inline-flex w-full items-center justify-center gap-1.5 pb-[calc(2rem+env(safe-area-inset-bottom,0px))] text-center font-mono-label text-mono-label text-text-dim">
          <JournalSymbol name="open_in_new" className="text-chaldal-green/70" />
          Each game opens in a new browser tab.
        </p>
      </main>
    </div>
  );
}
