import Link from "next/link";
import { getProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { SiteHeader, SiteFooter } from "@/components/site";
import { Card, Badge, Input, Select, Button, EmptyState } from "@/components/ui";
import { Icons } from "@/components/icons";
import {
  JOB_TYPES,
  JOB_TYPE_LABELS,
  WORK_MODES,
  WORK_MODE_LABELS,
} from "@/lib/constants";

export const metadata = { title: "Find Jobs" };

type SP = { q?: string; mode?: string; type?: string };

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const { q, mode, type } = await searchParams;
  const profile = await getProfile();
  const supabase = await createClient();

  let query = supabase
    .from("jobs")
    .select("id, title, location, work_mode, employment_type, salary_min, salary_max, currency, skills_required, companies(name)")
    .eq("status", "open")
    .order("created_at", { ascending: false })
    .limit(50);

  if (q) query = query.or(`title.ilike.%${q}%,location.ilike.%${q}%,description.ilike.%${q}%`);
  if (mode) query = query.eq("work_mode", mode as "remote" | "hybrid" | "onsite");
  if (type)
    query = query.eq(
      "employment_type",
      type as "full_time" | "part_time" | "internship" | "contract" | "freelance",
    );

  const { data: jobs } = await query;

  return (
    <>
      <SiteHeader authed={!!profile} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Find your next role
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {jobs?.length ?? 0} open positions
        </p>

        {/* Filter bar */}
        <form className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_auto_auto]">
          <Input
            name="q"
            defaultValue={q}
            placeholder="Search title, skill, or location"
            aria-label="Search jobs"
          />
          <Select name="mode" defaultValue={mode ?? ""} aria-label="Work mode">
            <option value="">Any mode</option>
            {WORK_MODES.map((m) => (
              <option key={m} value={m}>
                {WORK_MODE_LABELS[m]}
              </option>
            ))}
          </Select>
          <Select name="type" defaultValue={type ?? ""} aria-label="Job type">
            <option value="">Any type</option>
            {JOB_TYPES.map((t) => (
              <option key={t} value={t}>
                {JOB_TYPE_LABELS[t]}
              </option>
            ))}
          </Select>
          <Button type="submit">Search</Button>
        </form>

        {/* Results */}
        <div className="mt-6 space-y-3">
          {jobs && jobs.length ? (
            jobs.map((j) => {
              const company = j.companies as { name?: string } | null;
              return (
                <Link key={j.id} href={`/jobs/${j.id}`}>
                  <Card hover className="p-5">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                          {j.title}
                        </h2>
                        <p className="text-sm text-slate-500">
                          {company?.name ?? "Company"} · {j.location ?? "—"}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        <Badge className="bg-indigo-50 text-indigo-700">
                          {WORK_MODE_LABELS[j.work_mode]}
                        </Badge>
                        <Badge>{JOB_TYPE_LABELS[j.employment_type]}</Badge>
                      </div>
                    </div>
                    {(j.salary_min || j.salary_max) && (
                      <p className="mt-2 text-sm font-medium text-slate-700">
                        {j.currency} {j.salary_min?.toLocaleString() ?? "—"} –{" "}
                        {j.salary_max?.toLocaleString() ?? "—"}
                      </p>
                    )}
                    {j.skills_required?.length ? (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {j.skills_required.slice(0, 6).map((s: string) => (
                          <Badge key={s}>{s}</Badge>
                        ))}
                      </div>
                    ) : null}
                  </Card>
                </Link>
              );
            })
          ) : (
            <EmptyState
              icon={<Icons.search className="h-7 w-7" />}
              title="No jobs match your search"
              hint="Try removing a filter or searching a different keyword."
            />
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
