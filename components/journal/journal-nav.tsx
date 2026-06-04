"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, type MouseEvent } from "react";
import { JournalSymbol } from "@/components/journal/journal-symbol";
import { journalNavLinkMotion } from "@/lib/journal-motion";
import { scrollToJournalSection } from "@/lib/journal-scroll";
import { JOURNAL_NAV_BRAND, JOURNAL_SITE_TITLE } from "@/lib/journal-theme";
import { profile } from "@/lib/portfolio-data";

const navItems = [
  { href: "#philosophy", id: "philosophy", label: "Philosophy" },
  { href: "#impact", id: "impact", label: "Impact" },
  { href: "#experience", id: "experience", label: "Experience" },
  { href: "#systems", id: "systems", label: "Stack" },
  { href: "#lab", id: "lab", label: "Lab" },
] as const;

const sectionPad =
  "max-lg:pl-[max(1rem,env(safe-area-inset-left,0px))] max-lg:pr-[max(1rem,env(safe-area-inset-right,0px))]";

export function JournalNav() {
  /** Defer active styles until after mount so SSR matches hydration (hash/scroll differ per client). */
  const [activeId, setActiveId] = useState<(typeof navItems)[number]["id"] | null>(null);
  const onNavClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    scrollToJournalSection(id);
    window.history.replaceState(null, "", `#${id}`);
    setActiveId(id as (typeof navItems)[number]["id"]);
  };

  const updateActive = useCallback(() => {
    const offset = 120;
    let current: (typeof navItems)[number]["id"] = "philosophy";

    for (const item of navItems) {
      const el = document.getElementById(item.id);
      if (el && window.scrollY + offset >= el.offsetTop) {
        current = item.id;
      }
    }

    setActiveId(current);
  }, []);

  useEffect(() => {
    const onScroll = () => updateActive();
    const frame = window.requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [updateActive]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border-muted bg-journal-mid/92 max-md:backdrop-blur-none md:bg-journal-mid/55 md:backdrop-blur-xl">
      <nav
        className={`mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-grid-margin py-4 ${sectionPad}`}
      >
        <Link
          href="#top"
          aria-label={`${profile.name} — ${JOURNAL_SITE_TITLE}`}
          className={`${journalNavLinkMotion} font-mono-label text-mono-label tracking-tight text-on-surface md:font-headline-md md:text-headline-md`}
          onClick={(event) => {
            event.preventDefault();
            scrollToJournalSection("top");
            window.history.replaceState(null, "", "#top");
          }}
        >
          <span className="text-chaldal-green md:text-on-surface">{JOURNAL_NAV_BRAND}</span>
          <span className="hidden text-text-dim md:inline">
            <span className="mx-2 text-border-muted" aria-hidden>
              /
            </span>
            {profile.name}
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={(event) => onNavClick(event, item.id)}
              className={
                activeId !== null && activeId === item.id
                  ? `${journalNavLinkMotion} font-mono-label text-mono-label border-b-2 border-chaldal-green pb-1 text-chaldal-green`
                  : `${journalNavLinkMotion} font-mono-label text-mono-label text-text-dim hover:border-transparent`
              }
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2 rounded-full border border-chaldal-green/20 bg-chaldal-green/10 px-3 py-1">
          <JournalSymbol name="work" className="text-chaldal-green" />
          <span className="font-mono-label text-mono-label text-chaldal-green">Open to Work</span>
        </div>
      </nav>

      <nav
        aria-label="Sections"
        className={`mx-auto flex max-w-[1440px] gap-2 overflow-x-auto border-t border-border-muted/80 px-grid-margin py-2 md:hidden ${sectionPad}`}
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              scrollToJournalSection(item.id);
              window.history.replaceState(null, "", `#${item.id}`);
              setActiveId(item.id);
            }}
            className={
              activeId !== null && activeId === item.id
                ? "shrink-0 rounded-full border border-chaldal-green/40 bg-chaldal-green/10 px-3 py-1.5 font-mono-label text-[0.68rem] font-semibold uppercase tracking-wider text-chaldal-green"
                : "shrink-0 rounded-full border border-border-muted px-3 py-1.5 font-mono-label text-[0.68rem] font-semibold uppercase tracking-wider text-text-dim"
            }
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
