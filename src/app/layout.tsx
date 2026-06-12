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
        {/* fixed, restrained background — a single soft glow + grain */}
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute inset-0 dotfield opacity-60" />
          <div className="absolute -top-[20%] left-1/2 h-[640px] w-[80vw] max-w-[1100px] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-[160px] animate-pulse-slow" />
          <div className="absolute inset-0 grain" />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-void to-transparent" />
        </div>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
