import { achievements } from "@/data/profile";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

const tagColors: Record<string, string> = {
  Startup: "border-magenta/40 bg-magenta/10 text-magenta",
  Award: "border-neon/40 bg-neon/10 text-neon",
  Academic: "border-violet/40 bg-violet/10 text-violet",
  Research: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
  Leadership: "border-amber-400/40 bg-amber-400/10 text-amber-300",
};

export default function Achievements() {
  return (
    <section id="achievements" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeader num="05" title="Achievements" sub="Funding, awards, publications, and impact." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((a, i) => (
          <Reveal key={a.title} delay={(i % 3) * 90}>
            <div className="glass glass-hover flex h-full flex-col rounded-2xl p-6">
              <span
                className={`w-fit rounded-full border px-2.5 py-0.5 font-mono text-[10px] ${
                  tagColors[a.tag] ?? "border-line bg-white/5 text-ghost"
                }`}
              >
                {a.tag.toUpperCase()}
              </span>
              <h3 className="mt-4 font-display text-base font-semibold leading-snug text-white">
                {a.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ghost">{a.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
