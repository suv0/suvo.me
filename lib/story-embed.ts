export type VideoProvider = "youtube" | "vimeo";

export type ParsedVideo = {
  provider: VideoProvider;
  id: string;
  embedUrl: string;
};

export function parseVideoEmbed(raw: string): ParsedVideo | null {
  const value = raw.trim();
  if (!value) return null;

  try {
    const parsed = new URL(value);
    const host = parsed.hostname.replace(/^www\./, "").toLowerCase();

    if (host === "youtu.be") {
      const id = parsed.pathname.split("/").filter(Boolean)[0];
      if (id && /^[\w-]{11}$/.test(id)) {
        return {
          provider: "youtube",
          id,
          embedUrl: `https://www.youtube-nocookie.com/embed/${id}`,
        };
      }
      return null;
    }

    if (host === "youtube.com" || host === "m.youtube.com" || host === "youtube-nocookie.com") {
      const fromQuery = parsed.searchParams.get("v");
      const fromPath = parsed.pathname.match(/\/(?:embed|shorts)\/([\w-]{11})/)?.[1];
      const id = fromQuery || fromPath;
      if (id && /^[\w-]{11}$/.test(id)) {
        return {
          provider: "youtube",
          id,
          embedUrl: `https://www.youtube-nocookie.com/embed/${id}`,
        };
      }
      return null;
    }

    if (host === "vimeo.com" || host === "player.vimeo.com") {
      const parts = parsed.pathname.split("/").filter(Boolean);
      const id = parts.find((part) => /^\d+$/.test(part));
      if (id) {
        const queryHash = parsed.searchParams.get("h");
        const idIndex = parts.indexOf(id);
        const pathHash = host === "vimeo.com" ? parts[idIndex + 1] : undefined;
        const hash = queryHash ?? pathHash;
        if (hash && !/^[a-z0-9]+$/i.test(hash)) {
          return null;
        }
        const embedUrl = new URL(`https://player.vimeo.com/video/${id}`);
        if (hash) {
          embedUrl.searchParams.set("h", hash);
        }
        return {
          provider: "vimeo",
          id,
          embedUrl: embedUrl.toString(),
        };
      }
    }
  } catch {
    return null;
  }

  return null;
}
