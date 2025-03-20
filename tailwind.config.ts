import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        slideUp: "slideUp 1s ease-out forwards",
        fadeUp: "fadeUp 1s ease-out forwards",
      },
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(-100px)", opacity: "0" },
        },
        fadeUp: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      fontFamily: {
        custom: ["Mulish", "sans-serif"],
        Delirium: ["Delirium", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
