"use client";

import { useState } from "react";
import { experience } from "@/data/profile";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

const pad = (n: number) => String(n).padStart(2, "0");
// earliest year across all roles, for the header readout
const since = Math.min(
  ...experience.flatMap((e) => e.date.match(/\d{4}/g) ?? []).map(Number)
);

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" className="h-4 w-4">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

/**
 * Accordion of roles. Panels stay in the DOM and animate open with a
 * grid-rows transition, so every bullet is always present for search,
 * print, and tests; collapsed panels are aria-hidden.
 */
export default function Experience() {
  // the current role starts open; rows open independently
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));
  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <Section id="experience">
      <SectionHeader
        num="03"
        title="Experience"
        kicker="Experience"
        meta={`${pad(experience.length)} roles · ${since} — present`}
        sub="Internships, research, teaching, and engineering — tap any row to expand."
      />

      <ul className="border-t border-line">
        {experience.map((e, i) => {
          const isOpen = open.has(i);
          const panelId = `experience-panel-${i}`;
          return (
            <li key={`${e.company}-${e.date}`} className="group/row relative border-b border-line">
              {/* signal bar marks open rows */}
              <span
                aria-hidden
                className={`absolute -left-px top-0 h-full w-px bg-accent transition-opacity duration-500 ${
                  isOpen ? "opacity-100" : "opacity-0"
                }`}
              />
              <Reveal delay={(i % 4) * 50} y={16}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(i)}
                    className="grid w-full grid-cols-[2.25rem_1fr_auto] items-center gap-x-4 py-6 pl-3 text-left md:grid-cols-[3.5rem_1fr_auto_auto] md:gap-x-8 md:py-8 md:pl-4"
                  >
                    <span
                      className={`self-start pt-1 font-mono text-[11px] transition-colors md:pt-2 ${
                        isOpen ? "text-accent" : "text-faint group-hover/row:text-accent"
                      }`}
                    >
                      /{pad(i + 1)}
                    </span>
                    <span className="min-w-0">
                      <span className="font-wide block text-lg uppercase leading-tight text-chalk/85 transition-[color,transform] duration-500 group-hover/row:translate-x-1.5 group-hover/row:text-chalk sm:text-2xl md:text-[1.75rem]">
                        {e.company}
                      </span>
                      <span className="mt-2 block font-mono text-[11px] uppercase tracking-label text-ghost">
                        {e.role}
                      </span>
                    </span>
                    <span className="hidden font-mono text-[11px] uppercase tracking-label text-faint md:block">
                      {e.date}
                    </span>
                    <span
                      aria-hidden
                      className={`grid h-9 w-9 place-items-center rounded-sm border transition-all duration-500 ${
                        isOpen
                          ? "rotate-45 border-accent bg-accent text-void"
                          : "border-line text-ghost group-hover/row:border-accent group-hover/row:text-accent"
                      }`}
                    >
                      <PlusIcon />
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  aria-hidden={!isOpen}
                  className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div
                      className={`grid gap-5 pb-8 pl-[4rem] transition-opacity duration-500 md:grid-cols-[13rem_1fr] md:gap-10 md:pl-[6.5rem] ${
                        isOpen ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <div className="space-y-1 font-mono text-[11px] uppercase tracking-label text-faint">
                        <p>{e.date}</p>
                        <p>{e.location}</p>
                      </div>
                      <ul className="space-y-2.5">
                        {e.bullets.map((b, j) => (
                          <li key={j} className="flex gap-3 text-[15px] leading-relaxed text-ghost">
                            <span className="mt-2.5 h-1 w-1 shrink-0 bg-accent" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
