"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="journal-site flex min-h-screen flex-col items-center justify-center gap-6 px-grid-margin text-center">
      <p className="font-mono-label text-mono-label uppercase tracking-widest text-chaldal-green">Something went wrong</p>
      <h1 className="font-headline-lg text-headline-lg max-w-md text-white">This page hit an unexpected error.</h1>
      <p className="font-body-md text-body-md max-w-md text-text-dim">
        You can try again, or return to the homepage.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex min-h-[3rem] items-center justify-center bg-chaldal-green px-6 py-3 font-bold text-ink-black"
        >
          Try again
        </button>
        <Link href="/" className="font-mono-label text-mono-label text-text-dim hover:text-chaldal-green">
          Back to home
        </Link>
      </div>
    </main>
  );
}
