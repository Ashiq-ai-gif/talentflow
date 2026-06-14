import Link from "next/link";
import { notFound } from "next/navigation";
import { getProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { SiteHeader, SiteFooter } from "@/components/site";
import { Card, Badge, Button, Textarea, ButtonLink } from "@/components/ui";
import { applyToJob } from "@/lib/actions/jobs";
import {
  JOB_TYPE_LABELS,
  WORK_MODE_LABELS,
} from "@/lib/constants";

export default async function JobDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const profile = await getProfile();
  const supabase = await createClient();

  const { data: job } = await supabase
    .from("jobs")
    .select("*, companies(name, industry, website, locations)")
    .eq("id", id)
    .single();

  if (!job) notFound();
  const company = job.companies as {
    name?: string;
    industry?: string;
    website?: string;
  } | null;

  // Has the current job seeker already applied?
  let alreadyApplied = false;
  let isSeeker = false;
  if (profile) {
    const { data: cand } = await supabase
      .from("candidate_profiles")
      .select("id")
      .eq("user_id", profile.id)
      .maybeSingle();
    if (cand) {
      isSeeker = true;
      const { data: existing } = await supabase
        .from("applications")
        .select("id")
        .eq("job_id", id)
        .eq("candidate_id", cand.id)
        .maybeSingle();
      alreadyApplied = !!existing;
    }
  }

  return (
    <>
      <SiteHeader authed={!!profile} />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6">
        <Link
          href="/jobs"
          className="text-sm font-medium text-emerald-700 hover:text-emerald-700"
        >
          ← Back to jobs
        </Link>

        <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          {/* Main */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                {job.title}
              </h1>
              <p className="mt-1 text-slate-500">
                {company?.name ?? "Company"} · {job.location ?? "—"}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <Badge className="bg-emerald-50 text-emerald-700">
                  {WORK_MODE_LABELS[job.work_mode]}
                </Badge>
                <Badge>{JOB_TYPE_LABELS[job.employment_type]}</Badge>
                {job.department ? <Badge>{job.department}</Badge> : null}
              </div>
            </div>

            {job.description ? (
              <Section title="About the role" body={job.description} />
            ) : null}
            {job.responsibilities ? (
              <Section title="Responsibilities" body={job.responsibilities} />
            ) : null}
            {job.requirements ? (
              <Section title="Requirements" body={job.requirements} />
            ) : null}

            {job.skills_required?.length ? (
              <div>
                <h2 className="mb-2 text-lg font-semibold text-slate-900">
                  Skills
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {job.skills_required.map((s: string) => (
                    <Badge key={s} className="bg-slate-100 text-slate-700">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {/* Apply rail */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Card className="p-5">
              {(job.salary_min || job.salary_max) && (
                <p className="text-lg font-semibold text-slate-900">
                  {job.currency} {job.salary_min?.toLocaleString() ?? "—"} –{" "}
                  {job.salary_max?.toLocaleString() ?? "—"}
                </p>
              )}
              <p className="mt-1 text-sm text-slate-500">
                {job.vacancies} vacancy{job.vacancies === 1 ? "" : "ies"} ·{" "}
                {job.experience_min ?? 0}+ yrs
              </p>

              <div className="mt-4">
                {!profile ? (
                  <ButtonLink href={`/login?next=/jobs/${id}`} className="w-full">
                    Sign in to apply
                  </ButtonLink>
                ) : !isSeeker ? (
                  <p className="text-sm text-slate-500">
                    Applications are for job seeker accounts.
                  </p>
                ) : alreadyApplied ? (
                  <Badge className="bg-emerald-100 text-emerald-700">
                    ✓ You&apos;ve applied
                  </Badge>
                ) : (
                  <form action={applyToJob} className="space-y-3">
                    <input type="hidden" name="job_id" value={id} />
                    <Textarea
                      name="cover_note"
                      placeholder="Add a short note (optional)…"
                      rows={3}
                    />
                    <Button type="submit" className="w-full">
                      Apply now
                    </Button>
                  </form>
                )}
              </div>
            </Card>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h2 className="mb-2 text-lg font-semibold text-slate-900">{title}</h2>
      <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">
        {body}
      </p>
    </div>
  );
}
