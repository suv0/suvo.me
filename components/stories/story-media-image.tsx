import Image from "next/image";
import { mediaAlt, mediaSize, mediaSrc } from "@/lib/media";

type StoryMediaImageProps = {
  media: unknown;
  size?: "card" | "og";
  className?: string;
  sizes: string;
  priority?: boolean;
  fill?: boolean;
};

export function StoryMediaImage({ media, size, className, sizes, priority, fill }: StoryMediaImageProps) {
  const src = mediaSrc(media, size);
  if (!src) return null;

  const alt = mediaAlt(media);
  const dims = mediaSize(media, size);

  if (fill || !dims) {
    return (
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={className} />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={dims.width}
      height={dims.height}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
