import ssrServer from './dist/server/server.js';
import { resolve, join } from 'node:path';

const CLIENT_DIR = resolve('./dist/client');
const PORT = Number(process.env.PORT) || 8080;

Bun.serve({
  port: PORT,
  hostname: '0.0.0.0',
  async fetch(request) {
    const url = new URL(request.url);
    const filePath = join(CLIENT_DIR, url.pathname);

    // Prevent directory traversal outside dist/client
    if (filePath.startsWith(CLIENT_DIR)) {
      const file = Bun.file(filePath);
      if (await file.exists()) {
        return new Response(file);
      }
    }

    return ssrServer.fetch(request);
  },
});

console.log(`Started server: http://localhost:${PORT}`);
