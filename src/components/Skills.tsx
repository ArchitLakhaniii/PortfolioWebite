import { skills } from "@/data/profile";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

export default function Skills() {
  return (
    <Section id="skills">
      <SectionHeader
        num="04"
        title="Toolkit"
        kicker="Skills"
        sub="The stack I reach for when building."
      />
      <div className="grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((g, i) => (
          <Reveal key={g.group} delay={(i % 3) * 80}>
            <div className="border-t border-line pt-6">
              <p className="font-mono text-[11px] uppercase tracking-label text-faint">
                {g.group}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <span
                    key={s}
                    className="rounded-lg border border-line px-3 py-1 text-sm text-ghost transition-colors hover:border-white/20 hover:text-chalk"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
