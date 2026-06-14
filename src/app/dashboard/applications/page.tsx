import Link from "next/link";
import { getProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { PageHeader, Card, Button, EmptyState, ButtonLink } from "@/components/ui";
import { PipelineBadge } from "@/components/brand";
import { Icons } from "@/components/icons";
import { withdrawApplication } from "@/lib/actions/jobs";
import { APPLICATION_STAGES } from "@/lib/constants";

export const metadata = { title: "My Applications" };

export default async function ApplicationsPage() {
  const profile = (await getProfile())!;
  const supabase = await createClient();

  const { data: candidate } = await supabase
    .from("candidate_profiles")
    .select("id")
    .eq("user_id", profile.id)
    .maybeSingle();

  const { data: apps } = candidate
    ? await supabase
        .from("applications")
        .select(
          "id, status, created_at, cover_note, jobs(id, title, location, companies(name))",
        )
        .eq("candidate_id", candidate.id)
        .order("created_at", { ascending: false })
    : { data: [] };

  return (
    <>
      <PageHeader
        title="My Applications"
        subtitle="Track every application through the hiring pipeline."
        action={<ButtonLink href="/jobs" variant="secondary">Find more jobs</ButtonLink>}
      />

      {/* Pipeline legend */}
      <div className="mb-5 flex flex-wrap gap-2">
        {APPLICATION_STAGES.map((s) => (
          <PipelineBadge key={s} status={s} />
        ))}
      </div>

      {apps && apps.length ? (
        <div className="space-y-3">
          {apps.map((a) => {
            const job = a.jobs as {
              id?: string;
              title?: string;
              location?: string;
              companies?: { name?: string };
            } | null;
            return (
              <Card key={a.id} className="p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <Link
                      href={job?.id ? `/jobs/${job.id}` : "#"}
                      className="text-lg font-semibold text-slate-900 hover:text-emerald-700"
                    >
                      {job?.title ?? "Job"}
                    </Link>
                    <p className="text-sm text-slate-500">
                      {job?.companies?.name ?? "Company"} · {job?.location ?? "—"}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Applied {new Date(a.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <PipelineBadge status={a.status} />
                    {a.status !== "withdrawn" &&
                    a.status !== "hired" &&
                    a.status !== "rejected" ? (
                      <form action={withdrawApplication}>
                        <input type="hidden" name="application_id" value={a.id} />
                        <Button type="submit" variant="ghost" size="sm">
                          Withdraw
                        </Button>
                      </form>
                    ) : null}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={<Icons.folder className="h-7 w-7" />}
          title="No applications yet"
          hint="When you apply to jobs, they'll show up here with live status."
          action={<ButtonLink href="/jobs">Browse jobs</ButtonLink>}
        />
      )}
    </>
  );
}
