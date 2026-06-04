import { lazy, type ComponentType, type LazyExoticComponent } from "react";
import type { SkillDemoMeta } from "./types";

export const skillDemoRegistry = [
  {
    id: "spot-typescript-error",
    title: "Spot the TypeScript error",
    description: "Click the buggy line in a tiny snippet.",
    icon: "bug_report",
  },
  {
    id: "guess-tailwind-class",
    title: "Guess the Tailwind class",
    description: "Match the preview to a plausible utility string.",
    icon: "palette",
  },
  {
    id: "valid-typescript",
    title: "Valid TypeScript?",
    description: "Judge whether the snippet type-checks.",
    icon: "rule",
  },
  {
    id: "name-that-hook",
    title: "Name that hook",
    description: "Map behavior to the right React hook.",
    icon: "extension",
  },
  {
    id: "which-api",
    title: "Which API is correct?",
    description: "Choose the clean web-platform API.",
    icon: "api",
  },
  {
    id: "render-order",
    title: "What happens next?",
    description: "Complete a frontend lifecycle sequence.",
    icon: "timeline",
  },
  {
    id: "stack-catch",
    title: "Stack catch",
    description: "Catch the good frontend tokens.",
    icon: "sports_esports",
  },
] as const satisfies readonly SkillDemoMeta[];

export type SkillDemoId = (typeof skillDemoRegistry)[number]["id"];

export const skillDemoLazyById: Record<SkillDemoId, LazyExoticComponent<ComponentType>> = {
  "spot-typescript-error": lazy(() =>
    import("./spot-typescript-error").then((m) => ({ default: m.SpotTypescriptErrorDemo })),
  ),
  "guess-tailwind-class": lazy(() =>
    import("./guess-tailwind-class").then((m) => ({ default: m.GuessTailwindClassDemo })),
  ),
  "valid-typescript": lazy(() =>
    import("./valid-typescript").then((m) => ({ default: m.ValidTypescriptDemo })),
  ),
  "name-that-hook": lazy(() => import("./name-that-hook").then((m) => ({ default: m.NameThatHookDemo }))),
  "which-api": lazy(() => import("./which-api").then((m) => ({ default: m.WhichApiDemo }))),
  "render-order": lazy(() => import("./render-order").then((m) => ({ default: m.RenderOrderDemo }))),
  "stack-catch": lazy(() => import("./stack-catch-mode").then((m) => ({ default: m.StackCatchMode }))),
};
