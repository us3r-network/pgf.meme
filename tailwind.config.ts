import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 字体大小
      fontSize: {
        "3xl": "2rem", // 32px
        "4xl": "2.5rem", // 40px
      },
      colors: {
        background: "hsla(var(--background))",
        foreground: "hsla(var(--foreground))",
        card: {
          DEFAULT: "hsla(var(--card))",
          foreground: "hsla(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsla(var(--popover))",
          foreground: "hsla(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsla(var(--primary))",
          foreground: "hsla(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsla(var(--secondary))",
          foreground: "hsla(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsla(var(--muted))",
          foreground: "hsla(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsla(var(--accent))",
          foreground: "hsla(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsla(var(--destructive))",
          foreground: "hsla(var(--destructive-foreground))",
        },
        border: "hsla(var(--border))",
        input: "hsla(var(--input))",
        ring: "hsla(var(--ring))",
        chart: {
          "1": "hsla(var(--chart-1))",
          "2": "hsla(var(--chart-2))",
          "3": "hsla(var(--chart-3))",
          "4": "hsla(var(--chart-4))",
          "5": "hsla(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsla(var(--sidebar-background))",
          foreground: "hsla(var(--sidebar-foreground))",
          primary: "hsla(var(--sidebar-primary))",
          "primary-foreground": "hsla(var(--sidebar-primary-foreground))",
          accent: "hsla(var(--sidebar-accent))",
          "accent-foreground": "hsla(var(--sidebar-accent-foreground))",
          border: "hsla(var(--sidebar-border))",
          ring: "hsla(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "message-slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "10%": {
            transform: "translateX(-90%) rotate(-6deg)",
          },
          "20%": { transform: "translateX(-80%) rotate(6deg)" },
          "30%": {
            transform: "translateX(-70%) rotate(-6deg)",
          },
          "40%": { transform: "translateX(-60%) rotate(6deg)" },
          "50%": {
            transform: "translateX(-50%) rotate(-6deg)",
          },
          "60%": { transform: "translateX(-40%) rotate(6deg)" },
          "70%": {
            transform: "translateX(-30%) rotate(-6deg)",
          },
          "80%": { transform: "translateX(-20%) rotate(6deg)" },
          "90%": {
            transform: "translateX(-10%) rotate(-6deg)",
          },

          "100%": { transform: "translateX(0)" },
        },
        "message-move": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "message-fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        "message-slide-in": "message-slide-in 0.5s ease-in-out",
        "message-move": "message-move 0.5s ease-in-out",
        "message-fade-out": "message-fade-out 0.5s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
