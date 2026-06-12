"use client";

import { motion, useMotionValue, useTransform, type MotionValue } from "framer-motion";
import type { Scene } from "@/data/profile";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The big visual panel for a scene — a layered typographic poster:
 * hue-tinted wash (back), soft glow + oversized index numeral (middle),
 * kicker chip (front). Layers drift at different rates while the scene
 * zooms, so the expansion feels dimensional. If `scene.image` is set
 * (a /public path), it renders as the backdrop instead of the wash.
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

  // inner counter-drift: the numeral zooms slightly faster than the panel
  const artScale = useTransform(p, [0.2, 0.9], [1, 1.18]);
  const artY = useTransform(p, [0.2, 0.9], [0, -24]);
  const glowOpacity = useTransform(p, [0, 0.55], [0.6, 1]);

  const { hue } = scene;

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
          className="absolute inset-0"
          style={{
            background: `linear-gradient(160deg, hsl(${hue} 30% 10%) 0%, #0a0a0e 55%, #070709 100%)`,
          }}
        />
      )}

      {/* glow */}
      <motion.div
        aria-hidden
        className="absolute -top-1/4 right-[-12%] h-[75%] w-[75%] rounded-full blur-[110px]"
        style={{
          opacity: glowOpacity,
          background: `hsla(${hue} 80% 64% / 0.18)`,
        }}
      />

      {/* oversized index numeral */}
      {!scene.image && (
        <motion.div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center"
          style={{ scale: artScale, y: artY }}
        >
          <span
            className="select-none font-display font-semibold leading-none text-white/[0.05]"
            style={{ fontSize: "min(52vw, 60svh)" }}
          >
            {pad(index + 1)}
          </span>
        </motion.div>
      )}

      {/* scrim + kicker chip */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
      {/* top-[10%] keeps the chip clear of the fixed nav at full-bleed */}
      <div className="absolute left-[5%] top-[10%]">
        <span
          className="rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-label"
          style={{
            borderColor: `hsla(${hue} 60% 70% / 0.3)`,
            color: `hsla(${hue} 70% 78% / 0.95)`,
          }}
        >
          {scene.kicker}
        </span>
      </div>
    </div>
  );
}
