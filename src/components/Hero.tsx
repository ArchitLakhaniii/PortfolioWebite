"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
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

/** Live local time in `profile.timeZone`, ticking once a second. */
function Clock() {
  const [now, setNow] = useState("--:--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: profile.timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
      timeZoneName: "short",
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return <span className="tabular-nums">{now}</span>;
}

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

const pad4 = (n: number) => String(Math.max(0, n)).padStart(4, "0");

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const readout = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  // the two halves of the name drift apart as you scroll away
  const firstX = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const lastX = useTransform(scrollYProgress, [0, 1], [0, 90]);

  // spotlight + crosshair follow the pointer via CSS vars — no re-renders
  const onPointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = Math.round(e.clientX - r.left);
    const yy = Math.round(e.clientY - r.top);
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${yy}px`);
    if (readout.current) readout.current.textContent = `X ${pad4(x)}  Y ${pad4(yy)}`;
  };

  return (
    <section
      ref={ref}
      id="top"
      onPointerMove={onPointerMove}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* backdrop: faint grid, pointer spotlight, crosshair guides */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="hero-grid absolute inset-0" />
        <div className="hero-grid hero-grid-spot absolute inset-0" />
        <div className="crosshair crosshair-h" />
        <div className="crosshair crosshair-v" />
        <span
          ref={readout}
          className="crosshair crosshair-readout font-mono text-[10px] tracking-label text-accent"
        >
          X 0000  Y 0000
        </span>
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto w-full max-w-content px-6 pb-20 pt-28 sm:px-8"
      >
        {/* HUD readout row: status · affiliation · coordinates · local time */}
        <motion.div
          variants={container(0.05)}
          initial="hidden"
          animate="show"
          className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-y border-line py-3 font-mono text-[11px] uppercase tracking-label"
        >
          <motion.span variants={item} className="flex items-center gap-2.5 text-chalk">
            <span className="blink h-2 w-2 bg-accent" />
            <span>{profile.availability}</span>
          </motion.span>
          <motion.span
            variants={item}
            className="flex flex-wrap items-center gap-x-5 gap-y-1 text-faint"
          >
            <span>{profile.eyebrow.toUpperCase()}</span>
            <span className="hidden lg:inline">{profile.coordinates}</span>
            <span className="text-ghost">
              <Clock />
            </span>
          </motion.span>
        </motion.div>

        {/* name — letters rise in, halves drift apart on scroll */}
        <motion.h1
          initial="hidden"
          animate="show"
          className="font-wide mt-12 text-[clamp(3.25rem,13.2vw,10rem)] uppercase leading-[0.86] text-chalk"
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
            <motion.p
              variants={item}
              className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-label text-accent"
            >
              <span className="h-px w-8 bg-accent" />
              {profile.location}
            </motion.p>
            <motion.p
              variants={item}
              className="mt-3 font-display text-2xl font-medium tracking-tight text-chalk sm:text-3xl"
            >
              {profile.role}
            </motion.p>

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
                className="group inline-flex items-center gap-2 rounded-sm bg-accent px-6 py-3 text-sm font-medium text-void transition-colors duration-300 hover:bg-chalk"
              >
                View Work
                <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href={profile.resumeUrl}
                className="inline-flex items-center gap-2 rounded-sm border border-line px-6 py-3 text-sm font-medium text-chalk transition-colors duration-300 hover:border-chalk/40"
              >
                Resume
              </a>
              <span className="mx-1 hidden h-5 w-px bg-line sm:block" />
              <div className="flex items-center gap-1">
                <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="rounded-sm p-2.5 text-ghost transition-colors hover:text-accent">
                  <GitHubIcon className="h-5 w-5" />
                </a>
                <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-sm p-2.5 text-ghost transition-colors hover:text-accent">
                  <LinkedInIcon className="h-5 w-5" />
                </a>
                <a href={`mailto:${profile.email}`} aria-label="Email" className="rounded-sm p-2.5 text-ghost transition-colors hover:text-accent">
                  <MailIcon className="h-5 w-5" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* stat readout — dot-matrix numerals in a HUD frame */}
          <motion.dl variants={item} className="hud-frame grid grid-cols-2 lg:w-[26rem]">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`px-5 py-5 ${i % 2 === 0 ? "border-r border-line" : ""} ${
                  i < 2 ? "border-b border-line" : ""
                }`}
              >
                <dt className="font-dot text-2xl text-chalk sm:text-3xl">
                  <CountUp value={s.value} />
                </dt>
                <dd className="mt-2 font-mono text-[10px] uppercase leading-snug tracking-label text-faint">
                  {s.label}
                </dd>
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
