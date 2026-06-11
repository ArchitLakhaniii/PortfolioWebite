import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-8 font-mono text-xs text-faint sm:flex-row">
        <p>
          © {new Date().getFullYear()} <span className="text-ghost">{profile.name}</span>
        </p>
        <p>CS @ Georgia Tech · Designed & built with Next.js</p>
      </div>
    </footer>
  );
}
