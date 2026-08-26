import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "display-lg": ["'Libre Caslon Text'", "serif"],
        "display-lg-mobile": ["'Libre Caslon Text'", "serif"],
        "headline-md": ["'Libre Caslon Text'", "serif"],
        "headline-sm": ["'Libre Caslon Text'", "serif"],
        "body-lg": ["'Hanken Grotesk'", "sans-serif"],
        "body-md": ["'Hanken Grotesk'", "sans-serif"],
        "label-md": ["'Hanken Grotesk'", "sans-serif"],
        "label-sm": ["'Hanken Grotesk'", "sans-serif"],
      },
      fontSize: {
        "display-lg": ["64px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "400" }],
        "display-lg-mobile": ["40px", { lineHeight: "1.2", fontWeight: "400" }],
        "headline-md": ["32px", { lineHeight: "1.3", fontWeight: "400" }],
        "headline-sm": ["24px", { lineHeight: "1.4", fontWeight: "400" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        "label-md": ["14px", { lineHeight: "1.2", letterSpacing: "0.05em", fontWeight: "600" }],
        "label-sm": ["12px", { lineHeight: "1.2", letterSpacing: "0.1em", fontWeight: "500" }],
      },
      spacing: {
        "base": "8px",
        "container-max": "1280px",
        "gutter": "24px",
        "margin-mobile": "16px",
        "margin-desktop": "64px",
        "stack-sm": "4px",
        "stack-md": "12px",
        "stack-lg": "24px",
        "section-gap": "80px",
      },
      borderRadius: {
        "sm": "0.125rem",
        "DEFAULT": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px",
      },
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
      },
      keyframes: {
        progress: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        'progress': 'progress 1s ease-in-out infinite'
      }
    }
  },
  plugins: [],
};
export default config;
