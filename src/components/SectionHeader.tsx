"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "./Reveal";

/** Oversized hollow section numeral that drifts against the scroll. */
function Numeral({ num }: { num: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [70, -70]);

  return (
    <motion.span
      ref={ref}
      aria-hidden
      style={{ y }}
      className="text-outline-faint font-wide pointer-events-none absolute -top-6 right-0 hidden select-none text-[clamp(7rem,15vw,13rem)] leading-none md:block"
    >
      {num}
    </motion.span>
  );
}

export default function SectionHeader({
  num,
  title,
  sub,
  kicker,
  accent,
}: {
  num: string;
  title: string;
  sub?: string;
  kicker?: string;
  /** short italic-serif phrase set under the title */
  accent?: string;
}) {
  return (
    <div className="relative mb-16 md:mb-24">
      <Numeral num={num} />
      <Reveal className="relative">
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-accent/60" />
          <span className="font-mono text-[11px] uppercase tracking-label text-accent">
            {kicker ?? title}
          </span>
        </div>
        <h2 className="font-wide mt-7 max-w-5xl text-balance text-[clamp(2rem,7.2vw,5.75rem)] uppercase leading-[0.9] text-chalk">
          {title}
        </h2>
        {accent && (
          <p className="mt-1 font-serif text-[clamp(2rem,5.4vw,4.5rem)] italic leading-[1.05] text-accent">
            {accent}
          </p>
        )}
        {sub && (
          <p className="mt-7 max-w-xl text-base leading-relaxed text-ghost sm:text-lg">
            {sub}
          </p>
        )}
      </Reveal>
    </div>
  );
}
