import Link from "next/link";
import { JournalContactIcon } from "@/components/journal/journal-contact-icon";
import { JournalReveal } from "@/components/journal/journal-reveal";
import { JournalSymbol } from "@/components/journal/journal-symbol";
import { journalLinkMotion, journalProfileLinkMotion } from "@/lib/journal-motion";
import { profile } from "@/lib/portfolio-data";

const footerLinkClass = `${journalProfileLinkMotion} inline-flex items-center gap-2 font-mono-label text-mono-label font-semibold uppercase tracking-wider`;

export function JournalFooter({ year }: { year: number }) {
  return (
    <JournalReveal
      as="footer"
      rule
      className="px-grid-margin py-stack-lg max-lg:pl-[max(1rem,env(safe-area-inset-left,0px))] max-lg:pr-[max(1rem,env(safe-area-inset-right,0px))]"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-between gap-stack-md md:flex-row">
        <div className="mb-stack-md text-center md:mb-0 md:text-left">
          <p className="font-headline-md text-headline-md text-on-surface">{profile.name}</p>
          <p className="font-mono-label text-mono-label mt-2 text-text-dim">
            © {year} {profile.title}.
          </p>
          <p className="mt-4">
            <Link
              href="/kids"
              className={`${journalLinkMotion} inline-flex items-center gap-2 font-mono-label text-mono-label text-text-dim`}
            >
              <JournalSymbol name="family_restroom" className="text-chaldal-green/85" />
              Something else
              <JournalSymbol name="arrow_forward" className="text-text-dim" />
            </Link>
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-3">
          <a className={footerLinkClass} href={profile.linkedin} target="_blank" rel="noreferrer">
            <JournalContactIcon name="linkedin" />
            LinkedIn
          </a>
          <a className={footerLinkClass} href={profile.github} target="_blank" rel="noreferrer">
            <JournalContactIcon name="github" />
            GitHub
          </a>
          <a className={footerLinkClass} href={profile.cvPdfPath} download>
            <JournalContactIcon name="cv" />
            Download CV
          </a>
          <a
            className={`${footerLinkClass} tracking-wider`}
            href={`mailto:${profile.email}`}
            aria-label={`Email ${profile.email}`}
          >
            <JournalContactIcon name="email" />
            <span className="font-normal normal-case">{profile.email}</span>
          </a>
        </nav>
      </div>
    </JournalReveal>
  );
}
