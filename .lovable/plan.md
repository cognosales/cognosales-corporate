## Switch to a Light/White Theme

Convert the current dark-first design to a clean, white/light theme while keeping the AI-native polish (gradients, glow accents, glass effects).

### What changes

**`src/styles.css`** — rewrite the color tokens in `:root`:
- `--background`: near-white (`oklch(0.99 0.005 250)`)
- `--foreground`: deep slate (`oklch(0.２0 0.03 260)`)
- `--card` / `--popover`: pure white with subtle tint
- `--muted`: light gray (`oklch(0.96 0.01 255)`)
- `--muted-foreground`: medium slate
- `--border` / `--input`: soft dark at low opacity (`oklch(0.2 0.03 260 / 8%)`)
- `--primary`: keep brand blue but slightly deeper for contrast on white
- `--accent`: keep purple, tuned for white background
- `--primary-foreground`: white (text on colored buttons)

**Body background** — replace dark radial gradients with soft light ones:
- Light blue/purple radial tints at low opacity over white
- Update `--gradient-hero`, `--gradient-card`, `--shadow-glow`, `--shadow-elegant` for light surfaces

**`.glass` utility** — switch from translucent dark to translucent white:
- `background: oklch(1 0 0 / 0.7)` with white border and subtle shadow

**Components review** — spot-check that the following still read well on white and tweak any hardcoded dark classes if found:
- `src/components/site-header.tsx` (header bg, nav links)
- `src/components/site-footer.tsx`
- `src/routes/index.tsx` (hero, tools grid, ask-anything panel, pricing comparison)
- `src/routes/about.tsx`, `src/routes/contact.tsx`

Most colors flow through CSS variables, so the token swap handles 90% automatically. Any leftover dark-only utility classes (e.g. `bg-slate-900`, `text-white`) get replaced with semantic tokens (`bg-background`, `text-foreground`).

### What stays
- Gradient brand accents, glow on CTAs, animations (`float`, `pulse-glow`)
- Layout, typography (Inter + Space Grotesk), all content and routes
- Hero image asset (still works on white with adjusted overlay opacity)
