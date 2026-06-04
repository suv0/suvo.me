"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

/** Moves the hero portrait slower than scroll for a light parallax effect. */
export function JournalHeroParallax({ children }: { children: ReactNode }) {
  const layerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reduceMotion || !layerRef.current) return;

    const layer = layerRef.current;
    const skipParallaxMq = window.matchMedia("(max-width: 767px), (hover: none) and (pointer: coarse)");
    let frame = 0;

    const clearTransform = () => {
      layer.style.transform = "";
      layer.style.willChange = "auto";
    };

    const update = () => {
      if (skipParallaxMq.matches) {
        clearTransform();
        return;
      }
      layer.style.willChange = "transform";
      const offset = Math.min(window.scrollY * 0.32, window.innerHeight * 0.45);
      layer.style.transform = `translate3d(0, ${offset}px, 0) scale(1.04)`;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    const onBreakpoint = () => update();

    update();
    skipParallaxMq.addEventListener("change", onBreakpoint);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      skipParallaxMq.removeEventListener("change", onBreakpoint);
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      clearTransform();
    };
  }, [reduceMotion]);

  return (
    <div ref={layerRef} className="absolute inset-0 md:will-change-transform">
      {children}
    </div>
  );
}
