
## Goal
Make the contact form on `/contact` actually save submissions and notify you by email, in a way that runs identically on Lovable preview AND on Railway.

## Architecture

```text
[Contact form on /contact]
         |
         v
[TanStack server function: submitContact]
         |
         +--> Supabase (Postgres) --> contact_submissions table
         |
         +--> Resend API ----------> email to hello@cognosales.com
```

No queues, no cron, no Lovable-specific runtime dependencies. Works on any host that runs Node/Workers.

## Step 1 — Enable Lovable Cloud
Provisions a Supabase project automatically. Auto-generates `@/integrations/supabase/client` and `client.server`. Gives you env vars: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_URL`.

## Step 2 — Create the database table
Migration creates `public.contact_submissions`:
- `id uuid pk default gen_random_uuid()`
- `name text not null`
- `email text not null`
- `company text`
- `message text not null`
- `created_at timestamptz default now()`

RLS enabled. Policies:
- Public `INSERT` allowed (anyone can submit the form)
- No `SELECT` policy → only the service role (you, via dashboard) can read submissions. Prevents data leaks.

## Step 3 — Add Resend
- Ask you for your `RESEND_API_KEY` and store it as a Lovable secret
- Use the `onboarding@resend.dev` sender initially (no DNS needed) — you can switch to `noreply@cognosales.com` later by verifying your domain in Resend
- Email goes to `hello@cognosales.com` with subject like "New CognoSales contact: <name>"

## Step 4 — Server function
Create `src/server/contact.functions.ts` exporting `submitContact`:
- Zod-validates input (name 1–100, email valid + max 255, company max 100, message 1–2000)
- Inserts into `contact_submissions` via `supabaseAdmin`
- Calls Resend `POST /emails` with the submission details
- Returns `{ ok: true }` on success, throws on validation failure
- Email send is non-blocking for the user — if Resend fails, the row is still saved and the user sees success (we log the email error server-side)

## Step 5 — Wire up the form
Update `src/routes/contact.tsx`:
- Replace the fake `setTimeout` with a real call to `submitContact` via `useServerFn`
- Add `name="..."` attributes on each input so we can read FormData
- Keep the existing toast UX
- Disable button + show "Sending…" during submit
- On error, show `toast.error` with a friendly message

## Step 6 — Railway deployment guide (in chat, no code)
After everything works in Lovable, I'll give you the exact list of env vars to paste into Railway:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`

Plus: confirm Railway's build command is `bun run build` and start command is correct for TanStack Start (Node adapter — note Railway runs Node, not Cloudflare Workers, so we'll verify the build target works there).

## Files affected
- `src/routes/contact.tsx` — wire form to server function
- `src/server/contact.functions.ts` — new (server function)
- `src/server/contact.server.ts` — new (Resend send helper)
- New DB migration for `contact_submissions` table + RLS

## What you need to do
1. Approve this plan
2. Sign up at resend.com (free), grab an API key from their dashboard, paste it when I ask
3. Later: verify cognosales.com in Resend if you want emails from your own domain

## Open question
You mentioned hosting on Railway specifically. Heads up: this project is currently configured for Cloudflare Workers (`wrangler.jsonc`). TanStack Start can target Node for Railway, but it's a small config change. I'll handle that if/when you're ready to deploy — just flagging it so it's not a surprise.
