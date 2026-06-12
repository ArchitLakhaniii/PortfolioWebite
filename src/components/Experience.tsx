import { experience } from "@/data/profile";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <Section id="experience">
      <SectionHeader
        num="03"
        title="Experience"
        kicker="Experience"
        sub="Every role at a glance — internships, research, teaching, and engineering."
      />

      <div className="border-t border-line">
        {experience.map((e, i) => (
          <Reveal key={`${e.company}-${e.date}`} delay={(i % 2) * 60}>
            <article className="grid grid-cols-1 gap-3 border-b border-line py-7 md:grid-cols-[1fr_2fr] md:gap-12">
              <div>
                <p className="font-mono text-xs tracking-label text-faint">{e.date}</p>
                <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-chalk">
                  {e.company}
                </h3>
                <p className="mt-1 text-sm text-accent">{e.role}</p>
                <p className="mt-1 text-xs text-faint">{e.location}</p>
              </div>
              <ul className="space-y-2 md:pt-1">
                {e.bullets.map((b, j) => (
                  <li
                    key={j}
                    className="flex gap-3 text-sm leading-relaxed text-ghost"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-faint" />
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
