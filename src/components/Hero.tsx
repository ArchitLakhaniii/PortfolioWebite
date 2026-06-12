"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { profile, stats } from "@/data/profile";
import { GitHubIcon, LinkedInIcon, MailIcon, ArrowIcon } from "./Icons";

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <motion.div
        style={{ y, opacity }}
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-content px-6 pb-24 pt-32 sm:px-8"
      >
        {/* availability */}
        <motion.div variants={item}>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.02] px-3.5 py-1.5 text-xs text-ghost">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-50" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            {profile.availability}
          </span>
        </motion.div>

        {/* name */}
        <motion.h1
          variants={item}
          className="mt-8 font-display text-[15vw] font-semibold leading-[0.92] tracking-tightest text-chalk sm:text-7xl md:text-8xl lg:text-[8.5rem]"
        >
          <span className="block">{profile.firstName}</span>
          <span className="block text-sheen">{profile.lastName}</span>
        </motion.h1>

        {/* role + eyebrow */}
        <motion.div
          variants={item}
          className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ghost"
        >
          <span className="font-medium text-chalk">{profile.role}</span>
          <span className="h-1 w-1 rounded-full bg-faint" />
          <span className="eyebrow not-italic">{profile.eyebrow.toUpperCase()}</span>
          <span className="h-1 w-1 rounded-full bg-faint" />
          <span>{profile.location}</span>
        </motion.div>

        {/* tagline */}
        <motion.p
          variants={item}
          className="mt-8 max-w-2xl text-balance text-lg leading-relaxed text-ghost sm:text-xl"
        >
          {profile.tagline}
        </motion.p>

        {/* CTAs + socials */}
        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
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

        {/* stat strip */}
        <motion.dl
          variants={item}
          className="mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-void px-5 py-5">
              <dt className="font-display text-2xl font-semibold tracking-tight text-chalk sm:text-3xl">
                {s.value}
              </dt>
              <dd className="mt-1.5 text-[11px] leading-snug text-faint">{s.label}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        style={{ opacity }}
        className="pointer-events-none absolute bottom-7 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-line p-1.5">
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1 rounded-full bg-ghost"
          />
        </div>
      </motion.div>
    </section>
  );
}
