import { achievements, spotlight } from "@/data/profile";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import CountUp from "./CountUp";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Achievements() {
  return (
    <Section id="achievements">
      <SectionHeader
        num="05"
        title="Recognition"
        kicker="Achievements"
        accent="along the way."
        sub="Funding, awards, publications, and impact."
      />

      {/* spotlight callout */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-accent/20 bg-accent/[0.035] px-7 py-10 sm:px-12 sm:py-14">
          <span
            aria-hidden
            className="text-outline-accent font-wide pointer-events-none absolute -bottom-[0.2em] right-[-0.04em] select-none text-[clamp(6rem,20vw,16rem)] leading-none"
          >
            {spotlight.watermark}
          </span>
          <div className="relative grid items-center gap-6 md:grid-cols-[auto_1fr] md:gap-14">
            <p className="font-wide text-[clamp(2.5rem,8vw,6rem)] leading-none text-chalk tabular-nums">
              <CountUp value={spotlight.value} />
            </p>
            <div className="max-w-md">
              <p className="font-mono text-[11px] uppercase tracking-label text-accent">
                {spotlight.label}
              </p>
              <p className="mt-3 text-base leading-relaxed text-ghost sm:text-lg">
                {spotlight.detail}
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* the full list */}
      <ul className="mt-14 border-t border-line">
        {achievements.map((a, i) => (
          <li key={a.title}>
            <Reveal delay={(i % 3) * 60} y={16}>
              <div className="group grid gap-2 border-b border-line py-7 md:grid-cols-[3.5rem_8rem_1fr_1.15fr] md:items-baseline md:gap-8">
                <span className="hidden font-mono text-[11px] text-faint md:block">/{pad(i + 1)}</span>
                <span className="font-mono text-[10px] uppercase tracking-label text-accent">
                  {a.tag.toUpperCase()}
                </span>
                <h3 className="font-display text-lg font-semibold leading-snug text-chalk transition-transform duration-500 group-hover:translate-x-1">
                  {a.title}
                </h3>
                <p className="text-sm leading-relaxed text-ghost">{a.detail}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
