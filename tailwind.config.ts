import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#5B9B5A",
          dark: "#4A8249",
          light: "#7FB67E",
        },
        surface: "#FFFFFF",
        accent: "#F0F7EE",
        ink: "#1A2B1A",
        muted: "#6B7B6B",
        line: "#06C755", // LINE brand green
        // warm, organic accents for a "town health-room" feel
        cream: "#FBF6EC",
        blossom: "#F2B19C",
        sun: "#F6C56B",
        sky: "#CDE6F2",
      },
      fontFamily: {
        sans: ["var(--font-noto-sans-jp)", "var(--font-dm-sans)", "sans-serif"],
        display: ["var(--font-dm-sans)", "var(--font-noto-sans-jp)", "sans-serif"],
      },
      fontSize: {
        base: ["1rem", { lineHeight: "1.8" }],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(91, 155, 90, 0.18)",
        card: "0 4px 24px -8px rgba(26, 43, 26, 0.10)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      animation: {
        float: "float 8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
