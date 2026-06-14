# TalentFlow — Design System & Guidelines

A practical, above-industry-standard system. Goal: every screen feels like one product —
consistent spacing, type, color, and interaction. Build from primitives, not one-offs.

---

## 1. Foundations

- **Spacing:** 8px grid (`gap-2/4/6/8`). Section padding `px-6 py-8` desktop, `px-4 py-6` mobile.
- **Radius:** cards `rounded-2xl`, inputs/buttons `rounded-xl`, chips/avatars `rounded-full`.
- **Elevation:** `shadow-sm` resting, `hover:shadow-md` for interactive cards, `ring-1 ring-slate-200` for definition.
- **Container:** content max-width `max-w-6xl mx-auto`; reading width `max-w-2xl`.
- **Breakpoints:** mobile-first; `sm 640 / md 768 / lg 1024 / xl 1280`.

## 2. Layout Patterns

- **Marketing (public):** top nav + full-bleed hero (`gradient-hero`) + feature grid + footer.
- **App (authenticated):** persistent left sidebar (role-aware nav) + top bar (search, profile) + content.
- **Detail pages:** two-column — primary content (2/3) + sticky context rail (1/3).
- **ATS board:** horizontal scroll of stage columns; cards draggable between stages.

## 3. Components (in `src/components`)

| Component | Notes |
|---|---|
| `Button` | Variants: `primary` (indigo), `secondary` (white+border), `ghost`, `danger`. Sizes `sm/md`. Loading + disabled states. |
| `Card` | `rounded-2xl bg-white ring-1 ring-slate-200`, optional `hover` lift. |
| `Badge` | Pill; `tone` maps to semantic palette. |
| `Input` / `Textarea` / `Select` | `rounded-xl`, slate border, indigo focus ring, label + helper + error. |
| `Field` | Label + control + error wrapper for forms. |
| `Stat` | Big number + label + optional delta for dashboards. |
| `EmptyState` | Icon + title + hint + action; for zero-data views. |
| `Avatar` | Initials fallback over indigo tint. |
| `PipelineBadge` | Application-stage chip using `STAGE_COLORS`. |

> Components live in `src/components/ui.tsx` (primitives) and feature folders. Compose, don't fork.

## 4. Typography Scale

| Role | Classes |
|---|---|
| Display | `text-4xl sm:text-5xl font-bold tracking-tight` |
| H1 | `text-2xl font-semibold tracking-tight` |
| H2 | `text-lg font-semibold` |
| Body | `text-sm text-slate-700 leading-relaxed` |
| Caption | `text-xs text-slate-500` |
| Mono | `font-mono text-xs` for IDs/codes |

## 5. Forms & Validation

- Label above control. Helper text below. Errors in rose with an icon, announced via `aria-describedby`.
- Disable submit while pending; show spinner; never double-submit.
- Use Server Actions for mutations; optimistic UI where it helps.

## 6. States (always design all five)

1. **Empty** — guide the first action.
2. **Loading** — skeletons, not spinners-only, for content.
3. **Error** — plain explanation + retry.
4. **Partial** — pagination / "load more".
5. **Success** — confirmation toast or inline.

## 7. Accessibility (WCAG 2.2 AA — non-negotiable)

- Semantic HTML first (`button`, `nav`, `main`, `label`).
- Visible `focus-visible:ring-2 ring-indigo-500 ring-offset-2`.
- Status conveyed with text + color (never color alone).
- Keyboard: full nav, logical tab order, `Esc` closes overlays, focus trap in modals.
- `alt` on all meaningful images; decorative images `alt=""`.

## 8. Next.js 16 Conventions (project-specific — read `AGENTS.md`)

- **Async request APIs:** `await cookies()`, `await headers()`. `params`/`searchParams` are **Promises** — `await props.params`.
- **Proxy not middleware:** session refresh lives in `src/proxy.ts` exporting `proxy`.
- **Server Components by default;** add `"use client"` only when needed (state, effects, events).
- **Server Actions** (`"use server"`) for writes; revalidate paths after mutations.
- Use `next/font` (Geist) and `next/image`.

## 9. Do / Don't

- ✅ Reuse primitives, tokens, and constants (`src/lib/constants.ts`).
- ✅ Keep one accent per screen; lots of whitespace.
- ✅ Write all five states.
- ❌ Hard-code colors or spacing magic numbers.
- ❌ Block the UI on slow work in proxy.
- ❌ Ship a control without a focus state.
