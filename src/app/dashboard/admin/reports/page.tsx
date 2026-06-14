import { redirect } from "next/navigation";
import { getProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { PageHeader, Card, Badge, Button, EmptyState } from "@/components/ui";
import { resolveReport } from "@/lib/actions/admin";

export const metadata = { title: "Reports" };

const KIND_CLS: Record<string, string> = {
  abuse: "bg-rose-100 text-rose-700",
  fraud: "bg-amber-100 text-amber-700",
  spam: "bg-slate-100 text-slate-700",
};

export default async function ReportsPage() {
  const profile = (await getProfile())!;
  if (profile.role !== "admin" && profile.role !== "super_admin")
    redirect("/dashboard");
  const supabase = await createClient();

  const { data: reports } = await supabase
    .from("reports")
    .select("id, kind, target_type, details, resolved, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <>
      <PageHeader
        title="Reports"
        subtitle="Abuse, fraud, and spam reports from the community."
      />
      {reports && reports.length ? (
        <div className="space-y-2">
          {reports.map((r) => (
            <Card key={r.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
              <div>
                <div className="flex items-center gap-2">
                  <Badge className={KIND_CLS[r.kind] ?? "bg-slate-100 text-slate-700"}>
                    {r.kind}
                  </Badge>
                  <span className="text-xs text-slate-400">
                    {r.target_type ?? "—"}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-600">{r.details ?? "No details."}</p>
              </div>
              {r.resolved ? (
                <Badge className="bg-emerald-100 text-emerald-700">Resolved</Badge>
              ) : (
                <form action={resolveReport}>
                  <input type="hidden" name="report_id" value={r.id} />
                  <Button type="submit" variant="secondary" size="sm">
                    Mark resolved
                  </Button>
                </form>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState icon="🚩" title="No reports" hint="The marketplace is clean." />
      )}
    </>
  );
}
