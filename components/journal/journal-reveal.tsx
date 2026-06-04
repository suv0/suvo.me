"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { JournalSectionRule } from "@/components/journal/journal-section-rule";
import { revealJournalBlock } from "@/lib/journal-reveal-dom";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

type JournalRevealProps = {
  children: ReactNode;
  className?: string;
  as?: "section" | "div" | "footer" | "article";
  id?: string;
  /** Animate the top separator line in sync with this block's reveal. */
  rule?: boolean;
};

type RevealPhase = "idle" | "pending" | "visible";

export function JournalReveal({
  children,
  className = "",
  as: Tag = "section",
  id,
  rule = false,
}: JournalRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  /** SSR + first paint: idle (no hidden content) — avoids hydration mismatch. */
  const [phase, setPhase] = useState<RevealPhase>("idle");

  const phaseClass =
    phase === "pending"
      ? "journal-reveal--pending"
      : phase === "visible"
        ? "journal-reveal--visible"
        : "";

  const revealClass = [
    "journal-reveal",
    reduceMotion ? "journal-reveal--reduced" : "",
    phaseClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (reduceMotion) {
        setPhase("visible");
        return;
      }

      const el = ref.current;
      if (!el) return;

      const belowFold = el.getBoundingClientRect().top > window.innerHeight * 0.88;
      setPhase(belowFold ? "pending" : "visible");
    });

    return () => cancelAnimationFrame(frame);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion || phase !== "pending" || !ref.current) return;

    const el = ref.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setPhase("visible");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px 0px 0px" },
    );

    observer.observe(el);

    const safety = window.setTimeout(() => {
      setPhase((current) => (current === "pending" ? "visible" : current));
    }, 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(safety);
    };
  }, [reduceMotion, phase]);

  useEffect(() => {
    if (reduceMotion || !ref.current || !id) return;

    const el = ref.current;
    const onSectionNavigated = (event: Event) => {
      const targetId = (event as CustomEvent<{ id: string }>).detail?.id;
      if (targetId !== id) return;
      setPhase("visible");
      revealJournalBlock(el);
    };

    window.addEventListener("journal-section-navigated", onSectionNavigated);
    return () => window.removeEventListener("journal-section-navigated", onSectionNavigated);
  }, [reduceMotion, id]);

  return (
    <Tag ref={ref as never} id={id} className={revealClass || undefined}>
      {rule ? <JournalSectionRule /> : null}
      <div className="journal-reveal__content">{children}</div>
    </Tag>
  );
}
