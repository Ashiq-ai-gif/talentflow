-- =============================================================
-- Row Level Security policies
-- =============================================================

alter table profiles            enable row level security;
alter table candidate_profiles  enable row level security;
alter table education           enable row level security;
alter table experiences         enable row level security;
alter table skills              enable row level security;
alter table certifications      enable row level security;
alter table portfolio_projects  enable row level security;
alter table resumes             enable row level security;
alter table video_resumes       enable row level security;
alter table verifications       enable row level security;
alter table companies           enable row level security;
alter table company_members     enable row level security;
alter table jobs                enable row level security;
alter table applications        enable row level security;
alter table application_events  enable row level security;
alter table application_notes   enable row level security;
alter table interviews          enable row level security;
alter table interview_feedback  enable row level security;
alter table assessments         enable row level security;
alter table assessment_results  enable row level security;
alter table screening_calls     enable row level security;
alter table placements          enable row level security;
alter table referrals           enable row level security;
alter table conversations       enable row level security;
alter table conversation_members enable row level security;
alter table messages            enable row level security;
alter table onboardings         enable row level security;
alter table reviews             enable row level security;
alter table subscriptions       enable row level security;
alter table reports             enable row level security;
alter table audit_logs          enable row level security;
alter table feature_flags       enable row level security;

-- helper: is admin?
create or replace function is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists(select 1 from profiles where id = auth.uid() and role in ('admin','super_admin'));
$$;

-- helper: candidate row owned by current user?
create or replace function owns_candidate(cid uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists(select 1 from candidate_profiles c where c.id = cid and c.user_id = auth.uid());
$$;

-- helper: job belongs to a company the current user owns/belongs to?
create or replace function manages_job(jid uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists(
    select 1 from jobs j join companies co on co.id = j.company_id
    left join company_members m on m.company_id = co.id and m.user_id = auth.uid()
    where j.id = jid and (co.owner_id = auth.uid() or m.user_id is not null)
  );
$$;

-- ----- profiles -----
create policy profiles_self_read on profiles for select using (id = auth.uid() or is_admin());
create policy profiles_self_upd  on profiles for update using (id = auth.uid()) with check (id = auth.uid());
create policy profiles_admin_all on profiles for all using (is_admin());

-- ----- candidate_profiles: public read (discovery), self write -----
create policy cand_read   on candidate_profiles for select using (true);
create policy cand_insert on candidate_profiles for insert with check (user_id = auth.uid());
create policy cand_update on candidate_profiles for update using (user_id = auth.uid() or is_admin());

-- ----- candidate sub-tables: owner manages, public read -----
do $$
declare t text;
begin
  foreach t in array array['education','experiences','skills','certifications','portfolio_projects','resumes','video_resumes','verifications']
  loop
    execute format('create policy %1$s_read on %1$s for select using (true);', t);
    execute format('create policy %1$s_write on %1$s for all using (owns_candidate(candidate_id) or is_admin()) with check (owns_candidate(candidate_id) or is_admin());', t);
  end loop;
end $$;

-- ----- companies: public read, owner/admin write -----
create policy companies_read   on companies for select using (true);
create policy companies_insert on companies for insert with check (owner_id = auth.uid());
create policy companies_update on companies for update using (owner_id = auth.uid() or is_admin());
create policy companies_delete on companies for delete using (owner_id = auth.uid() or is_admin());

create policy cmembers_read on company_members for select using (true);
create policy cmembers_write on company_members for all
  using (exists(select 1 from companies c where c.id = company_id and c.owner_id = auth.uid()) or is_admin())
  with check (exists(select 1 from companies c where c.id = company_id and c.owner_id = auth.uid()) or is_admin());

-- ----- jobs: open jobs public; managers write -----
create policy jobs_read on jobs for select using (status = 'open' or manages_job(id) or is_admin());
create policy jobs_insert on jobs for insert with check (
  exists(select 1 from companies c where c.id = company_id and (c.owner_id = auth.uid()
    or exists(select 1 from company_members m where m.company_id = c.id and m.user_id = auth.uid()))));
create policy jobs_update on jobs for update using (manages_job(id) or is_admin());
create policy jobs_delete on jobs for delete using (manages_job(id) or is_admin());

-- ----- applications: candidate sees own; job manager sees applicants -----
create policy apps_read on applications for select using (
  owns_candidate(candidate_id) or manages_job(job_id) or recruiter_id = auth.uid() or is_admin());
create policy apps_insert on applications for insert with check (owns_candidate(candidate_id) or recruiter_id = auth.uid());
create policy apps_update on applications for update using (
  owns_candidate(candidate_id) or manages_job(job_id) or is_admin());

-- application events/notes: visible to those who can see the application
create policy appevents_read on application_events for select using (
  exists(select 1 from applications a where a.id = application_id and (owns_candidate(a.candidate_id) or manages_job(a.job_id) or is_admin())));
create policy appevents_write on application_events for insert with check (
  exists(select 1 from applications a where a.id = application_id and (owns_candidate(a.candidate_id) or manages_job(a.job_id) or is_admin())));

create policy appnotes_read on application_notes for select using (
  exists(select 1 from applications a where a.id = application_id and (manages_job(a.job_id) or is_admin())));
create policy appnotes_write on application_notes for all using (
  exists(select 1 from applications a where a.id = application_id and (manages_job(a.job_id) or is_admin())))
  with check (exists(select 1 from applications a where a.id = application_id and (manages_job(a.job_id) or is_admin())));

-- interviews / feedback: job manager + candidate read; manager writes
create policy interviews_read on interviews for select using (
  exists(select 1 from applications a where a.id = application_id and (owns_candidate(a.candidate_id) or manages_job(a.job_id) or is_admin())));
create policy interviews_write on interviews for all using (
  exists(select 1 from applications a where a.id = application_id and (manages_job(a.job_id) or is_admin())))
  with check (exists(select 1 from applications a where a.id = application_id and (manages_job(a.job_id) or is_admin())));
create policy ifeedback_rw on interview_feedback for all using (
  exists(select 1 from interviews i join applications a on a.id = i.application_id where i.id = interview_id and (manages_job(a.job_id) or is_admin())))
  with check (true);

-- assessments
create policy assess_read on assessments for select using (true);
create policy assess_write on assessments for all using (
  exists(select 1 from companies c where c.id = company_id and c.owner_id = auth.uid()) or is_admin())
  with check (exists(select 1 from companies c where c.id = company_id and c.owner_id = auth.uid()) or is_admin());
create policy aresults_read on assessment_results for select using (owns_candidate(candidate_id) or is_admin()
  or exists(select 1 from assessments s join companies c on c.id = s.company_id where s.id = assessment_id and c.owner_id = auth.uid()));
create policy aresults_write on assessment_results for insert with check (owns_candidate(candidate_id));

-- screening calls: tied to application
create policy screen_read on screening_calls for select using (
  exists(select 1 from applications a where a.id = application_id and (owns_candidate(a.candidate_id) or manages_job(a.job_id) or is_admin())));
create policy screen_write on screening_calls for all using (
  exists(select 1 from applications a where a.id = application_id and (manages_job(a.job_id) or is_admin())))
  with check (true);

-- placements (recruiter)
create policy placements_rw on placements for all using (recruiter_id = auth.uid() or is_admin()) with check (recruiter_id = auth.uid() or is_admin());

-- referrals
create policy referrals_rw on referrals for all using (referrer_id = auth.uid() or is_admin()) with check (referrer_id = auth.uid() or is_admin());

-- messaging
create policy conv_read on conversations for select using (
  exists(select 1 from conversation_members m where m.conversation_id = id and m.user_id = auth.uid()) or is_admin());
create policy conv_insert on conversations for insert with check (true);
create policy convmem_rw on conversation_members for all using (
  user_id = auth.uid() or exists(select 1 from conversation_members m where m.conversation_id = conversation_id and m.user_id = auth.uid()) or is_admin())
  with check (true);
create policy messages_read on messages for select using (
  exists(select 1 from conversation_members m where m.conversation_id = conversation_id and m.user_id = auth.uid()) or is_admin());
create policy messages_insert on messages for insert with check (sender_id = auth.uid());

-- onboarding: job manager + candidate
create policy onboard_read on onboardings for select using (
  exists(select 1 from applications a where a.id = application_id and (owns_candidate(a.candidate_id) or manages_job(a.job_id) or is_admin())));
create policy onboard_write on onboardings for all using (
  exists(select 1 from applications a where a.id = application_id and (manages_job(a.job_id) or is_admin())))
  with check (true);

-- reviews: public read, author writes
create policy reviews_read on reviews for select using (true);
create policy reviews_write on reviews for insert with check (author_id = auth.uid());
create policy reviews_update on reviews for update using (author_id = auth.uid() or is_admin());

-- subscriptions: owner
create policy subs_rw on subscriptions for all using (owner_id = auth.uid() or is_admin()) with check (owner_id = auth.uid() or is_admin());

-- reports: reporter creates; admin reads all
create policy reports_insert on reports for insert with check (reporter_id = auth.uid());
create policy reports_read on reports for select using (reporter_id = auth.uid() or is_admin());
create policy reports_update on reports for update using (is_admin());

-- audit logs: admin only read; anyone insert (server)
create policy audit_read on audit_logs for select using (is_admin());
create policy audit_insert on audit_logs for insert with check (true);

-- feature flags: public read, admin write
create policy ff_read on feature_flags for select using (true);
create policy ff_write on feature_flags for all using (is_admin()) with check (is_admin());
