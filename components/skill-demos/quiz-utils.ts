import type { DemoStatus } from "./types";

export function nextRound(current: number, total: number): number {
  return (current + 1) % total;
}

export function statusFromAnswer(isCorrect: boolean | null): DemoStatus {
  if (isCorrect === null) return "idle";
  return isCorrect ? "correct" : "incorrect";
}
