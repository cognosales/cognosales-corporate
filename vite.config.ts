import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    target: "node-server",
  },
  server: {
    host: "0.0.0.0",
    port: process.env.PORT || 8080,
  },
});
