"use client";

import { useRef, type PointerEvent as ReactPointerEvent } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { profile, stats } from "@/data/profile";
import CountUp from "./CountUp";
import { GitHubIcon, LinkedInIcon, MailIcon, ArrowIcon } from "./Icons";

const EASE = [0.16, 1, 0.3, 1] as const;

const container = (delay: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: delay } },
});
const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};
const letter: Variants = {
  hidden: { y: "110%", rotate: 8 },
  show: (i: number) => ({
    y: "0%",
    rotate: 0,
    transition: { duration: 1.1, ease: EASE, delay: 0.1 + i * 0.045 },
  }),
};

/**
 * A word split into letters that rise into place on load. The readable
 * text lives in an sr-only span; the animated letters are aria-hidden.
 */
function KineticWord({
  text,
  offset = 0,
  className = "",
}: {
  text: string;
  offset?: number;
  className?: string;
}) {
  return (
    <span className={`block ${className}`}>
      <span className="sr-only">{text}</span>
      {/* padding/negative margin give the hover lift room inside the clip */}
      <span aria-hidden className="-mt-[0.12em] flex overflow-hidden pb-[0.04em] pt-[0.12em]">
        {text.split("").map((ch, i) => (
          <motion.span
            key={i}
            custom={offset + i}
            variants={letter}
            className="inline-block origin-bottom-left"
          >
            <span className="letter">{ch}</span>
          </motion.span>
        ))}
      </span>
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  // the two halves of the name drift apart as you scroll away
  const firstX = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const lastX = useTransform(scrollYProgress, [0, 1], [0, 90]);

  // the backdrop spotlight follows the pointer via CSS vars — no re-renders
  const onPointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section
      ref={ref}
      id="top"
      onPointerMove={onPointerMove}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* backdrop: faint grid + a pointer-following spotlight */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="hero-grid absolute inset-0" />
        <div className="hero-grid hero-grid-spot absolute inset-0" />
        <div className="hero-glow absolute inset-0" />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto w-full max-w-content px-6 pb-20 pt-32 sm:px-8"
      >
        {/* availability + affiliation */}
        <motion.div
          variants={container(0.05)}
          initial="hidden"
          animate="show"
          className="flex flex-wrap items-center justify-between gap-4"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.02] px-3.5 py-1.5 text-xs text-ghost"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-50" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            {profile.availability}
          </motion.span>
          <motion.span
            variants={item}
            className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-label text-faint"
          >
            <span>{profile.eyebrow.toUpperCase()}</span>
            <span className="text-accent/70">·</span>
            <span>{profile.location}</span>
          </motion.span>
        </motion.div>

        {/* name — letters rise in, halves drift apart on scroll */}
        <motion.h1
          initial="hidden"
          animate="show"
          className="font-wide mt-10 text-[clamp(3.25rem,13.2vw,10rem)] uppercase leading-[0.86] text-chalk"
        >
          <motion.span style={{ x: firstX }} className="block">
            <KineticWord text={profile.firstName} />
          </motion.span>{" "}
          <motion.span style={{ x: lastX }} className="block">
            <KineticWord
              text={profile.lastName}
              offset={profile.firstName.length}
              className="text-outline"
            />
          </motion.span>
        </motion.h1>

        <motion.div
          variants={container(0.55)}
          initial="hidden"
          animate="show"
          className="mt-12 grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16"
        >
          <div>
            {/* role */}
            <motion.p
              variants={item}
              className="font-serif text-3xl italic leading-tight text-chalk sm:text-4xl"
            >
              {profile.role}
            </motion.p>

            {/* tagline */}
            <motion.p
              variants={item}
              className="mt-5 max-w-xl text-balance text-base leading-relaxed text-ghost sm:text-lg"
            >
              {profile.tagline}
            </motion.p>

            {/* CTAs + socials */}
            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-chalk px-6 py-3 text-sm font-medium text-void transition-transform duration-300 hover:scale-[1.02]"
              >
                View Work
                <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href={profile.resumeUrl}
                className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium text-chalk transition-colors duration-300 hover:border-white/25"
              >
                Resume
              </a>
              <span className="mx-1 hidden h-5 w-px bg-line sm:block" />
              <div className="flex items-center gap-1">
                <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="rounded-full p-2.5 text-ghost transition-colors hover:text-chalk">
                  <GitHubIcon className="h-5 w-5" />
                </a>
                <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-full p-2.5 text-ghost transition-colors hover:text-chalk">
                  <LinkedInIcon className="h-5 w-5" />
                </a>
                <a href={`mailto:${profile.email}`} aria-label="Email" className="rounded-full p-2.5 text-ghost transition-colors hover:text-chalk">
                  <MailIcon className="h-5 w-5" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* stat grid */}
          <motion.dl
            variants={item}
            className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:w-[26rem]"
          >
            {stats.map((s) => (
              <div key={s.label} className="bg-void/90 px-5 py-5 backdrop-blur-sm">
                <dt className="font-display text-2xl font-semibold tracking-tight text-chalk sm:text-3xl">
                  <CountUp value={s.value} />
                </dt>
                <dd className="mt-1.5 text-[11px] leading-snug text-faint">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        aria-hidden
        style={{ opacity }}
        className="pointer-events-none absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-3 font-mono text-[10px] uppercase tracking-label text-faint md:flex"
      >
        Scroll
        <span className="relative h-px w-12 overflow-hidden bg-line">
          <motion.span
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-accent"
          />
        </span>
      </motion.div>
    </section>
  );
}
