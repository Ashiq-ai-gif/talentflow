import Link from "next/link";
import { getProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { Card, Stat, PageHeader, ButtonLink, EmptyState } from "@/components/ui";
import { PipelineBadge } from "@/components/brand";
import { Icons } from "@/components/icons";
import { STAGE_LABELS } from "@/lib/constants";

export const metadata = { title: "Dashboard" };

export default async function DashboardHome() {
  const profile = (await getProfile())!;
  const supabase = await createClient();
  const first = (profile.full_name ?? "there").split(" ")[0];

  if (profile.role === "employer") {
    const { data: jobs } = await supabase
      .from("jobs")
      .select("id, title, status, created_at, company_id")
      .eq("created_by", profile.id)
      .order("created_at", { ascending: false });
    const jobIds = (jobs ?? []).map((j) => j.id);
    let appsCount = 0;
    let hiredCount = 0;
    if (jobIds.length) {
      const { count } = await supabase
        .from("applications")
        .select("id", { count: "exact", head: true })
        .in("job_id", jobIds);
      appsCount = count ?? 0;
      const { count: hired } = await supabase
        .from("applications")
        .select("id", { count: "exact", head: true })
        .in("job_id", jobIds)
        .eq("status", "hired");
      hiredCount = hired ?? 0;
    }
    const openJobs = (jobs ?? []).filter((j) => j.status === "open").length;
    return (
      <>
        <PageHeader
          title={`Welcome back, ${first}`}
          subtitle="Here's your hiring at a glance."
          action={<ButtonLink href="/dashboard/jobs/new">Post a job</ButtonLink>}
        />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Stat label="Open jobs" value={openJobs} icon={<Icons.briefcase className="h-5 w-5" />} />
          <Stat label="Total jobs" value={jobs?.length ?? 0} accent="violet" icon={<Icons.folder className="h-5 w-5" />} />
          <Stat label="Applicants" value={appsCount} accent="sky" icon={<Icons.users className="h-5 w-5" />} />
          <Stat label="Hired" value={hiredCount} accent="emerald" icon={<Icons.check className="h-5 w-5" />} />
        </div>
        <h2 className="mt-8 mb-3 text-lg font-semibold text-slate-900">
          Recent jobs
        </h2>
        {jobs && jobs.length ? (
          <div className="space-y-2">
            {jobs.slice(0, 6).map((j) => (
              <Link key={j.id} href={`/dashboard/jobs/${j.id}`}>
                <Card hover className="flex items-center justify-between p-4">
                  <span className="font-medium text-slate-900">{j.title}</span>
                  <span className="text-xs uppercase tracking-wide text-slate-500">
                    {j.status}
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<Icons.briefcase className="h-7 w-7" />}
            title="No jobs yet"
            hint="Post your first role to start receiving applicants."
            action={<ButtonLink href="/dashboard/jobs/new">Post a job</ButtonLink>}
          />
        )}
      </>
    );
  }

  if (profile.role === "recruiter") {
    const { data: placements } = await supabase
      .from("placements")
      .select("id, status, commission")
      .eq("recruiter_id", profile.id);
    const placed = (placements ?? []).filter((p) => p.status === "placed").length;
    const commission = (placements ?? []).reduce(
      (s, p) => s + Number(p.commission ?? 0),
      0,
    );
    return (
      <>
        <PageHeader
          title={`Welcome, ${first}`}
          subtitle="Track candidates you source and your commission."
        />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          <Stat label="Placements" value={placements?.length ?? 0} icon={<Icons.handshake className="h-5 w-5" />} />
          <Stat label="Successful" value={placed} accent="emerald" icon={<Icons.check className="h-5 w-5" />} />
          <Stat label="Commission" value={`₹${commission.toLocaleString()}`} accent="amber" icon={<Icons.bolt className="h-5 w-5" />} />
        </div>
        <div className="mt-8">
          <ButtonLink href="/jobs" variant="secondary">
            Browse open roles
          </ButtonLink>
        </div>
      </>
    );
  }

  if (profile.role === "admin" || profile.role === "super_admin") {
    const [{ count: users }, { count: jobs }, { count: reports }] =
      await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("jobs").select("id", { count: "exact", head: true }),
        supabase
          .from("reports")
          .select("id", { count: "exact", head: true })
          .eq("resolved", false),
      ]);
    return (
      <>
        <PageHeader
          title="Platform overview"
          subtitle="Moderate content and keep the marketplace healthy."
        />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          <Stat label="Users" value={users ?? 0} icon={<Icons.users className="h-5 w-5" />} />
          <Stat label="Jobs" value={jobs ?? 0} accent="violet" icon={<Icons.briefcase className="h-5 w-5" />} />
          <Stat label="Open reports" value={reports ?? 0} accent="rose" icon={<Icons.flag className="h-5 w-5" />} />
        </div>
        <div className="mt-8 flex gap-3">
          <ButtonLink href="/dashboard/admin">Moderation queue</ButtonLink>
          <ButtonLink href="/dashboard/admin/reports" variant="secondary">
            Reports
          </ButtonLink>
        </div>
      </>
    );
  }

  // job_seeker (default)
  const { data: candidate } = await supabase
    .from("candidate_profiles")
    .select("id, career_score, market_readiness, badge")
    .eq("user_id", profile.id)
    .single();

  const { data: apps } = candidate
    ? await supabase
        .from("applications")
        .select("id, status, created_at, jobs(title, location)")
        .eq("candidate_id", candidate.id)
        .order("created_at", { ascending: false })
        .limit(5)
    : { data: [] };

  const { data: recommended } = await supabase
    .from("jobs")
    .select("id, title, location, work_mode")
    .eq("status", "open")
    .order("created_at", { ascending: false })
    .limit(4);

  return (
    <>
      <PageHeader
        title={`Hi ${first} 👋`}
        subtitle="Your job search, all in one place."
        action={<ButtonLink href="/jobs">Find jobs</ButtonLink>}
      />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        <Stat label="Career Score" value={candidate?.career_score ?? 0} icon={<Icons.bolt className="h-5 w-5" />} />
        <Stat
          label="Market Readiness"
          value={`${candidate?.market_readiness ?? 0}%`}
          accent="emerald"
          icon={<Icons.chart className="h-5 w-5" />}
        />
        <Stat label="Applications" value={apps?.length ?? 0} accent="violet" icon={<Icons.folder className="h-5 w-5" />} />
      </div>

      <h2 className="mt-8 mb-3 text-lg font-semibold text-slate-900">
        Recent applications
      </h2>
      {apps && apps.length ? (
        <div className="space-y-2">
          {apps.map((a) => {
            const job = a.jobs as { title?: string } | null;
            return (
              <Card key={a.id} className="flex items-center justify-between p-4">
                <div>
                  <p className="font-medium text-slate-900">
                    {job?.title ?? "Job"}
                  </p>
                  <p className="text-xs text-slate-500">
                    {STAGE_LABELS[a.status]}
                  </p>
                </div>
                <PipelineBadge status={a.status} />
              </Card>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={<Icons.folder className="h-7 w-7" />}
          title="No applications yet"
          hint="Browse open roles and apply in one click."
          action={<ButtonLink href="/jobs">Browse jobs</ButtonLink>}
        />
      )}

      {recommended && recommended.length ? (
        <>
          <h2 className="mt-8 mb-3 text-lg font-semibold text-slate-900">
            Recommended for you
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {recommended.map((j) => (
              <Link key={j.id} href={`/jobs/${j.id}`}>
                <Card hover className="p-4">
                  <p className="font-medium text-slate-900">{j.title}</p>
                  <p className="text-sm text-slate-500">
                    {j.location ?? "—"} · {j.work_mode}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </>
      ) : null}
    </>
  );
}
