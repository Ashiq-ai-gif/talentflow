# TalentFlow — Design Spec v2 (the rebuild)

**Direction:** Crisp Professional (Linear / Stripe school).
**Accent:** Emerald (single accent — used sparingly).
**Theme:** All-light, structure from borders & type, not color.

This spec replaces the v1 "gradient SaaS template" look. The rules below are
non-negotiable for the rebuild.

---

## 0. Hard bans (what made v1 look cheap)

- ❌ No gradient **text** (the indigo→green headline).
- ❌ No gradient **buttons**, **logo tile**, or **aurora/mesh** backgrounds.
- ❌ No glassmorphism / backdrop-blur panels.
- ❌ No oversized radii (`rounded-2xl`/`3xl` everywhere) or giant empty padding.
- ❌ No dark sidebar (we're all-light now).
- ❌ No more than one accent color on a screen.

## 1. Color

| Token | Hex | Use |
|---|---|---|
| Ink | `#0B0F19` | Headings, key text |
| Slate-900 | `#0F172A` | Strong text |
| Slate-600 | `#475569` | Body |
| Slate-500 | `#64748B` | Muted / captions |
| Slate-400 | `#94A3B8` | Placeholder, icons-idle |
| Border | `#E2E8F0` (slate-200) | Default hairline |
| Border-strong | `#CBD5E1` (slate-300) | Inputs, hover |
| Canvas | `#FFFFFF` | Page bg (marketing) |
| App canvas | `#F8FAFC` (slate-50) | Signed-in bg, alt sections |
| **Accent** | `#059669` (emerald-600) | Primary action, active nav, links, focus |
| Accent-hover | `#047857` (emerald-700) | Hover/pressed |
| Accent-tint | `#ECFDF5` (emerald-50) | Selected/active backgrounds |

Status chips (applied/hired/etc.) keep their hues but only ever appear as small
chips — never as page-level color.

## 2. Typography (Geist)

- Display (hero): `text-4xl sm:text-5xl font-semibold tracking-[-0.02em] text-ink`. One color. Emphasis word may be emerald-600 **solid**, not gradient.
- H1 (page): `text-xl sm:text-2xl font-semibold tracking-tight`.
- H2: `text-base font-semibold`.
- Body: `text-sm text-slate-600 leading-relaxed`.
- Eyebrow: `text-xs font-semibold uppercase tracking-wider text-emerald-700` (used rarely).
- Numbers/money: `tabular-nums`.

## 3. Shape, border, elevation

- Radius: cards `rounded-xl` (12px); buttons/inputs `rounded-lg` (8–10px); chips `rounded-md`/pill for status.
- **Every surface has a real border** (`border border-slate-200`). That's the primary separator — not shadow.
- Shadow: default none; interactive cards `hover:border-slate-300 hover:shadow-sm`. One soft `shadow-sm` max. No colored/brand glows.
- Spacing: 8px grid; card padding `p-5`; sections `py-14/16`; max width `max-w-6xl`, reading `max-w-prose`.

## 4. Components

- **Button** — primary: `bg-emerald-600 text-white hover:bg-emerald-700` (solid, `shadow-none`, subtle). secondary: `bg-white border border-slate-300 text-slate-800 hover:bg-slate-50`. ghost: `text-slate-600 hover:bg-slate-100`. Sizes sm/md/lg, `rounded-lg`, `font-medium`.
- **Card** — `bg-white border border-slate-200 rounded-xl`. `hover` variant adds `border-slate-300 shadow-sm`.
- **Input/Select/Textarea** — `border border-slate-300 rounded-lg`, focus `border-emerald-600 ring-2 ring-emerald-600/20`. Search field has a leading search icon.
- **Badge** — `rounded-md px-2 py-0.5 text-xs font-medium` with tint+text of one hue; subtle.
- **Logo** — solid mark: emerald-600 (or ink) rounded-md square with a simple monogram/glyph; wordmark in ink, single color. No gradient.
- **Stat** — bordered card, number-led (`text-2xl font-semibold tabular-nums`), small slate label, optional small slate icon (not a colored tile).
- **JobCard** — compact: company monogram (left) + title + "Company · location" + small meta; salary right-aligned & muted; up to 3 small skill chips; whole card is a bordered row that highlights border on hover. ~½ the current height.
- **Sidebar (light)** — `bg-white border-r border-slate-200`; items `text-slate-600`; active = `bg-emerald-50 text-emerald-700` with a 2px emerald left bar; icons idle slate-400 → active emerald-600.
- **ProgressRing** — single emerald stroke (no gradient).
- **Icons** — keep the clean line set; idle slate-400, active/feature emerald-600.

## 5. Page blueprints

- **Landing hero** — left-aligned, 2-column. Left: eyebrow, ink headline (one emerald word), concise subcopy, primary + secondary CTA, a thin trust row ("9 open roles · 2 companies · 5 tools" as inline text with dividers). Right: a **real product visual** — a CSS/SVG mock of the ATS board / job list — so the page shows the product. White bg; no mesh.
- **Sections** — alternate white / slate-50 with top borders. Feature grid: small bordered icon tile (emerald glyph) + title + one-line desc. Tighter than v1.
- **How it works** — 3 steps, numbered in emerald, bordered cards, compact.
- **Pricing** — 3 bordered cards; featured = emerald border + small "Popular" chip (no heavy ring/shadow).
- **CTA** — a single bordered slate-50 band (or ink band) with headline + buttons. No gradient.
- **Auth** — split: left panel `bg-slate-50 border-r` with a product mock + a short customer quote + feature ticks (emerald checks); right = compact form (tighter inputs). Drop the purple gradient panel.
- **Dashboard** — light sidebar; bordered topbar; bordered stat cards; compact list/board rows; emerald only on primary actions, active nav, and positive status.

## 6. Acceptance bar

A screen is "done" when: it has clear visual hierarchy (you know where to look first), every card/edge is defined by a border (nothing disappears into the bg), emerald appears only on actions/active/positive states, there are zero gradients, and spacing feels intentional (not empty). Verified by screenshot at desktop + mobile.
