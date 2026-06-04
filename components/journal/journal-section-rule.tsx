"use client";

import { useEffect, useRef, useState } from "react";

const DRAW_MS = 1200;

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/** Section separator that visibly grows left → right when scrolled into view. */
export function JournalSectionRule({ className = "" }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [widthPct, setWidthPct] = useState(0);
  const frameRef = useRef(0);
  const drawnRef = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const runDraw = () => {
      if (drawnRef.current) return;
      drawnRef.current = true;
      cancelAnimationFrame(frameRef.current);

      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / DRAW_MS);
        setWidthPct(easeOutCubic(t) * 100);
        if (t < 1) {
          frameRef.current = requestAnimationFrame(tick);
        }
      };
      frameRef.current = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          runDraw();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -42% 0px" },
    );

    observer.observe(root);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div ref={rootRef} className={`journal-section-rule-host mb-6 w-full shrink-0 ${className}`.trim()} aria-hidden>
      <div className="journal-section-rule-track h-[3px] w-full overflow-hidden rounded-sm bg-border-muted/80">
        <div className="journal-section-rule-fill h-full rounded-sm" style={{ width: `${widthPct}%` }} />
      </div>
    </div>
  );
}
