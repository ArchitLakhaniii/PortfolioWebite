import { achievements } from "@/data/profile";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

export default function Achievements() {
  return (
    <Section id="achievements">
      <SectionHeader
        num="05"
        title="Recognition"
        kicker="Achievements"
        sub="Funding, awards, publications, and impact."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((a, i) => (
          <Reveal key={a.title} delay={(i % 3) * 80} className="h-full">
            <div className="panel panel-hover flex h-full flex-col p-7">
              <span className="w-fit font-mono text-[10px] uppercase tracking-label text-accent">
                {a.tag.toUpperCase()}
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold leading-snug text-chalk">
                {a.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ghost">{a.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
