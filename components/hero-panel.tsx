"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useSyncExternalStore } from "react";
import { motionEaseSoft } from "@/lib/motion";
import { getElapsedYears, getHeroTagline, profile, type HeroStat } from "@/lib/portfolio-data";

const staggerParent = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.08,
    },
  },
};

const rise = {
  hidden: { opacity: 1, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.76, ease: motionEaseSoft },
  },
};

const profileMotion = {
  hidden: { opacity: 1, scale: 0.98, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.84, ease: motionEaseSoft, delay: 0.4 },
  },
};

/** Large editorial hero portrait — matches `sizes` on `Image` below. */
const heroPortraitSizes =
  "(max-width: 639px) 88vw, (max-width: 1023px) 360px, (max-width: 1279px) 400px, (max-width: 1535px) 440px, 500px";
const MIN_DISPLAY_YEARS = 1;

function HeroPortraitFrame() {
  return (
    <div className="relative w-full max-w-[min(88vw,19rem)] sm:max-w-[21rem] lg:max-w-[min(420px,40vw)] xl:max-w-[min(460px,38vw)] 2xl:max-w-[min(500px,36vw)]">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 rounded-[2.75rem] bg-gradient-to-tr from-cyan-500/30 via-transparent to-violet-500/25 opacity-90 blur-3xl sm:-inset-10 lg:-inset-12"
      />
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.75rem] shadow-[0_24px_70px_rgb(2_6_23_0.72)] ring-1 ring-cyan-300/35 sm:rounded-[2rem]">
        <Image
          src={profile.profileImage}
          alt={`${profile.name} — profile image`}
          fill
          priority
          quality={90}
          sizes={heroPortraitSizes}
          className="object-cover object-[center_16%]"
        />
      </div>
    </div>
  );
}

function HeroStatChip({ stat, currentYear }: { stat: HeroStat; currentYear: number }) {
  const value =
    "startYear" in stat
      ? `${Math.max(MIN_DISPLAY_YEARS, getElapsedYears(stat.startYear, currentYear))}${stat.yearSuffix ?? ""}`
      : stat.value;

  return (
    <div className="stat-chip">
      <span className="stat-chip-value">{value}</span>
      {stat.href ? (
        <a
          className="stat-chip-label underline-offset-4 hover:underline"
          href={stat.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${stat.label} (opens in a new tab)`}
        >
          {stat.label}
        </a>
      ) : (
        <span className="stat-chip-label">{stat.label}</span>
      )}
    </div>
  );
}

export function HeroPanel({ currentYear }: { currentYear: number }) {
  const reduceMotion = useReducedMotion();
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const heroTagline = getHeroTagline(profile.name, currentYear);

  const staticHero = (
    <div className="glass-panel glass-panel--hero relative overflow-hidden rounded-3xl p-5 sm:rounded-[2rem] sm:p-8 lg:p-12">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="hero-orb hero-orb--a" />
        <div className="hero-orb hero-orb--b" />
        <div className="hero-orb hero-orb--c" />
      </div>

      <div className="relative grid min-w-0 items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-12 xl:gap-16">
        <div className="min-w-0 space-y-0 order-2 lg:order-none lg:max-w-xl xl:max-w-2xl lg:justify-self-start">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-cyan-300/95 sm:text-xs sm:tracking-[0.32em]">
            {profile.location}
          </p>
          <h1 className="mt-3 max-w-4xl text-balance font-semibold leading-[1.08] tracking-tight text-white text-[clamp(1.75rem,5.2vw,3.25rem)] sm:mt-4 sm:leading-[1.05] lg:max-w-xl xl:max-w-2xl">
            {profile.name}
            <span className="hero-title-gradient mt-2 block bg-gradient-to-r from-cyan-300 via-sky-200 to-violet-300 bg-clip-text text-transparent">
              {profile.title}
            </span>
          </h1>
          <p className="mt-5 max-w-3xl text-pretty text-base leading-relaxed text-slate-200 sm:text-lg">{heroTagline}</p>
          <p className="mt-2 max-w-full break-words font-mono text-[0.7rem] font-medium uppercase leading-relaxed tracking-[0.14em] text-slate-400 sm:text-xs sm:tracking-[0.2em] md:text-[0.8rem] md:tracking-[0.24em]">
            {profile.roleStack}
          </p>
          <p className="mt-5 max-w-3xl text-pretty text-sm leading-relaxed text-slate-300 sm:text-base">{profile.heroSummary}</p>

          <div className="mt-6 flex flex-wrap gap-2.5 sm:mt-7 sm:gap-3">
            {profile.heroStats.map((stat) => (
              <HeroStatChip key={stat.label} stat={stat} currentYear={currentYear} />
            ))}
          </div>

          <div className="mt-8 flex w-full flex-col gap-2.5 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 md:gap-4">
            <a className="btn-primary w-full sm:w-auto" href={`mailto:${profile.email}`}>
              Start a conversation
            </a>
            <a className="btn-secondary w-full sm:w-auto" href={profile.cvPdfPath} download>
              Download CV
            </a>
            <a className="btn-secondary w-full sm:w-auto" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className="btn-secondary w-full sm:w-auto" href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </div>

        <div className="profile-shell relative order-1 flex justify-center pb-3 pt-0 sm:pb-5 lg:order-none lg:flex lg:justify-end lg:pb-0 lg:pt-0">
          <HeroPortraitFrame />
        </div>
      </div>
    </div>
  );

  if (!hydrated || reduceMotion) {
    return staticHero;
  }

  return (
    <motion.div
      className="glass-panel glass-panel--hero relative overflow-hidden rounded-3xl p-5 sm:rounded-[2rem] sm:p-8 lg:p-12"
      initial={{ opacity: 1, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.95, ease: motionEaseSoft }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="hero-orb hero-orb--a" />
        <div className="hero-orb hero-orb--b" />
        <div className="hero-orb hero-orb--c" />
      </div>

      <div className="relative grid min-w-0 items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-12 xl:gap-16">
        <motion.div
          className="min-w-0 space-y-0 order-2 lg:order-none lg:max-w-xl xl:max-w-2xl lg:justify-self-start"
          variants={staggerParent}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-cyan-300/95 sm:text-xs sm:tracking-[0.32em]"
            variants={rise}
          >
            {profile.location}
          </motion.p>
          <motion.h1
            className="mt-3 max-w-4xl text-balance font-semibold leading-[1.08] tracking-tight text-white text-[clamp(1.75rem,5.2vw,3.25rem)] sm:mt-4 sm:leading-[1.05] lg:max-w-xl xl:max-w-2xl"
            variants={rise}
          >
            {profile.name}
            <span className="hero-title-gradient mt-2 block bg-gradient-to-r from-cyan-300 via-sky-200 to-violet-300 bg-clip-text text-transparent">
              {profile.title}
            </span>
          </motion.h1>
          <motion.p
            className="mt-5 max-w-3xl text-pretty text-base leading-relaxed text-slate-200 sm:text-lg"
            variants={rise}
          >
            {heroTagline}
          </motion.p>
          <motion.p
            className="mt-2 max-w-full break-words font-mono text-[0.7rem] font-medium uppercase leading-relaxed tracking-[0.14em] text-slate-400 sm:text-xs sm:tracking-[0.2em] md:text-[0.8rem] md:tracking-[0.24em]"
            variants={rise}
          >
            {profile.roleStack}
          </motion.p>
          <motion.p
            className="mt-5 max-w-3xl text-pretty text-sm leading-relaxed text-slate-300 sm:text-base"
            variants={rise}
          >
            {profile.heroSummary}
          </motion.p>

          <motion.div className="mt-6 flex flex-wrap gap-2.5 sm:mt-7 sm:gap-3" variants={rise}>
            {profile.heroStats.map((stat) => (
              <HeroStatChip key={stat.label} stat={stat} currentYear={currentYear} />
            ))}
          </motion.div>

          <motion.div
            className="mt-8 flex w-full flex-col gap-2.5 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 md:gap-4"
            variants={rise}
          >
            <a className="btn-primary w-full sm:w-auto" href={`mailto:${profile.email}`}>
              Start a conversation
            </a>
            <a className="btn-secondary w-full sm:w-auto" href={profile.cvPdfPath} download>
              Download CV
            </a>
            <a className="btn-secondary w-full sm:w-auto" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className="btn-secondary w-full sm:w-auto" href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="profile-shell relative order-1 flex justify-center pb-3 pt-0 sm:pb-5 lg:order-none lg:flex lg:justify-end lg:pb-0 lg:pt-0"
          variants={profileMotion}
          initial="hidden"
          animate="visible"
        >
          <HeroPortraitFrame />
        </motion.div>
      </div>
    </motion.div>
  );
}
