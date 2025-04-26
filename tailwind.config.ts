import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#6EC1E4",
          foreground: "#FFFFFF",
          light: "#C5EEF5",
          dark: "#0C768C",
        },
        secondary: {
          DEFAULT: "#54595F",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#61CE70",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom colors
        "custom-text": "#7A7A7A",
        "custom-dark": "#191919",
        "custom-blue": "#04B3D3",
        "custom-light-blue": "#5ED1E4",
        "custom-pale-blue": "#C5EEF5",
        "custom-deep-blue": "#0C768C",
        "custom-white": "#FFFFFF",
        "custom-off-white": "#F0FDFF",
      },
      backgroundColor: {
        "off-white": "#F0FDFF",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(110, 193, 228, 0.4)" },
          "50%": { boxShadow: "0 0 0 15px rgba(110, 193, 228, 0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
        "pop-in": {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 2s infinite",
        float: "float 3s ease-in-out infinite",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
        "pop-in": "pop-in 0.5s ease-out forwards",
        "pop-in-delay-1": "pop-in 0.5s ease-out 0.2s forwards",
        "pop-in-delay-2": "pop-in 0.5s ease-out 0.4s forwards",
        fadeIn: "fadeIn 0.3s ease-out forwards",
        scaleIn: "scaleIn 0.3s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
