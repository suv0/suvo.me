import Link from "next/link";

export default function NotFound() {
  return (
    <main className="journal-site flex min-h-screen flex-col items-center justify-center gap-6 px-grid-margin text-center">
      <p className="font-mono-label text-mono-label uppercase tracking-widest text-chaldal-green">Not found</p>
      <h1 className="font-headline-lg text-headline-lg max-w-md text-white">This page is not here.</h1>
      <p className="font-body-md text-body-md max-w-md text-text-dim">It may have moved, or it was never published.</p>
      <Link href="/" className="font-mono-label text-mono-label text-text-dim hover:text-chaldal-green">
        Back to home
      </Link>
    </main>
  );
}
