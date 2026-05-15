"use client";

import { useState } from "react";
import { DemoShell } from "./demo-shell";
import { nextRound, statusFromAnswer } from "./quiz-utils";

type TailwindRound = {
  previewClassName: string;
  label: string;
  options: string[];
  answer: string;
};

const rounds = [
  {
    previewClassName: "rounded-2xl border border-cyan-300/35 bg-cyan-400/15 shadow-[0_0_24px_rgb(34_211_238/0.18)]",
    label: "Soft cyan card with a rounded glow",
    options: [
      "rounded-2xl border border-cyan-300/35 bg-cyan-400/15 shadow-cyan",
      "rounded-sm bg-cyan-900 border-0 shadow-none",
      "rounded-full border border-rose-300/35 bg-rose-400/15",
      "rounded-xl bg-slate-800 text-cyan-200 underline",
    ],
    answer: "rounded-2xl border border-cyan-300/35 bg-cyan-400/15 shadow-cyan",
  },
  {
    previewClassName: "rounded-full bg-gradient-to-r from-sky-400 to-violet-400 px-4 py-2 text-slate-950",
    label: "Pill button with a sky-to-violet gradient",
    options: [
      "rounded-full bg-gradient-to-r from-sky-400 to-violet-400 px-4 py-2",
      "rounded-none bg-gradient-to-b from-amber-400 to-red-400 px-2 py-6",
      "rounded-lg border border-slate-500 bg-transparent px-4 py-2",
      "rounded-full bg-slate-900 px-4 py-2 text-violet-400",
    ],
    answer: "rounded-full bg-gradient-to-r from-sky-400 to-violet-400 px-4 py-2",
  },
  {
    previewClassName: "rounded-xl border border-slate-500/35 bg-slate-900/70 p-3 ring-1 ring-white/10",
    label: "Muted dark panel with a subtle ring",
    options: [
      "rounded-xl border border-slate-500/35 bg-slate-900/70 p-3 ring-1 ring-white/10",
      "rounded-xl border-4 border-lime-400 bg-white p-8 ring-0",
      "rounded-full bg-slate-900/70 p-3 ring-4 ring-rose-400",
      "rounded-none border border-slate-500/35 bg-transparent p-0",
    ],
    answer: "rounded-xl border border-slate-500/35 bg-slate-900/70 p-3 ring-1 ring-white/10",
  },
  {
    previewClassName: "rounded-lg border-l-4 border-l-emerald-300 bg-emerald-400/10 px-3 py-2 text-emerald-100",
    label: "Success note with a left accent border",
    options: [
      "rounded-lg border-l-4 border-l-emerald-300 bg-emerald-400/10 px-3 py-2",
      "rounded-lg border-r-4 border-r-red-300 bg-red-400/10 px-3 py-2",
      "rounded-full border border-emerald-300 bg-transparent px-8 py-1",
      "rounded-lg border-t-4 border-t-sky-300 bg-sky-400/10 px-3 py-2",
    ],
    answer: "rounded-lg border-l-4 border-l-emerald-300 bg-emerald-400/10 px-3 py-2",
  },
] satisfies TailwindRound[];

export function GuessTailwindClassDemo() {
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
      eyebrow="Visual CSS"
      title="Guess the Tailwind class"
      instructions="Match the visual preview to the most likely class string."
      score={score}
      round={round}
      total={rounds.length}
      status={statusFromAnswer(isCorrect)}
      statusText={selected === null ? "Pick one class string" : isCorrect ? "That matches the preview." : `Correct: ${item.answer}`}
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
        <div className="rounded-xl border border-slate-700/70 bg-slate-950/70 p-4">
          <div className={item.previewClassName}>
            <span className="text-sm font-semibold">{item.label}</span>
          </div>
        </div>
        <div className="grid gap-2">
          {item.options.map((choice) => (
            <button
              key={choice}
              type="button"
              onClick={() => choose(choice)}
              className={`rounded-lg border px-3 py-2 text-left font-mono text-[0.7rem] leading-relaxed focus:outline-none focus:ring-2 focus:ring-cyan-300/60 ${
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
