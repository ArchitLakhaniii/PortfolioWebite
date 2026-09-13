"use client";

import { useCallback, useRef, useState } from "react";
import { experience } from "@/data/profile";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import ExperienceWindow, { toRect, type Origin } from "./ExperienceWindow";

const pad = (n: number) => String(n).padStart(2, "0");
// earliest year across all roles, for the header readout
const since = Math.min(
  ...experience.flatMap((e) => e.date.match(/\d{4}/g) ?? []).map(Number)
);

function WindowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" className="h-4 w-4">
      <rect x="4" y="5" width="16" height="14" />
      <line x1="4" y1="9" x2="20" y2="9" />
    </svg>
  );
}

/**
 * Every role as a row. Clicking a row opens its window (ExperienceWindow)
 * with that role's own opening animation, launched from the row's icon.
 */
export default function Experience() {
  const [active, setActive] = useState<{ index: number; origin: Origin } | null>(null);
  const rows = useRef<(HTMLButtonElement | null)[]>([]);
  const icons = useRef<(HTMLSpanElement | null)[]>([]);
  const lastOpened = useRef<number | null>(null);

  const openRole = (i: number) => {
    const row = rows.current[i];
    const icon = icons.current[i];
    if (!row || !icon) return;
    lastOpened.current = i;
    setActive({
      index: i,
      origin: { row: toRect(row.getBoundingClientRect()), icon: toRect(icon.getBoundingClientRect()) },
    });
  };

  // return focus to the row that opened the window
  const handleClosed = useCallback(() => {
    setActive(null);
    const i = lastOpened.current;
    if (i !== null) rows.current[i]?.focus({ preventScroll: true });
  }, []);

  return (
    <Section id="experience">
      <SectionHeader
        num="02"
        title="Experience"
        kicker="Experience"
        meta={`${pad(experience.length)} roles · ${since} — present`}
        sub="Research, internships, teaching, and engineering — open any role."
      />

      <ul className="border-t border-line">
        {experience.map((e, i) => {
          const isOpen = active?.index === i;
          return (
            <li key={`${e.company}-${e.date}`} className="group/row relative border-b border-line">
              <span
                aria-hidden
                className={`absolute -left-px top-0 h-full w-px bg-accent transition-opacity duration-500 ${
                  isOpen ? "opacity-100" : "opacity-0 group-hover/row:opacity-60"
                }`}
              />
              <Reveal delay={(i % 4) * 50} y={16}>
                <h3>
                  <button
                    ref={(el) => {
                      rows.current[i] = el;
                    }}
                    type="button"
                    aria-haspopup="dialog"
                    aria-expanded={isOpen}
                    onClick={() => openRole(i)}
                    className="grid w-full grid-cols-[2.25rem_1fr_auto] items-center gap-x-4 py-6 pl-3 text-left transition-colors duration-300 hover:bg-white/[0.015] md:grid-cols-[3.5rem_1fr_auto_auto] md:gap-x-8 md:py-8 md:pl-4"
                  >
                    <span className="self-start pt-1 font-mono text-[11px] text-faint transition-colors group-hover/row:text-accent md:pt-2">
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
                    <span className="hidden text-right font-mono text-[11px] uppercase tracking-label text-faint md:block">
                      <span className="block">{e.date}</span>
                      <span className="mt-1 block">{e.location}</span>
                    </span>
                    <span
                      ref={(el) => {
                        icons.current[i] = el;
                      }}
                      aria-hidden
                      className={`grid h-9 w-9 place-items-center rounded-sm border transition-colors duration-300 ${
                        isOpen
                          ? "border-accent bg-accent text-void"
                          : "border-line text-ghost group-hover/row:border-accent group-hover/row:text-accent"
                      }`}
                    >
                      <WindowIcon />
                    </span>
                  </button>
                </h3>
              </Reveal>
            </li>
          );
        })}
      </ul>

      {active && (
        <ExperienceWindow
          key={active.index}
          exp={experience[active.index]}
          index={active.index}
          origin={active.origin}
          onClosed={handleClosed}
        />
      )}
    </Section>
  );
}
