import type { Config } from "tailwindcss";
const {nextui} = require("@nextui-org/react")

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },

  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {},
        dark: {
          colors: {
            primary: {
              DEFAULT: "#34D058",
              foreground: "#000000",
            },
            focus: "#BEF264",
          },
        },
      },
    }),
  ],
  // plugins: [require("daisyui")],
};
export default config;
