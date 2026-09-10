import { skills } from "@/data/profile";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Skills() {
  return (
    <Section id="skills">
      <SectionHeader
        num="04"
        title="Toolkit"
        kicker="Skills"
        accent="what I build with."
        sub="The stack I reach for when building."
      />
      <div className="border-t border-line">
        {skills.map((g, i) => (
          <Reveal key={g.group} delay={(i % 3) * 60} y={16}>
            <div className="grid gap-5 border-b border-line py-8 md:grid-cols-[16rem_1fr] md:gap-10">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[11px] text-faint">/{pad(i + 1)}</span>
                <p className="font-wide text-base uppercase text-chalk">{g.group}</p>
                <span className="font-mono text-[11px] text-faint">({g.items.length})</span>
              </div>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-line px-3.5 py-1.5 text-sm text-ghost transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-chalk"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
