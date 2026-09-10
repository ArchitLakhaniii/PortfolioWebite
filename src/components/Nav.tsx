"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, profile } from "@/data/profile";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lightweight scroll-spy for the active section
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-line bg-void/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-content items-center justify-between px-6 sm:px-8">
        <a
          href="#top"
          aria-label="Back to top"
          className="font-wide grid h-9 w-9 place-items-center rounded-sm bg-chalk text-[12px] text-void transition-colors hover:bg-accent"
        >
          {profile.initials}
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((l, i) => {
            const isActive = active === l.href.replace("#", "");
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`relative flex items-baseline gap-1.5 px-3 py-2 text-[13px] transition-colors ${
                    isActive ? "text-chalk" : "text-ghost hover:text-chalk"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`font-mono text-[9px] transition-colors ${isActive ? "text-accent" : "text-faint"}`}
                  >
                    {pad(i + 1)}
                  </span>
                  {l.label}
                  {/* signal underline slides to the active section */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-bar"
                      className="absolute inset-x-3 -bottom-[13px] h-px bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href={`mailto:${profile.email}`}
          className="hidden rounded-sm border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-label text-chalk transition-colors hover:border-accent hover:text-accent md:block"
        >
          Get in touch
        </a>

        {/* mobile toggle */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className="flex flex-col gap-1.5 p-2 md:hidden"
        >
          <span className={`h-px w-5 bg-chalk transition-transform duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`h-px w-5 bg-chalk transition-transform duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b border-line bg-void/95 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col px-6 py-4">
              {navLinks.map((l, i) => (
                <li key={l.href} className="border-b border-hairline">
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-3 py-3 text-ghost transition-colors hover:text-accent"
                  >
                    <span aria-hidden className="font-mono text-[10px] text-accent">
                      {pad(i + 1)}
                    </span>
                    <span className="font-wide text-xl uppercase">{l.label}</span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  onClick={() => setOpen(false)}
                  className="block pt-5 text-base text-accent"
                >
                  Get in touch →
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
