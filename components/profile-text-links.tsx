import type { ReactNode } from "react";

import { DWETECH_URL, FREELANCER_PROFILE_URL } from "@/lib/portfolio-data";

const externalLinkClassName =
  "text-inherit underline decoration-cyan-300/50 underline-offset-4 transition-colors hover:text-cyan-200 hover:decoration-cyan-200";

const profileTextSplitPattern = /(Dwetech|Freelancer\.com|freelancing)/;

type ExternalLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel: string;
};

function ExternalTextLink({ href, children, className, ariaLabel }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={className ?? externalLinkClassName}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}

type DwetechLinkProps = {
  className?: string;
};

export function DwetechLink({ className }: DwetechLinkProps) {
  return (
    <ExternalTextLink href={DWETECH_URL} className={className} ariaLabel="Dwetech (opens in a new tab)">
      Dwetech
    </ExternalTextLink>
  );
}

type FreelancerLinkProps = {
  children: ReactNode;
  className?: string;
};

export function FreelancerLink({ children, className }: FreelancerLinkProps) {
  return (
    <ExternalTextLink
      href={FREELANCER_PROFILE_URL}
      className={className}
      ariaLabel="Freelancer profile (opens in a new tab)"
    >
      {children}
    </ExternalTextLink>
  );
}

function linkProfileTextSegment(part: string, index: number): ReactNode {
  switch (part) {
    case "Dwetech":
      return <DwetechLink key={index} />;
    case "Freelancer.com":
      return (
        <FreelancerLink key={index}>
          Freelancer.com
        </FreelancerLink>
      );
    case "freelancing":
      return (
        <FreelancerLink key={index}>
          freelancing
        </FreelancerLink>
      );
    default:
      return part;
  }
}

/** Link Dwetech and Freelancer mentions in portfolio copy. */
export function linkProfileText(text: string): ReactNode {
  if (
    !text.includes("Dwetech") &&
    !text.includes("Freelancer.com") &&
    !text.includes("freelancing")
  ) {
    return text;
  }

  return text.split(profileTextSplitPattern).map(linkProfileTextSegment);
}

/** @deprecated Use `linkProfileText` */
export const linkDwetechInText = linkProfileText;
