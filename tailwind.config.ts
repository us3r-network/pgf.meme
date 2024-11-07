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
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
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
