import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/** Production apex host only — avoids rewriting preview (*.vercel.app) or arbitrary www hosts. */
const CANONICAL_HOST = "suvo.me";
const CANONICAL_ORIGIN = `https://${CANONICAL_HOST}`;

/**
 * Only **http → https** on the apex here. Do **not** redirect `www` → apex in app code: Vercel Domains
 * often sends **apex → www** (307); a second www→apex (301) causes an infinite loop. Configure
 * **`www` → apex** in Vercel (or a single Cloudflare redirect) instead.
 */
export function proxy(request: NextRequest) {
  const rawHost = request.headers.get("host") ?? "";
  const host = rawHost.split(":")[0]?.toLowerCase() ?? "";
  const proto = request.headers.get("x-forwarded-proto");
  const isLocal = host === "localhost" || host === "127.0.0.1";

  const isApexInsecure = !isLocal && host === CANONICAL_HOST && proto === "http";

  if (!isApexInsecure) {
    return NextResponse.next();
  }

  const destination = new URL(
    `${request.nextUrl.pathname}${request.nextUrl.search}`,
    CANONICAL_ORIGIN,
  );
  return NextResponse.redirect(destination, 301);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|pdf)$).*)"],
};
