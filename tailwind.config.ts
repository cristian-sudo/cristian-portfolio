import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "trail": {
          "0%": { "--angle": "0deg" },
          "100%": { "--angle": "360deg" },
        },
      },
      animation: {
        "trail": "trail var(--duration) linear infinite",
      },
      colors: {
        background: "var(--background)",
        primary: "#282C33",
        accent: "#C778DD",
        text: "#ABB2BF",
        white: "#FFFFFF",
        foreground: "hsl(var(--foreground))",
      },
      fontFamily: {
        sans: ["var(--font-fira-sans)", "sans-serif"],
        mono: ["var(--font-fira-mono)", "monospace"],
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;