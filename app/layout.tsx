import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter, Space_Grotesk } from "next/font/google";
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

const ogTitle = "Abdul Hamid Shuvo — Senior Software Engineer · 16+ years";
const ogDescription =
  "16+ years in software — from Dwetech (2009–2016) to Chaldal (YC S15): web, mobile, logistics, and platform engineering.";

/** Set in `.env` / build env so Sharing Debugger stops warning; create an app at https://developers.facebook.com/apps/ */
const facebookAppId = process.env.NEXT_PUBLIC_FB_APP_ID?.trim();

export const metadata: Metadata = {
  metadataBase: new URL("https://suvo.me"),
  title: {
    default: "Abdul Hamid Shuvo — Senior Software Engineer · 16+ years",
    template: "%s | Abdul Hamid Shuvo",
  },
  description:
    "Abdul Hamid Shuvo — senior software engineer, 16+ years. Chaldal (YC S15), React, React Native, TypeScript, F#. National-scale logistics products. Dhaka · remote.",
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
