import Link from "next/link";
import { redirect } from "next/navigation";
import { getProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { PageHeader, Card, Badge, EmptyState, ButtonLink } from "@/components/ui";
import { Icons } from "@/components/icons";
import { JOB_TYPE_LABELS, WORK_MODE_LABELS } from "@/lib/constants";

export const metadata = { title: "Jobs" };

export default async function EmployerJobsPage() {
  const profile = (await getProfile())!;
  if (profile.role !== "employer") redirect("/dashboard");
  const supabase = await createClient();

  const { data: jobs } = await supabase
    .from("jobs")
    .select("id, title, status, work_mode, employment_type, location, created_at")
    .eq("created_by", profile.id)
    .order("created_at", { ascending: false });

  // applicant counts
  const counts: Record<string, number> = {};
  if (jobs?.length) {
    const { data: apps } = await supabase
      .from("applications")
      .select("job_id")
      .in("job_id", jobs.map((j) => j.id));
    for (const a of apps ?? []) counts[a.job_id] = (counts[a.job_id] ?? 0) + 1;
  }

  return (
    <>
      <PageHeader
        title="Your Jobs"
        subtitle="Manage roles and review applicants."
        action={<ButtonLink href="/dashboard/jobs/new">Post a job</ButtonLink>}
      />
      {jobs && jobs.length ? (
        <div className="space-y-3">
          {jobs.map((j) => (
            <Link key={j.id} href={`/dashboard/jobs/${j.id}`}>
              <Card hover className="flex flex-wrap items-center justify-between gap-3 p-5">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">{j.title}</h2>
                  <p className="text-sm text-slate-500">
                    {j.location ?? "—"} · {WORK_MODE_LABELS[j.work_mode]} ·{" "}
                    {JOB_TYPE_LABELS[j.employment_type]}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-emerald-50 text-emerald-700">
                    {counts[j.id] ?? 0} applicants
                  </Badge>
                  <Badge
                    className={
                      j.status === "open"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-600"
                    }
                  >
                    {j.status}
                  </Badge>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Icons.briefcase className="h-7 w-7" />}
          title="No jobs posted yet"
          hint="Create your first role to start receiving applicants."
          action={<ButtonLink href="/dashboard/jobs/new">Post a job</ButtonLink>}
        />
      )}
    </>
  );
}
