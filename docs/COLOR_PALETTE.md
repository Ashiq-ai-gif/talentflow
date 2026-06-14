# TalentFlow — Color Palette

All colors are exposed as design tokens in `src/app/globals.css` (`@theme`) and used through
Tailwind utility classes. Never hard-code hex values in components — use the token/utility.

---

## 1. Brand / Primary

| Token | Hex | Tailwind | Usage |
|---|---|---|---|
| Brand Indigo 600 | `#4F46E5` | `indigo-600` | Primary buttons, active nav, links, focus ring. |
| Brand Indigo 700 | `#4338CA` | `indigo-700` | Hover/pressed primary. |
| Brand Indigo 50 | `#EEF2FF` | `indigo-50` | Tinted backgrounds, selected rows. |

**Primary gradient:** `linear-gradient(90deg, #6366F1 0%, #10B981 100%)` (indigo → emerald)
— reserved for hero accents and the "Flow" wordmark.

## 2. Neutrals (Ink & Slate)

| Token | Hex | Tailwind | Usage |
|---|---|---|---|
| Ink | `#0F172A` | `slate-900` | Primary text, headings. |
| Slate 600 | `#475569` | `slate-600` | Secondary text. |
| Slate 400 | `#94A3B8` | `slate-400` | Placeholder, disabled. |
| Slate 200 | `#E2E8F0` | `slate-200` | Borders, dividers. |
| Surface | `#FFFFFF` | `white` | Cards, sheets. |
| Background | `#F7F8FB` | `--background` | App canvas. |

## 3. Semantic / Status

| Meaning | Color | Tailwind chip |
|---|---|---|
| Success / Hired | Emerald `#10B981` | `bg-emerald-100 text-emerald-700` |
| Info / Viewed | Sky `#0EA5E9` | `bg-sky-100 text-sky-700` |
| In-process / Screening | Indigo `#4F46E5` | `bg-indigo-100 text-indigo-700` |
| Shortlisted | Violet `#7C3AED` | `bg-violet-100 text-violet-700` |
| Pending / Interview / Warning | Amber `#F59E0B` | `bg-amber-100 text-amber-700` |
| Error / Rejected | Rose `#E11D48` | `bg-rose-100 text-rose-700` |
| Neutral / Applied | Slate `#64748B` | `bg-slate-100 text-slate-700` |

## 4. Verification Badge Colors

| Badge | Tailwind |
|---|---|
| Bronze | `bg-amber-100 text-amber-800` |
| Silver | `bg-slate-200 text-slate-700` |
| Gold | `bg-yellow-100 text-yellow-800` |

## 5. Match-band Colors (AI ranking)

| Band | Score | Color |
|---|---|---|
| Best | ≥ 80 | Emerald |
| Good | 60–79 | Sky |
| Average | 40–59 | Amber |
| Poor | < 40 | Rose |

## 6. Rules

1. **One accent per screen.** Indigo leads; semantic colors are for status only.
2. **Contrast first.** Text on tinted chips uses the 700/800 shade of the same hue.
3. **No pure black.** Use Ink `#0F172A`.
4. **Tokenize.** Add new colors to `@theme` in `globals.css`, document here, then use.
