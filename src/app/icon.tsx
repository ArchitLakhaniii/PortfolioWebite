import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

/**
 * Browser-tab icon: the "AL" monogram on a signal-orange tile.
 * Generated at build time by Next's App Router icon convention, so it
 * stays in sync with `profile.initials` and the design tokens.
 */
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

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
          background: "#ff5a1f",
          color: "#0a0a09",
          fontSize: 30,
          fontWeight: 800,
          letterSpacing: "-0.03em",
          borderRadius: 6,
        }}
      >
        {profile.initials}
      </div>
    ),
    { ...size }
  );
}
