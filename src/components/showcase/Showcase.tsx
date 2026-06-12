import { projects, scenes } from "@/data/profile";
import SectionHeader from "../SectionHeader";
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
    <section id="projects" className="relative scroll-mt-24">
      <div className="mx-auto max-w-content px-6 pb-4 pt-28 sm:px-8 md:pt-36">
        <SectionHeader
          num="02"
          title="Selected Work"
          kicker="Selected Work"
          sub="Nine chapters — AI agent pipelines, iOS products, ML systems, teaching, and research. Scroll through each one."
        />
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
                const Row = (
                  <div className="grid grid-cols-1 items-baseline gap-2 py-6 sm:grid-cols-[1fr_auto]">
                    <div>
                      <h4 className="text-lg font-medium text-chalk transition-colors group-hover:text-accent">
                        {p.title}
                      </h4>
                      <p className="mt-1 text-sm text-faint">{p.role}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="hidden font-mono text-[11px] text-ghost sm:inline">
                        {p.tags.slice(0, 3).join(" · ")}
                      </span>
                      {p.highlight && (
                        <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[10px] text-ghost">
                          {p.highlight}
                        </span>
                      )}
                      {p.github && (
                        <ArrowIcon className="h-4 w-4 text-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-chalk" />
                      )}
                    </div>
                  </div>
                );
                return (
                  <li key={p.id} className="border-b border-line">
                    {p.github ? (
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
