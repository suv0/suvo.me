"use client";

import { useCallback, useRef, useState } from "react";
import { allSkills } from "@/lib/portfolio-data";

export function SkillMarquee() {
  const sequence = [...allSkills, ...allSkills];
  const pillHoverDepth = useRef(0);
  const [pillHoverPaused, setPillHoverPaused] = useState(false);

  const onPillPointerEnter = useCallback(() => {
    pillHoverDepth.current += 1;
    setPillHoverPaused(true);
  }, []);

  const onPillPointerLeave = useCallback(() => {
    pillHoverDepth.current = Math.max(0, pillHoverDepth.current - 1);
    if (pillHoverDepth.current === 0) {
      setPillHoverPaused(false);
    }
  }, []);

  const trackClass = pillHoverPaused ? "marquee-track marquee-track--paused" : "marquee-track";

  return (
    <div className="marquee-shell" aria-hidden>
      <div className="marquee-gradient-left" />
      <div className="marquee-gradient-right" />
      <div className={trackClass}>
        {sequence.map((skill, index) => (
          <span
            key={`${skill}-${index}`}
            className="marquee-pill"
            onPointerEnter={onPillPointerEnter}
            onPointerLeave={onPillPointerLeave}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
