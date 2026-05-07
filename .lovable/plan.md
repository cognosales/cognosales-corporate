## Why cognosales.com shows 404

The 404 isn't a routing bug in your app — Railway never successfully started your server, so the domain has nothing to serve. Your repo currently has **four conflicting deploy configs** all pointing to a file path that your build never produces.

### The conflict map

| File | Tells Railway to… | Problem |
|---|---|---|
| `Dockerfile` | Build with `npm`, run `node dist/server/index.js` | That path doesn't exist after build |
| `railway.json` | Use **DOCKERFILE** builder, run `npm run start` | Forces Docker, **ignores nixpacks.toml** |
| `nixpacks.toml` | Use Bun + Nixpacks, run `node dist/server/index.js` | Ignored; also wrong path |
| `package.json` `"start"` | `node dist/server/index.js` | Wrong path |
| `vite.config.ts` | TanStack Start `target: 'node-server'` | Outputs to **`.output/server/index.mjs`**, not `dist/...` |

So every deploy either:
- builds with Docker → can't find `dist/server/index.js` → container exits → 404 on the domain, OR
- never reaches Nixpacks at all because `railway.json` overrides it.

### Bonus issues spotted

- Two lockfiles (`bun.lock` + Dockerfile uses `npm install`) → inconsistent installs.
- `@cloudflare/vite-plugin` still in `dependencies` (leftover from Cloudflare attempt).
- `wrangler.jsonc` may still exist (Cloudflare-only, harmless but misleading).
- `vite.config.ts` `server.port` is a **dev-server** option — production reads `PORT` itself, fine to leave but doesn't help prod.

---

## The fix — one clean Nixpacks + Bun pipeline

### 1. Replace `railway.json`
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

### 2. Replace `nixpacks.toml`
```toml
[phases.setup]
nixPkgs = ["bun", "nodejs_20"]

[phases.install]
cmds = ["bun install"]

[phases.build]
cmds = ["bun run build"]
```
(Drop the `[start]` block — `railway.json` owns start.)

### 3. Update `package.json`
Change `"start": "node dist/server/index.js"` → `"start": "node .output/server/index.mjs"`

### 4. Delete these files
- `Dockerfile` (conflicting builder)
- `wrangler.jsonc` (if present — Cloudflare-only)

### 5. Optional cleanup
- `bun remove @cloudflare/vite-plugin` (no longer used)

### 6. Verify Railway env vars
In your Railway service → **Variables**, all five must be set:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`

### 7. Verify the domain
After the deploy goes green and the Railway-generated URL works, in Railway → Settings → **Networking** → make sure `cognosales.com` is added as a Custom Domain and the DNS CNAME at your registrar points to the Railway target host. The 404 will keep happening until both the deploy is healthy AND the domain is bound to this service.

---

## Why this works

TanStack Start with `target: 'node-server'` (your current `vite.config.ts`) produces a Nitro-style Node bundle at `.output/server/index.mjs`. Aligning the start command, package.json script, and build pipeline to that single path eliminates every "module not found" failure and lets Railway boot the server. Once the server boots, your custom domain stops returning 404.

Want me to switch to build mode and apply this?