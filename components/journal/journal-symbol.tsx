import type { ReactNode } from "react";

const sizeClasses = {
  sm: "text-[1.05rem]",
  md: "text-2xl",
  lg: "text-3xl",
} as const;

type JournalSymbolProps = {
  name: string;
  className?: string;
  size?: keyof typeof sizeClasses;
};

/** Material Symbol wrapper — one accent family across the journal UI. */
export function JournalSymbol({ name, className = "", size = "sm" }: JournalSymbolProps) {
  return (
    <span className={`material-symbols-outlined leading-none ${sizeClasses[size]} ${className}`} aria-hidden>
      {name}
    </span>
  );
}

type JournalSectionEyebrowProps = {
  icon: string;
  children: ReactNode;
  className?: string;
};

/** Green mono section label with a leading icon. */
export function JournalSectionEyebrow({ icon, children, className = "" }: JournalSectionEyebrowProps) {
  return (
    <h2
      className={`font-mono-label text-mono-label inline-flex items-center gap-3 uppercase tracking-widest text-chaldal-green ${className}`}
    >
      <JournalSymbol name={icon} className="text-chaldal-green" />
      {children}
    </h2>
  );
}

type JournalMetaRowProps = {
  icon: string;
  children: ReactNode;
  className?: string;
};

const iconTextGap = "gap-3";
const iconSlotClass =
  "flex size-6 shrink-0 items-center justify-center [&_.material-symbols-outlined]:text-[1.15rem]";

/** Small icon + text row (location, dates, etc.). */
export function JournalMetaRow({ icon, children, className = "" }: JournalMetaRowProps) {
  return (
    <span className={`inline-flex items-center ${iconTextGap} font-mono-label text-mono-label ${className}`}>
      <span className={iconSlotClass} aria-hidden>
        <JournalSymbol name={icon} className="text-chaldal-green/85" />
      </span>
      <span className="min-w-0">{children}</span>
    </span>
  );
}

/** Headline-scale icon + label (company name, role, etc.). */
export function JournalIconLabel({
  icon,
  children,
  className = "",
}: {
  icon: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center ${iconTextGap} ${className}`}>
      <span className={`${iconSlotClass} [&_.material-symbols-outlined]:text-2xl`} aria-hidden>
        <JournalSymbol name={icon} className="text-chaldal-green" size="md" />
      </span>
      <span className="min-w-0">{children}</span>
    </span>
  );
}
