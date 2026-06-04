"use client";

import { useSyncExternalStore } from "react";

const LIGHT_MOTION_QUERY = "(max-width: 767px), (hover: none) and (pointer: coarse)";

function subscribe(onStoreChange: () => void) {
  const mq = window.matchMedia(LIGHT_MOTION_QUERY);
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getServerSnapshot(): boolean {
  return false;
}

function getClientSnapshot(): boolean {
  return window.matchMedia(LIGHT_MOTION_QUERY).matches;
}

/** Touch / narrow viewports — hydration-safe (server + first client pass use `false`). */
export function usePrefersLightMotion(): boolean {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
}
