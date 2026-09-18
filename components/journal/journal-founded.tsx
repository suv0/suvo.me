import {
  FoundedDefaultDiagram,
  PreciousKeyDiagram,
  PrsmAnglesDiagram,
} from "@/components/journal/journal-founded-diagrams";
import { JournalReveal } from "@/components/journal/journal-reveal";
import { JournalSectionEyebrow, JournalSymbol } from "@/components/journal/journal-symbol";
import { getProjectLinkIcon } from "@/lib/journal-icons";
import { journalLinkIconMotion, journalLinkMotion, journalTitleMotion } from "@/lib/journal-motion";
import type { FoundedItem } from "@/lib/portfolio-data";

function FoundedDiagramPanel({ item }: { item: FoundedItem }) {
  switch (item.diagram) {
    case "precious-key":
      return <PreciousKeyDiagram />;
    case "prsm-angles":
      return <PrsmAnglesDiagram />;
    case undefined:
      return <FoundedDefaultDiagram name={item.name} />;
    default: {
      const _exhaustive: never = item.diagram;
      return _exhaustive;
    }
  }
}

function foundedLiveMeta(item: FoundedItem): string | undefined {
  const pushed = item.pushedAt
    ? new Date(item.pushedAt).toLocaleDateString("en", { month: "short", year: "numeric", timeZone: "UTC" })
    : undefined;
  const parts = [
    item.language,
    item.stars != null ? `${item.stars} stars` : undefined,
    item.license,
    pushed ? `Updated ${pushed}` : undefined,
  ].filter(Boolean);
  return parts.length > 0 ? parts.join(" · ") : undefined;
}

function FoundedCard({ item, index, total }: { item: FoundedItem; index: number; total: number }) {
  const indexLabel = String(index + 1).padStart(2, "0");
  const liveMeta = foundedLiveMeta(item);

  return (
    <JournalReveal
      as="article"
      id={item.id}
      className="flex h-full scroll-mt-[calc(var(--journal-nav-height)+env(safe-area-inset-top,0px))] flex-col border border-border-muted bg-surface-charcoal"
    >
      <div className="shrink-0">
        <FoundedDiagramPanel item={item} />
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 font-mono-label text-mono-label text-text-dim">
            <JournalSymbol name="tag" className="text-chaldal-green/70" />
            {indexLabel} / {(item.role || item.badge).toUpperCase()}
          </span>
          {item.status ? (
            <span className="font-mono-label text-[0.68rem] uppercase tracking-[0.12em] text-text-dim">
              {item.status}
            </span>
          ) : null}
        </div>
        <h4 className={`${journalTitleMotion} font-headline-md text-headline-md mb-2 text-white`}>{item.name}</h4>
        {item.tagline ? <p className="font-body-md text-body-md mb-3 text-chaldal-green/90">{item.tagline}</p> : null}
        <p className="font-body-md text-body-md mb-3 text-text-dim">{item.description}</p>
        <p className="font-body-md text-body-md mb-3 text-text-dim">{item.impact}</p>
        {liveMeta ? (
          <p className="font-mono-label text-[0.68rem] mb-5 uppercase tracking-[0.12em] text-text-dim">{liveMeta}</p>
        ) : (
          <div className="mb-5" />
        )}
        {item.github ? (
          <a
            className={`${journalLinkMotion} mt-auto inline-flex items-center gap-2 font-mono-label text-mono-label text-white`}
            href={item.github}
            target="_blank"
            rel="noreferrer"
          >
            {item.linkLabel.replace(/\s*→\s*$/, "").toUpperCase()}
            <span className={`material-symbols-outlined text-sm ${journalLinkIconMotion}`}>
              {getProjectLinkIcon(item.linkLabel, item.github)}
            </span>
          </a>
        ) : null}
        <span className="sr-only">
          {index + 1} of {total}
        </span>
      </div>
    </JournalReveal>
  );
}

export function JournalFounded({ items }: { items: FoundedItem[] }) {
  if (items.length === 0) return null;

  return (
    <JournalReveal
      id="founded"
      rule
      className="px-grid-margin py-section-gap max-lg:px-[max(1rem,env(safe-area-inset-left,0px))] max-lg:pr-[max(1rem,env(safe-area-inset-right,0px))]"
    >
      <div className="mb-section-head flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <JournalSectionEyebrow icon="auto_awesome" className="mb-stack-sm">
            Founded
          </JournalSectionEyebrow>
          <h3 className="font-headline-lg text-headline-lg text-white">Products I started</h3>
        </div>
        <p className="font-body-md text-body-md inline-flex max-w-md items-start gap-2 text-text-dim">
          <JournalSymbol name="south" className="mt-0.5 shrink-0 text-chaldal-green/80" />
          <span>Independent tools I founded and still use.</span>
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item, index) => (
          <FoundedCard key={item.id} item={item} index={index} total={items.length} />
        ))}
      </div>
    </JournalReveal>
  );
}
