"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const LANES = 3 as const;
const CATCH_Y = 82;
const SPAWN_MS_BASE = 1050;
const SPAWN_MS_MIN = 500;
const FALL_PER_SEC = 54;

type Lane = 0 | 1 | 2;

type TokenDef = { label: string; good: boolean; accent: string };

const GOOD_POOL: TokenDef[] = [
  { label: "TypeScript", good: true, accent: "ring-sky-400/50 text-sky-200" },
  { label: "React", good: true, accent: "ring-cyan-400/50 text-cyan-200" },
  { label: "Next.js", good: true, accent: "ring-slate-300/40 text-slate-100" },
  { label: "Tailwind", good: true, accent: "ring-teal-400/50 text-teal-200" },
  { label: "a11y", good: true, accent: "ring-violet-400/50 text-violet-200" },
];

const BAD_POOL: TokenDef[] = [
  { label: "any", good: false, accent: "ring-rose-500/50 text-rose-200" },
  { label: "var", good: false, accent: "ring-amber-500/50 text-amber-200" },
];

type Token = {
  id: number;
  lane: Lane;
  y: number;
  def: TokenDef;
  settled: boolean;
};

type Snap = { tokens: Token[]; score: number; combo: number };

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

function randomLane(): Lane {
  return Math.floor(Math.random() * LANES) as Lane;
}

function activeTokens(tokens: Token[]): Token[] {
  return tokens.filter((t) => !t.settled);
}

function canSpawnLane(tokens: Token[], lane: Lane): boolean {
  return !activeTokens(tokens).some((t) => t.lane === lane && t.y > 26);
}

function pickSpawnDef(): TokenDef {
  return Math.random() < 0.72 ? pick(GOOD_POOL) : pick(BAD_POOL);
}

function tickSnap(prev: Snap, dt: number, basketLane: Lane, spawnAccMs: number, nextId: () => number): { snap: Snap; spawnAccMs: number } {
  const dy = FALL_PER_SEC * dt;
  let { score, combo } = prev;
  const working = prev.tokens.map((t) => ({ ...t }));

  for (let i = 0; i < working.length; i++) {
    const tok = working[i]!;
    if (tok.settled) continue;
    const y0 = tok.y;
    const y = y0 + dy;

    if (y >= CATCH_Y && y0 < CATCH_Y && tok.lane === basketLane) {
      if (tok.def.good) {
        score += 10 + Math.min(12, combo * 2);
        combo += 1;
      } else {
        score = Math.max(0, score - 12);
        combo = 0;
      }
      working[i] = { ...tok, y: CATCH_Y, settled: true };
      continue;
    }

    if (y >= 100) {
      if (tok.def.good) {
        score = Math.max(0, score - 4);
        combo = 0;
      } else {
        score += 5;
        combo += 1;
      }
      working[i] = { ...tok, y: 100, settled: true };
      continue;
    }

    working[i] = { ...tok, y };
  }

  const pruned = working.filter((t) => !t.settled);

  let acc = spawnAccMs + dt * 1000;
  const interval = Math.max(SPAWN_MS_MIN, SPAWN_MS_BASE - Math.min(380, score * 2.2));
  const withSpawn = [...pruned];
  if (acc >= interval) {
    let lane = randomLane();
    let tries = 0;
    while (!canSpawnLane(withSpawn, lane) && tries < 10) {
      lane = randomLane();
      tries++;
    }
    if (canSpawnLane(withSpawn, lane)) {
      withSpawn.push({
        id: nextId(),
        lane,
        y: -6,
        def: pickSpawnDef(),
        settled: false,
      });
      acc = 0;
    } else {
      acc = Math.max(0, acc - interval * 0.35);
    }
  }

  return { snap: { tokens: withSpawn, score, combo }, spawnAccMs: acc };
}

export function StackCatchMini() {
  const [playing, setPlaying] = useState(false);
  const [basket, setBasket] = useState<Lane>(1);
  const [snap, setSnap] = useState<Snap>({ tokens: [], score: 0, combo: 0 });

  const basketRef = useRef<Lane>(1);
  const spawnAccRef = useRef(0);
  const idRef = useRef(0);
  const playingRef = useRef(false);
  /** Synced from `matchMedia` so the rAF loop stops if the user enables reduced motion mid-run. */
  const prefersReducedMotionRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      prefersReducedMotionRef.current = mq.matches;
      if (mq.matches && playingRef.current) {
        playingRef.current = false;
        setPlaying(false);
      }
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    basketRef.current = basket;
  }, [basket]);

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  const stop = useCallback(() => {
    playingRef.current = false;
    setPlaying(false);
  }, []);

  const start = useCallback(() => {
    idRef.current = 0;
    spawnAccRef.current = 0;
    setSnap({ tokens: [], score: 0, combo: 0 });
    setBasket(1);
    basketRef.current = 1;
    playingRef.current = true;
    setPlaying(true);
  }, []);

  const move = useCallback((dir: -1 | 1) => {
    setBasket((b) => {
      const next = Math.min(LANES - 1, Math.max(0, b + dir)) as Lane;
      basketRef.current = next;
      return next;
    });
  }, []);

  useEffect(() => {
    if (!playing || prefersReducedMotionRef.current) return;

    let raf = 0;
    let last = performance.now();
    let alive = true;

    const frame = (now: number) => {
      if (!alive || !playingRef.current || prefersReducedMotionRef.current) return;
      const dt = Math.min(0.055, (now - last) / 1000);
      last = now;

      setSnap((prev) => {
        const { snap, spawnAccMs } = tickSnap(prev, dt, basketRef.current, spawnAccRef.current, () => ++idRef.current);
        spawnAccRef.current = spawnAccMs;
        return snap;
      });

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
    };
  }, [playing]);

  useEffect(() => {
    if (!playing) return;
    const onKey = (e: KeyboardEvent) => {
      if (prefersReducedMotionRef.current) return;
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        e.preventDefault();
        move(-1);
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        e.preventDefault();
        move(1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [playing, move]);

  const { tokens, score, combo } = snap;
  const falling = activeTokens(tokens);

  return (
    <div className="mt-auto flex min-h-[7.5rem] flex-1 flex-col gap-2 sm:min-h-[8.5rem]">
      {/* Same DOM for SSR + first client paint; visibility is CSS-only (no hydration mismatch, no Play flash). */}
      <div className="flex min-h-0 flex-1 flex-col gap-2 motion-reduce:hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
          <span className="font-medium uppercase tracking-[0.16em] text-slate-500">Stack catch</span>
          <span aria-live="polite" className="tabular-nums text-slate-300">
            Score <span className="text-cyan-300">{score}</span>
            {combo > 2 ? <span className="ml-2 text-violet-300/90">combo {combo}</span> : null}
          </span>
        </div>

        {!playing ? (
          <div className="skill-bento-fill flex flex-1 flex-col items-center justify-center gap-3 rounded-2xl border border-slate-500/15 px-4 py-5">
            <p className="max-w-sm text-center text-sm leading-relaxed text-slate-400">
              Catch <strong className="text-slate-200">TypeScript</strong>,{" "}
              <strong className="text-slate-200">React</strong>,{" "}
              <strong className="text-slate-200">Next.js</strong>,{" "}
              <strong className="text-slate-200">Tailwind</strong>, and{" "}
              <strong className="text-slate-200">a11y</strong>. Let <code className="text-rose-300/90">any</code> /{" "}
              <code className="text-amber-300/90">var</code> fall through for a bonus — grabbing them costs points.
            </p>
            <button type="button" onClick={start} className="btn-primary rounded-full px-5 py-2 text-sm font-semibold">
              Play
            </button>
            <p className="text-[0.7rem] text-slate-500">← → or A D · tap lanes below</p>
          </div>
        ) : (
          <>
            <div
              role="application"
              aria-label="Stack catch: move basket to catch good tokens"
              className="relative isolate min-h-[9.5rem] flex-1 overflow-hidden rounded-2xl border border-slate-500/20 bg-slate-950/70 shadow-inner shadow-black/40 sm:min-h-[10.5rem]"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgb(56_189_248/0.08),transparent)]" />
              <div className="pointer-events-none absolute inset-x-0 top-0 bottom-10 grid grid-cols-3 gap-px bg-slate-800/25" />

              <div className="absolute inset-x-0 top-0 bottom-10">
                {falling.map((t) => (
                  <div
                    key={t.id}
                    className="pointer-events-none absolute flex justify-center px-0.5"
                    style={{
                      left: `${(t.lane / LANES) * 100}%`,
                      width: `${100 / LANES}%`,
                      top: `${t.y}%`,
                      transform: "translateY(-50%)",
                    }}
                  >
                    <span
                      className={`max-w-full truncate rounded-lg border border-slate-600/50 bg-slate-900/90 px-1.5 py-0.5 text-[0.62rem] font-semibold shadow-md ring-1 backdrop-blur-sm sm:px-2 sm:py-1 sm:text-xs ${t.def.accent}`}
                    >
                      {t.def.label}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="pointer-events-none absolute inset-x-3 border-t border-dashed border-cyan-500/25"
                style={{ top: `${CATCH_Y}%` }}
              />

              <div className="absolute inset-x-0 bottom-0 grid h-10 grid-cols-3 gap-1 px-1 pb-1">
                {([0, 1, 2] as const).map((lane) => (
                  <button
                    key={lane}
                    type="button"
                    aria-label={`Basket lane ${lane + 1}`}
                    onClick={() => {
                      setBasket(lane);
                      basketRef.current = lane;
                    }}
                    className={`rounded-lg border text-[0.65rem] font-semibold uppercase tracking-wider transition-colors sm:text-xs ${
                      basket === lane
                        ? "border-cyan-400/60 bg-cyan-500/20 text-cyan-100 shadow-[0_0_20px_rgb(34_211_238/0.25)]"
                        : "border-slate-600/40 bg-slate-900/50 text-slate-500 hover:border-slate-500/60 hover:text-slate-300"
                    }`}
                  >
                    {basket === lane ? "◉" : "○"}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="flex gap-2">
                <button type="button" aria-label="Move left" onClick={() => move(-1)} className="btn-secondary rounded-lg px-3 py-1.5 text-sm">
                  ←
                </button>
                <button type="button" aria-label="Move right" onClick={() => move(1)} className="btn-secondary rounded-lg px-3 py-1.5 text-sm">
                  →
                </button>
              </div>
              <button
                type="button"
                onClick={stop}
                className="text-xs text-slate-500 underline-offset-2 hover:text-slate-300 hover:underline"
              >
                End run
              </button>
            </div>
          </>
        )}
      </div>

      <div className="skill-bento-fill hidden min-h-[6.5rem] flex-1 flex-col justify-center gap-3 rounded-2xl border border-slate-500/15 px-4 py-4 motion-reduce:flex sm:min-h-[7rem]">
        <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Stack snapshot</p>
        <p className="text-center text-sm leading-relaxed text-slate-400">
          TypeScript, React, Next.js, Tailwind, and accessible UI — the same tools this site uses. With reduced motion
          enabled, the mini-game stays off.
        </p>
        <ul className="flex flex-wrap justify-center gap-2">
          {["TS", "React", "Next", "Tailwind", "a11y"].map((x) => (
            <li
              key={x}
              className="rounded-full border border-slate-500/30 bg-slate-900/60 px-2.5 py-1 text-xs font-medium text-slate-200"
            >
              {x}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
