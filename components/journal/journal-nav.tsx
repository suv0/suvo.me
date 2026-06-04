"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
} from "react";
import { JournalSymbol } from "@/components/journal/journal-symbol";
import { journalNavLinkMotion } from "@/lib/journal-motion";
import {
  endJournalScrollAnimation,
  getJournalNavScrollOffsetPx,
  getJournalScrollTargetId,
  getNavSpyHoldMs,
  isJournalScrollAnimating,
  scrollToJournalSection,
} from "@/lib/journal-scroll";
import { JOURNAL_NAV_BRAND, JOURNAL_SITE_TITLE } from "@/lib/journal-theme";
import { profile } from "@/lib/portfolio-data";

const navItems = [
  { href: "#philosophy", id: "philosophy", label: "Philosophy" },
  { href: "#impact", id: "impact", label: "Impact" },
  { href: "#experience", id: "experience", label: "Experience" },
  { href: "#systems", id: "systems", label: "Stack" },
  { href: "#lab", id: "lab", label: "Lab" },
] as const;

type NavId = (typeof navItems)[number]["id"];

const sectionPad =
  "max-lg:pl-[max(1rem,env(safe-area-inset-left,0px))] max-lg:pr-[max(1rem,env(safe-area-inset-right,0px))]";

const mobilePillClass =
  "relative z-10 inline-flex min-h-11 shrink-0 cursor-pointer appearance-none items-center justify-center rounded-full px-3.5 py-2 font-mono-label text-[0.68rem] font-semibold uppercase tracking-wider touch-manipulation transition-[color,background-color,border-color] duration-200 ease-[cubic-bezier(0.45,0,0.55,1)] [-webkit-tap-highlight-color:transparent]";

function isNavId(id: string): id is NavId {
  return navItems.some((item) => item.id === id);
}

/** Scroll target id from `scrollToJournalSection` → pill highlight id. */
function navIdFromScrollTarget(targetId: string): NavId | null {
  if (targetId === "top") return "philosophy";
  return isNavId(targetId) ? targetId : null;
}

export function JournalNav() {
  const [activeId, setActiveId] = useState<NavId>("philosophy");
  const scrollLockRef = useRef<NavId | null>(null);
  const pendingNavRef = useRef<NavId | null>(null);
  const touchNavRef = useRef<NavId | null>(null);
  const lastNavAtRef = useRef<{ id: NavId; at: number } | null>(null);
  const ignoreSpyUntilRef = useRef(0);
  const spyDebounceRef = useRef<number | null>(null);
  const releaseLockTimerRef = useRef<number | null>(null);
  const isCoarsePointerRef = useRef(false);

  const setActive = useCallback((id: NavId) => {
    setActiveId((prev) => (prev === id ? prev : id));
  }, []);

  const resolveActiveFromScroll = useCallback((): NavId => {
    const navLine = getJournalNavScrollOffsetPx();
    let current: NavId = "philosophy";
    let maxDocTop = -Infinity;

    for (const item of navItems) {
      const el = document.getElementById(item.id);
      if (!el) continue;
      const rectTop = el.getBoundingClientRect().top;
      if (rectTop > navLine + 12) continue;
      const docTop = rectTop + window.scrollY;
      if (docTop > maxDocTop) {
        maxDocTop = docTop;
        current = item.id;
      }
    }

    return current;
  }, []);

  const releaseNavLockLater = useCallback((navId: NavId) => {
    if (releaseLockTimerRef.current) {
      window.clearTimeout(releaseLockTimerRef.current);
    }

    releaseLockTimerRef.current = window.setTimeout(() => {
      releaseLockTimerRef.current = null;
      if (scrollLockRef.current === navId) scrollLockRef.current = null;
      if (pendingNavRef.current === navId) pendingNavRef.current = null;
      endJournalScrollAnimation();
    }, getNavSpyHoldMs());
  }, []);

  const pinnedNavId = useCallback((): NavId | null => {
    return scrollLockRef.current ?? pendingNavRef.current ?? navIdFromScrollTarget(getJournalScrollTargetId() ?? "");
  }, []);

  const updateActive = useCallback(() => {
    const pinned = pinnedNavId();
    const ignoreSpy = Date.now() < ignoreSpyUntilRef.current;

    if (pinned && (ignoreSpy || isJournalScrollAnimating() || scrollLockRef.current)) {
      setActive(pinned);
      return;
    }

    if (isCoarsePointerRef.current) {
      if (spyDebounceRef.current) window.clearTimeout(spyDebounceRef.current);
      spyDebounceRef.current = window.setTimeout(() => {
        spyDebounceRef.current = null;
        if (scrollLockRef.current || Date.now() < ignoreSpyUntilRef.current) return;
        setActive(resolveActiveFromScroll());
      }, 280);
      return;
    }

    setActive(resolveActiveFromScroll());
  }, [pinnedNavId, resolveActiveFromScroll, setActive]);

  const navigateToSection = useCallback((id: NavId) => {
    const now = Date.now();
    const last = lastNavAtRef.current;
    if (last?.id === id && now - last.at < 450) return;

    lastNavAtRef.current = { id, at: now };
    scrollLockRef.current = id;
    pendingNavRef.current = id;
    ignoreSpyUntilRef.current = now + getNavSpyHoldMs();
    setActive(id);
    scrollToJournalSection(id);
    window.history.replaceState(null, "", `#${id}`);
    releaseNavLockLater(id);
  }, [releaseNavLockLater, setActive]);

  const navigateToTop = useCallback(() => {
    const now = Date.now();
    const last = lastNavAtRef.current;
    if (last?.id === "philosophy" && now - last.at < 450) return;

    lastNavAtRef.current = { id: "philosophy", at: now };
    scrollLockRef.current = "philosophy";
    pendingNavRef.current = "philosophy";
    ignoreSpyUntilRef.current = now + getNavSpyHoldMs();
    setActive("philosophy");
    scrollToJournalSection("top");
    window.history.replaceState(null, "", "#top");
    releaseNavLockLater("philosophy");
  }, [releaseNavLockLater, setActive]);

  const isTouchLikePointer = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType === "touch") return true;
    if (event.pointerType === "mouse") return false;
    return window.matchMedia("(hover: none) and (pointer: coarse)").matches;
  };

  const onNavTouchActivate = (id: NavId) => {
    touchNavRef.current = id;
    navigateToSection(id);
  };

  const onNavPointerDown = (event: PointerEvent<HTMLAnchorElement>, id: NavId) => {
    if (!isTouchLikePointer(event)) return;
    event.preventDefault();
    onNavTouchActivate(id);
  };

  const onNavClick = (event: MouseEvent<HTMLAnchorElement>, id: NavId) => {
    event.preventDefault();
    if (touchNavRef.current === id) {
      touchNavRef.current = null;
      return;
    }
    navigateToSection(id);
  };

  useLayoutEffect(() => {
    isCoarsePointerRef.current = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    const header = document.querySelector<HTMLElement>(".journal-site-header");
    if (!header) return;

    const syncNavHeight = () => {
      document.documentElement.style.setProperty(
        "--journal-nav-height",
        `${Math.ceil(header.getBoundingClientRect().height)}px`,
      );
    };

    syncNavHeight();
    const observer = new ResizeObserver(syncNavHeight);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    updateActive();

    const onScroll = () => updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });

    const onScrollFinished = (event: Event) => {
      const targetId = (event as CustomEvent<{ id: string }>).detail?.id;
      if (!targetId) return;

      const navId = navIdFromScrollTarget(targetId);
      if (!navId) return;

      const locked = scrollLockRef.current;
      if (locked && locked !== navId) return;

      scrollLockRef.current = navId;
      pendingNavRef.current = navId;
      setActive(navId);
      ignoreSpyUntilRef.current = Date.now() + getNavSpyHoldMs();
      releaseNavLockLater(navId);
    };

    window.addEventListener("journal-section-navigated", onScrollFinished);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("journal-section-navigated", onScrollFinished);
      if (spyDebounceRef.current) window.clearTimeout(spyDebounceRef.current);
      if (releaseLockTimerRef.current) window.clearTimeout(releaseLockTimerRef.current);
    };
  }, [releaseNavLockLater, updateActive]);

  return (
    <header className="journal-site-header fixed inset-x-0 top-0 z-50 border-b border-border-muted bg-journal-mid/92 max-md:backdrop-blur-none md:bg-journal-mid/55 md:backdrop-blur-xl">
      <nav
        className={`mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-grid-margin py-4 ${sectionPad}`}
      >
        <a
          href="#top"
          aria-label={`${profile.name} — ${JOURNAL_SITE_TITLE}`}
          className={`${journalNavLinkMotion} font-mono-label text-mono-label tracking-tight text-on-surface md:font-headline-md md:text-headline-md`}
          onClick={(event) => {
            event.preventDefault();
            if (touchNavRef.current === "philosophy") {
              touchNavRef.current = null;
              return;
            }
            navigateToTop();
          }}
          onTouchStart={(event) => {
            event.preventDefault();
            touchNavRef.current = "philosophy";
            navigateToTop();
          }}
          onPointerDown={(event) => {
            if (!isTouchLikePointer(event)) return;
            event.preventDefault();
            touchNavRef.current = "philosophy";
            navigateToTop();
          }}
        >
          <span className="text-chaldal-green md:text-on-surface">{JOURNAL_NAV_BRAND}</span>
          <span className="hidden text-text-dim md:inline">
            <span className="mx-2 text-border-muted" aria-hidden>
              /
            </span>
            {profile.name}
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onPointerDown={(event) => onNavPointerDown(event, item.id)}
              onClick={(event) => onNavClick(event, item.id)}
              className={
                activeId === item.id
                  ? `${journalNavLinkMotion} font-mono-label text-mono-label border-b-2 border-chaldal-green pb-1 text-chaldal-green`
                  : `${journalNavLinkMotion} font-mono-label text-mono-label text-text-dim hover:border-transparent`
              }
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2 rounded-full border border-chaldal-green/20 bg-chaldal-green/10 px-3 py-1">
          <JournalSymbol name="work" className="text-chaldal-green" />
          <span className="font-mono-label text-mono-label text-chaldal-green">Open to Work</span>
        </div>
      </nav>

      <nav
        aria-label="Sections"
        className={`journal-mobile-sections relative z-10 mx-auto flex max-w-[1440px] flex-wrap gap-2 border-t border-border-muted/80 px-grid-margin py-2.5 md:hidden ${sectionPad}`}
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-current={activeId === item.id ? "true" : undefined}
            onClick={() => navigateToSection(item.id)}
            className={
              activeId === item.id
                ? `${mobilePillClass} border border-chaldal-green/40 bg-chaldal-green/10 text-chaldal-green`
                : `${mobilePillClass} border border-border-muted bg-transparent text-text-dim`
            }
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
