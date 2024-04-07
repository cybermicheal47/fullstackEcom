import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000", // Specify the target URL of your API server
        changeOrigin: true, // Necessary for handling CORS
        // rewrite: (path) => path.replace(/^\/api/, ""), // Rewrite the request path if needed
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
