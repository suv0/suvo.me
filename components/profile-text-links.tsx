import type { ReactNode } from "react";

import { DWETECH_URL, FREELANCER_PROFILE_URL, foundedProducts, getExperienceUrl } from "@/lib/portfolio-data";

const externalLinkClassName =
  "text-inherit underline decoration-cyan-300/50 underline-offset-4 transition-colors hover:text-cyan-200 hover:decoration-cyan-200";

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const profileTextTokens = [
  "AllChrono",
  "Dwetech",
  "Freelancer.com",
  "freelancing",
  ...foundedProducts.map((item) => item.name),
].sort((a, b) => b.length - a.length);

const profileTextSplitPattern = new RegExp(`(${profileTextTokens.map(escapeRegExp).join("|")})`);

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

type AllChronoLinkProps = {
  className?: string;
};

export function AllChronoLink({ className }: AllChronoLinkProps) {
  const href = getExperienceUrl("AllChrono");
  if (!href) return "AllChrono";
  return (
    <ExternalTextLink href={href} className={className} ariaLabel="AllChrono (opens in a new tab)">
      AllChrono
    </ExternalTextLink>
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

function FoundedProductLink({ name, href }: { name: string; href: string }) {
  return (
    <a href={href} className={externalLinkClassName} aria-label={`${name}, jump to Founded on this page`}>
      {name}
    </a>
  );
}

function linkProfileTextSegment(part: string, index: number): ReactNode {
  switch (part) {
    case "AllChrono":
      return <AllChronoLink key={index} />;
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
    default: {
      const founded = foundedProducts.find((item) => item.name === part);
      if (founded) {
        return <FoundedProductLink key={index} name={founded.name} href={`#${founded.id}`} />;
      }
      return part;
    }
  }
}

/** Link company and founded-product mentions in portfolio copy. */
export function linkProfileText(text: string): ReactNode {
  if (!profileTextTokens.some((token) => text.includes(token))) {
    return text;
  }

  return text.split(profileTextSplitPattern).map(linkProfileTextSegment);
}
