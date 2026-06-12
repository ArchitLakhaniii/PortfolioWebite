import { profile } from "@/data/profile";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

const facts: [string, string][] = [
  ["institution", "Georgia Tech College of Computing"],
  ["degree", "B.S. Computer Science"],
  ["gpa", "4.00 / 4.00"],
  ["graduation", "December 2028"],
  ["focus", "AI · Agents · iOS · Backend · ML"],
];

export default function About() {
  return (
    <Section id="about">
      <SectionHeader num="01" title="About" kicker="About" />
      <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
        <Reveal>
          <div className="space-y-6">
            <p className="text-balance text-xl leading-relaxed text-chalk sm:text-2xl">
              {profile.about[0]}
            </p>
            {profile.about.slice(1).map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-ghost sm:text-lg">
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <dl className="border-t border-line">
            {facts.map(([k, v]) => (
              <div
                key={k}
                className="flex items-baseline justify-between gap-6 border-b border-line py-4"
              >
                <dt className="font-mono text-[11px] uppercase tracking-label text-faint">
                  {k}
                </dt>
                <dd className="text-right text-sm text-chalk">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
