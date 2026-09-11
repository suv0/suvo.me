import type { Metadata } from "next";
import cv from "@/lib/cv-data.json";
import { CV_DOCUMENT_CSS, buildCvBody } from "@/lib/cv-html.mjs";

/** Match `TENURE_REVALIDATE_SECONDS` in `@/lib/portfolio-data`. Must be a literal for Next segment config. */
export const revalidate = 86_400;

export const metadata: Metadata = {
  title: {
    absolute: `${cv.name} | CV`,
  },
  description: `CV for ${cv.name}, ${cv.title}. AllChrono and previously Chaldal (YC S15). Based in Dhaka, open to remote roles.`,
  alternates: {
    canonical: "https://suvo.me/cv",
  },
  robots: { index: true, follow: true },
};

export default function CvPage() {
  return (
    <>
      <style href="cv-document" precedence="high">
        {`${CV_DOCUMENT_CSS}
html, body {
  background: var(--bg) !important;
  color: var(--ink) !important;
  font-family: "Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, sans-serif !important;
  overflow-x: visible !important;
}
body {
  display: block !important;
}`}
      </style>
      <div dangerouslySetInnerHTML={{ __html: buildCvBody(cv) }} />
    </>
  );
}
