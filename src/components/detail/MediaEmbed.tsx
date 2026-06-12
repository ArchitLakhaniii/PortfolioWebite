"use client";

import { useState } from "react";
import type { ProjectResources } from "@/data/projectDetails";

/** Pull a YouTube video id out of watch / youtu.be / shorts / embed URLs. */
function youtubeId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|\/shorts\/|v=|embed\/)([A-Za-z0-9_-]{6,})/);
  return m ? m[1] : null;
}

function Frame({ src, title }: { src: string; title: string }) {
  return (
    <iframe
      src={src}
      title={title}
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="h-full w-full border-0"
    />
  );
}

/**
 * Renders embedded media for a project — YouTube video, PDF, notebook, or
 * image. Embeds always sit beside an "open in new tab" link, and the image
 * falls back to a link if the file is missing, so nothing breaks.
 */
export default function MediaEmbed({
  resources,
  title,
}: {
  resources?: ProjectResources;
  title: string;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  if (!resources) return null;

  const videoUrl = resources.demoVideo || resources.youtube;
  const vid = videoUrl ? youtubeId(videoUrl) : null;
  const blocks: React.ReactNode[] = [];

  if (videoUrl && vid) {
    blocks.push(
      <figure key="video">
        <div className="aspect-video overflow-hidden rounded-2xl border border-line bg-ink">
          <Frame src={`https://www.youtube.com/embed/${vid}?rel=0`} title={`${title} demo`} />
        </div>
      </figure>
    );
  }

  if (resources.pdf) {
    blocks.push(
      <figure key="pdf">
        <div className="h-[70vh] overflow-hidden rounded-2xl border border-line bg-ink">
          <Frame src={resources.pdf} title={`${title} document`} />
        </div>
        <figcaption className="mt-3 text-sm text-faint">
          PDF not loading?{" "}
          <a href={resources.pdf} target="_blank" rel="noreferrer" className="link-underline text-ghost hover:text-chalk">
            Open it in a new tab
          </a>
          .
        </figcaption>
      </figure>
    );
  }

  if (resources.notebook) {
    blocks.push(
      <figure key="notebook">
        <div className="h-[70vh] overflow-hidden rounded-2xl border border-line bg-ink">
          <Frame src={resources.notebook} title={`${title} notebook`} />
        </div>
        <figcaption className="mt-3 text-sm text-faint">
          Notebook not loading?{" "}
          <a href={resources.notebook} target="_blank" rel="noreferrer" className="link-underline text-ghost hover:text-chalk">
            Open it in a new tab
          </a>
          .
        </figcaption>
      </figure>
    );
  }

  if (resources.image) {
    blocks.push(
      <figure key="image">
        {imgFailed ? (
          <a href={resources.image} target="_blank" rel="noreferrer" className="link-underline text-ghost hover:text-chalk">
            View image
          </a>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={resources.image}
            alt={`${title} preview`}
            onError={() => setImgFailed(true)}
            className="w-full rounded-2xl border border-line"
          />
        )}
      </figure>
    );
  }

  if (blocks.length === 0) return null;
  return <div className="space-y-8">{blocks}</div>;
}
