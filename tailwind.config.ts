import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

type ThemeFunction = (path: string) => string;

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
      typography: (theme: ThemeFunction) => ({
        DEFAULT: {
          css: {
            color: theme('colors.text'),
            a: {
              color: theme('colors.accent'),
              '&:hover': {
                color: theme('colors.accent'),
              },
            },
            p: {
              color: theme('colors.white'),
            },
            h2: {
              color: theme('colors.white'),
            },
            blockquote: {
              color: theme('colors.foreground'),
              borderLeftColor: theme('colors.primary'),
            },
          },
        },
      }),
    },
  },
  plugins: [tailwindcssAnimate, typography],
} satisfies Config;