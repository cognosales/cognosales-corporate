## Goal
Replace the current busy hero image on the homepage with a minimal, on-brand visual that primarily represents **Voice AI**, with subtle nods to **data** and **SaaS**.

## Visual direction
- **Subject**: A single, centered abstract voice waveform (sound wave / equalizer bars) — the universal signal of voice AI.
- **Subtle data layer**: Faint grid lines or a few small data dots/nodes behind the waveform, like a quiet chart axis.
- **Mood**: Minimal, dark, premium SaaS. Lots of negative space.
- **Palette**: Matches the existing brand — deep navy/near-black background (oklch ≈ 0.18 0.04 265) with the brand blue→purple gradient (oklch 0.6 0.18 250 → 0.58 0.22 295) on the waveform and a soft glow.
- **No people, no UI screenshots, no busy scenes, no logos.**

## Steps
1. Generate a new hero image with the Lovable AI Gateway (Nano Banana Pro for higher quality), prompt focused on:
   - Minimal horizontal voice waveform / audio equalizer in glowing blue→purple gradient
   - Dark navy background, subtle data grid in the distance
   - Plenty of empty space, cinematic, premium SaaS aesthetic
   - 16:9, no text, no faces, no clutter
2. Save the result to `src/assets/hero.jpg` (replacing the current file). Existing import `import heroImg from "@/assets/hero.jpg"` keeps working — no code changes needed in `src/routes/index.tsx`.
3. Keep the dark gradient overlay already in place so the headline stays readable while the waveform shows through softly.
4. QA the new image (open it, verify it's minimal, on-theme, and looks good behind the headline at 1062px viewport).

## Files affected
- `src/assets/hero.jpg` — replaced

No component, route, or style changes required.
