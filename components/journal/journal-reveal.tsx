"use client";

import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { JournalSectionRule } from "@/components/journal/journal-section-rule";
import { revealJournalBlock } from "@/lib/journal-reveal-dom";
import { usePrefersLightMotion } from "@/lib/use-prefers-light-motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

type JournalRevealProps = {
  children: ReactNode;
  className?: string;
  as?: "section" | "div" | "footer" | "article";
  id?: string;
  /** Animate the top separator line in sync with this block's reveal. */
  rule?: boolean;
};

function markVisible(el: HTMLElement): void {
  el.classList.remove("journal-reveal--pending");
  el.classList.add("journal-reveal--visible");
}

export function JournalReveal({
  children,
  className = "",
  as: Tag = "section",
  id,
  rule = false,
}: JournalRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const lightMotion = usePrefersLightMotion();
  const skipScrollHide = reduceMotion || lightMotion;
  const revealClass = [
    "journal-reveal",
    reduceMotion ? "journal-reveal--reduced" : "",
    !reduceMotion && lightMotion ? "journal-reveal--subtle" : "",
  ]
    .filter(Boolean)
    .join(" ");

  useLayoutEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    if (skipScrollHide) {
      markVisible(el);
      return;
    }

    const belowFold = el.getBoundingClientRect().top > window.innerHeight * 0.88;

    el.classList.toggle("journal-reveal--pending", belowFold);
    el.classList.toggle("journal-reveal--visible", !belowFold);
  }, [skipScrollHide]);

  useEffect(() => {
    if (skipScrollHide || !ref.current) return;

    const el = ref.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            markVisible(el);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px 0px 0px" },
    );

    observer.observe(el);

    const safety = window.setTimeout(() => {
      if (el.classList.contains("journal-reveal--pending")) {
        markVisible(el);
      }
    }, 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(safety);
    };
  }, [skipScrollHide]);

  useEffect(() => {
    if (skipScrollHide || !ref.current || !id) return;

    const el = ref.current;
    const onSectionNavigated = (event: Event) => {
      const targetId = (event as CustomEvent<{ id: string }>).detail?.id;
      if (targetId !== id) return;
      revealJournalBlock(el);
    };

    window.addEventListener("journal-section-navigated", onSectionNavigated);
    return () => window.removeEventListener("journal-section-navigated", onSectionNavigated);
  }, [skipScrollHide, id]);

  const outerClass = [revealClass, className].filter(Boolean).join(" ");

  return (
    <Tag ref={ref as never} id={id} className={outerClass || undefined}>
      {rule ? <JournalSectionRule /> : null}
      <div className="journal-reveal__content">{children}</div>
    </Tag>
  );
}
