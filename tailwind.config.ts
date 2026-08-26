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
        "secondary": "#72594d",
        "on-primary": "#ffffff",
        "primary-fixed": "#ffdcbd",
        "surface-container-highest": "#e9e1dc",
        "outline-variant": "#d4c4b7",
        "on-tertiary-container": "#483f33",
        "on-secondary-fixed": "#29170e",
        "tertiary-container": "#b8ab9b",
        "paper-white": "#FFFCFA",
        "surface-container": "#f5ece7",
        "on-primary-container": "#5b3912",
        "tertiary": "#675d4f",
        "surface-variant": "#e9e1dc",
        "on-tertiary": "#ffffff",
        "on-surface-variant": "#50453b",
        "rose-gold": "#C59789",
        "surface": "#fff8f5",
        "on-tertiary-fixed": "#221a10",
        "surface-container-low": "#fbf2ed",
        "on-primary-fixed": "#2c1600",
        "on-secondary-fixed-variant": "#594237",
        "on-surface": "#1e1b18",
        "error": "#ba1a1a",
        "inverse-on-surface": "#f8efea",
        "outline": "#82756a",
        "on-primary-fixed-variant": "#623f18",
        "on-tertiary-fixed-variant": "#4f4538",
        "tertiary-fixed": "#efe0cf",
        "on-error-container": "#93000a",
        "error-container": "#ffdad6",
        "surface-bright": "#fff8f5",
        "linen-base": "#F9EAD8",
        "deep-charcoal": "#2D2926",
        "surface-container-high": "#efe6e2",
        "inverse-surface": "#34302c",
        "warm-nude": "#F2D5C4",
        "primary-fixed-dim": "#f0bd8b",
        "surface-dim": "#e1d8d4",
        "on-secondary-container": "#785f53",
        "inverse-primary": "#f0bd8b",
        "secondary-container": "#fedbcc",
        "secondary-fixed-dim": "#e0c0b1",
        "surface-tint": "#7d562d",
        "on-secondary": "#ffffff",
        "primary": "#7d562d",
        "surface-container-lowest": "#ffffff"
      }
    }
  },
  plugins: [],
};
export default config;
