import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  publicDir: path.resolve(__dirname, "../../../Data"),
  server: {
    port: 3000,
    proxy: {
      "/api": "http://localhost:3000",
      "/notes": {
        target: "http://localhost:3000",
        bypass: (req) => {
          if (req.headers.accept?.includes("text/html")) return req.url
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
