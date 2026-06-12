import Reveal from "./Reveal";

export default function SectionHeader({
  num,
  title,
  sub,
  kicker,
}: {
  num: string;
  title: string;
  sub?: string;
  kicker?: string;
}) {
  return (
    <Reveal className="mb-16 md:mb-20">
      <div className="flex items-center gap-3 text-faint">
        <span className="font-mono text-xs tracking-label">{num}</span>
        <span className="h-px w-8 bg-line" />
        <span className="eyebrow">{kicker ?? title}</span>
      </div>
      <h2 className="mt-6 max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tightest text-chalk sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {sub && (
        <p className="mt-5 max-w-xl text-base leading-relaxed text-ghost sm:text-lg">
          {sub}
        </p>
      )}
    </Reveal>
  );
}
