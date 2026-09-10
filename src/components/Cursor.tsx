"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE = "a, button, [role='button'], summary, [data-cursor]";

/**
 * Replaces the native pointer with a HUD reticle: an exact hotspot dot
 * plus corner brackets that trail it and rotate into a signal-orange
 * diamond over interactive elements. Only mounts for fine pointers
 * without a reduced-motion preference; everywhere else the native
 * cursor is untouched. Over iframes (which keep their own cursor) the
 * reticle hides.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!mq.matches) return;
    setEnabled(true);
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as Element | null;
      setVisible(target?.tagName !== "IFRAME");
      setActive(Boolean(target?.closest?.(INTERACTIVE)));
    };
    const over = (e: MouseEvent) => {
      if ((e.target as Element | null)?.tagName === "IFRAME") setVisible(false);
    };
    const leave = () => setVisible(false);
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.addEventListener("mouseover", over);
    root.addEventListener("mouseleave", leave);
    return () => {
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.removeEventListener("mouseover", over);
      root.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  const scale = pressed ? 0.8 : active ? 1.5 : 1;

  return (
    <>
      {/* trailing brackets */}
      <motion.div
        aria-hidden
        style={{ x: sx, y: sy }}
        className="pointer-events-none fixed left-0 top-0 z-[100]"
      >
        <motion.div
          data-active={active}
          animate={{ scale, rotate: active ? 45 : 0, opacity: visible ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
          className="hud-frame reticle -ml-3.5 -mt-3.5 h-7 w-7"
        />
      </motion.div>
      {/* exact hotspot — no spring, so clicks land where you aim */}
      <motion.div
        aria-hidden
        style={{ x, y, opacity: visible ? 1 : 0 }}
        className="pointer-events-none fixed left-0 top-0 z-[101]"
      >
        <div className={`-ml-[2px] -mt-[2px] h-1 w-1 ${active ? "bg-accent" : "bg-chalk"}`} />
      </motion.div>
    </>
  );
}
