import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#282C33",
        accent: "#C778DD",
        text: "#ABB2BF",
        white: "#FFFFFF",
      },
      fontFamily: {
        sans: ["var(--font-fira-sans)", "sans-serif"],
        mono: ["var(--font-fira-mono)", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;