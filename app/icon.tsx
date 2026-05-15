import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Branded favicon — slate + cyan, matches site chrome (replaces default Next triangle). */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#020617",
          borderRadius: 8,
          border: "2px solid #22d3ee",
          color: "#22d3ee",
          fontSize: 18,
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
