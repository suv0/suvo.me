import type { MetadataRoute } from "next";
import { isNonProductionDeploy } from "@/lib/deploy-env";

/** Explicit crawler allows — Facebook Sharing Debugger warns if `facebookexternalhit` is not clearly allowed. */
export default function robots(): MetadataRoute.Robots {
  if (isNonProductionDeploy()) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [
      { userAgent: "facebookexternalhit", allow: "/", disallow: ["/admin"] },
      { userAgent: "Facebot", allow: "/", disallow: ["/admin"] },
      { userAgent: "FacebookBot", allow: "/", disallow: ["/admin"] },
      { userAgent: "GPTBot", allow: "/", disallow: ["/admin"] },
      { userAgent: "OAI-SearchBot", allow: "/", disallow: ["/admin"] },
      { userAgent: "ChatGPT-User", allow: "/", disallow: ["/admin"] },
      { userAgent: "Google-Extended", allow: "/", disallow: ["/admin"] },
      { userAgent: "PerplexityBot", allow: "/", disallow: ["/admin"] },
      { userAgent: "ClaudeBot", allow: "/", disallow: ["/admin"] },
      { userAgent: "*", allow: "/", disallow: ["/admin"] },
    ],
    sitemap: "https://suvo.me/sitemap.xml",
    host: "https://suvo.me",
  };
}
