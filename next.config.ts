import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  /**
   * Phone testing via LAN IP — Next blocks `/_next/*` from other hosts unless listed.
   * Add your machine IP from `ipconfig` if it differs from 192.168.68.102.
   */
  allowedDevOrigins: ["192.168.68.102", "127.0.0.1", "localhost"],
  /** Allow `quality` values used by `next/image` (default is only 75). */
  images: {
    qualities: [75, 90],
    localPatterns: [
      { pathname: "/api/media/file/**" },
      { pathname: "/**" },
    ],
    remotePatterns: [
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
      { protocol: "https", hostname: "*.blob.vercel-storage.com" },
      { protocol: "http", hostname: "127.0.0.1", port: "3010" },
      { protocol: "http", hostname: "localhost", port: "3010" },
      { protocol: "https", hostname: "suvo.me" },
    ],
  },
  turbopack: {
    root: path.resolve(dirname),
  },
  /**
   * Default static HTML from Next can send very long `s-maxage` at the edge (e.g. Cloudflare),
   * which keeps stale error pages or old OG HTML in cache while a direct curl looks "fine".
   * Tighten cache for HTML entry routes so social crawlers pick up fresh 200 + meta tags sooner.
   */
  async headers() {
    const htmlShort =
      "public, max-age=0, s-maxage=600, stale-while-revalidate=86400, must-revalidate";
    return [
      { source: "/", headers: [{ key: "Cache-Control", value: htmlShort }] },
      { source: "/cv", headers: [{ key: "Cache-Control", value: htmlShort }] },
      { source: "/kids", headers: [{ key: "Cache-Control", value: htmlShort }] },
      { source: "/stories", headers: [{ key: "Cache-Control", value: htmlShort }] },
      { source: "/stories/:path*", headers: [{ key: "Cache-Control", value: htmlShort }] },
      {
        source: "/opengraph-image",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
