import { Fragment, type ReactNode } from "react";
import type { DetailBlock } from "@/data/projectDetails";

/**
 * Render a string with a tiny, safe markdown subset: **bold** and `code`.
 * No HTML is injected — tokens become real React elements.
 */
export function RichText({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  // split on **bold** and `code`, keeping the delimiters
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  parts.forEach((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      nodes.push(
        <strong key={i} className="font-semibold text-chalk">
          {part.slice(2, -2)}
        </strong>
      );
    } else if (part.startsWith("`") && part.endsWith("`")) {
      nodes.push(
        <code
          key={i}
          className="rounded border border-line bg-white/[0.03] px-1.5 py-0.5 font-mono text-[0.85em] text-chalk"
        >
          {part.slice(1, -1)}
        </code>
      );
    } else if (part) {
      nodes.push(<Fragment key={i}>{part}</Fragment>);
    }
  });
  return <>{nodes}</>;
}

/** Render a structured DetailBlock[] into styled, controlled markup. */
export default function RichBlocks({ blocks }: { blocks: DetailBlock[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return (
              <h3
                key={i}
                className="pt-2 font-display text-lg font-semibold tracking-tight text-chalk"
              >
                {block.text}
              </h3>
            );
          case "paragraph":
            return (
              <p key={i} className="text-base leading-relaxed text-ghost">
                <RichText text={block.text} />
              </p>
            );
          case "list":
            return (
              <ul key={i} className="space-y-2.5">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-base leading-relaxed text-ghost">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span>
                      <RichText text={item} />
                    </span>
                  </li>
                ))}
              </ul>
            );
          case "code":
            return (
              <pre
                key={i}
                className="overflow-x-auto rounded-xl border border-line bg-white/[0.02] p-4 font-mono text-[13px] leading-relaxed text-ghost"
              >
                {block.text}
              </pre>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
