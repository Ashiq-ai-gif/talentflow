# TalentFlow — Brand Guidelines

> The brand expresses **trust, intelligence, and momentum**. We are the calm, smart
> co-pilot for hiring — confident but never loud, modern but never cold.

---

## 1. Brand Essence

| Attribute | Meaning |
|---|---|
| **Smart** | AI-assisted, data-driven, helpful. |
| **Trustworthy** | Verification, transparency, fairness. |
| **Effortless** | The "easiest" hiring platform — clarity over clutter. |
| **Human** | Hiring is about people, not just resumes. |

**Voice:** clear, encouraging, plain-spoken. Short sentences. Active verbs. Never jargon-heavy.
**Tagline:** _"Hiring, made smart."_

## 2. Logo

- **Wordmark:** `TalentFlow` set in the display weight of the brand sans (Geist).
- The "Flow" is emphasized with the **Brand Indigo → Emerald** gradient or with the accent dot.
- **Mark:** a rounded "TF" monogram / flow-arrow in a `rounded-2xl` indigo tile.
- **Clear space:** keep at least the height of the "T" around the logo.
- **Don'ts:** don't stretch, recolor outside the palette, add drop shadows, or place on busy imagery without a scrim.

## 3. Color Palette

See `COLOR_PALETTE.md` for the full token table and usage rules. Headline colors:

- **Brand Indigo** `#4F46E5` — primary actions, links, focus.
- **Emerald** `#10B981` — success, "hired", positive deltas, gradient partner.
- **Ink** `#0F172A` — primary text.
- **Slate** scale — surfaces, borders, secondary text.
- **Amber / Rose / Sky / Violet** — pipeline-stage and status semantics only.

## 4. Typography

- **Primary typeface:** **Geist Sans** (shipped via `next/font`), with system-ui fallback.
- **Monospace:** **Geist Mono** for IDs, code, and assessment snippets.
- **Scale (Tailwind):** `text-xs … text-5xl` on a 1.25 ratio. Display headings `font-semibold`/`font-bold`, tracking tight (`tracking-tight`).
- **Body:** `text-sm`/`text-base`, `leading-relaxed`, slate-600 for secondary.

## 5. Logo & UI Tone

- Generous whitespace; **8px spacing grid**.
- Rounded geometry: cards `rounded-2xl`, inputs/buttons `rounded-xl`, chips `rounded-full`.
- Soft elevation: `shadow-sm` default, `shadow-md` on hover for interactive cards. Avoid heavy shadows.
- One accent per view — let indigo lead; semantic colors only for status.

## 6. Imagery & Iconography

- **Icons:** single-weight line icons (inline SVG), `1.5` stroke, rounded caps.
- **Illustration:** subtle gradient meshes (indigo/emerald) for hero and empty states.
- **Photography (future):** candid, diverse, workplace-real — never stocky handshakes.

## 7. Accessibility

- Target **WCAG 2.2 AA**: body text contrast ≥ 4.5:1, large text ≥ 3:1.
- Every interactive element has a visible `focus-visible` ring (indigo, 2px, offset).
- Color is never the only signal — pair with text/icon (e.g. status chips show a label).
- Hit targets ≥ 40×40px. Respect `prefers-reduced-motion`.

## 8. Motion

- Purposeful and quick: 150–250ms, `ease-out` for enter, `ease-in` for exit.
- Use motion to explain change (stage moves, toasts), never for decoration.
