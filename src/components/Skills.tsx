import { skills } from "@/data/profile";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

const pad = (n: number) => String(n).padStart(2, "0");
const total = skills.reduce((n, g) => n + g.items.length, 0);

export default function Skills() {
  return (
    <Section id="skills">
      <SectionHeader
        num="04"
        title="Toolkit"
        kicker="Skills"
        meta={`${total} items · ${pad(skills.length)} groups`}
        sub="The stack I reach for when building."
      />
      <div className="border-t border-line">
        {skills.map((g, i) => (
          <Reveal key={g.group} delay={(i % 3) * 60} y={16}>
            <div className="group grid gap-5 border-b border-line py-8 md:grid-cols-[16rem_1fr] md:gap-10">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[11px] text-faint transition-colors group-hover:text-accent">
                  /{pad(i + 1)}
                </span>
                <p className="font-wide text-base uppercase text-chalk">{g.group}</p>
                <span className="font-mono text-[11px] text-faint">({g.items.length})</span>
              </div>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li
                    key={s}
                    className="rounded-sm border border-line bg-white/[0.015] px-3 py-1.5 font-mono text-[12px] text-ghost transition-colors duration-300 hover:border-accent hover:text-chalk"
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
