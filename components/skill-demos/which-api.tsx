"use client";

import { useState } from "react";
import { DemoShell } from "./demo-shell";
import { nextRound, statusFromAnswer } from "./quiz-utils";

type ApiRound = {
  task: string;
  choices: string[];
  answer: string;
  note: string;
};

const rounds = [
  {
    task: "Read a URL search param in browser code.",
    choices: ["new URLSearchParams(location.search).get(\"q\")", "JSON.parse(location.search).q", "document.querySelector(\"q\")", "location.query.q"],
    answer: "new URLSearchParams(location.search).get(\"q\")",
    note: "`URLSearchParams` is the standard API for query strings.",
  },
  {
    task: "Schedule work after the browser has painted.",
    choices: ["requestAnimationFrame(callback)", "setInterval(callback)", "queueMicrotask(callback)", "Promise.resolve(callback)"],
    answer: "requestAnimationFrame(callback)",
    note: "`requestAnimationFrame` lines work up with the next paint frame.",
  },
  {
    task: "Cancel a fetch when a component unmounts.",
    choices: ["AbortController", "MutationObserver", "ResizeObserver", "BroadcastChannel"],
    answer: "AbortController",
    note: "Pass `controller.signal` into `fetch`, then call `abort()` in cleanup.",
  },
  {
    task: "Check whether the user prefers reduced motion.",
    choices: [
      "matchMedia(\"(prefers-reduced-motion: reduce)\")",
      "navigator.motion === \"reduce\"",
      "document.motionPreference",
      "screen.prefersReducedMotion",
    ],
    answer: "matchMedia(\"(prefers-reduced-motion: reduce)\")",
    note: "The media query is the web-platform signal.",
  },
] satisfies ApiRound[];

export function WhichApiDemo() {
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  const item = rounds[round]!;
  const isCorrect = selected === null ? null : selected === item.answer;

  const choose = (choice: string) => {
    if (selected !== null) return;
    setSelected(choice);
    if (choice === item.answer) setScore((value) => value + 1);
  };

  return (
    <DemoShell
      eyebrow="Web platform"
      title="Which API is correct?"
      instructions="Pick the API that solves the frontend task cleanly."
      score={score}
      round={round}
      total={rounds.length}
      status={statusFromAnswer(isCorrect)}
      statusText={selected === null ? "Pick the best API" : item.note}
      onNext={
        selected === null
          ? undefined
          : () => {
              setRound((value) => nextRound(value, rounds.length));
              setSelected(null);
            }
      }
    >
      <div className="grid gap-3">
        <p className="rounded-xl border border-sky-300/20 bg-sky-400/10 p-3 text-sm font-medium text-sky-100">{item.task}</p>
        <div className="grid gap-2">
          {item.choices.map((choice) => (
            <button
              key={choice}
              type="button"
              onClick={() => choose(choice)}
              className={`rounded-lg border px-3 py-2 text-left font-mono text-[0.72rem] leading-relaxed focus:outline-none focus:ring-2 focus:ring-cyan-300/60 ${
                selected === choice
                  ? choice === item.answer
                    ? "border-emerald-400/45 bg-emerald-500/10 text-emerald-100"
                    : "border-rose-400/45 bg-rose-500/10 text-rose-100"
                  : "border-slate-700/70 bg-slate-950/50 text-slate-300 hover:border-slate-500/70"
              }`}
            >
              {choice}
            </button>
          ))}
        </div>
      </div>
    </DemoShell>
  );
}
