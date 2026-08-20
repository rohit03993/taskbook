import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#001A3D",
          900: "#002E6E",
          800: "#0A3D86",
          700: "#1556B0",
          600: "#3974FC",
          200: "#C5D7F7",
          100: "#E8F0FF",
          50: "#F4F8FF",
        },
        wa: {
          DEFAULT: "#1FA855",
          dark: "#128C7E",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 1px 0 0 rgb(0 46 110 / 0.06), 0 12px 32px -16px rgb(0 46 110 / 0.18)",
        device: "0 24px 60px -20px rgb(0 26 61 / 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
