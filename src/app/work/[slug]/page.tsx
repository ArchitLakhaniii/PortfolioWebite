import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectDetails, projectDetailSlugs } from "@/data/projectDetails";
import { profile, projects } from "@/data/profile";
import RichBlocks from "@/components/detail/RichBlocks";
import ResourceLinks from "@/components/detail/ResourceLinks";
import MediaEmbed from "@/components/detail/MediaEmbed";
import { ArrowIcon } from "@/components/Icons";

export const dynamicParams = false;

export function generateStaticParams() {
  return projectDetailSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const detail = projectDetails[params.slug];
  if (!detail) return { title: "Work — Archit Lakhani" };
  const title = `${detail.title} — ${profile.name}`;
  return {
    title,
    description: detail.desc,
    openGraph: { title, description: detail.desc, type: "article" },
  };
}

function StatChips({
  stats,
}: {
  stats?: NonNullable<(typeof projectDetails)[string]["stats"]>;
}) {
  if (!stats) return null;
  const chips: { value: string; label: string }[] = [];
  if (typeof stats.funding_aed === "number")
    chips.push({ value: `AED ${stats.funding_aed.toLocaleString()}`, label: "Funding raised" });
  if (typeof stats.stars === "number") chips.push({ value: String(stats.stars), label: "Stars" });
  if (typeof stats.watchers === "number")
    chips.push({ value: String(stats.watchers), label: "Watchers" });
  if (typeof stats.forks === "number") chips.push({ value: String(stats.forks), label: "Forks" });
  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {chips.map((c) => (
        <div key={c.label} className="rounded-xl border border-line px-4 py-3">
          <p className="font-display text-xl font-semibold text-chalk">{c.value}</p>
          <p className="mt-0.5 text-xs text-faint">{c.label}</p>
        </div>
      ))}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-3 text-faint">
      <span className="h-px w-8 bg-line" />
      <span className="eyebrow">{children}</span>
    </div>
  );
}

export default function WorkDetailPage({ params }: { params: { slug: string } }) {
  const detail = projectDetails[params.slug];
  if (!detail) notFound();

  const tags = detail.tags ?? projects.find((p) => p.id === detail.slug)?.tags ?? [];

  return (
    <main className="mx-auto max-w-3xl px-6 pb-28 pt-28 sm:px-8 md:pt-32">
      <Link
        href="/#projects"
        className="link-underline inline-flex items-center gap-2 text-sm text-ghost transition-colors hover:text-chalk"
      >
        <ArrowIcon className="h-3.5 w-3.5 -rotate-180" /> Back to work
      </Link>

      {/* header */}
      <header className="mt-10">
        {detail.extras && (
          <p className="font-mono text-[11px] uppercase tracking-label text-accent">
            {detail.extras}
          </p>
        )}
        <h1 className="mt-4 text-balance font-display text-4xl font-semibold leading-[1.02] tracking-tightest text-chalk sm:text-5xl">
          {detail.title}
        </h1>
        <p className="mt-3 text-base font-medium text-ghost">{detail.role}</p>
        <p className="mt-6 text-lg leading-relaxed text-ghost">{detail.desc}</p>

        {detail.resources && (
          <div className="mt-8">
            <ResourceLinks resources={detail.resources} />
          </div>
        )}
      </header>

      {/* media */}
      {detail.resources && (
        <div className="mt-12">
          <MediaEmbed resources={detail.resources} title={detail.title} />
        </div>
      )}

      {/* overview */}
      {detail.longDesc && (
        <section className="mt-16">
          <SectionLabel>Overview</SectionLabel>
          <RichBlocks blocks={detail.longDesc} />
        </section>
      )}

      {/* contributions */}
      {detail.contributions && detail.contributions.length > 0 && (
        <section className="mt-16">
          <SectionLabel>Technical contributions</SectionLabel>
          <ul className="space-y-3">
            {detail.contributions.map((c, i) => (
              <li key={i} className="flex gap-3 text-base leading-relaxed text-ghost">
                <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {c}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* officers */}
      {detail.officers && (
        <section className="mt-16">
          <SectionLabel>Team</SectionLabel>
          <dl className="space-y-4">
            {detail.officers.technicalLeaders && (
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-6">
                <dt className="w-44 shrink-0 text-sm text-faint">Technical Leaders</dt>
                <dd className="text-base text-chalk">
                  {detail.officers.technicalLeaders.join(", ")}
                </dd>
              </div>
            )}
            {detail.officers.seniorDevelopers && (
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-6">
                <dt className="w-44 shrink-0 text-sm text-faint">Senior Developers</dt>
                <dd className="text-base text-chalk">
                  {detail.officers.seniorDevelopers.join(", ")}
                </dd>
              </div>
            )}
            {detail.officers.seniorDesigner && (
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-6">
                <dt className="w-44 shrink-0 text-sm text-faint">Senior Designer</dt>
                <dd className="text-base text-chalk">{detail.officers.seniorDesigner}</dd>
              </div>
            )}
          </dl>
        </section>
      )}

      {/* app structure */}
      {detail.appStructure && (
        <section className="mt-16">
          <SectionLabel>Project structure</SectionLabel>
          <RichBlocks blocks={detail.appStructure} />
        </section>
      )}

      {/* stats */}
      {detail.stats && (
        <section className="mt-16">
          <SectionLabel>By the numbers</SectionLabel>
          <StatChips stats={detail.stats} />
        </section>
      )}

      {/* tags */}
      {tags.length > 0 && (
        <section className="mt-16">
          <SectionLabel>Stack</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="rounded-md border border-line px-2.5 py-1 font-mono text-[11px] text-ghost"
              >
                {t}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* footer nav */}
      <div className="mt-20 border-t border-line pt-8">
        <Link
          href="/#projects"
          className="link-underline inline-flex items-center gap-2 text-sm text-ghost transition-colors hover:text-chalk"
        >
          <ArrowIcon className="h-3.5 w-3.5 -rotate-180" /> Back to all work
        </Link>
      </div>
    </main>
  );
}
