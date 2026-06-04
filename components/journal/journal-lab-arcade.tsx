"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { JournalSymbol } from "@/components/journal/journal-symbol";

const SNAKE_SIZE = 14;
const TICK_MS = 140;

type Point = { x: number; y: number };

const SNAKE_START: Point[] = [
  { x: 6, y: 7 },
  { x: 5, y: 7 },
  { x: 4, y: 7 },
];

/** Fixed spawn so SSR and hydration render the same board (no Math.random in initial state). */
const SNAKE_INITIAL_FOOD: Point = { x: 10, y: 5 };

function randomFood(snake: Point[]): Point {
  const occupied = new Set(snake.map((p) => `${p.x},${p.y}`));
  let attempt = 0;
  while (attempt < 80) {
    const p = { x: Math.floor(Math.random() * SNAKE_SIZE), y: Math.floor(Math.random() * SNAKE_SIZE) };
    if (!occupied.has(`${p.x},${p.y}`)) return p;
    attempt += 1;
  }
  return { x: 0, y: 0 };
}

function SnakeMini() {
  const [snake, setSnake] = useState<Point[]>(SNAKE_START);
  const [dir, setDir] = useState<Point>({ x: 1, y: 0 });
  const dirRef = useRef(dir);
  const [food, setFood] = useState<Point>(SNAKE_INITIAL_FOOD);
  const foodRef = useRef(SNAKE_INITIAL_FOOD);
  const [score, setScore] = useState(0);
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    foodRef.current = food;
  }, [food]);

  useEffect(() => {
    dirRef.current = dir;
  }, [dir]);

  const reset = useCallback(() => {
    const start = [...SNAKE_START];
    setSnake(start);
    setDir({ x: 1, y: 0 });
    dirRef.current = { x: 1, y: 0 };
    setFood(randomFood(start));
    setScore(0);
    setGameOver(false);
    setRunning(true);
  }, []);

  useEffect(() => {
    if (!running || gameOver) return;

    const id = window.setInterval(() => {
      setSnake((prev) => {
        const d = dirRef.current;
        const head = { x: prev[0]!.x + d.x, y: prev[0]!.y + d.y };
        if (head.x < 0 || head.y < 0 || head.x >= SNAKE_SIZE || head.y >= SNAKE_SIZE) {
          setGameOver(true);
          setRunning(false);
          return prev;
        }
        if (prev.some((p) => p.x === head.x && p.y === head.y)) {
          setGameOver(true);
          setRunning(false);
          return prev;
        }
        const currentFood = foodRef.current;
        const ate = head.x === currentFood.x && head.y === currentFood.y;
        const next = [head, ...prev];
        if (!ate) next.pop();
        else {
          const newFood = randomFood(next);
          foodRef.current = newFood;
          setScore((s) => s + 1);
          setFood(newFood);
        }
        return next;
      });
    }, TICK_MS);

    return () => window.clearInterval(id);
  }, [running, gameOver]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) return;
      e.preventDefault();
      if (!running && !gameOver) setRunning(true);
      const d = dirRef.current;
      const next =
        e.key === "ArrowUp"
          ? { x: 0, y: -1 }
          : e.key === "ArrowDown"
            ? { x: 0, y: 1 }
            : e.key === "ArrowLeft"
              ? { x: -1, y: 0 }
              : { x: 1, y: 0 };
      if (next.x === -d.x && next.y === -d.y) return;
      dirRef.current = next;
      setDir(next);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [running, gameOver]);

  const turn = (next: Point) => {
    const d = dirRef.current;
    if (next.x === -d.x && next.y === -d.y) return;
    if (!running && !gameOver) setRunning(true);
    dirRef.current = next;
    setDir(next);
  };

  const snakeSet = new Set(snake.map((p) => `${p.x},${p.y}`));

  return (
    <div className="flex flex-col rounded-lg border border-border-muted bg-ink-black p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="inline-flex items-center gap-1.5 font-mono-label text-[0.68rem] uppercase tracking-widest text-chaldal-green">
          <JournalSymbol name="sports_esports" />
          Snake
        </p>
        <span className="font-mono-label text-[0.7rem] tabular-nums text-text-dim">Score {score}</span>
      </div>
      <div
        className="mx-auto grid w-full max-w-[min(100%,16rem)] gap-px rounded border border-border-muted/80 bg-journal-deep p-1"
        style={{ gridTemplateColumns: `repeat(${SNAKE_SIZE}, minmax(0, 1fr))`, aspectRatio: "1" }}
        role="img"
        aria-label="Snake game board"
      >
        {Array.from({ length: SNAKE_SIZE * SNAKE_SIZE }, (_, i) => {
          const x = i % SNAKE_SIZE;
          const y = Math.floor(i / SNAKE_SIZE);
          const isHead = snake[0]?.x === x && snake[0]?.y === y;
          const isBody = snakeSet.has(`${x},${y}`) && !isHead;
          const isFood = food.x === x && food.y === y;
          return (
            <div
              key={i}
              className={
                isHead
                  ? "aspect-square rounded-[1px] bg-chaldal-green"
                  : isBody
                    ? "aspect-square rounded-[1px] bg-chaldal-green/45"
                    : isFood
                      ? "aspect-square rounded-full bg-amber-400/90"
                      : "aspect-square bg-surface-charcoal/40"
              }
            />
          );
        })}
      </div>
      <p className="mt-2 text-center text-[0.65rem] text-text-dim">Arrow keys or pad below</p>
      <div className="mt-2 grid grid-cols-3 gap-1 max-w-[8rem] mx-auto w-full">
        <span />
        <button type="button" className="arcade-pad-btn" onClick={() => turn({ x: 0, y: -1 })} aria-label="Up">
          ↑
        </button>
        <span />
        <button type="button" className="arcade-pad-btn" onClick={() => turn({ x: -1, y: 0 })} aria-label="Left">
          ←
        </button>
        <button type="button" className="arcade-pad-btn" onClick={() => turn({ x: 0, y: 1 })} aria-label="Down">
          ↓
        </button>
        <button type="button" className="arcade-pad-btn" onClick={() => turn({ x: 1, y: 0 })} aria-label="Right">
          →
        </button>
      </div>
      <button type="button" className="btn-secondary mt-3 w-full rounded-full py-2 text-xs" onClick={reset}>
        {gameOver ? "Play again" : running ? "Restart" : "Start"}
      </button>
    </div>
  );
}

function ReactionMini() {
  const [phase, setPhase] = useState<"idle" | "wait" | "go" | "early" | "done">("idle");
  const [message, setMessage] = useState("Tap start — wait for green");
  const [ms, setMs] = useState<number | null>(null);
  const [best, setBest] = useState<number | null>(null);
  const goAt = useRef(0);
  const timeoutRef = useRef<number | null>(null);

  const clearTimer = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const startRound = () => {
    clearTimer();
    setMs(null);
    setPhase("wait");
    setMessage("Wait for green…");
    const delay = 1200 + Math.random() * 2800;
    timeoutRef.current = window.setTimeout(() => {
      goAt.current = performance.now();
      setPhase("go");
      setMessage("Click!");
    }, delay);
  };

  const onPadClick = () => {
    if (phase === "idle" || phase === "done" || phase === "early") {
      startRound();
      return;
    }
    if (phase === "wait") {
      clearTimer();
      setPhase("early");
      setMessage("Too soon — tap to retry");
      return;
    }
    if (phase === "go") {
      const elapsed = Math.round(performance.now() - goAt.current);
      setMs(elapsed);
      setBest((b) => (b === null ? elapsed : Math.min(b, elapsed)));
      setPhase("done");
      setMessage(`${elapsed} ms — tap to go again`);
    }
  };

  useEffect(() => () => clearTimer(), []);

  const padClass =
    phase === "go"
      ? "border-chaldal-green bg-chaldal-green/25 text-chaldal-green shadow-[0_0_24px_rgb(39_201_109/0.35)]"
      : phase === "wait"
        ? "border-amber-500/40 bg-amber-500/10 text-amber-200"
        : phase === "early"
          ? "border-rose-400/40 bg-rose-500/10 text-rose-200"
          : "border-border-muted bg-surface-charcoal text-text-dim";

  return (
    <div className="flex flex-col rounded-lg border border-border-muted bg-ink-black p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="inline-flex items-center gap-1.5 font-mono-label text-[0.68rem] uppercase tracking-widest text-chaldal-green">
          <JournalSymbol name="bolt" />
          Reflex
        </p>
        <span className="font-mono-label text-[0.7rem] tabular-nums text-text-dim">
          {best !== null ? `Best ${best} ms` : "—"}
        </span>
      </div>
      <button
        type="button"
        onClick={onPadClick}
        className={`flex min-h-[10.5rem] w-full flex-col items-center justify-center gap-2 rounded-lg border-2 px-4 py-6 transition-[border-color,background-color,box-shadow] duration-300 ${padClass}`}
      >
        <span className="font-headline-md text-2xl text-white">
          {phase === "go" ? "NOW" : phase === "wait" ? "…" : phase === "early" ? "!" : "TAP"}
        </span>
        <span className="max-w-[14rem] text-center text-xs leading-relaxed text-inherit opacity-90">{message}</span>
        {ms !== null ? <span className="font-mono-label text-sm tabular-nums text-white">{ms} ms</span> : null}
      </button>
    </div>
  );
}

export function JournalLabArcade() {
  return (
    <div className="border-t border-border-muted/80 pt-4">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="font-mono-label text-mono-label inline-flex items-center gap-1.5 uppercase tracking-widest text-chaldal-green">
            <JournalSymbol name="stadia_controller" />
            Arcade break
          </p>
          <p className="mt-1 text-xs text-text-dim">Quick retro distractions — no account, just play.</p>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <SnakeMini />
        <ReactionMini />
      </div>
    </div>
  );
}
