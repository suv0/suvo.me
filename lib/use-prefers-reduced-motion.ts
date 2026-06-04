"use client";

import { useSyncExternalStore } from "react";

const REDUCE_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onStoreChange: () => void) {
  const mq = window.matchMedia(REDUCE_MOTION_QUERY);
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getServerSnapshot(): boolean {
  return false;
}

function getClientSnapshot(): boolean {
  return window.matchMedia(REDUCE_MOTION_QUERY).matches;
}

/** Matches `prefers-reduced-motion` — hydration-safe (server + first client pass use `false`). */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
}
