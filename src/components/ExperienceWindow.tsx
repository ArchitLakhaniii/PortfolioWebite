"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { projects, type Experience, type ExperienceOpen } from "@/data/profile";
import { hasDetail } from "@/data/projectDetails";
import { ArrowIcon } from "./Icons";

export type Rect = { x: number; y: number; w: number; h: number };
/** Where a window comes from: the clicked row and its small window icon. */
export type Origin = { row: Rect; icon: Rect };
type Geom = Origin & { win: Rect };
type EffectProps = { t: MotionValue<number>; geom: Geom; children: ReactNode };

export const toRect = (r: DOMRect): Rect => ({ x: r.left, y: r.top, w: r.width, h: r.height });

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
const pad = (n: number) => String(n).padStart(2, "0");
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOutCubic = (v: number) => 1 - Math.pow(1 - v, 3);
const easeInOutCubic = (v: number) => (v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2);

// Opening durations in seconds. `t` runs linearly 0 → 1 and each effect
// applies its own easing; closing plays the same curve backwards, faster.
const DURATION: Record<ExperienceOpen | "fade", number> = {
  genie: 0.8,
  morph: 0.65,
  flip: 0.7,
  blinds: 0.75,
  scan: 0.75,
  crt: 0.75,
  iris: 0.7,
  tiles: 0.8,
  fade: 0.2,
};

/* ── genie — pours out of the row's icon like a macOS dock restore ─ */

/** Window silhouette pinched toward a point; f = 1 fully pinched, 0 = rectangle. */
function funnelPath(f: number, nearBottom: boolean, srcX: number, narrow: number) {
  const N = 18;
  const left: string[] = [];
  const right: string[] = [];
  for (let r = 0; r <= N; r++) {
    const yN = r / N;
    const s = nearBottom ? yN : 1 - yN; // 1 at the edge nearest the source
    const k = s * s * (3 - 2 * s);
    const pull = f * (0.35 + 0.65 * k);
    const w = 1 - (1 - narrow) * pull;
    const cx = 0.5 + (srcX - 0.5) * pull;
    const y = (yN * 100).toFixed(2);
    left.push(`${((cx - w / 2) * 100).toFixed(2)}% ${y}%`);
    right.unshift(`${((cx + w / 2) * 100).toFixed(2)}% ${y}%`);
  }
  return `polygon(${left.concat(right).join(", ")})`;
}

function Genie({ t, geom, children }: EffectProps) {
  const { icon, win } = geom;
  const W = Math.max(win.w, 1);
  const srcCx = icon.x + icon.w / 2;
  const srcCy = icon.y + icon.h / 2;
  const nearBottom = srcCy >= win.y + win.h / 2;
  const anchorY = nearBottom ? win.y + win.h : win.y;
  // keep the pinched end inside the window, then slide the window so it starts over the icon
  const srcX = Math.min(0.92, Math.max(0.08, (srcCx - win.x) / W));
  const shiftX = srcCx - (win.x + srcX * W);
  const narrow = Math.max(icon.w / W, 0.04);

  // stretch out of the icon first, then let the sides bloom open
  const lift = useTransform(t, (v) => easeOutCubic(clamp01(v / 0.7)));
  const x = useTransform(lift, (l) => shiftX * (1 - l));
  const y = useTransform(lift, (l) => (srcCy - anchorY) * (1 - l));
  const scaleY = useTransform(lift, (l) => 0.05 + 0.95 * l);
  const clipPath = useTransform(t, (v) =>
    funnelPath(1 - easeInOutCubic(clamp01((v - 0.12) / 0.88)), nearBottom, srcX, narrow)
  );
  return (
    <motion.div
      style={{ x, y, scaleY, clipPath, transformOrigin: nearBottom ? "50% 100%" : "50% 0%" }}
      className="relative"
    >
      {children}
    </motion.div>
  );
}

/* ── morph — the row itself grows into the window ─────────── */
function Morph({ t, geom, children }: EffectProps) {
  const { row, win } = geom;
  const W = Math.max(win.w, 1);
  const H = Math.max(win.h, 1);
  const dx = row.x + row.w / 2 - (win.x + W / 2);
  const dy = row.y + row.h / 2 - (win.y + H / 2);
  const sx0 = Math.min(row.w / W, 1.4);
  const sy0 = Math.min(row.h / H, 1);
  const e = useTransform(t, [0, 1], [0, 1], { ease: easeOutCubic });
  const x = useTransform(e, (v) => dx * (1 - v));
  const y = useTransform(e, (v) => dy * (1 - v));
  const scaleX = useTransform(e, (v) => sx0 + (1 - sx0) * v);
  const scaleY = useTransform(e, (v) => sy0 + (1 - sy0) * v);
  const content = useTransform(t, [0.5, 0.9], [0, 1]);
  return (
    <motion.div style={{ x, y, scaleX, scaleY }} className="relative">
      {/* outline that carries the shape while the content fades in */}
      <div aria-hidden className="absolute inset-0 border border-accent bg-ink" />
      <motion.div style={{ opacity: content }} className="relative">
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ── flip — swings open on a hinge like a door ────────────── */
function Flip({ t, children }: EffectProps) {
  const rotateY = useTransform(t, [0, 1], [-100, 0], { ease: easeOutCubic });
  const opacity = useTransform(t, [0, 0.3], [0, 1]);
  return (
    <motion.div style={{ rotateY, opacity, transformPerspective: 1400, originX: 0 }} className="relative">
      {children}
    </motion.div>
  );
}

/* ── blinds — shutter slats rotate away to reveal the window ─ */
const SLATS = 9;
function Slat({ t, i }: { t: MotionValue<number>; i: number }) {
  const a = i * 0.045;
  const scaleY = useTransform(t, [a, a + 0.55], [1, 0], { ease: easeInOutCubic });
  return (
    <motion.div
      style={{
        scaleY,
        originY: i % 2 ? 1 : 0,
        top: `${(i / SLATS) * 100}%`,
        height: `${100 / SLATS + 0.5}%`,
      }}
      className="absolute inset-x-0 border-b border-line bg-surface"
    />
  );
}
function Blinds({ t, children }: EffectProps) {
  const opacity = useTransform(t, [0, 0.12], [0, 1]);
  return (
    <motion.div style={{ opacity }} className="relative">
      {children}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: SLATS }, (_, i) => (
          <Slat key={i} t={t} i={i} />
        ))}
      </div>
    </motion.div>
  );
}

/* ── scan — a signal line prints the window top to bottom ─── */
function Scan({ t, children }: EffectProps) {
  const e = useTransform(t, [0, 1], [0, 1], { ease: easeInOutCubic });
  const clipPath = useTransform(e, (v) => `inset(0 0 ${((1 - v) * 100).toFixed(2)}% 0)`);
  const top = useTransform(e, (v) => `${(v * 100).toFixed(2)}%`);
  const lineOpacity = useTransform(t, [0, 0.04, 0.9, 1], [0, 1, 1, 0]);
  const readout = useTransform(e, (v) => `SCAN ${String(Math.round(v * 100)).padStart(3, "0")}%`);
  return (
    <div className="relative">
      <motion.div style={{ clipPath }}>{children}</motion.div>
      <motion.div
        aria-hidden
        style={{ top, opacity: lineOpacity }}
        className="pointer-events-none absolute inset-x-0 h-px bg-accent"
      >
        <motion.span className="absolute -top-5 right-3 font-mono text-[10px] tracking-label text-accent">
          {readout}
        </motion.span>
      </motion.div>
    </div>
  );
}

/* ── crt — a scanline powers on into the full window ──────── */
function Crt({ t, children }: EffectProps) {
  const scaleX = useTransform(t, [0, 0.35], [0.03, 1], { ease: easeOutCubic });
  const scaleY = useTransform(t, [0.3, 0.8], [0.008, 1], { ease: easeOutCubic });
  const flash = useTransform(t, [0.2, 0.38, 0.8], [0, 0.85, 0]);
  const content = useTransform(t, [0.55, 0.95], [0, 1]);
  return (
    <motion.div style={{ scaleX, scaleY }} className="relative">
      <div aria-hidden className="absolute inset-0 border border-line bg-ink" />
      <motion.div style={{ opacity: content }} className="relative">
        {children}
      </motion.div>
      <motion.div aria-hidden style={{ opacity: flash }} className="pointer-events-none absolute inset-0 bg-chalk" />
    </motion.div>
  );
}

/* ── iris — a circular aperture opens from the row's icon ─── */
function Iris({ t, geom, children }: EffectProps) {
  const { icon, win } = geom;
  const cx = icon.x + icon.w / 2 - win.x;
  const cy = icon.y + icon.h / 2 - win.y;
  const R = Math.max(
    Math.hypot(cx, cy),
    Math.hypot(win.w - cx, cy),
    Math.hypot(cx, win.h - cy),
    Math.hypot(win.w - cx, win.h - cy),
    1
  );
  const e = useTransform(t, [0, 1], [0, 1], { ease: easeInOutCubic });
  const clipPath = useTransform(e, (v) => `circle(${(v * R).toFixed(1)}px at ${cx.toFixed(1)}px ${cy.toFixed(1)}px)`);
  const ringOpacity = useTransform(t, [0, 0.1, 0.8, 1], [0, 1, 0.6, 0]);
  return (
    <div className="relative">
      <motion.div style={{ clipPath }}>{children}</motion.div>
      <motion.div
        aria-hidden
        style={{ scale: e, opacity: ringOpacity, left: cx - R, top: cy - R, width: R * 2, height: R * 2 }}
        className="pointer-events-none absolute rounded-full border border-accent"
      />
    </div>
  );
}

/* ── tiles — blocks dissolve in scrambled order ───────────── */
const TCOLS = 6;
const TROWS = 5;
const TN = TCOLS * TROWS;
const TORDER = Array.from({ length: TN }, (_, i) => (i * 7 + 3) % TN); // 7 is coprime to 30
function Tile({ t, i }: { t: MotionValue<number>; i: number }) {
  const a = (TORDER[i] / TN) * 0.55;
  const scale = useTransform(t, [a, a + 0.3], [1, 0], { ease: easeInOutCubic });
  const col = i % TCOLS;
  const row = Math.floor(i / TCOLS);
  return (
    <motion.div
      style={{
        scale,
        left: `${(col / TCOLS) * 100}%`,
        top: `${(row / TROWS) * 100}%`,
        width: `${100 / TCOLS + 0.2}%`,
        height: `${100 / TROWS + 0.2}%`,
      }}
      className={`absolute border border-line ${TORDER[i] % 9 === 0 ? "bg-accent" : "bg-surface"}`}
    />
  );
}
function Tiles({ t, children }: EffectProps) {
  const opacity = useTransform(t, [0, 0.1], [0, 1]);
  return (
    <motion.div style={{ opacity }} className="relative">
      {children}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: TN }, (_, i) => (
          <Tile key={i} t={t} i={i} />
        ))}
      </div>
    </motion.div>
  );
}

/* ── fade — reduced-motion fallback ───────────────────────── */
function Fade({ t, children }: EffectProps) {
  return (
    <motion.div style={{ opacity: t }} className="relative">
      {children}
    </motion.div>
  );
}

const EFFECTS: Record<ExperienceOpen | "fade", (props: EffectProps) => JSX.Element> = {
  genie: Genie,
  morph: Morph,
  flip: Flip,
  blinds: Blinds,
  scan: Scan,
  crt: Crt,
  iris: Iris,
  tiles: Tiles,
  fade: Fade,
};

const FOCUSABLE = "a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])";

/**
 * A HUD window with one role's details, opened from its row with the
 * role's own animation (`exp.open`). Closes on Esc, the close button, or
 * a backdrop click, playing the animation backwards before `onClosed`.
 * Rendered in a portal so no transformed ancestor can offset it.
 */
export default function ExperienceWindow({
  exp,
  index,
  origin,
  onClosed,
}: {
  exp: Experience;
  index: number;
  origin: Origin;
  onClosed: () => void;
}) {
  const reduce = useReducedMotion();
  const effect: ExperienceOpen | "fade" = reduce ? "fade" : exp.open ?? "morph";
  const Effect = EFFECTS[effect];
  const t = useMotionValue(0);
  const backdrop = useTransform(t, [0, 0.4], [0, 1]);
  const frameRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onClosedRef = useRef(onClosed);
  onClosedRef.current = onClosed;
  const closing = useRef(false);
  const [geom, setGeom] = useState<Geom | null>(null);
  const titleId = useId();

  // measure the window's resting box before the first paint
  useIsoLayoutEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    setGeom({ ...origin, win: toRect(el.getBoundingClientRect()) });
  }, [origin]);

  // play the opening animation once measured
  useEffect(() => {
    if (!geom) return;
    closeRef.current?.focus({ preventScroll: true });
    const controls = animate(t, 1, { duration: DURATION[effect], ease: "linear" });
    return () => controls.stop();
  }, [geom, effect, t]);

  // Close plays the animation backwards, then unmounts. A fallback timer
  // guarantees the close finishes even if animation frames are paused
  // (e.g. a background tab), so Esc / × never leave a stuck window.
  const finished = useRef(false);
  const fallback = useRef<number | undefined>(undefined);
  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    window.clearTimeout(fallback.current);
    onClosedRef.current();
  }, []);
  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    const duration = DURATION[effect] * 0.7;
    animate(t, 0, { duration, ease: "linear", onComplete: finish });
    fallback.current = window.setTimeout(finish, duration * 1000 + 250);
  }, [effect, t, finish]);
  useEffect(() => () => window.clearTimeout(fallback.current), []);

  // lock page scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Esc closes; Tab stays inside the window
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab" || !frameRef.current) return;
      const items = Array.from(frameRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [close]);

  const caseStudy =
    exp.caseStudy && hasDetail(exp.caseStudy)
      ? projects.find((p) => p.id === exp.caseStudy)
      : undefined;

  const body = (
    <div className="max-h-[86svh] overflow-y-auto border border-line bg-ink shadow-[0_40px_120px_-20px_rgba(0,0,0,0.85)]">
      {/* window chrome */}
      <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-ink/95 px-5 py-3 font-mono text-[10px] uppercase tracking-label text-faint backdrop-blur">
        <span className="flex min-w-0 items-center gap-2.5">
          <span className="h-1.5 w-1.5 shrink-0 bg-accent" />
          <span className="truncate">
            /{pad(index + 1)} · {effect}
          </span>
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={close}
          aria-label="Close"
          className="flex shrink-0 items-center gap-2 transition-colors hover:text-accent"
        >
          <span aria-hidden className="hidden sm:inline">
            Esc
          </span>
          <span aria-hidden className="grid h-7 w-7 place-items-center rounded-sm border border-line">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-3.5 w-3.5">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </span>
        </button>
      </div>

      <div className="p-6 sm:p-10">
        <p className="font-mono text-[11px] uppercase tracking-label text-accent">{exp.company}</p>
        <h3
          id={titleId}
          className="font-wide mt-3 text-2xl uppercase leading-tight text-chalk sm:text-[2.5rem]"
        >
          {exp.role}
        </h3>
        <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[11px] uppercase tracking-label text-faint">
          <span>{exp.date}</span>
          <span>{exp.location}</span>
        </p>

        {exp.metrics && exp.metrics.length > 0 && (
          <div className="mt-8 grid grid-cols-2 border-l border-t border-line sm:grid-cols-3">
            {exp.metrics.map((m) => (
              <div key={m.label} className="border-b border-r border-line p-4">
                <p className="font-dot text-2xl text-accent sm:text-3xl">{m.value}</p>
                <p className="mt-1.5 text-xs leading-snug text-faint">{m.label}</p>
              </div>
            ))}
          </div>
        )}

        <ul className="mt-8 space-y-3">
          {exp.bullets.map((b, i) => (
            <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-ghost">
              <span className="mt-2.5 h-1 w-1 shrink-0 bg-accent" />
              {b}
            </li>
          ))}
        </ul>

        {exp.tags && exp.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-1.5">
            {exp.tags.map((tag) => (
              <span key={tag} className="rounded-sm border border-line px-2 py-0.5 font-mono text-[10px] text-ghost">
                {tag}
              </span>
            ))}
          </div>
        )}

        {caseStudy && (
          <Link
            href={`/work/${caseStudy.id}`}
            className="group mt-8 inline-flex items-center gap-2 rounded-sm bg-accent px-4 py-2 text-sm font-medium text-void transition-colors duration-300 hover:bg-chalk"
          >
            Read more — {caseStudy.title} case study
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        )}
      </div>
    </div>
  );

  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[90] overflow-hidden">
      <motion.div
        aria-hidden
        style={{ opacity: backdrop }}
        onClick={close}
        className="absolute inset-0 bg-void/80 backdrop-blur-sm"
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-3 sm:p-8">
        <div
          ref={frameRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="pointer-events-auto relative w-full max-w-3xl"
          style={{ visibility: geom ? "visible" : "hidden" }}
        >
          {geom ? (
            <Effect t={t} geom={geom}>
              {body}
            </Effect>
          ) : (
            body
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
