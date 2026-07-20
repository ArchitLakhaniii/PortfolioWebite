import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

/**
 * Browser-tab icon: the "AL" monogram, matching the nav mark.
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
          background: "#070709",
          color: "#f4f4f6",
          fontSize: 28,
          fontWeight: 600,
          letterSpacing: "-0.04em",
          borderRadius: 14,
          border: "3px solid rgba(124,140,255,0.45)",
        }}
      >
        {profile.initials}
      </div>
    ),
    { ...size }
  );
}
