"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { profile } from "@/data/profile";
import Section from "./Section";
import Reveal from "./Reveal";
import { GitHubIcon, LinkedInIcon, MailIcon, ArrowIcon } from "./Icons";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [48, -48]);

  return (
    <Section id="contact" className="md:py-44">
      <Reveal>
        <motion.div ref={ref} style={{ y }} className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">06 — Contact</p>
          <h2 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.02] tracking-tightest text-chalk sm:text-6xl md:text-7xl">
            Let&apos;s build something{" "}
            <span className="text-sheen">useful.</span>
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-ghost sm:text-lg">
            Open to software engineering internships, AI/backend projects, iOS
            development, research, and startup collaborations.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-2 rounded-full bg-chalk px-7 py-3 text-sm font-medium text-void transition-transform duration-300 hover:scale-[1.02]"
            >
              <MailIcon className="h-4 w-4" /> Get in Touch
            </a>
            <a
              href={profile.resumeUrl}
              className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-3 text-sm font-medium text-chalk transition-colors duration-300 hover:border-white/25"
            >
              Download Resume
              <ArrowIcon className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-ghost">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              className="link-underline inline-flex items-center gap-2 transition-colors hover:text-chalk"
            >
              <GitHubIcon className="h-4 w-4" /> GitHub
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="link-underline inline-flex items-center gap-2 transition-colors hover:text-chalk"
            >
              <LinkedInIcon className="h-4 w-4" /> LinkedIn
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="link-underline inline-flex items-center gap-2 transition-colors hover:text-chalk"
            >
              <MailIcon className="h-4 w-4" /> {profile.email}
            </a>
          </div>
        </motion.div>
      </Reveal>
    </Section>
  );
}
