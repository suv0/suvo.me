import type { ReactNode } from "react";

export type DemoStatus = "idle" | "correct" | "incorrect";

/** Registry entry — demo UI is loaded on demand via `skillDemoLazyById` in `registry.ts`. */
export type SkillDemoMeta = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type DemoShellProps = {
  title: string;
  eyebrow: string;
  instructions: string;
  score: number;
  round: number;
  total: number;
  status: DemoStatus;
  statusText?: string;
  onNext?: () => void;
  children: ReactNode;
};
