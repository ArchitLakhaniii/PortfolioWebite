"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValueEvent, useTransform, type MotionValue } from "framer-motion";
import type { SceneReveal } from "@/data/profile";

/**
 * Scroll-scrubbed transitions for the pinned showcase scenes. Each one
 * takes the scene from its centered title ("intro") to its condensed case
 * study ("detail") in a different way. All share the same phase map so the
 * runway feels consistent:
 *
 *   0 ─ intro ─ ~0.2 ─ transition ─ ~0.5 ─ detail ─ 0.86 ─ fade ─ 0.96
 *
 * `p` is the spring-smoothed 0→1 scroll progress through the runway.
 */
export type RevealProps = {
  p: MotionValue<number>;
  /** Renders the intro block; pass a node to replace the title text. */
  renderIntro: (title?: ReactNode) => ReactNode;
  detail: ReactNode;
  title: string;
};

const INTRO = "absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center";
const DETAIL = "absolute inset-0 z-20 flex items-center justify-center px-6";

/** detail is clickable only while fully on screen */
function useDetailPointer(p: MotionValue<number>) {
  return useTransform(p, (v) => (v > 0.44 && v < 0.9 ? "auto" : "none"));
}
/** shared exit fade for the detail layer */
function useDetailExit(p: MotionValue<number>) {
  return useTransform(p, [0.86, 0.96], [1, 0]);
}

/* ── zoom — the title rushes past the camera ─────────────── */
function Zoom({ p, renderIntro, detail }: RevealProps) {
  const iOpacity = useTransform(p, [0, 0.22, 0.4], [1, 1, 0]);
  const iScale = useTransform(p, [0, 0.4], [1, 1.6]);
  const iY = useTransform(p, [0, 0.4], [0, -24]);
  const dOpacity = useTransform(p, [0.34, 0.48, 0.86, 0.96], [0, 1, 1, 0]);
  const dScale = useTransform(p, [0.34, 0.52], [0.9, 1]);
  const dY = useTransform(p, [0.34, 0.52], [44, 0]);
  const pe = useDetailPointer(p);
  return (
    <>
      <motion.div style={{ opacity: iOpacity, scale: iScale, y: iY }} className={INTRO}>
        {renderIntro()}
      </motion.div>
      <motion.div style={{ opacity: dOpacity, scale: dScale, y: dY, pointerEvents: pe }} className={DETAIL}>
        {detail}
      </motion.div>
    </>
  );
}

/* ── split — a signal seam cuts the title, halves shear apart ─ */
function Split({ p, renderIntro, detail }: RevealProps) {
  const seam = useTransform(p, [0.1, 0.22], [0, 1]);
  const seamOpacity = useTransform(p, [0.1, 0.18, 0.4, 0.48], [0, 1, 1, 0]);
  const topY = useTransform(p, [0.22, 0.5], ["0vh", "-55vh"]);
  const botY = useTransform(p, [0.22, 0.5], ["0vh", "55vh"]);
  const dOpacity = useTransform(p, [0.24, 0.42, 0.86, 0.96], [0, 1, 1, 0]);
  const dScale = useTransform(p, [0.24, 0.5], [0.94, 1]);
  const pe = useDetailPointer(p);
  const half = "absolute inset-0 z-30 flex flex-col items-center justify-center bg-ink px-6 text-center";
  return (
    <>
      <motion.div style={{ opacity: dOpacity, scale: dScale, pointerEvents: pe }} className={DETAIL}>
        {detail}
      </motion.div>
      <motion.div style={{ y: topY, clipPath: "inset(0 0 50% 0)" }} className={half}>
        {renderIntro()}
      </motion.div>
      <motion.div aria-hidden style={{ y: botY, clipPath: "inset(50% 0 0 0)" }} className={half}>
        {renderIntro()}
      </motion.div>
      <motion.div
        aria-hidden
        style={{ scaleX: seam, opacity: seamOpacity }}
        className="absolute inset-x-0 top-1/2 z-40 h-px bg-accent"
      />
    </>
  );
}

/* ── flip — the title tips back in 3D, the case study swings up ─ */
function Flip({ p, renderIntro, detail }: RevealProps) {
  const iRot = useTransform(p, [0.2, 0.44], [0, 80]);
  const iY = useTransform(p, [0.2, 0.44], [0, 80]);
  const iOpacity = useTransform(p, [0.26, 0.44], [1, 0]);
  const dRot = useTransform(p, [0.34, 0.56], [-80, 0]);
  const dY = useTransform(p, [0.34, 0.56], [-80, 0]);
  const dOpacity = useTransform(p, [0.34, 0.46, 0.86, 0.96], [0, 1, 1, 0]);
  const pe = useDetailPointer(p);
  return (
    <>
      <motion.div
        style={{ rotateX: iRot, y: iY, opacity: iOpacity, transformPerspective: 1100, originY: 1 }}
        className={INTRO}
      >
        {renderIntro()}
      </motion.div>
      <motion.div
        style={{ rotateX: dRot, y: dY, opacity: dOpacity, transformPerspective: 1100, originY: 0, pointerEvents: pe }}
        className={DETAIL}
      >
        {detail}
      </motion.div>
    </>
  );
}

/* ── blinds — shutter bars close over the title, then reopen ─ */
const BARS = 8;
function Bar({ p, i }: { p: MotionValue<number>; i: number }) {
  const d = i * 0.006;
  // closes 0.12→0.28, fully shut ~0.28–0.30, reopens 0.30→0.46
  const scaleY = useTransform(p, [0.12 + d, 0.24 + d, 0.3 + d, 0.42 + d], [0, 1, 1, 0]);
  return (
    <motion.div
      style={{
        scaleY,
        originY: i % 2 ? 1 : 0,
        top: `${(i / BARS) * 100}%`,
        height: `${100 / BARS + 0.3}%`,
      }}
      className="absolute inset-x-0 border-b border-line bg-surface"
    />
  );
}
function Blinds({ p, renderIntro, detail }: RevealProps) {
  const iOpacity = useTransform(p, [0.283, 0.288], [1, 0]);
  const dOpacity = useTransform(p, [0.288, 0.293, 0.86, 0.96], [0, 1, 1, 0]);
  const pe = useDetailPointer(p);
  return (
    <>
      <motion.div style={{ opacity: iOpacity }} className={INTRO}>
        {renderIntro()}
      </motion.div>
      <motion.div style={{ opacity: dOpacity, pointerEvents: pe }} className={DETAIL}>
        {detail}
      </motion.div>
      <div aria-hidden className="pointer-events-none absolute inset-0 z-30">
        {Array.from({ length: BARS }, (_, i) => (
          <Bar key={i} p={p} i={i} />
        ))}
      </div>
    </>
  );
}

/* ── scan — a signal line sweeps down, writing the case study ─ */
function Scan({ p, renderIntro, detail }: RevealProps) {
  const pct = useTransform(p, [0.2, 0.5], [0, 100]);
  const introClip = useTransform(pct, (v) => `inset(${v}% 0 0 0)`);
  const detailClip = useTransform(pct, (v) => `inset(0 0 ${100 - v}% 0)`);
  const lineTop = useTransform(pct, (v) => `${v}%`);
  const lineOpacity = useTransform(p, [0.17, 0.21, 0.47, 0.52], [0, 1, 1, 0]);
  const readout = useTransform(pct, (v) => `SCAN ${String(Math.round(v)).padStart(3, "0")}%`);
  const dExit = useDetailExit(p);
  const pe = useDetailPointer(p);
  return (
    <>
      <motion.div style={{ clipPath: introClip }} className={INTRO}>
        {renderIntro()}
      </motion.div>
      <motion.div style={{ clipPath: detailClip, opacity: dExit, pointerEvents: pe }} className={DETAIL}>
        {detail}
      </motion.div>
      <motion.div
        aria-hidden
        style={{ top: lineTop, opacity: lineOpacity }}
        className="pointer-events-none absolute inset-x-0 z-30 h-px bg-accent"
      >
        <div className="absolute inset-x-0 bottom-px h-16 bg-gradient-to-t from-accent/[0.07] to-transparent" />
        <motion.span className="absolute right-14 top-2 font-mono text-[10px] tracking-label text-accent">
          {readout}
        </motion.span>
      </motion.div>
    </>
  );
}

/* ── iris — a circular aperture opens onto the case study ──── */
function Iris({ p, renderIntro, detail }: RevealProps) {
  const radius = useTransform(p, [0.24, 0.52], [0, 80]);
  const clip = useTransform(radius, (v) => `circle(${v}% at 50% 50%)`);
  const iScale = useTransform(p, [0.18, 0.42], [1, 0.72]);
  const iOpacity = useTransform(p, [0.2, 0.4], [1, 0]);
  const ring = useTransform(p, [0.24, 0.52], [0, 1]);
  const ringOpacity = useTransform(p, [0.22, 0.28, 0.44, 0.52], [0, 0.9, 0.5, 0]);
  const dExit = useDetailExit(p);
  const pe = useDetailPointer(p);
  return (
    <>
      <motion.div style={{ scale: iScale, opacity: iOpacity }} className={INTRO}>
        {renderIntro()}
      </motion.div>
      <motion.div style={{ clipPath: clip, opacity: dExit, pointerEvents: pe }} className={`${DETAIL} bg-ink`}>
        {detail}
      </motion.div>
      <motion.div
        aria-hidden
        style={{ scale: ring, opacity: ringOpacity }}
        className="pointer-events-none absolute left-1/2 top-1/2 z-30 -ml-[60vmax] -mt-[60vmax] h-[120vmax] w-[120vmax] rounded-full border border-accent"
      />
    </>
  );
}

/* ── tiles — the frame dissolves into blocks and re-forms ──── */
const COLS = 6;
const ROWS = 4;
const N = COLS * ROWS;
// deterministic permutations (7 and 11 are coprime to 24)
const IN_ORDER = Array.from({ length: N }, (_, i) => (i * 7 + 3) % N);
const OUT_ORDER = Array.from({ length: N }, (_, i) => (i * 11 + 5) % N);
function Tile({ p, i }: { p: MotionValue<number>; i: number }) {
  const inA = 0.12 + (IN_ORDER[i] / N) * 0.12;
  const outA = 0.3 + (OUT_ORDER[i] / N) * 0.14;
  const scale = useTransform(p, [inA, inA + 0.035, outA, outA + 0.035], [0, 1, 1, 0]);
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  return (
    <motion.div
      style={{
        scale,
        left: `${(col / COLS) * 100}%`,
        top: `${(row / ROWS) * 100}%`,
        width: `${100 / COLS}%`,
        height: `${100 / ROWS}%`,
      }}
      className={`absolute border border-line ${IN_ORDER[i] % 8 === 0 ? "bg-accent" : "bg-surface"}`}
    />
  );
}
function Tiles({ p, renderIntro, detail }: RevealProps) {
  const iOpacity = useTransform(p, [0.276, 0.281], [1, 0]);
  const dOpacity = useTransform(p, [0.281, 0.286, 0.86, 0.96], [0, 1, 1, 0]);
  const pe = useDetailPointer(p);
  return (
    <>
      <motion.div style={{ opacity: iOpacity }} className={INTRO}>
        {renderIntro()}
      </motion.div>
      <motion.div style={{ opacity: dOpacity, pointerEvents: pe }} className={DETAIL}>
        {detail}
      </motion.div>
      <div aria-hidden className="pointer-events-none absolute inset-0 z-30">
        {Array.from({ length: N }, (_, i) => (
          <Tile key={i} p={p} i={i} />
        ))}
      </div>
    </>
  );
}

/* ── slide — a skewed horizontal wipe behind a signal edge ─── */
function Slide({ p, renderIntro, detail }: RevealProps) {
  const iX = useTransform(p, [0.2, 0.46], ["0%", "-60%"]);
  const iSkew = useTransform(p, [0.2, 0.46], [0, -14]);
  const iOpacity = useTransform(p, [0.2, 0.4], [1, 0]);
  const dX = useTransform(p, [0.3, 0.54], ["45%", "0%"]);
  const dSkew = useTransform(p, [0.3, 0.54], [12, 0]);
  const dOpacity = useTransform(p, [0.3, 0.46, 0.86, 0.96], [0, 1, 1, 0]);
  const edgeX = useTransform(p, [0.22, 0.52], ["100vw", "0vw"]);
  const edgeOpacity = useTransform(p, [0.2, 0.26, 0.46, 0.52], [0, 1, 1, 0]);
  const pe = useDetailPointer(p);
  return (
    <>
      <motion.div style={{ x: iX, skewX: iSkew, opacity: iOpacity }} className={INTRO}>
        {renderIntro()}
      </motion.div>
      <motion.div style={{ x: dX, skewX: dSkew, opacity: dOpacity, pointerEvents: pe }} className={DETAIL}>
        {detail}
      </motion.div>
      <motion.div
        aria-hidden
        style={{ x: edgeX, opacity: edgeOpacity }}
        className="pointer-events-none absolute inset-y-0 left-0 z-30 w-px bg-accent"
      />
    </>
  );
}

/* ── stack — the case file slides up over the receding title ─ */
function Stack({ p, renderIntro, detail }: RevealProps) {
  const iScale = useTransform(p, [0.2, 0.52], [1, 0.86]);
  const iY = useTransform(p, [0.2, 0.52], ["0%", "-6%"]);
  const iOpacity = useTransform(p, [0.2, 0.52], [1, 0.12]);
  const dY = useTransform(p, [0.24, 0.52], ["100%", "0%"]);
  const dExit = useDetailExit(p);
  const pe = useDetailPointer(p);
  return (
    <>
      <motion.div style={{ scale: iScale, y: iY, opacity: iOpacity }} className={INTRO}>
        {renderIntro()}
      </motion.div>
      <motion.div
        style={{ y: dY, opacity: dExit, pointerEvents: pe }}
        className={`${DETAIL} border-t border-accent bg-ink`}
      >
        {detail}
      </motion.div>
    </>
  );
}

/* ── decode — the title scrambles into glyphs, then the case study types in ─ */
const GLYPHS = "01#/\\<>_=+*%$&";
function scramble(text: string, amount: number, tick: number) {
  const n = text.length;
  return text
    .split("")
    .map((ch, i) => {
      if (ch === " ") return ch;
      // characters flip from the right edge inward
      const threshold = ((n - 1 - i) / Math.max(1, n - 1)) * 0.85;
      return amount > threshold ? GLYPHS[(i * 7 + tick) % GLYPHS.length] : ch;
    })
    .join("");
}
function DecodeText({ p, text }: { p: MotionValue<number>; text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useMotionValueEvent(p, "change", (v) => {
    const el = ref.current;
    if (!el) return;
    const amount = Math.min(1, Math.max(0, (v - 0.08) / 0.22));
    el.textContent = amount <= 0 ? text : scramble(text, amount, Math.floor(v * 90));
  });
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden ref={ref}>
        {text}
      </span>
    </>
  );
}
function Decode({ p, renderIntro, detail, title }: RevealProps) {
  const iOpacity = useTransform(p, [0.28, 0.4], [1, 0]);
  const dClip = useTransform(p, [0.34, 0.54], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  const dExit = useDetailExit(p);
  const pe = useDetailPointer(p);
  return (
    <>
      <motion.div style={{ opacity: iOpacity }} className={INTRO}>
        {renderIntro(<DecodeText p={p} text={title} />)}
      </motion.div>
      <motion.div style={{ clipPath: dClip, opacity: dExit, pointerEvents: pe }} className={DETAIL}>
        {detail}
      </motion.div>
    </>
  );
}

/* ── diagonal — a slanted signal edge slices across the frame ─ */
function Diagonal({ p, renderIntro, detail }: RevealProps) {
  // x-position (%) of the slash's top end; its bottom end trails by 20%
  const e = useTransform(p, [0.22, 0.52], [120, -20]);
  const eBottom = useTransform(e, (v) => v - 20);
  const introClip = useTransform(e, (v) => `polygon(0 0, ${v}% 0, ${v - 20}% 100%, 0 100%)`);
  const detailClip = useTransform(e, (v) => `polygon(${v}% 0, 100% 0, 100% 100%, ${v - 20}% 100%)`);
  const lineOpacity = useTransform(p, [0.2, 0.25, 0.47, 0.52], [0, 1, 1, 0]);
  const dExit = useDetailExit(p);
  const pe = useDetailPointer(p);
  return (
    <>
      <motion.div style={{ clipPath: introClip }} className={INTRO}>
        {renderIntro()}
      </motion.div>
      <motion.div style={{ clipPath: detailClip, opacity: dExit, pointerEvents: pe }} className={DETAIL}>
        {detail}
      </motion.div>
      <motion.svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ opacity: lineOpacity }}
        className="pointer-events-none absolute inset-0 z-30 h-full w-full text-accent"
      >
        <motion.line
          x1={e}
          y1={0}
          x2={eBottom}
          y2={100}
          stroke="currentColor"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      </motion.svg>
    </>
  );
}

/* ── crt — the title collapses to a scanline, the case study powers on ─ */
function Crt({ p, renderIntro, detail }: RevealProps) {
  const iScaleY = useTransform(p, [0.2, 0.36], [1, 0.01]);
  const iScaleX = useTransform(p, [0.2, 0.36], [1, 1.2]);
  const iOpacity = useTransform(p, [0.34, 0.4], [1, 0]);
  const lineScale = useTransform(p, [0.32, 0.38, 0.42], [0.2, 1, 0]);
  const lineOpacity = useTransform(p, [0.32, 0.36, 0.42], [0, 1, 0]);
  const dScaleY = useTransform(p, [0.4, 0.52], [0.01, 1]);
  const dOpacity = useTransform(p, [0.39, 0.42, 0.86, 0.96], [0, 1, 1, 0]);
  const pe = useDetailPointer(p);
  return (
    <>
      <motion.div style={{ scaleY: iScaleY, scaleX: iScaleX, opacity: iOpacity }} className={INTRO}>
        {renderIntro()}
      </motion.div>
      <motion.div style={{ scaleY: dScaleY, opacity: dOpacity, pointerEvents: pe }} className={DETAIL}>
        {detail}
      </motion.div>
      <motion.div
        aria-hidden
        style={{ scaleX: lineScale, opacity: lineOpacity }}
        className="pointer-events-none absolute inset-x-0 top-1/2 z-30 h-px bg-chalk"
      />
    </>
  );
}

export const REVEALS: Record<SceneReveal, (props: RevealProps) => JSX.Element> = {
  diagonal: Diagonal,
  crt: Crt,
  zoom: Zoom,
  split: Split,
  flip: Flip,
  blinds: Blinds,
  scan: Scan,
  iris: Iris,
  tiles: Tiles,
  slide: Slide,
  stack: Stack,
  decode: Decode,
};
