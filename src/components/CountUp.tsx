"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { animate, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

// useLayoutEffect on the client, useEffect on the server (avoids SSR warning).
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Parsed = { prefix: string; value: number; decimals: number; suffix: string };

/**
 * Split a stat string into an animatable number plus fixed affixes.
 * "4.00" → 0.00…4.00 · "10+" → 0…10 (+) · "2×" → 0…2 (×) · "AED 28K" → AED 0…28 K
 */
function parse(raw: string): Parsed | null {
  const m = raw.match(/^(\D*?)(\d+(?:\.\d+)?)(\D*)$/);
  if (!m) return null;
  const [, prefix, num, suffix] = m;
  const decimals = num.includes(".") ? num.split(".")[1].length : 0;
  return { prefix, value: parseFloat(num), decimals, suffix };
}

/**
 * Counts up to a numeric value the first time it scrolls into view.
 * Renders the final value in markup (correct without JS / for SSR), then
 * animates from zero on the client. Respects reduced-motion.
 */
export default function CountUp({
  value,
  className,
  duration = 1.6,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parsed = parse(value);
    if (!parsed || reduce) {
      el.textContent = value;
      return;
    }
    const { prefix, value: target, decimals, suffix } = parsed;
    const render = (n: number) => {
      el.textContent = `${prefix}${n.toFixed(decimals)}${suffix}`;
    };

    render(0); // reset before first paint — no flash of the final value

    let controls: ReturnType<typeof animate> | undefined;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            controls = animate(0, target, { duration, ease: EASE, onUpdate: render });
            io.disconnect();
          }
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      controls?.stop();
    };
  }, [value, reduce, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
