import type { ProjectResources } from "@/data/projectDetails";
import { GitHubIcon, ArrowIcon, DownloadIcon } from "../Icons";

type LinkDef = { href: string; label: string; icon?: "github" | "external" | "download" };

/** Buttons for a project's external resources (links out in a new tab). */
export default function ResourceLinks({ resources }: { resources?: ProjectResources }) {
  if (!resources) return null;

  const links: LinkDef[] = [];
  if (resources.website) links.push({ href: resources.website, label: "Website", icon: "external" });
  if (resources.github) links.push({ href: resources.github, label: "GitHub", icon: "github" });
  if (resources.devpost) links.push({ href: resources.devpost, label: "Devpost", icon: "external" });
  if (resources.demoVideo) links.push({ href: resources.demoVideo, label: "Watch demo", icon: "external" });
  if (resources.youtube) links.push({ href: resources.youtube, label: "YouTube", icon: "external" });
  if (resources.pdf) links.push({ href: resources.pdf, label: "Open PDF", icon: "download" });
  if (resources.notebook) links.push({ href: resources.notebook, label: "Open notebook", icon: "external" });

  if (links.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2.5">
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-chalk transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.03]"
        >
          {l.icon === "github" && <GitHubIcon className="h-4 w-4" />}
          {l.icon === "download" && <DownloadIcon className="h-4 w-4" />}
          {l.label}
          {l.icon === "external" && <ArrowIcon className="h-3.5 w-3.5 opacity-70" />}
        </a>
      ))}
    </div>
  );
}
