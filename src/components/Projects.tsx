"use client";

import { useState } from "react";
import { projects, type Project } from "@/data/profile";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import { GitHubIcon, ArrowIcon } from "./Icons";

const filters = [
  { key: "all", label: "All" },
  { key: "ai", label: "AI / ML" },
  { key: "ios", label: "iOS" },
  { key: "backend", label: "Backend" },
  { key: "web", label: "Web" },
  { key: "startup", label: "Startup" },
  { key: "research", label: "Research" },
] as const;

function ProjectCard({ p, index }: { p: Project; index: number }) {
  return (
    <Reveal delay={(index % 3) * 90}>
      <article className="glass glass-hover group relative flex h-full flex-col overflow-hidden rounded-2xl p-6">
        {p.featured && (
          <div className="absolute inset-x-0 top-0 glow-line opacity-70" />
        )}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl font-semibold text-white transition-colors group-hover:text-neon">
              {p.title}
            </h3>
            <p className="mt-1 font-mono text-[11px] tracking-wide text-faint">{p.role}</p>
          </div>
          {p.featured && (
            <span className="shrink-0 rounded-full border border-violet/40 bg-violet/10 px-2.5 py-0.5 font-mono text-[10px] text-violet">
              FEATURED
            </span>
          )}
        </div>

        <p className="mt-4 flex-1 text-sm leading-relaxed text-ghost">{p.description}</p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <span
              key={t}
              className="rounded-md border border-line bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-ghost"
            >
              {t}
            </span>
          ))}
        </div>

        {(p.highlight || p.github || p.link) && (
          <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
            {p.highlight ? (
              <span className="font-mono text-[11px] text-neon">◆ {p.highlight}</span>
            ) : (
              <span />
            )}
            <span className="flex items-center gap-3">
              {p.github && (
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${p.title} on GitHub`}
                  className="text-ghost transition-colors hover:text-neon"
                >
                  <GitHubIcon />
                </a>
              )}
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${p.title} live link`}
                  className="text-ghost transition-colors hover:text-neon"
                >
                  <ArrowIcon />
                </a>
              )}
            </span>
          </div>
        )}
      </article>
    </Reveal>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<string>("all");

  const visible = projects.filter(
    (p) => filter === "all" || p.categories.includes(filter as Project["categories"][number])
  );

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeader
        num="02"
        title="Featured Projects"
        sub="AI agents, LLM pipelines, iOS apps, and full-stack products — built to ship, not just to demo."
      />

      <Reveal className="mb-10">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-lg border px-4 py-1.5 font-mono text-xs transition-all ${
                filter === f.key
                  ? "border-neon/60 bg-neon/10 text-neon"
                  : "border-line bg-transparent text-ghost hover:border-neon/30 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p, i) => (
          <ProjectCard key={p.id} p={p} index={i} />
        ))}
      </div>
    </section>
  );
}
