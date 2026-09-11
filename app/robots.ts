import type { MetadataRoute } from "next";

/** Explicit crawler allows — Facebook Sharing Debugger warns if `facebookexternalhit` is not clearly allowed. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "facebookexternalhit", allow: "/" },
      { userAgent: "Facebot", allow: "/" },
      { userAgent: "FacebookBot", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "*", allow: "/" },
    ],
    sitemap: "https://suvo.me/sitemap.xml",
    host: "https://suvo.me",
  };
}
