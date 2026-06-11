import { profile } from "@/data/profile";
import Reveal from "./Reveal";
import { GitHubIcon, LinkedInIcon, MailIcon, DownloadIcon } from "./Icons";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <div className="glass relative overflow-hidden rounded-3xl px-6 py-16 text-center sm:px-12">
          <div className="glow-line absolute inset-x-0 top-0" />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-violet/20 blur-[100px]"
          />
          <p className="font-mono text-xs tracking-[0.25em] text-neon">06 · CONTACT</p>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Let&apos;s build something <span className="text-gradient">useful.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-ghost sm:text-base">
            Open to software engineering internships, AI/backend projects, iOS development,
            research, and startup collaborations.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="btn-glow inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-neon to-violet px-7 py-3 text-sm font-semibold text-void transition-transform hover:scale-[1.03]"
            >
              <MailIcon /> Get in Touch
            </a>
            <a
              href={profile.resumeUrl}
              className="glass glass-hover inline-flex items-center gap-2 rounded-xl px-7 py-3 text-sm font-medium text-white"
            >
              <DownloadIcon /> Download Resume
            </a>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6 font-mono text-xs text-ghost">
            <a href={profile.links.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-neon">
              <GitHubIcon /> GitHub
            </a>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-neon">
              <LinkedInIcon /> LinkedIn
            </a>
            <a href={`mailto:${profile.email}`} className="hidden items-center gap-2 transition-colors hover:text-neon sm:inline-flex">
              <MailIcon /> {profile.email}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
