"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE = "a, button, [role='button'], summary, [data-cursor]";

/**
 * A small HUD reticle (corner brackets) that trails the pointer and
 * rotates into a signal-orange diamond over interactive elements.
 * Purely decorative: the native cursor stays visible, and the reticle
 * only mounts for fine pointers without a reduced-motion preference.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 450, damping: 38, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 450, damping: 38, mass: 0.6 });

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!mq.matches) return;
    setEnabled(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as Element | null;
      setActive(Boolean(target?.closest?.(INTERACTIVE)));
    };
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[100]"
    >
      <motion.div
        data-active={active}
        animate={{ scale: active ? 1.5 : 1, rotate: active ? 45 : 0, opacity: visible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="hud-frame reticle -ml-3.5 -mt-3.5 h-7 w-7"
      />
    </motion.div>
  );
}
