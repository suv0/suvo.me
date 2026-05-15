"use client";

import { Suspense, useEffect, useState } from "react";
import { skillDemoLazyById, skillDemoRegistry } from "./registry";

function DemoPlaceholder() {
  return (
    <div className="skill-bento-fill flex min-h-[16.5rem] flex-col justify-center gap-3 rounded-2xl border border-slate-500/15 p-4 text-center sm:min-h-[17.5rem]">
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-cyan-300/80">Frontend lab</p>
      <p className="text-sm leading-relaxed text-slate-400">
        A tiny interactive skill demo loads after mount so every visit can get a different challenge without changing the
        server-rendered markup.
      </p>
      <div className="mx-auto flex max-w-xs flex-wrap justify-center gap-2">
        {["TypeScript", "React", "Tailwind", "Web APIs"].map((label) => (
          <span key={label} className="rounded-full border border-slate-500/30 bg-slate-900/60 px-2.5 py-1 text-xs text-slate-300">
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function FrontendSkillDemo() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setSelectedIndex(Math.floor(Math.random() * skillDemoRegistry.length));
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const selected = selectedIndex === null ? null : skillDemoRegistry[selectedIndex];
  const Demo = selected ? skillDemoLazyById[selected.id] : null;

  return (
    <div className="flex min-h-[16.5rem] flex-col sm:min-h-[17.5rem]" data-skill-demo={selected?.id ?? "loading"}>
      {Demo ? (
        <Suspense fallback={<DemoPlaceholder />}>
          <Demo />
        </Suspense>
      ) : (
        <DemoPlaceholder />
      )}
    </div>
  );
}
