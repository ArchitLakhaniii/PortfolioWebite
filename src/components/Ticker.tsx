import { ticker } from "@/data/profile";

/**
 * One marquee row. Items render twice so the -50% CSS loop is seamless;
 * the duplicate copy is aria-hidden. Spacing is padding (not gap) so both
 * halves are exactly the same width.
 */
function Row({
  items,
  reverse = false,
  muted = false,
  duration,
}: {
  items: string[];
  reverse?: boolean;
  muted?: boolean;
  duration: number;
}) {
  const loop = [...items, ...items];
  return (
    <div className="marquee-mask flex overflow-hidden">
      <ul
        className={`marquee flex w-max shrink-0 ${reverse ? "marquee-reverse" : ""}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {loop.map((t, i) => (
          <li
            key={`${t}-${i}`}
            aria-hidden={i >= items.length || undefined}
            className={`flex items-center gap-3 whitespace-nowrap pr-10 font-mono text-[11px] uppercase tracking-label ${
              muted ? "text-faint" : "text-ghost"
            }`}
          >
            <span className={`h-1 w-1 rotate-45 ${muted ? "bg-faint" : "bg-accent"}`} />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Two counter-scrolling rows of highlights between the hero and the
 * content. Pure CSS: pauses on hover, stops under reduced motion.
 */
export default function Ticker() {
  return (
    <section aria-label="Highlights" className="relative border-y border-line bg-void/50 backdrop-blur-sm">
      <div className="py-3.5">
        <Row items={ticker.primary} duration={48} />
      </div>
      <div className="border-t border-hairline py-3.5">
        <Row items={ticker.secondary} duration={56} reverse muted />
      </div>
    </section>
  );
}
