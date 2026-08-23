import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const plexSans = IBM_Plex_Sans({ variable: "--font-plex-sans", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const plexMono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Analytics Dashboard | Bookchaowalit",
  description: "A local, transparent instrument for reading performance signals.",
  keywords: ["analytics-dashboard", "demo"],
  authors: [{ name: "Bookchaowalit", url: "https://bookchaowalit.com" }],
  creator: "Bookchaowalit",
  metadataBase: new URL("https://bookchaowalit.com"),
  openGraph: {
    type: "website",
    title: "Analytics Dashboard | Bookchaowalit",
    description: "A local, transparent instrument for reading performance signals.",
    siteName: "Bookchaowalit",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${plexSans.variable} ${plexMono.variable}`}>
      <body className="antialiased">
        <Analytics />
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}
