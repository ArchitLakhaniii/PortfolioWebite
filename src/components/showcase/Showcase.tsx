import Link from "next/link";
import { projects, scenes } from "@/data/profile";
import { hasDetail } from "@/data/projectDetails";
import Reveal from "../Reveal";
import Scene from "./Scene";
import { ArrowIcon } from "../Icons";

/**
 * The cinematic reel: a header, one pinned scroll-driven Scene per
 * curated activity, and a compact index of the remaining work.
 *
 * NOTE: scenes must stay direct children of plain (untransformed)
 * elements — wrapping them in Reveal/motion would break their
 * `position: sticky` stages.
 */
export default function Showcase() {
  const sceneIds = new Set(scenes.map((s) => s.id));
  const moreWork = projects.filter((p) => !sceneIds.has(p.id));

  return (
    <section id="projects" className="relative">
      {/* centered entry heading — marks the start of the chapters */}
      <div className="relative mx-auto max-w-content px-6 pb-16 pt-28 text-center sm:px-8 md:pb-24 md:pt-40">
        <span
          aria-hidden
          className="font-dot pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-[clamp(8rem,22vw,18rem)] leading-none text-chalk/[0.05]"
        >
          02
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
            {String(scenes.length).padStart(2, "0")} chapters · scroll to enter
          </p>
          <span aria-hidden className="mx-auto mt-10 block h-14 w-px bg-gradient-to-b from-accent to-transparent" />
        </Reveal>
      </div>

      {/* the reel — plain wrapper, no transforms (sticky inside) */}
      <div>
        {scenes.map((s, i) => (
          <Scene key={s.id} scene={s} index={i} total={scenes.length} />
        ))}
      </div>

      {/* more work — compact index */}
      {moreWork.length > 0 && (
        <div className="mx-auto max-w-content px-6 pb-28 pt-20 sm:px-8 md:pb-36">
          <Reveal>
            <p className="eyebrow mb-8">More work</p>
          </Reveal>
          <Reveal>
            <ul className="border-t border-line">
              {moreWork.map((p) => {
                const detail = hasDetail(p.id);
                const Row = (
                  <div className="grid grid-cols-1 items-baseline gap-2 py-6 sm:grid-cols-[1fr_auto]">
                    <div>
                      <h4 className="font-wide text-base uppercase text-chalk transition-colors group-hover:text-accent sm:text-lg">
                        {p.title}
                      </h4>
                      <p className="mt-1 text-sm text-faint">{p.role}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="hidden font-mono text-[11px] text-ghost sm:inline">
                        {p.tags.slice(0, 3).join(" · ")}
                      </span>
                      {p.highlight && (
                        <span className="rounded-sm border border-accent/40 px-2.5 py-0.5 font-mono text-[10px] text-accent">
                          {p.highlight}
                        </span>
                      )}
                      {detail && (
                        <span className="hidden items-center gap-1.5 font-mono text-[11px] text-faint transition-colors group-hover:text-chalk sm:inline-flex">
                          Case study
                        </span>
                      )}
                      {(detail || p.github) && (
                        <ArrowIcon className="h-4 w-4 text-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-chalk" />
                      )}
                    </div>
                  </div>
                );
                return (
                  <li key={p.id} className="border-b border-line">
                    {detail ? (
                      <Link href={`/work/${p.id}`} className="group block" aria-label={`${p.title} case study`}>
                        {Row}
                      </Link>
                    ) : p.github ? (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${p.title} on GitHub`}
                        className="group block"
                      >
                        {Row}
                      </a>
                    ) : (
                      <div className="group">{Row}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      )}
    </section>
  );
}
