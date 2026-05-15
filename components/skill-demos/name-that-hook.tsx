"use client";

import { useState } from "react";
import { DemoShell } from "./demo-shell";
import { nextRound, statusFromAnswer } from "./quiz-utils";

type HookRound = {
  behavior: string;
  choices: string[];
  answer: string;
};

const rounds = [
  {
    behavior: "Keep a mutable value around between renders without causing a rerender when it changes.",
    choices: ["useRef", "useMemo", "useId", "useReducer"],
    answer: "useRef",
  },
  {
    behavior: "Subscribe to an external store while keeping server and client snapshots consistent.",
    choices: ["useDeferredValue", "useSyncExternalStore", "useTransition", "useCallback"],
    answer: "useSyncExternalStore",
  },
  {
    behavior: "Cache an expensive derived value until its dependencies change.",
    choices: ["useMemo", "useEffect", "useOptimistic", "useImperativeHandle"],
    answer: "useMemo",
  },
  {
    behavior: "Model state changes with events when the next state depends on the current one.",
    choices: ["useReducer", "useLayoutEffect", "useDebugValue", "useInsertionEffect"],
    answer: "useReducer",
  },
] satisfies HookRound[];

export function NameThatHookDemo() {
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
      eyebrow="React instincts"
      title="Name that hook"
      instructions="Pick the React hook that best matches the behavior."
      score={score}
      round={round}
      total={rounds.length}
      status={statusFromAnswer(isCorrect)}
      statusText={selected === null ? "Choose a hook" : isCorrect ? "Exactly." : `Best answer: ${item.answer}`}
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
        <p className="rounded-xl border border-slate-700/70 bg-slate-950/70 p-4 text-sm leading-relaxed text-slate-200">
          {item.behavior}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {item.choices.map((choice) => (
            <button
              key={choice}
              type="button"
              onClick={() => choose(choice)}
              className={`rounded-xl border px-3 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-300/60 ${
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
