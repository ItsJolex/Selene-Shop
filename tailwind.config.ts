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
        'selene-nude': '#F9EAD8',
        'selene-dark': '#2D2926',
        'selene-rosegold': '#D4A373',
      },
    },
  },
  plugins: [],
};
export default config;
