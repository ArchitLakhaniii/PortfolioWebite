import { experience } from "@/data/profile";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeader
        num="03"
        title="Experience"
        sub="Internships, teaching, research, and engineering roles."
      />
      <div className="relative ml-2 border-l border-line pl-8 sm:ml-4">
        {experience.map((e, i) => (
          <Reveal key={`${e.company}-${e.date}`} delay={i * 60} className="relative pb-12 last:pb-0">
            {/* timeline dot */}
            <span className="absolute -left-[37px] top-1.5 flex h-3.5 w-3.5 items-center justify-center sm:-left-[37px]">
              <span className="absolute h-3.5 w-3.5 rounded-full bg-neon/20" />
              <span className="h-1.5 w-1.5 rounded-full bg-neon shadow-[0_0_12px_2px_rgba(34,211,238,0.6)]" />
            </span>

            <div className="glass glass-hover rounded-2xl p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-lg font-semibold text-white">{e.company}</h3>
                <span className="font-mono text-xs text-neon/80">{e.date}</span>
              </div>
              <p className="mt-1 text-sm font-medium text-violet">{e.role}</p>
              <p className="mt-0.5 font-mono text-[11px] text-faint">{e.location}</p>
              <ul className="mt-4 space-y-2">
                {e.bullets.map((b, j) => (
                  <li key={j} className="flex gap-3 text-sm leading-relaxed text-ghost">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-faint" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
