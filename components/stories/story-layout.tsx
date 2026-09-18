import { RichText } from "@payloadcms/richtext-lexical/react";
import type { Story } from "@/payload-types";
import { StoryMediaImage } from "@/components/stories/story-media-image";
import { StoryVideoEmbed } from "@/components/stories/story-video-embed";

type StoryBlock = NonNullable<Story["layout"]>[number];

function BlockCaption({ children }: { children?: string | null }) {
  if (!children) return null;
  return <figcaption className="font-mono-label text-mono-label text-text-dim">{children}</figcaption>;
}

function StoryLayoutBlock({ block }: { block: StoryBlock }) {
  switch (block.blockType) {
    case "richText":
      return (
        <div className="story-prose">
          <RichText data={block.body} />
        </div>
      );
    case "photo":
      return (
        <figure className="space-y-3">
          <div
            className={`overflow-hidden rounded-xl border border-border-muted bg-surface-charcoal ${
              block.fullBleed ? "" : "max-w-3xl"
            }`}
          >
            <StoryMediaImage
              media={block.image}
              className="h-auto w-full object-cover"
              sizes={block.fullBleed ? "100vw" : "(max-width: 768px) 100vw, 48rem"}
            />
          </div>
          <BlockCaption>{block.caption}</BlockCaption>
        </figure>
      );
    case "photoPair":
      return (
        <figure className="space-y-3">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="overflow-hidden rounded-xl border border-border-muted bg-surface-charcoal">
              <StoryMediaImage
                media={block.left}
                className="h-auto w-full object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <div className="overflow-hidden rounded-xl border border-border-muted bg-surface-charcoal">
              <StoryMediaImage
                media={block.right}
                className="h-auto w-full object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          </div>
          <BlockCaption>{block.caption}</BlockCaption>
        </figure>
      );
    case "gallery":
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          {block.images?.map((item, index) => (
            <figure key={item.id ?? index} className="space-y-2">
              <div className="overflow-hidden rounded-xl border border-border-muted bg-surface-charcoal">
                <StoryMediaImage
                  media={item.image}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <BlockCaption>{item.caption}</BlockCaption>
            </figure>
          ))}
        </div>
      );
    case "videoEmbed":
      return <StoryVideoEmbed url={block.url} caption={block.caption} />;
    case "pullQuote":
      return (
        <blockquote className="border-l-2 border-chaldal-green/70 pl-5">
          <p className="font-headline-md text-headline-md text-pretty text-white">{block.quote}</p>
          {block.attribution ? (
            <footer className="mt-3 font-mono-label text-mono-label text-text-dim">
              {block.attribution}
            </footer>
          ) : null}
        </blockquote>
      );
    default: {
      const _exhaustive: never = block;
      return _exhaustive;
    }
  }
}

export function StoryLayout({ blocks }: { blocks: Story["layout"] }) {
  if (!blocks?.length) return null;

  return (
    <div className="flex flex-col gap-10 md:gap-12">
      {blocks.map((block, index) => (
        <StoryLayoutBlock key={block.id ?? `${block.blockType}-${index}`} block={block} />
      ))}
    </div>
  );
}
