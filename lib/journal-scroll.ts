import { revealJournalBlock } from "@/lib/journal-reveal-dom";

/** Fixed nav + mobile section strip — keep headings below the bar. */
export const JOURNAL_NAV_SCROLL_OFFSET_PX = 112;

const SCROLL_DURATION_MS = 1100;

let activeScroll: number | null = null;

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

  const startTime = performance.now();

  const step = (now: number) => {
    const progress = Math.min(1, (now - startTime) / SCROLL_DURATION_MS);
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

  const target =
    el.getBoundingClientRect().top + window.scrollY - JOURNAL_NAV_SCROLL_OFFSET_PX;

  const finish = () => {
    revealJournalBlock(el);
    window.dispatchEvent(
      new CustomEvent("journal-section-navigated", { detail: { id } }),
    );
  };

  smoothScrollToY(Math.max(0, target), finish);
}
