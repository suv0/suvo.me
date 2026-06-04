import { JournalLabArcade } from "@/components/journal/journal-lab-arcade";
import { JournalReveal } from "@/components/journal/journal-reveal";
import { JournalSectionEyebrow, JournalSymbol } from "@/components/journal/journal-symbol";
import { FrontendSkillDemo } from "@/components/skill-demos/frontend-skill-demo";
import { skillDemoRegistry } from "@/components/skill-demos/registry";
import type { SkillGroup } from "@/lib/portfolio-data";

export function JournalLab({ groups }: { groups: SkillGroup[] }) {
  const stackPreview = groups.flatMap((g) => g.items).slice(0, 12);

  return (
    <JournalReveal
      id="lab"
      rule
      className="px-grid-margin py-10 md:py-12 max-lg:px-[max(1rem,env(safe-area-inset-left,0px))] max-lg:pr-[max(1rem,env(safe-area-inset-right,0px))]"
    >
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <JournalSectionEyebrow icon="science" className="mb-1">
            Lab
          </JournalSectionEyebrow>
          <h3 className="font-headline-md text-headline-md text-white">Interactive Skill Demo</h3>
        </div>
        <p className="font-body-md text-body-md inline-flex max-w-md items-start gap-2 text-text-dim">
          <JournalSymbol name="auto_awesome" className="mt-0.5 shrink-0 text-chaldal-green/80" />
          <span>
            A random micro challenge on each visit. Topics include TypeScript, React, Tailwind, and web APIs.
          </span>
        </p>
      </div>

      <div className="grid items-start gap-4 border border-border-muted bg-surface-charcoal lg:grid-cols-[minmax(0,1fr)_minmax(260px,320px)] lg:gap-0">
        <div className="flex min-w-0 flex-col gap-0 border-border-muted p-4 md:p-5 lg:border-r">
          <FrontendSkillDemo />
          <JournalLabArcade />
        </div>

        <aside className="flex flex-col gap-5 self-stretch p-5 md:p-6 lg:min-h-full lg:border-l lg:border-border-muted">
          <div>
            <p className="font-mono-label text-mono-label mb-3 inline-flex items-center gap-1.5 uppercase tracking-widest text-chaldal-green">
              <JournalSymbol name="dataset" />
              In the stack
            </p>
            <div className="flex flex-wrap gap-1.5">
              {stackPreview.map((item) => (
                <span
                  key={item}
                  className="border border-border-muted bg-ink-black px-2.5 py-1 font-mono-label text-[0.7rem] text-text-dim"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono-label text-mono-label mb-3 inline-flex items-center gap-1.5 uppercase tracking-widest text-chaldal-green">
              <JournalSymbol name="quiz" />
              Challenges
            </p>
            <ul className="space-y-2">
              {skillDemoRegistry.map((demo) => (
                <li key={demo.id} className="flex gap-3 border-l-2 border-border-muted py-0.5 pl-3">
                  <JournalSymbol name={demo.icon} className="mt-0.5 shrink-0 text-chaldal-green" />
                  <div>
                    <p className="font-body-md text-body-md text-on-surface">{demo.title}</p>
                    <p className="font-mono-label text-mono-label mt-0.5 text-text-dim">{demo.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </JournalReveal>
  );
}
