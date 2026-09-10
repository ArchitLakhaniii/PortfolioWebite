"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "./Reveal";

/** Oversized dot-matrix section numeral that drifts against the scroll. */
function Numeral({ num }: { num: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <motion.span
      ref={ref}
      aria-hidden
      style={{ y }}
      className="font-dot pointer-events-none absolute right-0 top-10 hidden select-none text-[clamp(6rem,13vw,11rem)] leading-none text-chalk/[0.07] md:block"
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
  meta,
}: {
  num: string;
  title: string;
  sub?: string;
  kicker?: string;
  /** short technical readout at the right of the header rule */
  meta?: string;
}) {
  return (
    <div className="relative mb-16 md:mb-24">
      <Numeral num={num} />
      <Reveal className="relative">
        {/* spec-sheet rule: ■ KICKER ─────────── META */}
        <div className="flex items-center gap-4 border-t border-line pt-4 font-mono text-[11px] uppercase tracking-label">
          <span className="flex items-center gap-2.5 text-chalk">
            <span className="h-1.5 w-1.5 bg-accent" />
            {kicker ?? title}
          </span>
          {meta && <span className="ml-auto text-right text-faint">{meta}</span>}
        </div>
        <h2 className="font-wide mt-10 max-w-5xl text-balance text-[clamp(2rem,7.2vw,5.75rem)] uppercase leading-[0.9] text-chalk">
          {title}
        </h2>
        {sub && (
          <p className="mt-7 max-w-xl text-base leading-relaxed text-ghost sm:text-lg">
            {sub}
          </p>
        )}
      </Reveal>
    </div>
  );
}
