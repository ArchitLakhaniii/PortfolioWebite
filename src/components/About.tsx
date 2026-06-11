import { profile } from "@/data/profile";
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
    <section id="about" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeader num="01" title="About" />
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <div className="space-y-5 text-base leading-relaxed text-ghost">
            {profile.about.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="glass rounded-2xl p-6">
            <p className="mb-4 font-mono text-xs text-faint">// quick.facts</p>
            <ul className="space-y-4">
              {facts.map(([k, v]) => (
                <li key={k} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-neon to-violet" />
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-faint">{k}</p>
                    <p className="text-sm text-white">{v}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
