import { DwetechLink, linkProfileText } from "@/components/profile-text-links";
import { JournalReveal } from "@/components/journal/journal-reveal";
import {
  JournalIconLabel,
  JournalMetaRow,
  JournalSectionEyebrow,
  JournalSymbol,
} from "@/components/journal/journal-symbol";
import { getExperienceCompanyIcon } from "@/lib/journal-icons";
import { journalLinkMotion } from "@/lib/journal-motion";
import type { ExperienceItem } from "@/lib/portfolio-data";

export function JournalExperience({ items }: { items: ExperienceItem[] }) {
  return (
    <JournalReveal
      id="experience"
      rule
      className="px-grid-margin py-section-gap max-lg:px-[max(1rem,env(safe-area-inset-left,0px))] max-lg:pr-[max(1rem,env(safe-area-inset-right,0px))]"
    >
      <div className="mb-section-head max-w-2xl">
        <JournalSectionEyebrow icon="work_history" className="mb-stack-sm">
          Experience
        </JournalSectionEyebrow>
        <h3 className="font-headline-lg text-headline-lg text-white">Ownership across products and lifecycle</h3>
      </div>

      <div className="space-y-0">
        {items.map((item) => (
          <JournalReveal as="article" key={item.company} rule className="py-14 md:py-16">
            <div className="grid gap-grid-gutter md:grid-cols-12">
              <div className="md:col-span-4">
                <JournalMetaRow icon="calendar_month" className="text-chaldal-green">
                  {item.period}
                </JournalMetaRow>
                <h4 className="font-headline-md text-headline-md mt-4 text-white">
                  <JournalIconLabel icon={getExperienceCompanyIcon(item.company)}>
                    {item.company === "Dwetech" ? (
                      <DwetechLink className={`${journalLinkMotion} text-white hover:underline`} />
                    ) : (
                      item.company
                    )}
                  </JournalIconLabel>
                </h4>
                <JournalMetaRow icon="location_on" className="mt-3 text-text-dim">
                  {item.location}
                </JournalMetaRow>
                <p className="font-headline-md text-headline-md mt-4 text-white/90">
                  <JournalIconLabel icon="badge">{item.role}</JournalIconLabel>
                </p>
              </div>
              <ul className="space-y-stack-md md:col-span-8">
                {item.highlights.map((point) => (
                  <li key={point} className="flex gap-3.5 font-body-md text-body-md text-text-dim">
                    <JournalSymbol name="check_circle" className="mt-0.5 shrink-0 text-chaldal-green/90" />
                    <span>{linkProfileText(point)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </JournalReveal>
        ))}
      </div>
    </JournalReveal>
  );
}
