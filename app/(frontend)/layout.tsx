import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter, JetBrains_Mono, Libre_Caslon_Text } from "next/font/google";
import { isNonProductionDeploy } from "@/lib/deploy-env";
import { getSiteMetadata } from "@/lib/portfolio-data";
import { getOgPortrait } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const libreCaslon = Libre_Caslon_Text({
  variable: "--font-libre-caslon",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  /** Lets the page extend into the notch area so `env(safe-area-inset-*)` is meaningful on iOS. */
  viewportFit: "cover",
  themeColor: "#101412",
};

/** Match `TENURE_REVALIDATE_SECONDS` in `@/lib/portfolio-data` — must be a literal for Next segment config. */
export const revalidate = 86_400;

/** Set in `.env` / build env so Sharing Debugger stops warning; create an app at https://developers.facebook.com/apps/ */
const facebookAppId = process.env.NEXT_PUBLIC_FB_APP_ID?.trim();

export async function generateMetadata(): Promise<Metadata> {
  const { ogTitle, ogDescription, description, name, keywords } = getSiteMetadata();
  const portrait = getOgPortrait();
  const googleVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();
  const preview = isNonProductionDeploy();

  return {
    metadataBase: new URL("https://suvo.me"),
    title: {
      default: ogTitle,
      template: `%s | ${name}`,
    },
    description,
    keywords,
    authors: [{ name, url: "https://suvo.me" }],
    creator: name,
    publisher: name,
    robots: preview
      ? { index: false, follow: false, googleBot: { index: false, follow: false, noimageindex: true } }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true },
        },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: "website",
      url: "https://suvo.me",
      siteName: "suvo.me",
      locale: "en",
      images: [portrait],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [portrait.url],
    },
    ...(!preview && googleVerification ? { verification: { google: googleVerification } } : {}),
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${libreCaslon.variable} ${jetbrainsMono.variable} h-full min-w-0 antialiased`}
    >
      <head>
        {facebookAppId ? <meta property="fb:app_id" content={facebookAppId} /> : null}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-full min-w-0 flex-col overflow-x-hidden bg-ink-black text-on-surface">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
