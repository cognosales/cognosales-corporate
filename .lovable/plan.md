
## Goal
Make the app build and run on Railway (Node.js host) instead of Cloudflare Workers, without breaking the Lovable preview.

## Current state
- `vite.config.ts` uses `@lovable.dev/vite-tanstack-config`, which targets Cloudflare Workers by default (the `cloudflare` plugin is included automatically).
- `wrangler.jsonc` exists at the project root — Workers-specific config.
- Server function (`submitContact`) and Supabase admin client both use `process.env.*`, which works on Node too — no code changes needed there.

## What changes

### 1. Switch Vite to the Node target
Update `vite.config.ts` to disable the Cloudflare preset and enable the Node SSR target for TanStack Start:

```ts
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  target: "node", // build for Node.js instead of Cloudflare Workers
});
```

(If the preset doesn't expose a `target` option, fall back to passing `vite: { ... }` overrides that set TanStack Start's `target: 'node-server'` and remove the cloudflare plugin.)

### 2. Remove `wrangler.jsonc`
Delete the file — it's only read by Cloudflare's tooling and is misleading on a Node deploy.

### 3. Add Railway config files
Create two small files at the project root:

- **`railway.json`** — tells Railway how to build/start:
  ```json
  {
    "$schema": "https://railway.app/railway.schema.json",
    "build": { "builder": "NIXPACKS" },
    "deploy": {
      "startCommand": "node .output/server/index.mjs",
      "restartPolicyType": "ON_FAILURE"
    }
  }
  ```

- **`nixpacks.toml`** — pins Bun for the install/build steps:
  ```toml
  [phases.setup]
  nixPkgs = ["bun", "nodejs_20"]

  [phases.install]
  cmds = ["bun install"]

  [phases.build]
  cmds = ["bun run build"]
  ```

### 4. Verify the build output path
After switching to the Node target, TanStack Start writes the server bundle to `.output/server/index.mjs` (standard Nitro/Node output). The `startCommand` above matches that.

### 5. No code changes needed
- `src/server/contact.functions.ts` already reads `process.env.RESEND_API_KEY` inside the handler ✅
- `src/integrations/supabase/client.server.ts` already reads `process.env.SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` inside the factory ✅
- Form wiring on `/contact` is unchanged ✅

## Files affected
- `vite.config.ts` — add `target: "node"`
- `wrangler.jsonc` — delete
- `railway.json` — new
- `nixpacks.toml` — new

## After this is done — your Railway deploy steps
1. Push to GitHub via Lovable → Connectors → GitHub → Connect project
2. In Railway: New Project → Deploy from GitHub repo → pick the repo
3. Variables tab → paste these 5:
   - `VITE_SUPABASE_URL` = `https://nxohzmezamvsyyhepoki.supabase.co`
   - `VITE_SUPABASE_PUBLISHABLE_KEY` = (the long key from `.env`)
   - `SUPABASE_URL` = same as above
   - `SUPABASE_SERVICE_ROLE_KEY` = copy from Lovable → Cloud → Settings → API keys
   - `RESEND_API_KEY` = the Resend key you already added
4. Railway auto-builds and gives you a URL. Test the contact form — submission should land in the database and email should arrive.

## Risk / open question
The `@lovable.dev/vite-tanstack-config` preset wraps the Cloudflare plugin internally. If `target: "node"` isn't a supported option on that preset, I'll need to override the SSR target via the `vite` escape hatch. I'll verify the exact API when I open the preset's types during implementation, and pick whichever form works without ejecting from the Lovable preset.
