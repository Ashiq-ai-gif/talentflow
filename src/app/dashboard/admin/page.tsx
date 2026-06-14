import { redirect } from "next/navigation";
import { getProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { PageHeader, Card, Badge, Button, EmptyState } from "@/components/ui";
import { setJobStatus } from "@/lib/actions/admin";

export const metadata = { title: "Moderation" };

export default async function AdminPage() {
  const profile = (await getProfile())!;
  if (profile.role !== "admin" && profile.role !== "super_admin")
    redirect("/dashboard");
  const supabase = await createClient();

  const { data: jobs } = await supabase
    .from("jobs")
    .select("id, title, status, created_at, companies(name)")
    .order("created_at", { ascending: false })
    .limit(30);

  return (
    <>
      <PageHeader
        title="Content Moderation"
        subtitle="Review jobs and keep the marketplace clean."
      />
      {jobs && jobs.length ? (
        <div className="space-y-2">
          {jobs.map((j) => {
            const company = j.companies as { name?: string } | null;
            return (
              <Card key={j.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
                <div>
                  <p className="font-medium text-slate-900">{j.title}</p>
                  <p className="text-xs text-slate-500">{company?.name ?? "—"}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    className={
                      j.status === "open"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-600"
                    }
                  >
                    {j.status}
                  </Badge>
                  <form action={setJobStatus}>
                    <input type="hidden" name="job_id" value={j.id} />
                    <input
                      type="hidden"
                      name="status"
                      value={j.status === "open" ? "closed" : "open"}
                    />
                    <Button type="submit" variant="secondary" size="sm">
                      {j.status === "open" ? "Take down" : "Restore"}
                    </Button>
                  </form>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <EmptyState icon="🛡️" title="Nothing to moderate" hint="New jobs will appear here." />
      )}
    </>
  );
}
