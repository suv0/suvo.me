"use client";

import { useState } from "react";
import { DemoShell } from "./demo-shell";
import { nextRound, statusFromAnswer } from "./quiz-utils";

type OrderRound = {
  scenario: string;
  sequence: string[];
  choices: string[];
  answer: string;
};

const rounds = [
  {
    scenario: "A client component mounts for the first time.",
    sequence: ["Render JSX", "Commit DOM"],
    choices: ["Run useEffect", "Run event handler", "Hydrate server HTML", "Call cleanup"],
    answer: "Run useEffect",
  },
  {
    scenario: "A state setter runs from a click handler.",
    sequence: ["Click handler", "Schedule update"],
    choices: ["Render with new state", "Run route loader", "Reset all refs", "Unmount immediately"],
    answer: "Render with new state",
  },
  {
    scenario: "A component unmounts after registering an effect.",
    sequence: ["Effect ran", "Component removed"],
    choices: ["Run effect cleanup", "Call useMemo again", "Recreate server props", "Replay click events"],
    answer: "Run effect cleanup",
  },
  {
    scenario: "A memoized value's dependency changes.",
    sequence: ["Dependency changes", "Component renders"],
    choices: ["Recompute useMemo value", "Skip all children forever", "Cancel hydration", "Ignore dependency array"],
    answer: "Recompute useMemo value",
  },
] satisfies OrderRound[];

export function RenderOrderDemo() {
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
      eyebrow="React flow"
      title="What happens next?"
      instructions="Complete the tiny lifecycle sequence."
      score={score}
      round={round}
      total={rounds.length}
      status={statusFromAnswer(isCorrect)}
      statusText={selected === null ? "Choose the next step" : isCorrect ? "That is the next step." : `Next step: ${item.answer}`}
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
        <p className="text-sm text-slate-300">{item.scenario}</p>
        <ol className="grid gap-2">
          {item.sequence.map((step, index) => (
            <li key={step} className="flex items-center gap-2 rounded-lg border border-slate-700/70 bg-slate-950/55 px-3 py-2 text-sm text-slate-200">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400/15 text-xs font-semibold text-cyan-200">
                {index + 1}
              </span>
              {step}
            </li>
          ))}
          <li className="rounded-lg border border-dashed border-cyan-300/30 bg-cyan-400/5 px-3 py-2 text-sm text-cyan-100">What comes next?</li>
        </ol>
        <div className="grid grid-cols-2 gap-2">
          {item.choices.map((choice) => (
            <button
              key={choice}
              type="button"
              onClick={() => choose(choice)}
              className={`rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300/60 ${
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
