## Why the build fails

Railway runs `bun run build`, which calls `tanstack-start build`. That CLI does not exist in this project — `@tanstack/react-start` only ships an `intent` binary, not `tanstack-start`. TanStack Start v1 builds through the Vite plugin, so the correct command is `vite build`. Hence `command not found` → exit 127.

The `start` command (`node .output/server/index.mjs`) is correct — `vite build` with the TanStack Start plugin (already wired in `vite.config.ts` via `@lovable.dev/vite-tanstack-config`) outputs to `.output/server/index.mjs`.

## Fix

Update `package.json` scripts:

```json
"build": "vite build",
"build:dev": "vite build",
```

Everything else (`railway.json`, `nixpacks.toml`, `vite.config.ts`, start command) stays as-is.

After this change Railway will: `bun install` → `bun run build` (= `vite build`) → produce `.output/server/index.mjs` → start with `node .output/server/index.mjs`.