import { defineConfig } from '@lovable.dev/vite-tanstack-config'

export default defineConfig({
  cloudflare: false,

  tanstackStart: {
    target: 'node-server',
  },

  vite: {
    server: {
      host: '0.0.0.0',
      port: Number(process.env.PORT) || 8080,
      allowedHosts: ['cognosales.com'],
    },
    preview: {
      allowedHosts: ['cognosales.com'],
    },
  },
})
