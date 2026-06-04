"use client";

import { useSyncExternalStore } from "react";

const LIGHT_MOTION_QUERY = "(max-width: 767px), (hover: none) and (pointer: coarse)";

/** Touch / narrow viewports: use the lighter scroll-reveal tier (not full desktop motion). */
export function usePrefersLightMotion(): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") {
        return () => {};
      }
      const mq = window.matchMedia(LIGHT_MOTION_QUERY);
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () =>
      typeof window !== "undefined" && window.matchMedia(LIGHT_MOTION_QUERY).matches,
    () => false,
  );
}
