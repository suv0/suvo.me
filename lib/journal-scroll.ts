import { revealJournalBlock } from "@/lib/journal-reveal-dom";

/** Fallback when header is not measurable yet. */
export const JOURNAL_NAV_SCROLL_OFFSET_PX = 112;

export function getScrollDurationMs(): number {
  if (typeof window === "undefined") return 900;
  const mobile = window.matchMedia("(max-width: 767px), (hover: none) and (pointer: coarse)").matches;
  return mobile ? 620 : 900;
}

/** Match fixed header height (two rows on mobile). */
export function getJournalNavScrollOffsetPx(): number {
  if (typeof document === "undefined") return JOURNAL_NAV_SCROLL_OFFSET_PX;
  const header = document.querySelector<HTMLElement>("header.journal-site-header");
  if (!header) return JOURNAL_NAV_SCROLL_OFFSET_PX;
  return Math.ceil(header.getBoundingClientRect().height) + 8;
}

let activeScroll: number | null = null;
let scrollDurationMs = 900;
let scrollToken = 0;
let scrollAnimating = false;
let scrollTargetId: string | null = null;

/** True while a nav-driven smooth scroll is in progress (ignore scroll-spy). */
export function isJournalScrollAnimating(): boolean {
  return scrollAnimating;
}

export function endJournalScrollAnimation(): void {
  scrollAnimating = false;
  scrollTargetId = null;
}

/** How long nav should ignore scroll-spy after a pill tap (covers iOS momentum). */
export function getNavSpyHoldMs(): number {
  return getScrollDurationMs() + 650;
}

/** Section id being scrolled to (for nav highlight while animating). */
export function getJournalScrollTargetId(): string | null {
  return scrollTargetId;
}

function getSectionDocumentTop(el: HTMLElement): number {
  return el.getBoundingClientRect().top + window.scrollY;
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** Smooth scroll that works when native `behavior: smooth` is ignored (common on iOS). */
export function smoothScrollToY(targetY: number, onComplete?: () => void): void {
  if (activeScroll !== null) {
    cancelAnimationFrame(activeScroll);
    activeScroll = null;
  }

  const startY = window.scrollY;
  const distance = Math.max(0, targetY) - startY;
  if (Math.abs(distance) < 2) {
    onComplete?.();
    return;
  }

  scrollDurationMs = getScrollDurationMs();
  const startTime = performance.now();

  const step = (now: number) => {
    const progress = Math.min(1, (now - startTime) / scrollDurationMs);
    window.scrollTo(0, startY + distance * easeInOutCubic(progress));
    if (progress < 1) {
      activeScroll = requestAnimationFrame(step);
    } else {
      activeScroll = null;
      onComplete?.();
    }
  };

  activeScroll = requestAnimationFrame(step);
}

/** Scroll to a section id; nav always uses smooth motion (not reduced-motion gated). */
export function scrollToJournalSection(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;

  const token = ++scrollToken;
  scrollAnimating = true;
  scrollTargetId = id;

  const headerOffset = getJournalNavScrollOffsetPx();
  const target = getSectionDocumentTop(el) - headerOffset;

  const finish = () => {
    if (token !== scrollToken) return;
    revealJournalBlock(el);
    window.dispatchEvent(
      new CustomEvent("journal-section-navigated", { detail: { id } }),
    );
    // Nav clears animation + spy hold when the target pill is confirmed.
  };

  smoothScrollToY(Math.max(0, target), finish);
}

/** Document Y for scroll-spy (same math as `scrollToJournalSection`). */
export function getJournalSectionDocumentTop(id: string): number | null {
  const el = document.getElementById(id);
  if (!el) return null;
  return getSectionDocumentTop(el);
}
