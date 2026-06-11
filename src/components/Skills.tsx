import { skills } from "@/data/profile";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeader num="04" title="Skills" sub="The stack I reach for when building." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((g, i) => (
          <Reveal key={g.group} delay={(i % 3) * 90}>
            <div className="glass glass-hover h-full rounded-2xl p-6">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-neon/80">{g.group}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <span
                    key={s}
                    className="rounded-lg border border-line bg-white/[0.03] px-3 py-1 text-xs text-ghost transition-colors hover:border-violet/40 hover:text-white"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
