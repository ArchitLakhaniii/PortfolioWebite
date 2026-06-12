import type { ReactNode } from "react";

/**
 * Consistent section shell — generous vertical rhythm and a centered,
 * width-constrained column. One source of truth for page spacing.
 */
export default function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`mx-auto w-full max-w-content scroll-mt-24 px-6 py-28 sm:px-8 md:py-36 ${className}`}
    >
      {children}
    </section>
  );
}
