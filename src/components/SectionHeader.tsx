import Reveal from "./Reveal";

export default function SectionHeader({
  num,
  title,
  sub,
}: {
  num: string;
  title: string;
  sub?: string;
}) {
  return (
    <Reveal className="mb-12">
      <div className="flex items-center gap-4">
        <span className="font-mono text-sm text-neon/80">{num}</span>
        <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        <div className="glow-line flex-1 opacity-40" />
      </div>
      {sub && <p className="mt-3 max-w-xl text-sm text-ghost">{sub}</p>}
    </Reveal>
  );
}
