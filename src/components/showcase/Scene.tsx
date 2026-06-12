"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import type { Scene as SceneData } from "@/data/profile";
import { hasDetail } from "@/data/projectDetails";
import useDesktopScrub from "@/hooks/useDesktopScrub";
import Reveal from "../Reveal";
import SceneVisual from "./SceneVisual";
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

  // phase map — framed → expand → immersed → handoff
  const visualScale = useTransform(p, [0, 0.2, 0.6, 1], [0.42, 0.45, 1, 1.04]);
  const visualX = useTransform(p, [0, 0.2, 0.6], ["26vw", "25vw", "0vw"]);
  const visualRadius = useTransform(p, [0.2, 0.6], [56, 0]);

  const introOpacity = useTransform(p, [0, 0.28, 0.42], [1, 1, 0]);
  const introY = useTransform(p, [0.28, 0.42], [0, -48]);
  const introDetailOpacity = useTransform(p, [0.02, 0.12, 0.28, 0.42], [0, 1, 1, 0]);
  const introPointer = useTransform(p, (v) => (v > 0.42 ? "none" : "auto"));

  const overlayOpacity = useTransform(p, [0.6, 0.72, 0.9, 0.98], [0, 1, 1, 0]);
  const overlayY = useTransform(p, [0.6, 0.72], [36, 0]);
  const overlayPointer = useTransform(p, (v) => (v > 0.62 && v < 0.95 ? "auto" : "none"));

  const stageOpacity = useTransform(p, [0.94, 1], [1, 0]);

  return (
    <div ref={runwayRef} className="relative h-[230vh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div style={{ opacity: stageOpacity }} className="relative h-full w-full">
          {/* visual — full-bleed element, framed right via scale + translate */}
          <motion.div
            style={{ scale: visualScale, x: visualX, borderRadius: visualRadius }}
            className="absolute inset-0 overflow-hidden border border-line will-change-transform"
          >
            <SceneVisual scene={scene} index={index} progress={p} />
          </motion.div>

          {/* intro column (framed phase) */}
          <motion.div
            style={{ opacity: introOpacity, y: introY, pointerEvents: introPointer }}
            className="absolute inset-y-0 left-0 z-10 flex w-[46vw] items-center pl-[7vw] pr-8"
          >
            <div>
              <div className="flex items-center gap-3 text-faint">
                <span className="font-mono text-xs tracking-label">
                  {pad(index + 1)} <span className="text-faint/60">/ {pad(total)}</span>
                </span>
                <span className="h-px w-6 bg-line" />
                <span className="eyebrow">{scene.kicker}</span>
              </div>
              <h3 className="mt-5 font-display text-4xl font-semibold leading-[1.02] tracking-tightest text-chalk xl:text-5xl">
                {scene.title}
              </h3>
              <p className="mt-3 text-sm font-medium text-accent">{scene.subtitle}</p>
              <motion.div style={{ opacity: introDetailOpacity }}>
                <p className="mt-5 max-w-md text-base leading-relaxed text-ghost">
                  {scene.summary}
                </p>
                <div className="mt-6">
                  <Tags tags={scene.tags} />
                </div>
                <div className="mt-7">
                  <SceneActions scene={scene} />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* overlay caption (immersed phase) */}
          <motion.div
            style={{ opacity: overlayOpacity, y: overlayY, pointerEvents: overlayPointer }}
            className="absolute inset-x-0 bottom-0 z-10 p-[7vw] pb-[9svh]"
          >
            <p className="eyebrow">{scene.subtitle}</p>
            <h4 className="mt-3 max-w-3xl font-display text-5xl font-semibold leading-[0.98] tracking-tightest text-chalk xl:text-6xl">
              {scene.title}
            </h4>
            <div className="mt-7">
              <Metrics metrics={scene.metrics} />
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
