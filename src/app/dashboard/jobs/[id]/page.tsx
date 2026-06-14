import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { PageHeader, Card, Badge, Stat, EmptyState } from "@/components/ui";
import { Avatar } from "@/components/ui";
import { MatchBadge } from "@/components/brand";
import { Icons } from "@/components/icons";
import { StageSelect } from "@/components/ats";
import { APPLICATION_STAGES, STAGE_LABELS } from "@/lib/constants";

export const metadata = { title: "Applicants" };

export default async function JobAtsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const profile = (await getProfile())!;
  if (profile.role !== "employer") redirect("/dashboard");
  const supabase = await createClient();

  const { data: job } = await supabase
    .from("jobs")
    .select("id, title, status, created_by")
    .eq("id", id)
    .single();
  if (!job) notFound();

  const { data: apps } = await supabase
    .from("applications")
    .select(
      "id, status, match_score, match_band, rating, created_at, candidate_profiles(headline, career_score, badge, profiles(full_name))",
    )
    .eq("job_id", id)
    .order("match_score", { ascending: false });

  const byStage: Record<string, typeof apps> = {};
  for (const s of APPLICATION_STAGES) byStage[s] = [];
  for (const a of apps ?? []) {
    if (a.status === "withdrawn") continue;
    (byStage[a.status] ??= []).push(a);
  }
  const total = (apps ?? []).filter((a) => a.status !== "withdrawn").length;
  const hired = (apps ?? []).filter((a) => a.status === "hired").length;

  return (
    <>
      <Link href="/dashboard/jobs" className="text-sm font-medium text-emerald-700 hover:text-emerald-700">
        ← All jobs
      </Link>
      <PageHeader
        title={job.title}
        subtitle="Applicant tracking — move candidates through your pipeline."
        action={
          <Link href={`/jobs/${job.id}`} className="text-sm font-medium text-emerald-700 hover:text-emerald-700">
            View public posting →
          </Link>
        }
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Applicants" value={total} icon={<Icons.users className="h-5 w-5" />} />
        <Stat label="Shortlisted" value={byStage.shortlisted?.length ?? 0} icon={<Icons.star className="h-5 w-5" />} />
        <Stat label="Interviewing" value={byStage.interview_scheduled?.length ?? 0} icon={<Icons.calendar className="h-5 w-5" />} />
        <Stat label="Hired" value={hired} icon={<Icons.check className="h-5 w-5" />} />
      </div>

      {total === 0 ? (
        <EmptyState
          icon={<Icons.users className="h-7 w-7" />}
          title="No applicants yet"
          hint="Share your job posting to start receiving applications."
        />
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {APPLICATION_STAGES.map((stage) => (
            <div key={stage} className="w-72 shrink-0">
              <div className="mb-2 flex items-center justify-between px-1">
                <h3 className="text-sm font-semibold text-slate-700">
                  {STAGE_LABELS[stage]}
                </h3>
                <Badge>{byStage[stage]?.length ?? 0}</Badge>
              </div>
              <div className="space-y-2">
                {(byStage[stage] ?? []).map((a) => {
                  const cp = a.candidate_profiles as {
                    headline?: string;
                    career_score?: number;
                    profiles?: { full_name?: string };
                  } | null;
                  const name = cp?.profiles?.full_name ?? "Candidate";
                  return (
                    <Card key={a.id} className="p-3">
                      <div className="flex items-center gap-2">
                        <Avatar name={name} size={32} />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-slate-900">
                            {name}
                          </p>
                          <p className="truncate text-xs text-slate-500">
                            {cp?.headline ?? "—"}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-1.5">
                        {a.match_band ? (
                          <MatchBadge band={a.match_band} score={a.match_score ?? undefined} />
                        ) : null}
                        <Badge>Score {cp?.career_score ?? 0}</Badge>
                      </div>
                      <div className="mt-2">
                        <StageSelect applicationId={a.id} current={a.status} />
                      </div>
                    </Card>
                  );
                })}
                {!(byStage[stage]?.length) && (
                  <p className="rounded-xl border border-dashed border-slate-200 px-3 py-4 text-center text-xs text-slate-400">
                    Empty
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
