const pillClass =
  "inline-flex items-center border border-border-muted bg-ink-black px-2 py-1 font-mono-label text-[0.62rem] uppercase tracking-[0.12em] text-text-dim";

export function PreciousKeyDiagram() {
  return (
    <figure
      aria-label="Precious failover: one prec_ key, then Groq, Gemini, OpenRouter"
      className="flex flex-col gap-3 border border-border-muted bg-ink-black/50 p-4 md:p-5"
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-chaldal-green/60 bg-chaldal-green/10 font-mono-label text-[0.65rem] text-chaldal-green"
        >
          prec_
        </span>
        <div>
          <p className="font-mono-label text-[0.68rem] uppercase tracking-[0.16em] text-chaldal-green">One key</p>
          <p className="font-body-md text-body-md text-text-dim">Rules every LLM you add</p>
        </div>
      </div>
      <ol className="flex flex-wrap items-center gap-2">
        <li className={`${pillClass} border-border-muted/80 text-text-dim/70 line-through`}>Groq</li>
        <li aria-hidden className="font-mono-label text-[0.62rem] text-chaldal-green">
          →
        </li>
        <li className={`${pillClass} border-chaldal-green/40 text-chaldal-green`}>Gemini</li>
        <li aria-hidden className="font-mono-label text-[0.62rem] text-text-dim">
          →
        </li>
        <li className={pillClass}>OpenRouter</li>
      </ol>
      <figcaption className="font-mono-label text-[0.62rem] uppercase tracking-[0.14em] text-text-dim">
        Rate limited? Next provider. Context stays.
      </figcaption>
    </figure>
  );
}

export function PrsmAnglesDiagram() {
  const beams = [
    { id: "correctness", label: "Correctness" },
    { id: "nitpick", label: "Nitpick" },
    { id: "advocate", label: "Devil's advocate" },
  ] as const;

  return (
    <figure
      aria-label="PRism specialist passes merge into one review and never auto-post to GitHub"
      className="flex flex-col gap-3 border border-border-muted bg-ink-black/50 p-4 md:p-5"
    >
      <ul className="grid grid-cols-3 gap-2">
        {beams.map((beam) => (
          <li
            key={beam.id}
            className="flex min-h-[3.25rem] items-center justify-center border border-chaldal-green/25 bg-chaldal-green/10 px-1.5 text-center font-mono-label text-[0.58rem] uppercase tracking-[0.1em] text-chaldal-green"
          >
            {beam.label}
          </li>
        ))}
      </ul>
      <p aria-hidden className="text-center font-mono-label text-[0.7rem] text-chaldal-green">
        ↓ ↓ ↓
      </p>
      <div className="border border-border-muted bg-surface-charcoal px-3 py-2.5 text-center">
        <p className="font-mono-label text-[0.68rem] uppercase tracking-[0.16em] text-white">One triage queue</p>
        <p className="font-mono-label mt-1 text-[0.62rem] uppercase tracking-[0.12em] text-text-dim">
          Never auto-posts
        </p>
      </div>
    </figure>
  );
}

export function FoundedDefaultDiagram({ name }: { name: string }) {
  return (
    <figure
      aria-hidden
      className="flex flex-col items-center justify-center border border-border-muted bg-ink-black/50 px-4 py-8"
    >
      <p className="font-mono-label text-[0.72rem] uppercase tracking-[0.16em] text-chaldal-green">{name}</p>
    </figure>
  );
}
