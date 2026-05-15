import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const kidsOgTitle = "Built by voice — ages 8 and 5";
const kidsOgDescription =
  "Two tiny games my kids asked for out loud one afternoon; ChatGPT wrote the HTML, and we kept the files.";

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
        url: "https://suvo.me/hero-portrait-editorial.png",
        width: 1536,
        height: 1024,
        alt: "Abdul Hamid Shuvo — portfolio, suvo.me",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: kidsOgTitle,
    description: kidsOgDescription,
    images: ["https://suvo.me/hero-portrait-editorial.png"],
  },
};

export default function KidsPage() {
  return (
    <div className="relative min-h-screen min-w-0 overflow-x-hidden bg-slate-950 text-slate-100">
      <div aria-hidden className="aurora-gradient absolute inset-0 -z-20" />
      <div aria-hidden className="noise-overlay absolute inset-0 -z-10" />
      <div aria-hidden className="hero-backdrop -z-[15]" />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-[max(1rem,env(safe-area-inset-left,0px))] py-[calc(2.5rem+env(safe-area-inset-top,0px))] pb-[calc(2.5rem+env(safe-area-inset-bottom,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:gap-12 sm:px-6 sm:py-16 md:gap-14 md:px-8">
        <p className="text-sm text-slate-400">
          <Link href="/" className="text-cyan-300/90 underline-offset-4 hover:text-cyan-200 hover:underline">
            ← Home
          </Link>
        </p>

        <section aria-labelledby="kids-story-heading" className="relative grid items-start gap-7 md:gap-8 lg:grid-cols-12 lg:gap-10">
          <div aria-hidden className="pointer-events-none absolute -top-6 left-10 h-28 w-28 rounded-full bg-cyan-400/10 blur-2xl sm:h-36 sm:w-36" />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-4 top-1/3 h-20 w-20 rounded-full bg-violet-400/10 blur-2xl sm:h-28 sm:w-28"
          />

          <div className="min-w-0 space-y-5 lg:col-span-6 lg:space-y-6">
            <header className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">A family moment</p>
              <h1 id="kids-story-heading" className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Built by voice — ages 8 and 5
              </h1>
              <p className="max-w-2xl text-pretty text-sm leading-relaxed text-slate-300 sm:text-base">
                Two tiny games were born in one ordinary afternoon. The requests were spoken out loud, the files were
                generated in minutes, and we kept them exactly because of how small and human that moment felt.
              </p>
            </header>
          </div>

          <div className="relative min-w-0 space-y-4 lg:col-span-6 lg:row-span-2 lg:h-full">
            <figure className="glass-panel overflow-hidden rounded-3xl p-2 sm:p-3 lg:h-full">
              <Image
                src="/kids/kids-brothers-smiling.png"
                alt="Two brothers smiling together outdoors"
                width={500}
                height={1024}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-auto w-full rounded-2xl object-contain object-top"
                priority
              />
            </figure>
            <p className="text-center text-xs text-slate-500 sm:text-right">My two builders</p>
          </div>

          <div className="glass-panel relative overflow-hidden rounded-3xl p-6 sm:p-8 lg:col-span-6">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-14 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-cyan-300/20 to-violet-300/10 blur-2xl"
            />
            <div className="relative space-y-5 text-pretty text-base leading-relaxed text-slate-300 sm:text-lg">
              <p>
                My elder son, eight years old, grabbed the microphone and said:{" "}
                <span className="text-white">“Build me an alphabet game.”</span> A playable page appeared.
              </p>
              <p>
                Minutes later, his younger brother asked for <span className="text-white">“tic‑tac‑toe.”</span> That became
                the second page.
              </p>
              <p>
                These are still the original files. Simple, imperfect, and full of joy. I keep them as a memory of home, not
                as a showcase of production craft.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="kids-games-heading" className="space-y-5">
          <div className="space-y-2">
            <h2 id="kids-games-heading" className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Play the originals
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
              Nothing fancy on purpose. Just two little games exactly as they first arrived, each opening in a new tab.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            <li className="glass-panel group relative flex flex-col overflow-hidden rounded-2xl p-5 sm:p-6">
              <div
                aria-hidden
                className="pointer-events-none absolute right-0 top-0 h-20 w-20 rounded-full bg-cyan-400/10 blur-2xl transition-opacity group-hover:opacity-100"
              />
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-cyan-300">First request</p>
              <h3 className="mt-2 text-lg font-semibold text-white">Alphabet playground</h3>
              <p className="mt-2 text-sm text-slate-400">Requested on the mic · age 8</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300">
                Letters, matching, and a few modes — the page ChatGPT generated from a single kid sentence.
              </p>
              <a
                className="btn-primary mt-6 inline-flex w-fit px-4 py-2 text-sm font-semibold"
                href="/kids/alphabet-game.html"
                target="_blank"
                rel="noreferrer"
              >
                Play →
              </a>
            </li>
            <li className="glass-panel group relative flex flex-col overflow-hidden rounded-2xl p-5 sm:p-6">
              <div
                aria-hidden
                className="pointer-events-none absolute right-0 top-0 h-20 w-20 rounded-full bg-violet-400/10 blur-2xl transition-opacity group-hover:opacity-100"
              />
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-cyan-300">Second request</p>
              <h3 className="mt-2 text-lg font-semibold text-white">Tic‑tac‑toe</h3>
              <p className="mt-2 text-sm text-slate-400">Requested on the mic · age 5</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300">
                Canvas board with a playful title — same deal: ask out loud, get a game to tap on.
              </p>
              <a
                className="btn-primary mt-6 inline-flex w-fit px-4 py-2 text-sm font-semibold"
                href="/kids/tictactoe.html"
                target="_blank"
                rel="noreferrer"
              >
                Play →
              </a>
            </li>
          </ul>
        </section>

        <p className="text-center text-xs text-slate-500">Each game opens in a new browser tab.</p>
      </main>
    </div>
  );
}
