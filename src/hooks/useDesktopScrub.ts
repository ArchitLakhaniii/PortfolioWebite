"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * True when the pinned, scroll-scrubbed showcase should run:
 * desktop-width viewport and no reduced-motion preference.
 * SSR and first paint return false, so the server always renders the
 * static variant and the scrub upgrades after mount (below the fold).
 */
export default function useDesktopScrub() {
  const [desktop, setDesktop] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return desktop && !reduceMotion;
}
