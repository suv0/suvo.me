import { JournalReveal } from "@/components/journal/journal-reveal";
import { JournalSectionEyebrow, JournalSymbol } from "@/components/journal/journal-symbol";
import { journalBentoCardMotion } from "@/lib/journal-motion";
import { getSkillGroupForBento, skillBentoConfig } from "@/lib/journal-theme";
import type { SkillGroup } from "@/lib/portfolio-data";

export function JournalSkills({ groups }: { groups: SkillGroup[] }) {
  return (
    <JournalReveal
      id="systems"
      rule
      className="px-grid-margin py-10 md:py-12 max-lg:px-[max(1rem,env(safe-area-inset-left,0px))] max-lg:pr-[max(1rem,env(safe-area-inset-right,0px))]"
    >
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <JournalSectionEyebrow icon="layers" className="mb-1">
            Stack
          </JournalSectionEyebrow>
          <h3 className="font-headline-md text-headline-md text-white">Product engineering stack</h3>
        </div>
        <p className="font-mono-label text-mono-label inline-flex max-w-sm items-center gap-1.5 text-text-dim">
          <JournalSymbol name="memory" className="text-chaldal-green/70" />
          [ CORE SYSTEMS ]
        </p>
      </div>

      <div className="bento-grid gap-3 md:gap-4">
        {skillBentoConfig.map((config) => {
          const group = getSkillGroupForBento(groups, config.groupTitle);
          if (!group) return null;

          return (
            <div
              key={config.groupTitle}
              className={`${journalBentoCardMotion} ${config.gridClass} flex flex-col border border-border-muted bg-surface-charcoal p-5 md:p-6`}
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <span className="material-symbols-outlined text-3xl text-chaldal-green">{config.icon}</span>
                <span className="font-mono-label text-mono-label shrink-0 text-text-dim">{config.order}</span>
              </div>
              <h4 className="font-headline-md text-headline-md mb-3 text-white">{config.displayTitle}</h4>
              <div className="mt-auto flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="border border-border-muted bg-ink-black px-2.5 py-1 font-mono-label text-[0.7rem] leading-snug text-text-dim"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </JournalReveal>
  );
}
