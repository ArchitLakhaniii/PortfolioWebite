"use client";

import { useEffect, useState } from "react";
import { navLinks, profile } from "@/data/profile";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-line bg-void/75 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="font-mono text-sm tracking-widest text-neon">
          {profile.initials}<span className="animate-blink">_</span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-mono text-xs tracking-wider text-ghost transition-colors hover:text-neon"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={`mailto:${profile.email}`}
          className="hidden rounded-lg border border-neon/30 px-4 py-1.5 font-mono text-xs text-neon transition-all hover:border-neon hover:bg-neon/10 md:block"
        >
          Hire Me
        </a>

        {/* mobile */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className="flex flex-col gap-1.5 p-2 md:hidden"
        >
          <span className={`h-px w-5 bg-white transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`h-px w-5 bg-white transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </nav>

      {open && (
        <div className="border-b border-line bg-void/95 backdrop-blur-xl md:hidden">
          <ul className="flex flex-col gap-1 px-6 py-4">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 font-mono text-sm text-ghost transition-colors hover:text-neon"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${profile.email}`} className="block py-2 font-mono text-sm text-neon">
                Hire Me →
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
