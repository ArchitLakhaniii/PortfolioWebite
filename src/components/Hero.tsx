import { profile, stats } from "@/data/profile";
import { GitHubIcon, LinkedInIcon, MailIcon, DownloadIcon, ArrowIcon } from "./Icons";

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center pt-16">
      <div className="mx-auto grid w-full max-w-6xl gap-14 px-6 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        {/* Left */}
        <div>
          <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-neon/25 bg-neon/5 px-4 py-1.5 font-mono text-xs text-neon">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
            </span>
            {profile.availability}
          </div>

          <p className="animate-fade-up mt-6 font-mono text-sm tracking-[0.2em] text-ghost" style={{ animationDelay: "80ms" }}>
            {profile.eyebrow.toUpperCase()}
          </p>

          <h1
            className="animate-fade-up mt-4 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "160ms" }}
          >
            <span className="text-white">{profile.firstName}</span>
            <br />
            <span className="text-gradient">{profile.lastName}</span>
          </h1>

          <p
            className="animate-fade-up mt-6 max-w-xl text-base leading-relaxed text-ghost sm:text-lg"
            style={{ animationDelay: "240ms" }}
          >
            {profile.tagline}
          </p>

          <div className="animate-fade-up mt-9 flex flex-wrap items-center gap-4" style={{ animationDelay: "320ms" }}>
            <a
              href="#projects"
              className="btn-glow inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-neon to-violet px-6 py-3 text-sm font-semibold text-void transition-transform hover:scale-[1.03]"
            >
              View Projects <ArrowIcon className="h-4 w-4" />
            </a>
            <a
              href={profile.resumeUrl}
              className="glass glass-hover inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium text-white"
            >
              <DownloadIcon /> Resume
            </a>
          </div>

          <div className="animate-fade-up mt-9 flex items-center gap-5" style={{ animationDelay: "400ms" }}>
            <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-ghost transition-colors hover:text-neon">
              <GitHubIcon className="h-5 w-5" />
            </a>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-ghost transition-colors hover:text-neon">
              <LinkedInIcon className="h-5 w-5" />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email" className="text-ghost transition-colors hover:text-neon">
              <MailIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Right — terminal-style stat card */}
        <div className="animate-fade-up" style={{ animationDelay: "300ms" }}>
          <div className="glass relative overflow-hidden rounded-2xl p-1">
            <div className="glow-line absolute inset-x-0 top-0" />
            <div className="flex items-center gap-1.5 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 font-mono text-[11px] text-faint">archit@gatech ~ profile</span>
            </div>
            <div className="space-y-4 px-5 pb-6 pt-2 font-mono text-sm">
              <div>
                <p className="text-faint">$ whoami</p>
                <p className="mt-1 text-white">{profile.role} · {profile.location}</p>
              </div>
              <div>
                <p className="text-faint">$ cat stats.json</p>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  {stats.map((s) => (
                    <div key={s.label} className="rounded-lg border border-line bg-white/[0.02] p-3">
                      <p className="text-gradient font-display text-xl font-bold">{s.value}</p>
                      <p className="mt-1 text-[11px] leading-snug text-ghost">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-faint">$ current --focus</p>
                <p className="mt-1 leading-relaxed text-neon/90">
                  AI agents · iOS · backend · CV research<span className="animate-blink">▊</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block">
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-line p-1.5">
          <div className="h-2 w-1 animate-bounce rounded-full bg-neon" />
        </div>
      </div>
    </section>
  );
}
