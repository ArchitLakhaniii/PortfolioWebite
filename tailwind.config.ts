import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    // industrial: near-square corners everywhere (dots stay `rounded-full`)
    borderRadius: {
      none: "0",
      sm: "2px",
      DEFAULT: "2px",
      md: "3px",
      lg: "3px",
      xl: "4px",
      "2xl": "4px",
      "3xl": "6px",
      full: "9999px",
    },
    extend: {
      colors: {
        // ── Surfaces — warm carbon, no blue cast ──
        void: "#0a0a09",
        ink: "#0f0f0e",
        surface: "#161614",
        line: "rgba(237,234,226,0.10)",
        hairline: "rgba(237,234,226,0.06)",
        // ── Text — bone, not pure white ───────────
        chalk: "#edeae2",
        ghost: "#a8a59b",
        faint: "#807d74",
        // ── Signal orange — the only accent ───────
        accent: "#ff5a1f",
        "accent-soft": "rgba(255,90,31,0.10)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        dot: ["var(--font-dot)", "var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        label: "0.18em",
      },
      maxWidth: {
        content: "72rem",
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) both",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
