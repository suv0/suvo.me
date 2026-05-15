"use client";

import { motion } from "framer-motion";
import { motionEaseSoft } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <div className="section-heading space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <motion.p
          className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/90"
          initial={reduceMotion ? false : { opacity: 1, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.85 }}
          transition={{ duration: 0.64, ease: motionEaseSoft }}
        >
          {eyebrow}
        </motion.p>
        <motion.span
          className="section-heading-line hidden h-px flex-1 min-w-[6rem] origin-left sm:block"
          aria-hidden
          initial={reduceMotion ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.85 }}
          transition={{ duration: 0.78, ease: motionEaseSoft, delay: reduceMotion ? 0 : 0.06 }}
        />
      </div>
      <motion.h2
        className="max-w-4xl text-balance text-xl font-semibold tracking-tight text-white sm:text-2xl md:text-3xl lg:text-[2rem] lg:leading-snug"
        initial={reduceMotion ? false : { opacity: 1, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.65 }}
        transition={{ duration: 0.72, ease: motionEaseSoft, delay: reduceMotion ? 0 : 0.05 }}
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          className="max-w-3xl text-pretty text-sm text-slate-300 sm:text-base"
          initial={reduceMotion ? false : { opacity: 1, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.65 }}
          transition={{ duration: 0.72, ease: motionEaseSoft, delay: reduceMotion ? 0 : 0.1 }}
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  );
}
