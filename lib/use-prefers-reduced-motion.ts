"use client";

import { useSyncExternalStore } from "react";

/**
 * Matches `prefers-reduced-motion` on the client while staying hydration-safe:
 * server snapshot and the client's first hydrated pass both use `false`, then
 * the real media query value is applied after commit.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") {
        return () => {};
      }
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}
