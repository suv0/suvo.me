import { parseVideoEmbed } from "@/lib/story-embed";

export function StoryVideoEmbed({ url, caption }: { url: string; caption?: string | null }) {
  const parsed = parseVideoEmbed(url);
  if (!parsed) {
    return (
      <p className="font-body-md text-body-md text-text-dim">This video link could not be embedded.</p>
    );
  }

  const title = parsed.provider === "youtube" ? "YouTube video" : "Vimeo video";

  return (
    <figure className="space-y-3">
      <div className="relative aspect-video overflow-hidden rounded-xl border border-border-muted bg-ink-black">
        <iframe
          src={parsed.embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      {caption ? (
        <figcaption className="font-mono-label text-mono-label text-text-dim">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
