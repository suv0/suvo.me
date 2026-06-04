import Image from "next/image";
import { JournalReveal } from "@/components/journal/journal-reveal";
import { JournalSectionEyebrow, JournalSymbol } from "@/components/journal/journal-symbol";
import { getProjectLinkIcon } from "@/lib/journal-icons";
import {
  journalLinkIconMotion,
  journalLinkMotion,
  journalMediaFrameMotion,
  journalMediaImageMotion,
  journalMediaZoomMotion,
  journalTitleMotion,
} from "@/lib/journal-motion";
import type { ProjectItem } from "@/lib/portfolio-data";

function getBrandInitials(brand: string): string {
  const parts = brand
    .replace(/[()/]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) return "PR";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

function ProjectMedia({ project }: { project: ProjectItem }) {
  return (
    <div
      className={`relative aspect-[16/10] w-full min-h-[min(52vw,420px)] overflow-hidden border border-border-muted bg-surface-charcoal md:min-h-[360px] lg:min-h-[440px] ${journalMediaFrameMotion}`}
    >
      <div className={journalMediaZoomMotion}>
        <Image
          src={project.coverImage}
          alt={project.coverAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 900px"
          className={journalMediaImageMotion}
        />
      </div>
    </div>
  );
}

function ProjectLinks({ project }: { project: ProjectItem }) {
  if (!project.link) return null;

  return (
    <div className="flex flex-wrap gap-4">
      <a
        className={`${journalLinkMotion} flex items-center gap-2 font-mono-label text-mono-label text-white`}
        href={project.link}
        target="_blank"
        rel="noreferrer"
      >
        {(project.linkLabel ?? "Explore project").replace(/\s*→\s*$/, "").toUpperCase()}
        <span className={`material-symbols-outlined text-sm ${journalLinkIconMotion}`}>
          {getProjectLinkIcon(project.linkLabel ?? "", project.link)}
        </span>
      </a>
      {project.extraLinks?.map((extra) => (
        <a
          key={extra.href}
          className={`${journalLinkMotion} flex items-center gap-2 font-mono-label text-mono-label text-white`}
          href={extra.href}
          target="_blank"
          rel="noreferrer"
        >
          {extra.label.replace(/\s*→\s*$/, "").toUpperCase()}
          <span className={`material-symbols-outlined text-sm ${journalLinkIconMotion}`}>
            {getProjectLinkIcon(extra.label, extra.href)}
          </span>
        </a>
      ))}
    </div>
  );
}

export function JournalProjects({ projects }: { projects: ProjectItem[] }) {
  return (
    <JournalReveal
      id="impact"
      rule
      className="px-grid-margin py-section-gap max-lg:px-[max(1rem,env(safe-area-inset-left,0px))] max-lg:pr-[max(1rem,env(safe-area-inset-right,0px))]"
    >
      <div className="mb-section-head flex flex-col items-end justify-between gap-stack-lg md:flex-row">
        <div className="max-w-2xl">
          <JournalSectionEyebrow icon="rocket_launch" className="mb-stack-sm">
            Selected Impact
          </JournalSectionEyebrow>
          <h3 className="font-headline-lg text-headline-lg text-white">Projects with durable product impact</h3>
        </div>
        <p className="font-mono-label text-mono-label hidden items-center gap-1.5 text-text-dim md:flex">
          <JournalSymbol name="south" />
          [ SCROLL TO EXPLORE ]
        </p>
      </div>

      {projects.map((project, index) => {
        const imageFirst = index % 2 === 1;
        const indexLabel = String(index + 1).padStart(2, "0");

        return (
          <JournalReveal
            key={project.name}
            as="article"
            rule
            className="group relative overflow-hidden py-14 md:py-16"
          >
            <div className="relative z-10 grid gap-grid-gutter md:grid-cols-12">
              {imageFirst ? (
                <div className="order-2 flex w-full items-center justify-center md:order-1 md:col-span-7 lg:col-span-8">
                  <ProjectMedia project={project} />
                </div>
              ) : null}

              <div
                className={
                  imageFirst
                    ? "order-1 md:order-2 md:col-span-5 md:col-start-9 lg:col-span-4 lg:col-start-9"
                    : "md:col-span-5 lg:col-span-4"
                }
              >
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  <span className="inline-flex items-center gap-2 font-mono-label text-mono-label text-text-dim">
                    <JournalSymbol name="tag" className="text-chaldal-green/70" />
                    {indexLabel} / {project.badge.toUpperCase()}
                  </span>
                  {project.brand ? (
                    <div className="inline-flex w-fit max-w-full items-center gap-3 rounded-md border border-border-muted bg-surface-charcoal px-4 py-2.5 font-mono-label text-[0.72rem] uppercase tracking-[0.12em] text-on-surface">
                      {project.brandLogo ? (
                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-chaldal-green/50 bg-black/35 p-1 shadow-[0_0_0_1px_rgb(39_201_109/0.18)]">
                          <Image
                            src={project.brandLogo}
                            alt={`${project.brand} logo`}
                            width={28}
                            height={28}
                            className="h-7 w-7 rounded-full object-cover"
                          />
                        </span>
                      ) : (
                        <span
                          aria-hidden
                          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-chaldal-green/50 bg-chaldal-green/15 text-[0.7rem] font-semibold text-chaldal-green"
                        >
                          {getBrandInitials(project.brand)}
                        </span>
                      )}
                      <span className="pr-0.5">{project.brand}</span>
                    </div>
                  ) : null}
                </div>
                <h4 className={`${journalTitleMotion} font-headline-lg text-headline-lg mb-stack-md text-white`}>
                  {project.name}
                </h4>
                <p className="font-body-lg text-body-lg mb-stack-lg text-text-dim">{project.description}</p>
                <p className="font-body-md text-body-md mb-stack-lg text-text-dim">{project.impact}</p>
                <ProjectLinks project={project} />
              </div>

              {!imageFirst ? (
                <div className="flex w-full items-center justify-center md:col-span-7 md:col-start-6 lg:col-span-8 lg:col-start-5">
                  <ProjectMedia project={project} />
                </div>
              ) : null}
            </div>
          </JournalReveal>
        );
      })}
    </JournalReveal>
  );
}
