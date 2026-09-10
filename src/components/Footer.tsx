import { profile, navLinks } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="mx-auto max-w-content px-6 pt-14 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <a
              href="#top"
              className="font-display text-lg font-semibold tracking-tight text-chalk"
            >
              {profile.name}
            </a>
            <p className="mt-1 text-sm text-faint">
              {profile.role} · {profile.location}
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-ghost transition-colors hover:text-chalk"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-line pt-6 text-xs text-faint sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p>Designed &amp; built with Next.js · Framer Motion</p>
        </div>
      </div>

      {/* oversized hollow signature, cropped by the page edge */}
      <p
        aria-hidden
        className="font-wide text-outline-faint -mb-[0.2em] mt-10 select-none whitespace-nowrap text-center text-[8.2vw] uppercase leading-none"
      >
        {profile.name}
      </p>
    </footer>
  );
}
