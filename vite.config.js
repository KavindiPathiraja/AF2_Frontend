import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
    // Add these lines for better test experience
    css: false,
    include: ["src/**/*.{test,spec}.{js,jsx,ts,tsx}"],
  },
  build: {
    outDir: "dist",
  },
  server: {
    port: 5173,
  },
  // Specify the entry point
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
    },
  },
})
