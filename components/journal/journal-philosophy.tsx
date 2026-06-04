import { linkProfileText } from "@/components/profile-text-links";
import { JournalReveal } from "@/components/journal/journal-reveal";
import { JournalSectionEyebrow, JournalSymbol } from "@/components/journal/journal-symbol";
import { profile } from "@/lib/portfolio-data";

const PHILOSOPHY_PULL_QUOTE =
  "Real engineering shows up in reliability, especially under unstable networks and operational pressure.";

const aboutLeadEnd = profile.about.indexOf("In January 2017");
const aboutLead = aboutLeadEnd > 0 ? profile.about.slice(0, aboutLeadEnd).trim() : profile.about;
const aboutRest = aboutLeadEnd > 0 ? profile.about.slice(aboutLeadEnd).trim() : "";

export function JournalPhilosophy() {
  return (
    <JournalReveal
      id="philosophy"
      rule
      className="px-grid-margin py-section-gap max-lg:px-[max(1rem,env(safe-area-inset-left,0px))] max-lg:pr-[max(1rem,env(safe-area-inset-right,0px))]"
    >
      <div className="grid gap-grid-gutter md:grid-cols-12">
        <div className="md:col-span-4">
          <JournalSectionEyebrow icon="architecture" className="mb-stack-md">
            Philosophy
          </JournalSectionEyebrow>
          <h3 className="font-headline-lg text-headline-lg mb-stack-lg leading-tight text-white">
            Building products that hold up in production
          </h3>
        </div>
        <div className="space-y-stack-lg md:col-span-7 md:col-start-6">
          <p className="font-body-lg text-body-lg text-text-dim">{linkProfileText(aboutLead)}</p>
          {aboutRest ? <p className="font-body-lg text-body-lg text-text-dim">{linkProfileText(aboutRest)}</p> : null}
          <blockquote className="flex gap-4 border-l-2 border-chaldal-green py-1 pl-stack-md font-headline-md italic text-white/90">
            <JournalSymbol name="format_quote" className="shrink-0 text-chaldal-green/80" size="lg" />
            <span>&ldquo;{PHILOSOPHY_PULL_QUOTE}&rdquo;</span>
          </blockquote>
          <p className="font-body-md text-body-md text-text-dim">{linkProfileText(profile.heroSummary)}</p>
        </div>
      </div>
    </JournalReveal>
  );
}
