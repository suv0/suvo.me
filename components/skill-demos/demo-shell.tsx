import type { DemoShellProps } from "./types";

const statusClass = {
  idle: "border-slate-500/20 bg-slate-950/55 text-slate-400",
  correct: "border-emerald-400/35 bg-emerald-500/10 text-emerald-200",
  incorrect: "border-rose-400/35 bg-rose-500/10 text-rose-200",
} satisfies Record<DemoShellProps["status"], string>;

export function DemoShell({
  title,
  eyebrow,
  instructions,
  score,
  round,
  total,
  status,
  statusText,
  onNext,
  children,
}: DemoShellProps) {
  return (
    <div className="flex w-full flex-col gap-3 rounded-lg border border-border-muted bg-ink-black p-3 md:p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-cyan-300/80">{eyebrow}</p>
          <h4 className="mt-1 text-base font-semibold text-white">{title}</h4>
        </div>
        <div className="rounded-full border border-slate-500/25 bg-slate-950/50 px-2.5 py-1 text-xs tabular-nums text-slate-300">
          {score}/{total}
        </div>
      </div>

      <p className="text-xs leading-relaxed text-slate-400">{instructions}</p>

      <div className="min-h-0 flex-1">{children}</div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-slate-500">
          Round <span className="tabular-nums text-slate-300">{round + 1}</span> of{" "}
          <span className="tabular-nums text-slate-300">{total}</span>
        </p>
        <div className="flex items-center gap-2">
          <p
            aria-live="polite"
            className={`min-h-8 rounded-full border px-3 py-1.5 text-xs font-medium ${statusClass[status]}`}
          >
            {statusText ?? "Choose an answer"}
          </p>
          {onNext ? (
            <button type="button" onClick={onNext} className="btn-secondary min-h-8 rounded-full px-3 py-1 text-xs">
              Next
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
