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
          DEFAULT: "#1E8A4C",
          dark: "#146B3A",
          light: "#3EC46F",
        },
        surface: "#FFFFFF",
        accent: "#D9F2E1",
        ink: "#15241A",
        muted: "#4F6657",
        line: "#06C755", // LINE brand green
        // warm, organic accents for a "town health-room" feel, now with more punch
        cream: "#FBF6EC",
        blossom: "#F2896B",
        sun: "#F5B301",
        sky: "#5FC1E8",
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
        soft: "0 10px 40px -12px rgba(30, 138, 76, 0.24)",
        card: "0 4px 24px -8px rgba(21, 36, 26, 0.10)",
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
