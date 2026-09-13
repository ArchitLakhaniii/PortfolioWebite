import Link from "next/link";
import { projects } from "@/data/profile";
import { hasDetail } from "@/data/projectDetails";
import Section from "./Section";
import Reveal from "./Reveal";
import { ArrowIcon, GitHubIcon } from "./Icons";

const pad = (n: number) => String(n).padStart(2, "0");

/** Every project as a card, in data order (FlashFind first). */
export default function Projects() {
  return (
    <Section id="projects">
      {/* centered heading — marks the start of the projects */}
      <div className="relative mb-16 text-center md:mb-20">
        <span
          aria-hidden
          className="font-dot pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-[clamp(8rem,22vw,18rem)] leading-none text-chalk/[0.05]"
        >
          03
        </span>
        <Reveal className="relative">
          <div className="flex items-center justify-center gap-4 font-mono text-[11px] uppercase tracking-label">
            <span className="h-px w-10 bg-line sm:w-16" />
            <span className="flex items-center gap-2.5 text-chalk">
              <span className="h-1.5 w-1.5 bg-accent" />
              Work
            </span>
            <span className="h-px w-10 bg-line sm:w-16" />
          </div>
          <h2 className="font-wide mt-8 text-[clamp(2.75rem,10vw,8rem)] uppercase leading-[0.9] text-chalk">
            Projects
          </h2>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-label text-faint">
            {pad(projects.length)} projects · built, researched, founded
          </p>
        </Reveal>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => {
          const detail = hasDetail(p.id);
          return (
            <li key={p.id}>
              <Reveal delay={(i % 3) * 60} y={16} className="h-full">
                <article className="group relative flex h-full flex-col border border-line bg-white/[0.015] p-6 transition-colors duration-300 hover:border-accent/60">
                  <span
                    aria-hidden
                    className="hud-frame hud-frame-signal pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <div className="flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-label">
                    <span className="text-faint transition-colors group-hover:text-accent">/{pad(i + 1)}</span>
                    {p.highlight && (
                      <span className="rounded-sm border border-accent/40 px-2 py-0.5 text-accent">
                        {p.highlight}
                      </span>
                    )}
                  </div>
                  <h3 className="font-wide mt-5 text-xl uppercase leading-tight text-chalk">{p.title}</h3>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-label text-ghost">{p.role}</p>
                  <p className="mt-4 text-sm leading-relaxed text-ghost">{p.description}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-sm border border-line px-2 py-0.5 font-mono text-[10px] text-ghost">
                        {t}
                      </span>
                    ))}
                  </div>
                  {(detail || p.github) && (
                    <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6 text-sm">
                      {detail && (
                        <Link
                          href={`/work/${p.id}`}
                          aria-label={`Read more: ${p.title} case study`}
                          className="inline-flex items-center gap-1.5 text-chalk transition-colors hover:text-accent"
                        >
                          Read more
                          <ArrowIcon className="h-4 w-4" />
                        </Link>
                      )}
                      {p.github && (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${p.title} on GitHub`}
                          className="inline-flex items-center gap-1.5 text-ghost transition-colors hover:text-accent"
                        >
                          <GitHubIcon className="h-4 w-4" /> Source
                        </a>
                      )}
                    </div>
                  )}
                </article>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
