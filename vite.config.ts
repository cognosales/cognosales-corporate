// Build target: Node.js (for Railway / any Node host) instead of Cloudflare Workers.
// - cloudflare: false disables the Cloudflare Vite plugin
// - tanstackStart.target: "node-server" produces a Node server bundle at .output/server/index.mjs
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    target: "node-server",
  },
});
