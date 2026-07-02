import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1E2A22",
        "ink-light": "#2A3A2F",
        wheat: "#ECE3C6",
        "wheat-dim": "#DCD0A8",
        brass: "#C89B3C",
        "brass-light": "#E0B85C",
        ember: "#A63D2F",
        charcoal: "#2B2420",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        grain: "url('/grain.svg')",
      },
    },
  },
  plugins: [],
};
export default config;
