import type { Metadata } from "next";
import localFont from "next/font/local";

import { TooltipProvider } from "@/components/ui/tooltip";
import { YouTubeConsentProvider } from "@/components/privacy/youtube-consent";
import { rootMetadata } from "@/lib/metadata";

import "./globals.css";

const instrumentSans = localFont({
  src: [
    {
      path: "./fonts/instrument-sans/instrument-sans-latin-wght-normal.woff2",
      weight: "400 700",
      style: "normal",
    },
    {
      path: "./fonts/instrument-sans/instrument-sans-latin-wght-italic.woff2",
      weight: "400 700",
      style: "italic",
    },
  ],
  variable: "--font-sans",
  display: "swap",
});

const ibmPlexMono = localFont({
  src: [
    {
      path: "./fonts/ibm-plex-mono/ibm-plex-mono-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/ibm-plex-mono/ibm-plex-mono-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSans.variable} ${ibmPlexMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <YouTubeConsentProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </YouTubeConsentProvider>
      </body>
    </html>
  );
}
