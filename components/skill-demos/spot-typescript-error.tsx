"use client";

import { useState } from "react";
import { DemoShell } from "./demo-shell";
import { nextRound, statusFromAnswer } from "./quiz-utils";

type ErrorRound = {
  prompt: string;
  lines: string[];
  answerLine: number;
  explanation: string;
};

const rounds = [
  {
    prompt: "A prop is treated like the wrong type.",
    lines: ["type Props = { count: number };", "function Badge({ count }: Props) {", "  return <span>{count.toUpperCase()}</span>;", "}"],
    answerLine: 2,
    explanation: "`count` is a number, so it has no `toUpperCase()` method.",
  },
  {
    prompt: "One branch returns a shape the caller did not ask for.",
    lines: [
      "type User = { id: string; name: string };",
      "function getName(user?: User) {",
      "  if (!user) return false;",
      "  return user.name;",
      "}",
    ],
    answerLine: 2,
    explanation: "The function mixes `boolean` and `string`; a nullable string would be clearer.",
  },
  {
    prompt: "A readonly tuple gets changed after creation.",
    lines: ["const point = [24, 32] as const;", "const [x, y] = point;", "point[0] = x + y;", "console.log(point);"],
    answerLine: 2,
    explanation: "`as const` makes tuple entries readonly.",
  },
  {
    prompt: "The callback parameter is narrowed too aggressively.",
    lines: [
      "const ids: Array<string | number> = [1, \"2\"];",
      "ids.map((id: string) => {",
      "  return id.trim();",
      "});",
    ],
    answerLine: 1,
    explanation: "The array can pass a number into the callback.",
  },
] satisfies ErrorRound[];

export function SpotTypescriptErrorDemo() {
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedLine, setSelectedLine] = useState<number | null>(null);

  const item = rounds[round]!;
  const isCorrect = selectedLine === null ? null : selectedLine === item.answerLine;

  const choose = (line: number) => {
    if (selectedLine !== null) return;
    setSelectedLine(line);
    if (line === item.answerLine) setScore((value) => value + 1);
  };

  return (
    <DemoShell
      eyebrow="Spot the bug"
      title="Spot the TypeScript error"
      instructions={`${item.prompt} Click the single buggy line.`}
      score={score}
      round={round}
      total={rounds.length}
      status={statusFromAnswer(isCorrect)}
      statusText={selectedLine === null ? "Click a line" : item.explanation}
      onNext={
        selectedLine === null
          ? undefined
          : () => {
              setRound((value) => nextRound(value, rounds.length));
              setSelectedLine(null);
            }
      }
    >
      <div className="overflow-hidden rounded-xl border border-slate-700/70 bg-slate-950/80 font-mono text-xs text-slate-300">
        {item.lines.map((line, index) => {
          const isPicked = selectedLine === index;
          const isAnswer = item.answerLine === index;
          return (
            <button
              key={`${round}-${line}`}
              type="button"
              onClick={() => choose(index)}
              className={`grid w-full grid-cols-[2rem_1fr] gap-2 border-b border-slate-800/80 px-3 py-2 text-left last:border-b-0 focus:outline-none focus:ring-2 focus:ring-cyan-300/60 ${
                isPicked && isAnswer
                  ? "bg-emerald-500/15 text-emerald-100"
                  : isPicked
                    ? "bg-rose-500/15 text-rose-100"
                    : "hover:bg-slate-800/70"
              }`}
            >
              <span className="select-none text-slate-500">{index + 1}</span>
              <code>{line}</code>
            </button>
          );
        })}
      </div>
    </DemoShell>
  );
}
