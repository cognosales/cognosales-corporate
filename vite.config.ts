import { defineConfig } from '@lovable.dev/vite-tanstack-config'
 
export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    target: 'node-server',
    entry: 'src/entry.server.ts',
  },
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 3000,
  },
})
