export type MediaDoc = {
  alt?: string | null;
  filename?: string | null;
  height?: number | null;
  url?: string | null;
  width?: number | null;
  sizes?: {
    card?: { url?: string | null; width?: number | null; height?: number | null } | null;
    og?: { url?: string | null; width?: number | null; height?: number | null } | null;
  } | null;
};

export function isMediaDoc(value: unknown): value is MediaDoc {
  return Boolean(value && typeof value === "object" && "url" in value);
}

/** Payload often stores absolute `http://127.0.0.1:3010/api/media/...` URLs. `next/image` treats those as remote. */
function toImageSrc(url: string): string {
  if (url.startsWith("/")) return url;
  try {
    const parsed = new URL(url);
    if (parsed.pathname.startsWith("/api/media/")) {
      return `${parsed.pathname}${parsed.search}`;
    }
    return url;
  } catch {
    return url;
  }
}

export function mediaSrc(value: unknown, size?: "card" | "og"): string | null {
  if (!isMediaDoc(value)) return null;
  const sized =
    size === "card" ? value.sizes?.card?.url : size === "og" ? value.sizes?.og?.url : undefined;
  const raw = sized || value.url;
  return raw ? toImageSrc(raw) : null;
}

export function mediaAlt(value: unknown, fallback = ""): string {
  if (!isMediaDoc(value)) return fallback;
  return value.alt?.trim() || fallback;
}

export function mediaSize(value: unknown, size?: "card" | "og"): { width: number; height: number } | null {
  if (!isMediaDoc(value)) return null;
  if (size === "card" && value.sizes?.card?.width && value.sizes?.card?.height) {
    return { width: value.sizes.card.width, height: value.sizes.card.height };
  }
  if (size === "og" && value.sizes?.og?.width && value.sizes?.og?.height) {
    return { width: value.sizes.og.width, height: value.sizes.og.height };
  }
  if (value.width && value.height) {
    return { width: value.width, height: value.height };
  }
  return null;
}
