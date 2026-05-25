import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter, Space_Grotesk } from "next/font/google";
import { getSiteMetadata } from "@/lib/portfolio-data";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  /** Lets the page extend into the notch area so `env(safe-area-inset-*)` is meaningful on iOS. */
  viewportFit: "cover",
  themeColor: "#020617",
};

/** Match `TENURE_REVALIDATE_SECONDS` in `@/lib/portfolio-data` — must be a literal for Next segment config. */
export const revalidate = 86_400;

/** Set in `.env` / build env so Sharing Debugger stops warning; create an app at https://developers.facebook.com/apps/ */
const facebookAppId = process.env.NEXT_PUBLIC_FB_APP_ID?.trim();

export async function generateMetadata(): Promise<Metadata> {
  const { ogTitle, ogDescription, description } = getSiteMetadata();

  return {
    metadataBase: new URL("https://suvo.me"),
    title: {
      default: ogTitle,
      template: "%s | Abdul Hamid Shuvo",
    },
    description,
    alternates: {
      canonical: "https://suvo.me",
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: "website",
      url: "https://suvo.me",
      siteName: "suvo.me",
      locale: "en",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} h-full min-w-0 antialiased`}>
      <head>
        {facebookAppId ? <meta property="fb:app_id" content={facebookAppId} /> : null}
      </head>
      <body className="flex min-h-full min-w-0 flex-col overflow-x-hidden">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
