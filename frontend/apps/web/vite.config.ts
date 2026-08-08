import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  publicDir: path.resolve(__dirname, "../../../Data"),
  server: {
    port: 5173,
    proxy: {
      // 127.0.0.1 rather than localhost: Node resolves localhost to ::1 first
      // on Windows, and `app.run(host="0.0.0.0")` binds IPv4 only, so the
      // proxy fails and every page that fetches from /api hangs on "Loading".
      "/api": "http://127.0.0.1:3000",
      "/resources": {
        target: "http://127.0.0.1:3000",
        bypass: (req) => {
          // Let the browser's SPA navigation through so React Router handles
          // /resources/<Category>/<Code>/<Filename> URLs. Fetch/XHR requests
          // (which ask for application/json or text/plain) still hit Flask.
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
