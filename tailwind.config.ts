import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090B",
        surface: "#111113",
        "surface-2": "#18181B",
        "surface-3": "#27272A",
        border: "#2A2A2E",
        "border-subtle": "#1F1F23",
        gold: {
          DEFAULT: "#D4AF37",
          light: "#FFD700",
          dark: "#B8963E",
          glow: "rgba(212,175,55,0.15)",
        },
        blue: {
          ai: "#3B82F6",
          "ai-glow": "rgba(59,130,246,0.15)",
          "ai-subtle": "rgba(59,130,246,0.08)",
        },
        green: {
          progress: "#10B981",
          "progress-glow": "rgba(16,185,129,0.15)",
        },
        red: {
          risk: "#EF4444",
          "risk-glow": "rgba(239,68,68,0.15)",
        },
        amber: {
          warn: "#F59E0B",
        },
        text: {
          primary: "#FAFAFA",
          secondary: "#A1A1AA",
          muted: "#71717A",
          inverse: "#09090B",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        tight: ["Inter Tight", "Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.65rem", { lineHeight: "1rem" }],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #D4AF37 100%)",
        "gold-subtle": "linear-gradient(135deg, rgba(212,175,55,0.12) 0%, rgba(255,215,0,0.06) 100%)",
        "blue-gradient": "linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)",
        "hero-gradient": "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(212,175,55,0.15) 0%, transparent 60%)",
        "card-gradient": "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 100%)",
        "glow-gold": "radial-gradient(circle, rgba(212,175,55,0.2) 0%, transparent 70%)",
        "glow-blue": "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)",
      },
      boxShadow: {
        "gold-sm": "0 0 12px rgba(212,175,55,0.2), 0 0 4px rgba(212,175,55,0.1)",
        "gold-md": "0 0 24px rgba(212,175,55,0.25), 0 0 8px rgba(212,175,55,0.15)",
        "gold-lg": "0 0 48px rgba(212,175,55,0.3), 0 0 16px rgba(212,175,55,0.2)",
        "blue-sm": "0 0 12px rgba(59,130,246,0.2), 0 0 4px rgba(59,130,246,0.1)",
        "blue-md": "0 0 24px rgba(59,130,246,0.25), 0 0 8px rgba(59,130,246,0.15)",
        "green-sm": "0 0 12px rgba(16,185,129,0.2)",
        "card": "0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)",
        "card-hover": "0 4px 16px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)",
        "glass": "inset 0 1px 0 rgba(255,255,255,0.06), 0 1px 3px rgba(0,0,0,0.4)",
      },
      animation: {
        "pulse-gold": "pulse-gold 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "fade-up": "fade-up 0.5s ease-out forwards",
        "scale-in": "scale-in 0.3s ease-out forwards",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "orbit": "orbit 8s linear infinite",
        "counter": "counter 1.5s ease-out forwards",
      },
      keyframes: {
        "pulse-gold": {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 12px rgba(212,175,55,0.2)" },
          "50%": { opacity: "0.8", boxShadow: "0 0 24px rgba(212,175,55,0.4)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(60px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(60px) rotate(-360deg)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
