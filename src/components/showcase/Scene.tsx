"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import type { Scene as SceneData } from "@/data/profile";
import { hasDetail, scenePreview } from "@/data/projectDetails";
import useDesktopScrub from "@/hooks/useDesktopScrub";
import Reveal from "../Reveal";
import SceneVisual from "./SceneVisual";
import { RichText } from "../detail/RichBlocks";
import { GitHubIcon, ArrowIcon } from "../Icons";

const pad = (n: number) => String(n).padStart(2, "0");

/* ── shared text fragments ───────────────────────────────── */

function Metrics({ metrics }: { metrics?: SceneData["metrics"] }) {
  if (!metrics?.length) return null;
  return (
    <div className="flex flex-wrap gap-x-8 gap-y-4">
      {metrics.map((m) => (
        <div key={m.label}>
          <p className="font-display text-2xl font-semibold tracking-tight text-chalk sm:text-3xl">
            {m.value}
          </p>
          <p className="mt-1 text-xs text-ghost">{m.label}</p>
        </div>
      ))}
    </div>
  );
}

/** Compact, single-row metrics for the zoomed-in preview card. */
function MetricsInline({ metrics }: { metrics?: SceneData["metrics"] }) {
  if (!metrics?.length) return null;
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2">
      {metrics.map((m) => (
        <div key={m.label} className="flex items-baseline gap-2">
          <span className="font-display text-lg font-semibold tracking-tight text-chalk">
            {m.value}
          </span>
          <span className="text-xs text-faint">{m.label}</span>
        </div>
      ))}
    </div>
  );
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((t) => (
        <span
          key={t}
          className="rounded-md border border-line px-2 py-0.5 font-mono text-[10px] text-ghost"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function SourceLink({ scene }: { scene: SceneData }) {
  if (!scene.github) return null;
  return (
    <a
      href={scene.github}
      target="_blank"
      rel="noreferrer"
      aria-label={`${scene.title} on GitHub`}
      className="link-underline inline-flex items-center gap-2 text-sm text-ghost transition-colors hover:text-chalk"
    >
      <GitHubIcon className="h-4 w-4" /> Source
    </a>
  );
}

function SceneActions({ scene }: { scene: SceneData }) {
  const detail = hasDetail(scene.id);
  if (!detail && !scene.github) return null;
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      {detail && (
        <Link
          href={`/work/${scene.id}`}
          className="group inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium text-chalk transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.03]"
        >
          View details
          <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      )}
      <SourceLink scene={scene} />
    </div>
  );
}

/* ── desktop: pinned, scroll-scrubbed scene ──────────────── */

function SceneScrub({
  scene,
  index,
  total,
}: {
  scene: SceneData;
  index: number;
  total: number;
}) {
  const runwayRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: runwayRef,
    offset: ["start start", "end end"],
  });
  const p = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });

  // phase map — centered title → zoom in → view-details → handoff
  const introOpacity = useTransform(p, [0, 0.22, 0.4], [1, 1, 0]);
  const introScale = useTransform(p, [0, 0.4], [1, 1.6]);
  const introY = useTransform(p, [0, 0.4], [0, -24]);

  const detailOpacity = useTransform(p, [0.34, 0.48, 0.86, 0.96], [0, 1, 1, 0]);
  const detailScale = useTransform(p, [0.34, 0.52], [0.9, 1]);
  const detailY = useTransform(p, [0.34, 0.52], [44, 0]);
  const detailPointer = useTransform(p, (v) => (v > 0.44 && v < 0.9 ? "auto" : "none"));

  // ambient hue backdrop — breathes as the scene deepens
  const glowOpacity = useTransform(p, [0, 0.5, 1], [0.35, 0.9, 0.9]);
  const glowScale = useTransform(p, [0, 1], [1, 1.35]);

  const stageOpacity = useTransform(p, [0.92, 1], [1, 0]);

  // real case-study content the scene zooms into
  const preview = scenePreview(scene.id);
  const overview = preview.overview ?? scene.summary;
  const { hue } = scene;

  return (
    <div ref={runwayRef} className="relative h-[240vh]">
      <div className="sticky top-0 h-svh overflow-hidden bg-ink">
        <motion.div style={{ opacity: stageOpacity }} className="relative h-full w-full">
          {/* ambient hue backdrop — no numeral, no side panel */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: `radial-gradient(130% 100% at 50% 42%, hsl(${hue} 32% 9%) 0%, #08080c 58%, #070709 100%)`,
            }}
          />
          <motion.div
            aria-hidden
            className="absolute left-1/2 top-[42%] h-[85vh] w-[85vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px]"
            style={{
              opacity: glowOpacity,
              scale: glowScale,
              background: `hsla(${hue} 80% 62% / 0.16)`,
            }}
          />

          {/* intro — the centered title we zoom into */}
          <motion.div
            style={{ opacity: introOpacity, scale: introScale, y: introY }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
          >
            <div className="flex items-center gap-3 text-faint">
              <span className="font-mono text-xs tracking-label">
                {pad(index + 1)} <span className="text-faint/60">/ {pad(total)}</span>
              </span>
              <span className="h-px w-6 bg-line" />
              <span className="eyebrow">{scene.kicker}</span>
            </div>
            <h3 className="mt-6 max-w-4xl text-balance font-display text-5xl font-semibold leading-[0.98] tracking-tightest text-chalk md:text-6xl xl:text-7xl">
              {scene.title}
            </h3>
            <p className="mt-4 text-base font-medium text-accent md:text-lg">
              {scene.subtitle}
            </p>
          </motion.div>

          {/* view-details — condensed case study, centered */}
          <motion.div
            style={{ opacity: detailOpacity, scale: detailScale, y: detailY, pointerEvents: detailPointer }}
            className="absolute inset-0 z-20 flex items-center justify-center px-6"
          >
            <div className="mx-auto w-full max-w-2xl">
              <div className="flex items-center gap-3 text-faint">
                <span className="font-mono text-xs tracking-label">
                  {pad(index + 1)} <span className="text-faint/60">/ {pad(total)}</span>
                </span>
                <span className="h-px w-6 bg-line" />
                <span className="eyebrow">{scene.kicker}</span>
              </div>

              <h4 className="mt-4 font-display text-4xl font-semibold leading-[1.0] tracking-tightest text-chalk xl:text-5xl">
                {scene.title}
              </h4>
              <p className="mt-2 text-sm font-medium text-accent">{scene.subtitle}</p>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-ghost">{overview}</p>

              {preview.highlights.length > 0 && (
                <ul className="mt-6 space-y-2.5">
                  {preview.highlights.map((h, i) => (
                    <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-ghost">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span className="line-clamp-1">
                        <RichText text={h} />
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {scene.metrics && (
                <div className="mt-6">
                  <MetricsInline metrics={scene.metrics} />
                </div>
              )}

              <div className="mt-6">
                <Tags tags={scene.tags} />
              </div>

              <div className="mt-8">
                <SceneActions scene={scene} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

/* ── mobile / reduced-motion: stacked card ───────────────── */

function SceneStatic({
  scene,
  index,
  total,
}: {
  scene: SceneData;
  index: number;
  total: number;
}) {
  return (
    <div className="mx-auto max-w-content px-6 py-12 sm:px-8">
      <Reveal>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line sm:aspect-[16/10]">
          <SceneVisual scene={scene} index={index} />
        </div>
      </Reveal>
      <Reveal delay={90}>
        <div className="mt-7">
          <div className="flex items-center gap-3 text-faint">
            <span className="font-mono text-xs tracking-label">
              {pad(index + 1)} <span className="text-faint/60">/ {pad(total)}</span>
            </span>
            <span className="h-px w-6 bg-line" />
            <span className="eyebrow">{scene.kicker}</span>
          </div>
          <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight text-chalk">
            {scene.title}
          </h3>
          <p className="mt-2 text-sm font-medium text-accent">{scene.subtitle}</p>
          <p className="mt-4 text-base leading-relaxed text-ghost">{scene.summary}</p>
          {scene.metrics && (
            <div className="mt-6">
              <Metrics metrics={scene.metrics} />
            </div>
          )}
          <div className="mt-6">
            <Tags tags={scene.tags} />
          </div>
          <div className="mt-7">
            <SceneActions scene={scene} />
          </div>
        </div>
      </Reveal>
    </div>
  );
}

/* ── public component ────────────────────────────────────── */

export default function Scene(props: {
  scene: SceneData;
  index: number;
  total: number;
}) {
  const scrub = useDesktopScrub();
  return scrub ? <SceneScrub {...props} /> : <SceneStatic {...props} />;
}
