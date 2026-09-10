import type { Metadata } from "next";
import "./globals.css";
import { profile } from "@/data/profile";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";

// Archivo loads across its width axis (125% = ".font-wide" display type);
// Doto is the dot-matrix readout face; IBM Plex for body + mono.
const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=Doto:wght@400..900&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap";

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: profile.tagline,
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={FONTS_URL} rel="stylesheet" />
      </head>
      <body className="font-body bg-void text-chalk">
        <ScrollProgress />
        <Cursor />
        {/* fixed background — film grain only, no glow */}
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute inset-0 grain" />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-void to-transparent" />
        </div>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
