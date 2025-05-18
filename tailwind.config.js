/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "*.{js,ts,jsx,tsx,mdx}",
      "app/**/*.{ts,tsx}",
      "components/**/*.{ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          primary: {
            DEFAULT: "#2E5077", // Dark blue
            foreground: "#FFFFFF",
            light: "#3A6491",
            dark: "#234060",
          },
          secondary: {
            DEFAULT: "#4DA1A9", // Teal
            foreground: "#FFFFFF",
            light: "#5FB8C0",
            dark: "#3D8188",
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))",
          },
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
          accent: {
            DEFAULT: "#79D7BE", // Mint green
            foreground: "#1F2937",
            light: "#8EECD3",
            dark: "#5EC0A7",
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
          background: {
            DEFAULT: "#FFE2E2", // Light pink
            light: "#FFF0F0",
            dark: "#FFCECE",
          },
          gray: {
            50: "#F9FAFB",
            100: "#F3F4F6",
            200: "#E5E7EB",
            300: "#D1D5DB",
            400: "#9CA3AF",
            500: "#6B7280",
            600: "#4B5563",
            700: "#374151",
            800: "#1F2937",
            900: "#111827",
          },
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
        fontFamily: {
          sans: ["Inter", "system-ui", "sans-serif"],
        },
        boxShadow: {
          soft: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          card: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        },
        container: {
          center: true,
          padding: {
            DEFAULT: "1rem",
            sm: "2rem",
            lg: "4rem",
            xl: "5rem",
            "2xl": "6rem",
          },
        },
      },
    },
    plugins: [require("tailwindcss-animate")],
  }
  