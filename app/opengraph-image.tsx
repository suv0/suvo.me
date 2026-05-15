import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";
import sharp from "sharp";

import { profile } from "@/lib/portfolio-data";

export const alt = `${profile.name} — portfolio preview`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Downscale portrait before Satori embed — full-res base64 can produce huge PNGs some scrapers mishandle. */
async function portraitDataUrl(): Promise<string | undefined> {
  const portraitPath = join(process.cwd(), "public", "hero-portrait-editorial.png");
  try {
    const buf = await readFile(portraitPath);
    const resized = await sharp(buf)
      .rotate()
      .resize(720, 900, { fit: "inside", withoutEnlargement: true })
      .png({ compressionLevel: 9 })
      .toBuffer();
    return `data:image/png;base64,${resized.toString("base64")}`;
  } catch {
    return undefined;
  }
}

export default async function OpenGraphImage() {
  const portraitSrc = await portraitDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          background: "linear-gradient(145deg, #020617 0%, #0f172a 48%, #020617 100%)",
        }}
      >
        <div
          style={{
            width: 520,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: 52,
            paddingRight: 36,
            paddingTop: 48,
            paddingBottom: 48,
            gap: 14,
          }}
        >
          <div style={{ fontSize: 46, fontWeight: 700, letterSpacing: "-0.03em", color: "#f8fafc", lineHeight: 1.1 }}>
            {profile.name}
          </div>
          <div style={{ fontSize: 26, color: "#94a3b8", fontWeight: 600 }}>{profile.title}</div>
          <div
            style={{
              fontSize: 21,
              color: "#22d3ee",
              fontWeight: 600,
              lineHeight: 1.35,
              maxWidth: 480,
            }}
          >
            {profile.roleStack}
          </div>
          <div style={{ fontSize: 18, color: "#64748b", marginTop: 18, fontWeight: 500 }}>
            16+ years · Chaldal (YC S15) · suvo.me
          </div>
        </div>
        <div
          style={{
            flex: 1,
            height: "100%",
            display: "flex",
            overflow: "hidden",
            borderLeft: "1px solid rgba(148, 163, 184, 0.2)",
          }}
        >
          {portraitSrc ? (
            // eslint-disable-next-line @next/next/no-img-element -- ImageResponse / Satori uses <img> with data URL
            <img
              src={portraitSrc}
              alt=""
              width={680}
              height={630}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "50% 18%",
              }}
            />
          ) : (
            <div
              style={{
                flex: 1,
                background: "linear-gradient(180deg, #0f172a 0%, #020617 100%)",
              }}
            />
          )}
        </div>
      </div>
    ),
    { ...size },
  );
}
