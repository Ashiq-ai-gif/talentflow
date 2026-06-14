# TalentFlow — Product Requirements Document (PRD)

**Version:** 1.0  
**Owner:** Product / Engineering  
**Status:** Active build  
**Last updated:** 2026-06-14

---

## 1. Vision

Build the easiest and smartest hiring platform for employers and job seekers. Unlike
traditional job portals that only post jobs, TalentFlow is a complete hiring ecosystem:
recruitment, applicant tracking, candidate verification, AI screening, interview management,
onboarding, and analytics.

## 2. Goals & Non-Goals

### Goals
- A single platform serving five roles: Job Seeker, Employer, Recruiter, Admin, Super Admin.
- Frictionless candidate experience: rich profile, verification, application tracking.
- Powerful employer ATS: pipeline, ranking, interviews, assessments, onboarding.
- Trustworthy data via verification badges and reviews.
- Production-grade foundation: Supabase (Postgres + Auth + RLS), Next.js, deployed on Vercel.

### Non-Goals (this iteration)
- Real telephony for AI screening calls (scaffolded; uses stored transcript/summary fields).
- Real video transcription pipeline (schema + upload-ready; transcript is editable text).
- Payment processing for subscriptions (plan tiers modelled; no gateway).
- Native mobile apps.

## 3. Personas

| Persona | Needs |
|---|---|
| **Job Seeker** | Discover jobs, build a verified profile, apply, track pipeline, get AI help. |
| **Employer** | Post jobs, manage a company, screen & rank applicants, interview, hire, onboard. |
| **Recruiter** | Source & recommend candidates, track placements, earn commission. |
| **Admin** | Moderate jobs/reviews/profiles, handle abuse/fraud/spam reports, manage users. |
| **Super Admin** | Feature flags, subscriptions, revenue, commission settings, audit logs. |

## 4. Success Metrics

- **Employer:** Time to Hire, Cost per Hire, Application Quality.
- **Candidate:** Interview Rate, Hiring Rate, Profile Completion.
- **Platform:** Monthly Active Users, Active Jobs, Active Employers, Revenue, Placement Count.

## 5. Modules & Requirements

### 5.1 Authentication & RBAC
- Email/password registration & login. Mobile OTP, social login, MFA: roadmap-ready.
- Role chosen at signup; stored in `profiles.role`. Row Level Security enforces access.
- Session management via Supabase SSR cookies + Next.js proxy refresh.

### 5.2 Job Seeker Portal
- Candidate profile: personal info, education, experience, skills, certifications, portfolio, resumes.
- Video resume: 30s intro, multiple versions, transcript, playback analytics.
- Career Score: profile completion + experience + certifications + verification + assessments.

### 5.3 Candidate Verification
- Identity (Aadhaar/Passport/DL), Education, Employment verification.
- Badge levels: Bronze / Silver / Gold.

### 5.4 Job Discovery
- Search (keyword, location, company, skill). Filters (remote/hybrid/onsite, salary, experience, industry, type).

### 5.5 Application Tracking
- Pipeline: Applied → Viewed → Screening → Shortlisted → Interview → Offer → Hired / Rejected.
- Withdraw, reapply, notes, interview history.

### 5.6 Employer Portal & ATS
- Company profile + verification (business reg, GST).
- Job management with AI assistance (JD, responsibilities, requirements, interview questions).
- ATS pipeline (drag-style stage moves), notes, ratings, tags, team collaboration.
- AI candidate ranking → Best/Good/Average/Poor match bands.

### 5.7 Interviews & Assessments
- Scheduling, modes (online/offline/phone), feedback forms, scorecards.
- Assessments: coding/aptitude/language/subject/sales, timed, auto-eval, ranking.

### 5.8 AI Screening Calls
- Automated questions (experience, notice period, salary, availability) → AI summary for employer.

### 5.9 Recruiter Marketplace & Referrals
- Recruiters source/recommend candidates, track placements, commission.
- Employee referral workflow with rewards.

### 5.10 Communication, Onboarding, Analytics
- In-app messaging (+ email/WhatsApp/SMS channels modelled).
- Onboarding: document collection, offer/joining letters, NDA, training checklist.
- Analytics: hiring funnel, conversion, source analysis, recruiter performance, time/cost to hire.

### 5.11 Reviews, Salary Intelligence, Admin/Super Admin
- Two-sided reviews. Salary benchmarks & recommendations.
- Admin moderation + reports. Super Admin platform control + audit logs.

## 6. Subscription Plans
- **Free:** limited job posts & applications.
- **Professional:** unlimited jobs, ATS, analytics.
- **Enterprise:** AI hiring suite, custom branding, dedicated support.

## 7. Architecture

- **Frontend:** Next.js 16 (App Router, RSC, Server Actions), TypeScript, Tailwind v4.
- **Backend/DB:** Supabase Postgres with Row Level Security; Supabase Auth.
- **Hosting:** Vercel (frontend), Supabase cloud (database/auth).
- **Type safety:** Generated DB types (`src/lib/database.types.ts`).

## 8. Delivery Phases

- **Phase 1:** Job portal, applications, ATS. _(core build)_
- **Phase 2:** AI ranking, video resume, assessments.
- **Phase 3:** AI calls, recruiter marketplace, referrals.
- **Phase 4:** Onboarding, salary intelligence, enterprise features.

The database schema in this repo covers **all phases**; the UI is delivered iteratively,
with later-phase integrations scaffolded behind clear stubs.
