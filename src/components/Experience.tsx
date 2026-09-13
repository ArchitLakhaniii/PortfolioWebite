"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { experience, projects } from "@/data/profile";
import { hasDetail } from "@/data/projectDetails";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import ExperienceWindow, { toRect, type Origin } from "./ExperienceWindow";
import { ArrowIcon } from "./Icons";

/** The project page a role links to, when it has one. */
const relatedPage = (id?: string) =>
  id && hasDetail(id) ? projects.find((p) => p.id === id) : undefined;

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
          const page = relatedPage(e.caseStudy);
          return (
            <li key={`${e.company}-${e.date}`} className="group/row relative border-b border-line">
              <span
                aria-hidden
                className={`absolute -left-px top-0 h-full w-px bg-accent transition-opacity duration-500 ${
                  isOpen ? "opacity-100" : "opacity-0 group-hover/row:opacity-60"
                }`}
              />
              <Reveal delay={(i % 4) * 50} y={16} className="flex items-center gap-3">
                <h3 className="min-w-0 flex-1">
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
                {/* straight to the related case study, without opening the window */}
                {page ? (
                  <Link
                    href={`/work/${page.id}`}
                    aria-label={`Read more: ${page.title} case study`}
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-sm border border-line font-mono text-[10px] uppercase tracking-label text-ghost transition-colors duration-300 hover:border-accent hover:text-accent sm:w-[7.5rem]"
                  >
                    <span className="hidden sm:inline">Read more</span>
                    <ArrowIcon className="h-3.5 w-3.5" />
                  </Link>
                ) : (
                  // keeps every row's icon aligned
                  <span aria-hidden className="block h-9 w-9 shrink-0 sm:w-[7.5rem]" />
                )}
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
