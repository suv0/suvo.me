/**
 * Stitch-style slow, symmetric hovers for the journal homepage.
 * Keep durations in sync with `app/globals.css` motion tokens.
 */
const journalEase = "ease-[cubic-bezier(0.45,0,0.55,1)]";
const journalUiDuration = "duration-[1250ms]";
const journalBtnDuration = "duration-[480ms]";
const journalBentoDuration = "duration-[2000ms]";
const journalMediaDuration = "duration-[700ms]";

/** Product engineering stack bento — slow border + lift. */
export const journalBentoCardMotion = [
  journalBentoDuration,
  journalEase,
  "transition-[border-color,transform,box-shadow]",
  "hover:border-chaldal-green",
  "hover:-translate-y-0.5",
].join(" ");

export const journalLinkMotion = [
  "group/link",
  journalUiDuration,
  journalEase,
  "transition-[color,gap]",
  "hover:text-chaldal-green",
  "hover:gap-[0.65rem]",
].join(" ");

export const journalLinkIconMotion = [
  journalUiDuration,
  journalEase,
  "transition-transform",
  "group-hover/link:translate-x-0.5",
  "group-hover/link:-translate-y-0.5",
].join(" ");

export const journalTitleMotion = [
  journalUiDuration,
  journalEase,
  "transition-colors",
  "group-hover:text-chaldal-green",
].join(" ");

export const journalNavLinkMotion = [
  journalUiDuration,
  journalEase,
  "transition-[color,border-color]",
  "hover:text-on-surface",
].join(" ");

export const journalBtnMotion = [
  "group/btn",
  journalBtnDuration,
  journalEase,
  "transition-[background-color,color]",
  "hover:bg-white",
].join(" ");

export const journalBtnIconMotion = [
  journalBtnDuration,
  journalEase,
  "transition-transform",
  "group-hover/btn:translate-x-1",
].join(" ");

/** Outlined actions — Download CV, LinkedIn, GitHub (hero + footer). */
export const journalBtnSecondaryMotion = [
  journalBtnDuration,
  journalEase,
  "transition-[border-color,background-color,color,box-shadow]",
  "border border-border-muted bg-surface-charcoal/90 text-on-surface",
  "hover:border-chaldal-green hover:bg-journal-mid hover:text-white hover:shadow-[0_8px_24px_rgb(0_0_0/0.35)]",
].join(" ");

export const journalProfileLinkMotion = [
  journalBtnDuration,
  journalEase,
  "transition-[color,border-color,background-color]",
  "border border-border-muted/80 bg-surface-charcoal/60 px-4 py-2 text-on-surface",
  "hover:border-chaldal-green hover:bg-journal-mid hover:text-chaldal-green",
].join(" ");

/** Full-bleed hero portrait layer. */
export const journalHeroPortraitMotion = [
  "absolute inset-0",
  journalMediaDuration,
  journalEase,
  "transition-transform",
  "group-hover/hero:scale-[1.02]",
].join(" ");

export const journalMediaFrameMotion = [
  journalUiDuration,
  journalEase,
  "transition-[border-color]",
  "group-hover:border-chaldal-green",
].join(" ");

export const journalMediaZoomMotion = [
  "absolute inset-0",
  journalMediaDuration,
  journalEase,
  "transition-transform",
  "group-hover:scale-105",
].join(" ");

export const journalMediaImageMotion = [
  "object-cover opacity-60",
  journalMediaDuration,
  journalEase,
  "transition-opacity",
  "group-hover:opacity-85",
].join(" ");

export const journalExperienceBorderMotion = [
  journalUiDuration,
  journalEase,
  "transition-[border-color]",
  "hover:border-chaldal-green",
].join(" ");
