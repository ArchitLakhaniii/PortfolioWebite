import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ── Surfaces ──────────────────────────────
        void: "#070709",
        ink: "#0c0c10",
        surface: "#111116",
        line: "rgba(255,255,255,0.08)",
        hairline: "rgba(255,255,255,0.05)",
        // ── Text ──────────────────────────────────
        chalk: "#f4f4f6",
        ghost: "#9a9aa6",
        faint: "#5f5f6b",
        // ── Accent (used sparingly) ───────────────
        accent: "#7c8cff",
        "accent-soft": "rgba(124,140,255,0.10)",
        // back-compat aliases (refined values)
        neon: "#7c8cff",
        violet: "#8b8bf0",
        magenta: "#c9b8ff",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        "label": "0.22em",
      },
      maxWidth: {
        content: "72rem",
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) both",
        "pulse-slow": "pulseSlow 7s ease-in-out infinite",
        float: "float 9s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.7" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
