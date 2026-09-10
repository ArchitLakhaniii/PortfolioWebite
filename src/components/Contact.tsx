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
  // the two headline lines slide past each other as the section scrolls
  const x1 = useTransform(scrollYProgress, [0, 1], [-60, 40]);
  const x2 = useTransform(scrollYProgress, [0, 1], [60, -40]);

  const socials = [
    { label: "GitHub", href: profile.links.github, Icon: GitHubIcon, external: true },
    { label: "LinkedIn", href: profile.links.linkedin, Icon: LinkedInIcon, external: true },
    { label: profile.email, href: `mailto:${profile.email}`, Icon: MailIcon, external: false },
  ];

  return (
    // overflow-x-clip: the parallax lines may slide past the viewport edge
    <Section id="contact" className="overflow-x-clip md:py-44">
      <div ref={ref}>
        <Reveal>
          <div className="flex items-center gap-4 border-t border-line pt-4 font-mono text-[11px] uppercase tracking-label">
            <span className="flex items-center gap-2.5 text-chalk">
              <span className="h-1.5 w-1.5 bg-accent" />
              Contact
            </span>
            <span className="ml-auto text-faint">{profile.location}</span>
          </div>
        </Reveal>

        <h2 className="font-wide mt-10 text-[clamp(2.25rem,9vw,8.5rem)] uppercase leading-[0.88] text-chalk">
          <motion.span style={{ x: x1 }} className="block">
            Let&apos;s build
          </motion.span>{" "}
          <motion.span style={{ x: x2 }} className="text-outline block">
            something
          </motion.span>{" "}
          <span className="block text-accent">
            useful
            <span
              aria-hidden
              className="blink ml-[0.08em] inline-block h-[0.72em] w-[0.4em] bg-accent align-baseline"
            />
          </span>
        </h2>

        <div className="mt-14 grid gap-12 border-t border-line pt-10 md:grid-cols-[1.2fr_1fr] md:gap-16">
          <Reveal>
            <p className="max-w-xl text-base leading-relaxed text-ghost sm:text-lg">
              Open to software engineering internships, AI/backend projects, iOS
              development, research, and startup collaborations.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-2 rounded-sm bg-accent px-7 py-3 text-sm font-medium text-void transition-colors duration-300 hover:bg-chalk"
              >
                <MailIcon className="h-4 w-4" /> Get in Touch
              </a>
              <a
                href={profile.resumeUrl}
                className="inline-flex items-center gap-2 rounded-sm border border-line px-7 py-3 text-sm font-medium text-chalk transition-colors duration-300 hover:border-chalk/40"
              >
                Download Resume
                <ArrowIcon className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <ul className="border-t border-line">
              {socials.map(({ label, href, Icon, external }) => (
                <li key={href} className="border-b border-line">
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="group flex items-center justify-between gap-4 py-4 text-ghost transition-colors hover:text-accent"
                  >
                    <span className="flex min-w-0 items-center gap-3 text-sm sm:text-base">
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="truncate">{label}</span>
                    </span>
                    <ArrowIcon className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
