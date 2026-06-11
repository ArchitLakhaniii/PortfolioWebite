import type { Metadata } from "next";
import "./globals.css";
import { profile } from "@/data/profile";

const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400;500&display=swap";

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: profile.tagline,
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
    type: "website",
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
      <body className="font-body bg-void">
        {/* fixed background layers */}
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute inset-0 bg-grid" />
          <div className="absolute -top-48 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-violet/15 blur-[140px] animate-pulse-slow" />
          <div className="absolute top-1/3 -left-40 h-[420px] w-[420px] rounded-full bg-neon/10 blur-[120px]" />
          <div className="absolute bottom-0 -right-40 h-[420px] w-[420px] rounded-full bg-magenta/10 blur-[120px]" />
          <div className="absolute inset-0 bg-noise" />
        </div>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
