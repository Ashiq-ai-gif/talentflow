# TalentFlow — Smart Hiring & Recruitment Platform

> Hiring, made smart. A complete hiring ecosystem — recruitment, applicant tracking,
> verification, AI screening, interviews, onboarding, and analytics — for job seekers,
> employers, and recruiters.

Built with **Next.js 16** (App Router, RSC, Server Actions), **TypeScript**, **Tailwind v4**,
and **Supabase** (Postgres + Auth + Row Level Security). Deployed on **Vercel**.

## Features

- **Auth & RBAC** — email/password auth with five roles (job seeker, employer, recruiter, admin, super admin), enforced by Postgres RLS.
- **Job seeker** — candidate profile, education/experience/skills, Career Score, verification badges, application tracking pipeline.
- **Job discovery** — keyword/location search with work-mode and job-type filters; one-click apply.
- **Employer** — company profile, AI-assisted job posting, and a full **ATS** board (Applied → Hired) with match bands.
- **Recruiter** — placements & commission tracking.
- **Admin / Super Admin** — content moderation, reports, feature flags, platform overview.

> Heavier integrations (AI screening calls, video-resume transcription, WhatsApp/SMS) are
> modelled in the schema and scaffolded behind clear stubs — see `docs/PRD.md`.

## Docs

- [`docs/PRD.md`](docs/PRD.md) — product requirements.
- [`docs/BRAND_GUIDELINES.md`](docs/BRAND_GUIDELINES.md) — brand.
- [`docs/COLOR_PALETTE.md`](docs/COLOR_PALETTE.md) — color tokens.
- [`docs/DESIGN_GUIDELINES.md`](docs/DESIGN_GUIDELINES.md) — design system.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in your Supabase URL + anon key
npm run dev
```

### Database

SQL migrations live in `supabase/migrations`. Apply them with the Supabase CLI:

```bash
supabase link --project-ref <your-ref>
supabase db push
```

Seed demo data (uses the service role key — never commit it):

```bash
SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/seed.mjs
```

## Demo accounts

Password for all: `Demo12345!`

| Role | Email |
|---|---|
| Employer | employer@talentflow.demo |
| Job Seeker | seeker@talentflow.demo |
| Recruiter | recruiter@talentflow.demo |
| Admin | admin@talentflow.demo |

## Tech notes (Next.js 16)

- Async request APIs: `await cookies()`, and `params`/`searchParams` are Promises.
- Session refresh uses the new **`proxy.ts`** convention (formerly middleware).

## License

Proprietary — all rights reserved.
