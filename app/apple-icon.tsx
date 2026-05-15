import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon — same mark as favicon at touch-target size. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #020617 0%, #0f172a 100%)",
          borderRadius: 36,
          border: "4px solid #22d3ee",
          color: "#22d3ee",
          fontSize: 96,
          fontWeight: 800,
          letterSpacing: "-0.05em",
        }}
      >
        S
      </div>
    ),
    { ...size },
  );
}
