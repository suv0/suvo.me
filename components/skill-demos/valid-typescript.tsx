"use client";

import { useState } from "react";
import { DemoShell } from "./demo-shell";
import { nextRound, statusFromAnswer } from "./quiz-utils";

type ValidRound = {
  snippet: string[];
  isValid: boolean;
  explanation: string;
};

const rounds = [
  {
    snippet: ["type Status = \"idle\" | \"ready\";", "const status = \"ready\" satisfies Status;"],
    isValid: true,
    explanation: "`satisfies` checks the literal without widening it away.",
  },
  {
    snippet: ["const total: number = \"42\";", "console.log(total.toFixed(2));"],
    isValid: false,
    explanation: "A string cannot be assigned to a number.",
  },
  {
    snippet: ["function first<T>(items: T[]): T | undefined {", "  return items[0];", "}"],
    isValid: true,
    explanation: "Empty arrays are handled with `undefined`.",
  },
  {
    snippet: ["type Theme = \"dark\" | \"light\";", "const theme: Theme = \"system\";"],
    isValid: false,
    explanation: "`system` is not part of the `Theme` union.",
  },
  {
    snippet: ["const format = (value: number | null) => {", "  return value?.toFixed(1) ?? \"n/a\";", "};"],
    isValid: true,
    explanation: "Optional chaining safely handles `null`.",
  },
] satisfies ValidRound[];

export function ValidTypescriptDemo() {
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState<boolean | null>(null);

  const item = rounds[round]!;
  const isCorrect = answer === null ? null : answer === item.isValid;

  const choose = (choice: boolean) => {
    if (answer !== null) return;
    setAnswer(choice);
    if (choice === item.isValid) setScore((value) => value + 1);
  };

  return (
    <DemoShell
      eyebrow="Type check"
      title="Valid TypeScript?"
      instructions="Read the snippet and decide whether TypeScript should accept it."
      score={score}
      round={round}
      total={rounds.length}
      status={statusFromAnswer(isCorrect)}
      statusText={answer === null ? "Thumbs up or down" : item.explanation}
      onNext={
        answer === null
          ? undefined
          : () => {
              setRound((value) => nextRound(value, rounds.length));
              setAnswer(null);
            }
      }
    >
      <div className="grid gap-4">
        <pre className="overflow-x-auto rounded-xl border border-slate-700/70 bg-slate-950/80 p-3 text-xs leading-relaxed text-slate-300">
          <code>{item.snippet.join("\n")}</code>
        </pre>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => choose(true)}
            className="btn-secondary rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300/60"
          >
            Valid
          </button>
          <button
            type="button"
            onClick={() => choose(false)}
            className="btn-secondary rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300/60"
          >
            Invalid
          </button>
        </div>
      </div>
    </DemoShell>
  );
}
