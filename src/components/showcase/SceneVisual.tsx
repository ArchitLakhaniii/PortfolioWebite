"use client";

import { motion, useMotionValue, useTransform, type MotionValue } from "framer-motion";
import type { Scene } from "@/data/profile";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The visual plate for a scene (mobile / reduced-motion layout): dot
 * grid, dot-matrix index numeral, HUD corner brackets and a signal kicker
 * tag. The numeral drifts slightly faster than the plate when a progress
 * value is supplied. If `scene.image` is set (a /public path), it renders
 * as the backdrop instead of the grid.
 */
export default function SceneVisual({
  scene,
  index,
  progress,
}: {
  scene: Scene;
  index: number;
  progress?: MotionValue<number>;
}) {
  const fallback = useMotionValue(0);
  const p = progress ?? fallback;

  const artScale = useTransform(p, [0.2, 0.9], [1, 1.18]);
  const artY = useTransform(p, [0.2, 0.9], [0, -24]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      {/* backdrop */}
      {scene.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={scene.image}
          alt={`${scene.title} preview`}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div
          aria-hidden
          className="dot-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]"
        />
      )}

      {/* oversized dot-matrix index numeral */}
      {!scene.image && (
        <motion.div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center"
          style={{ scale: artScale, y: artY }}
        >
          <span
            className="font-dot select-none leading-none text-chalk/[0.07]"
            style={{ fontSize: "min(52vw, 60svh)" }}
          >
            {pad(index + 1)}
          </span>
        </motion.div>
      )}

      {/* viewfinder brackets + readouts */}
      <div aria-hidden className="hud-frame absolute inset-4" />
      <div className="absolute left-7 top-7 flex items-center gap-2 font-mono text-[10px] uppercase tracking-label text-accent">
        <span className="h-1.5 w-1.5 bg-accent" />
        {scene.kicker}
      </div>
      <div
        aria-hidden
        className="absolute bottom-7 right-7 font-mono text-[10px] uppercase tracking-label text-faint"
      >
        {pad(index + 1)} / {scene.kind}
      </div>
    </div>
  );
}
