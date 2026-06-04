import Image from "next/image";
import Link from "next/link";
import { JournalContactIcon } from "@/components/journal/journal-contact-icon";
import { JournalHeroParallax } from "@/components/journal/journal-hero-parallax";
import { JournalMetaRow, JournalSymbol } from "@/components/journal/journal-symbol";
import {
  journalBtnIconMotion,
  journalBtnMotion,
  journalBtnSecondaryMotion,
  journalHeroPortraitMotion,
} from "@/lib/journal-motion";
import {
  CAREER_START_YEAR,
  CHALDAL_START_YEAR,
  getElapsedYears,
  getHeroTagline,
  profile,
} from "@/lib/portfolio-data";

const portraitSizes = "100vw";

export function JournalHero({ currentYear }: { currentYear: number }) {
  const careerYears = getElapsedYears(CAREER_START_YEAR, currentYear);
  const chaldalYears = getElapsedYears(CHALDAL_START_YEAR, currentYear);
  const tagline = getHeroTagline(profile.name, currentYear);
  const nameBreak = profile.name.lastIndexOf(" ");
  const nameFirst = nameBreak > 0 ? profile.name.slice(0, nameBreak) : profile.name;
  const nameLast = nameBreak > 0 ? profile.name.slice(nameBreak + 1) : null;

  return (
    <section
      id="top"
      className="group/hero relative isolate scroll-mt-[calc(4.25rem+env(safe-area-inset-top,0px))] overflow-hidden border-b border-border-muted bg-journal-deep max-md:flex max-md:flex-col max-md:pt-[calc(4.25rem+env(safe-area-inset-top,0px))] md:min-h-[72svh] lg:min-h-[74svh]"
    >
      <div className="pointer-events-none z-0 max-md:relative max-md:h-[clamp(13rem,38vh,19rem)] max-md:w-full max-md:shrink-0 max-md:overflow-hidden md:absolute md:inset-0">
        <div className="journal-hero-backdrop relative h-full overflow-hidden">
          <div className="absolute inset-0 overflow-hidden md:hidden">
            <Image
              src={profile.profileImage}
              alt={`${profile.name} portrait`}
              fill
              priority
              quality={90}
              sizes={portraitSizes}
              className="object-cover object-[50%_28%]"
            />
          </div>
          <div className="absolute inset-0 hidden overflow-hidden md:block">
            <JournalHeroParallax>
              <div className={journalHeroPortraitMotion}>
                <Image
                  src={profile.profileImage}
                  alt={`${profile.name} portrait`}
                  fill
                  priority
                  quality={90}
                  sizes={portraitSizes}
                  className="object-cover object-[48%_34%] lg:object-[50%_32%]"
                />
              </div>
            </JournalHeroParallax>
          </div>
        </div>
      </div>

      <div className="relative z-10 grid w-full max-md:min-h-0 md:min-h-[72svh] md:grid-cols-[minmax(0,42%)_1fr] lg:min-h-[74svh]">
        <div className="flex flex-col justify-center px-grid-margin pb-10 pt-6 max-lg:pl-[max(1rem,env(safe-area-inset-left,0px))] max-lg:pr-[max(1rem,env(safe-area-inset-right,0px))] md:min-h-[72svh] md:max-w-[42vw] md:bg-transparent md:pb-12 md:pt-28 lg:min-h-[74svh] lg:max-w-[38rem]">
          <div className="mb-stack-md flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2 font-mono-label text-mono-label uppercase tracking-[0.2em] text-chaldal-green">
              <JournalSymbol name="terminal" />
              {profile.title}
            </span>
            <div className="h-px w-12 bg-border-muted" aria-hidden />
            <JournalMetaRow icon="location_on" className="text-text-dim">
              Based in Dhaka
            </JournalMetaRow>
          </div>

          <h1 className="font-display-xl mb-stack-lg max-w-[14ch] text-[2.35rem] leading-[1.05] text-white sm:text-[2.85rem] md:text-display-xl md:drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)] lg:text-[5.25rem]">
            <span className="block">{nameFirst}</span>
            {nameLast ? <span className="block">{nameLast}</span> : null}
          </h1>

          <p className="max-w-lg text-[0.92rem] leading-[1.55] text-text-dim sm:text-[1rem] md:font-body-lg md:text-body-lg md:leading-[1.62] md:text-slate-200 md:drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
            {tagline}
          </p>

          <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              className={`${journalBtnMotion} inline-flex items-center justify-center gap-2 bg-chaldal-green px-8 py-4 font-bold text-ink-black`}
              href={`mailto:${profile.email}`}
            >
              <JournalSymbol name="mail" className="text-ink-black" />
              Start a conversation
              <span className={`material-symbols-outlined ${journalBtnIconMotion}`}>arrow_forward</span>
            </Link>
            <a
              className={`${journalBtnSecondaryMotion} inline-flex min-h-[3.25rem] items-center justify-center gap-2 px-6 py-3 font-mono-label text-mono-label font-semibold uppercase tracking-wider`}
              href={profile.cvPdfPath}
              download
            >
              <JournalContactIcon name="cv" />
              Download CV
            </a>
            <a
              className={`${journalBtnSecondaryMotion} inline-flex min-h-[3.25rem] items-center justify-center gap-2 px-6 py-3 font-mono-label text-mono-label font-semibold uppercase tracking-wider`}
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <JournalContactIcon name="linkedin" />
              LinkedIn
            </a>
            <a
              className={`${journalBtnSecondaryMotion} inline-flex min-h-[3.25rem] items-center justify-center gap-2 px-6 py-3 font-mono-label text-mono-label font-semibold uppercase tracking-wider`}
              href={profile.github}
              target="_blank"
              rel="noreferrer"
            >
              <JournalContactIcon name="github" />
              GitHub
            </a>
          </div>

          <div className="mt-stack-lg flex flex-col gap-stack-lg border-t border-border-muted/60 pt-stack-lg sm:flex-row sm:gap-10">
            <div className="flex flex-col">
              <span className="inline-flex items-end gap-2">
                <JournalSymbol name="timeline" className="pb-1 text-chaldal-green md:pb-2" size="md" />
                <span className="font-display-xl text-[2.75rem] leading-none text-chaldal-green md:text-[64px]">
                  {careerYears}+
                </span>
              </span>
              <span className="font-mono-label text-mono-label mt-2 text-text-dim">YEARS BUILDING SOFTWARE</span>
            </div>
            <div className="flex flex-col">
              <span className="inline-flex items-end gap-2">
                <JournalSymbol name="storefront" className="pb-1 text-chaldal-green md:pb-2" size="md" />
                <span className="font-display-xl text-[2.75rem] leading-none text-white md:text-[64px]">
                  {chaldalYears}+
                </span>
              </span>
              <span className="font-mono-label text-mono-label mt-2 text-text-dim">YEARS AT CHALDAL (YC S15)</span>
            </div>
          </div>
        </div>
        <div className="hidden md:block" aria-hidden />
      </div>
    </section>
  );
}
