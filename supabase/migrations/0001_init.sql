-- =============================================================
-- TalentFlow — Smart Hiring & Recruitment Platform
-- Initial schema covering all core modules.
-- Postgres / Supabase. RLS enabled; policies in 0002_rls.sql.
-- =============================================================

create extension if not exists "uuid-ossp";
create extension if not exists pgcrypto;

-- ---------- Enums ----------
create type user_role            as enum ('job_seeker','employer','recruiter','admin','super_admin');
create type job_type             as enum ('full_time','part_time','internship','contract','freelance');
create type work_mode            as enum ('remote','hybrid','onsite');
create type job_status           as enum ('draft','open','paused','closed');
create type application_status   as enum ('applied','viewed','screening','shortlisted','interview_scheduled','offer_sent','hired','rejected','withdrawn');
create type verification_status  as enum ('unverified','pending','verified','rejected');
create type badge_level          as enum ('none','bronze','silver','gold');
create type interview_mode       as enum ('online','offline','phone');
create type interview_status     as enum ('scheduled','completed','cancelled','no_show');
create type assessment_type      as enum ('coding','aptitude','language','subject','sales');
create type match_band           as enum ('best','good','average','poor');
create type plan_tier            as enum ('free','professional','enterprise');
create type message_channel      as enum ('in_app','email','whatsapp','sms');
create type referral_status      as enum ('invited','applied','hired','reward_released');
create type placement_status     as enum ('sourced','recommended','interviewing','placed','rejected');

-- ---------- Profiles & RBAC ----------
create table profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  role          user_role   not null default 'job_seeker',
  full_name     text,
  email         text,
  phone         text,
  avatar_url    text,
  mfa_enabled   boolean     not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ---------- Job Seeker: Candidate profile ----------
create table candidate_profiles (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid unique not null references profiles(id) on delete cascade,
  headline        text,
  gender          text,
  date_of_birth   date,
  location        text,
  about           text,
  github_url      text,
  linkedin_url    text,
  website_url     text,
  career_score    int  not null default 0,
  market_readiness int not null default 0,
  badge           badge_level not null default 'none',
  open_to_work    boolean not null default true,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create table education (
  id            uuid primary key default uuid_generate_v4(),
  candidate_id  uuid not null references candidate_profiles(id) on delete cascade,
  school        text,
  college       text,
  degree        text,
  field         text,
  graduation_year int,
  marks         text,
  created_at    timestamptz not null default now()
);

create table experiences (
  id            uuid primary key default uuid_generate_v4(),
  candidate_id  uuid not null references candidate_profiles(id) on delete cascade,
  company       text not null,
  position      text not null,
  start_date    date,
  end_date      date,
  is_current    boolean not null default false,
  responsibilities text,
  created_at    timestamptz not null default now()
);

create table skills (
  id            uuid primary key default uuid_generate_v4(),
  candidate_id  uuid not null references candidate_profiles(id) on delete cascade,
  name          text not null,
  category      text not null default 'technical', -- technical | soft | language
  proficiency   int  not null default 3,           -- 1..5
  created_at    timestamptz not null default now()
);

create table certifications (
  id            uuid primary key default uuid_generate_v4(),
  candidate_id  uuid not null references candidate_profiles(id) on delete cascade,
  title         text not null,
  issuer        text,
  file_url      text,
  status        verification_status not null default 'unverified',
  created_at    timestamptz not null default now()
);

create table portfolio_projects (
  id            uuid primary key default uuid_generate_v4(),
  candidate_id  uuid not null references candidate_profiles(id) on delete cascade,
  title         text not null,
  description   text,
  url           text,
  created_at    timestamptz not null default now()
);

create table resumes (
  id            uuid primary key default uuid_generate_v4(),
  candidate_id  uuid not null references candidate_profiles(id) on delete cascade,
  label         text not null default 'Default',
  file_url      text,
  version       int  not null default 1,
  is_primary    boolean not null default false,
  created_at    timestamptz not null default now()
);

create table video_resumes (
  id            uuid primary key default uuid_generate_v4(),
  candidate_id  uuid not null references candidate_profiles(id) on delete cascade,
  label         text not null default 'Intro',
  video_url     text,
  transcript    text,           -- AI generated (stub)
  duration_secs int,
  views         int not null default 0,
  created_at    timestamptz not null default now()
);

-- ---------- Verification ----------
create table verifications (
  id            uuid primary key default uuid_generate_v4(),
  candidate_id  uuid not null references candidate_profiles(id) on delete cascade,
  kind          text not null,  -- identity | education | employment
  doc_type      text,           -- aadhaar | passport | dl | degree | experience_letter ...
  doc_url       text,
  status        verification_status not null default 'pending',
  reviewed_by   uuid references profiles(id),
  notes         text,
  created_at    timestamptz not null default now()
);

-- ---------- Employer: Company ----------
create table companies (
  id            uuid primary key default uuid_generate_v4(),
  owner_id      uuid not null references profiles(id) on delete cascade,
  name          text not null,
  logo_url      text,
  industry      text,
  website       text,
  employee_count text,
  description   text,
  locations     text[],
  gst_number    text,
  business_reg_status verification_status not null default 'unverified',
  rating        numeric(2,1) default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create table company_members (
  company_id    uuid not null references companies(id) on delete cascade,
  user_id       uuid not null references profiles(id) on delete cascade,
  role          text not null default 'member', -- owner | admin | member
  primary key (company_id, user_id)
);

-- ---------- Jobs ----------
create table jobs (
  id            uuid primary key default uuid_generate_v4(),
  company_id    uuid not null references companies(id) on delete cascade,
  created_by    uuid references profiles(id),
  title         text not null,
  department    text,
  employment_type job_type not null default 'full_time',
  work_mode     work_mode not null default 'onsite',
  location      text,
  salary_min    int,
  salary_max    int,
  currency      text not null default 'INR',
  description   text,
  responsibilities text,
  requirements  text,
  skills_required text[],
  experience_min int default 0,
  experience_max int,
  vacancies     int not null default 1,
  industry      text,
  status        job_status not null default 'open',
  views         int not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index on jobs (status);
create index on jobs (company_id);

-- ---------- Applications & ATS ----------
create table applications (
  id            uuid primary key default uuid_generate_v4(),
  job_id        uuid not null references jobs(id) on delete cascade,
  candidate_id  uuid not null references candidate_profiles(id) on delete cascade,
  recruiter_id  uuid references profiles(id),     -- if sourced by a recruiter
  status        application_status not null default 'applied',
  cover_note    text,
  rating        int,                              -- 1..5 by employer
  match_score   int,                              -- AI ranking 0..100
  match_band    match_band,
  tags          text[],
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique (job_id, candidate_id)
);
create index on applications (job_id);
create index on applications (candidate_id);
create index on applications (status);

create table application_events (
  id            uuid primary key default uuid_generate_v4(),
  application_id uuid not null references applications(id) on delete cascade,
  from_status   application_status,
  to_status     application_status not null,
  actor_id      uuid references profiles(id),
  note          text,
  created_at    timestamptz not null default now()
);

create table application_notes (
  id            uuid primary key default uuid_generate_v4(),
  application_id uuid not null references applications(id) on delete cascade,
  author_id     uuid references profiles(id),
  body          text not null,
  created_at    timestamptz not null default now()
);

-- ---------- Interviews ----------
create table interviews (
  id            uuid primary key default uuid_generate_v4(),
  application_id uuid not null references applications(id) on delete cascade,
  scheduled_at  timestamptz,
  duration_mins int default 45,
  mode          interview_mode not null default 'online',
  location_or_link text,
  status        interview_status not null default 'scheduled',
  created_at    timestamptz not null default now()
);

create table interview_feedback (
  id            uuid primary key default uuid_generate_v4(),
  interview_id  uuid not null references interviews(id) on delete cascade,
  reviewer_id   uuid references profiles(id),
  overall_score int,            -- 1..10
  strengths     text,
  weaknesses    text,
  recommendation text,          -- hire | hold | reject
  created_at    timestamptz not null default now()
);

-- ---------- Assessments ----------
create table assessments (
  id            uuid primary key default uuid_generate_v4(),
  company_id    uuid references companies(id) on delete cascade,
  job_id        uuid references jobs(id) on delete set null,
  title         text not null,
  type          assessment_type not null default 'aptitude',
  duration_mins int not null default 30,
  questions     jsonb not null default '[]',
  created_at    timestamptz not null default now()
);

create table assessment_results (
  id            uuid primary key default uuid_generate_v4(),
  assessment_id uuid not null references assessments(id) on delete cascade,
  candidate_id  uuid not null references candidate_profiles(id) on delete cascade,
  score         int,
  max_score     int,
  answers       jsonb,
  taken_at      timestamptz not null default now()
);

-- ---------- AI Screening Calls ----------
create table screening_calls (
  id            uuid primary key default uuid_generate_v4(),
  application_id uuid not null references applications(id) on delete cascade,
  notice_period text,
  salary_expectation text,
  availability  text,
  transcript    text,
  ai_summary    text,           -- generated for employer (stub)
  completed     boolean not null default false,
  created_at    timestamptz not null default now()
);

-- ---------- Recruiter Marketplace ----------
create table placements (
  id            uuid primary key default uuid_generate_v4(),
  recruiter_id  uuid not null references profiles(id) on delete cascade,
  candidate_id  uuid references candidate_profiles(id) on delete set null,
  job_id        uuid references jobs(id) on delete set null,
  status        placement_status not null default 'sourced',
  commission    numeric(12,2) default 0,
  created_at    timestamptz not null default now()
);

-- ---------- Employee Referrals ----------
create table referrals (
  id            uuid primary key default uuid_generate_v4(),
  referrer_id   uuid not null references profiles(id) on delete cascade,
  job_id        uuid references jobs(id) on delete set null,
  friend_email  text not null,
  friend_name   text,
  status        referral_status not null default 'invited',
  reward_amount numeric(12,2) default 0,
  created_at    timestamptz not null default now()
);

-- ---------- Communication Hub ----------
create table conversations (
  id            uuid primary key default uuid_generate_v4(),
  job_id        uuid references jobs(id) on delete set null,
  created_at    timestamptz not null default now()
);
create table conversation_members (
  conversation_id uuid not null references conversations(id) on delete cascade,
  user_id         uuid not null references profiles(id) on delete cascade,
  primary key (conversation_id, user_id)
);
create table messages (
  id              uuid primary key default uuid_generate_v4(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  sender_id       uuid references profiles(id),
  channel         message_channel not null default 'in_app',
  body            text not null,
  read_at         timestamptz,
  created_at      timestamptz not null default now()
);
create index on messages (conversation_id);

-- ---------- Onboarding ----------
create table onboardings (
  id            uuid primary key default uuid_generate_v4(),
  application_id uuid not null references applications(id) on delete cascade,
  offer_letter_url text,
  joining_letter_url text,
  nda_signed    boolean not null default false,
  documents     jsonb not null default '[]',
  checklist     jsonb not null default '[]',
  completed     boolean not null default false,
  created_at    timestamptz not null default now()
);

-- ---------- Reviews & Ratings ----------
create table reviews (
  id            uuid primary key default uuid_generate_v4(),
  author_id     uuid references profiles(id) on delete set null,
  subject_type  text not null,   -- company | candidate
  company_id    uuid references companies(id) on delete cascade,
  candidate_id  uuid references candidate_profiles(id) on delete cascade,
  rating        int not null check (rating between 1 and 5),
  title         text,
  body          text,
  created_at    timestamptz not null default now()
);

-- ---------- Subscriptions ----------
create table subscriptions (
  id            uuid primary key default uuid_generate_v4(),
  owner_id      uuid not null references profiles(id) on delete cascade,
  tier          plan_tier not null default 'free',
  active        boolean not null default true,
  started_at    timestamptz not null default now(),
  renews_at     timestamptz
);

-- ---------- Admin / Super Admin ----------
create table reports (
  id            uuid primary key default uuid_generate_v4(),
  reporter_id   uuid references profiles(id) on delete set null,
  kind          text not null,  -- abuse | fraud | spam
  target_type   text,           -- job | review | profile
  target_id     uuid,
  details       text,
  resolved      boolean not null default false,
  created_at    timestamptz not null default now()
);

create table audit_logs (
  id            uuid primary key default uuid_generate_v4(),
  actor_id      uuid references profiles(id) on delete set null,
  action        text not null,
  entity        text,
  entity_id     uuid,
  metadata      jsonb,
  created_at    timestamptz not null default now()
);

create table feature_flags (
  key           text primary key,
  enabled       boolean not null default true,
  description   text
);

-- ---------- updated_at trigger ----------
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger trg_profiles_updated   before update on profiles            for each row execute function set_updated_at();
create trigger trg_candidate_updated  before update on candidate_profiles  for each row execute function set_updated_at();
create trigger trg_companies_updated  before update on companies           for each row execute function set_updated_at();
create trigger trg_jobs_updated       before update on jobs                for each row execute function set_updated_at();
create trigger trg_applications_updated before update on applications      for each row execute function set_updated_at();

-- ---------- New-user handler: create profile row on signup ----------
create or replace function handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
declare r user_role;
begin
  r := coalesce((new.raw_user_meta_data->>'role')::user_role, 'job_seeker');
  insert into public.profiles (id, role, full_name, email)
  values (new.id, r, new.raw_user_meta_data->>'full_name', new.email)
  on conflict (id) do nothing;

  if r = 'job_seeker' then
    insert into public.candidate_profiles (user_id) values (new.id)
    on conflict (user_id) do nothing;
  end if;
  return new;
end; $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- ---------- helper: current user's role ----------
create or replace function current_role_is(roles user_role[])
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from profiles where id = auth.uid() and role = any(roles));
$$;

-- ---------- Analytics view: hiring funnel ----------
create or replace view hiring_funnel as
select j.company_id, j.id as job_id, a.status, count(*)::int as cnt
from applications a join jobs j on j.id = a.job_id
group by j.company_id, j.id, a.status;
