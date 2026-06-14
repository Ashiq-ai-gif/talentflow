import { redirect } from "next/navigation";
import { getProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { PageHeader, Card, Badge, Stat, EmptyState, ButtonLink } from "@/components/ui";
import { Icons } from "@/components/icons";

export const metadata = { title: "Placements" };

const STATUS_CLS: Record<string, string> = {
  sourced: "bg-slate-100 text-slate-700",
  recommended: "bg-sky-100 text-sky-700",
  interviewing: "bg-amber-100 text-amber-700",
  placed: "bg-emerald-100 text-emerald-700",
  rejected: "bg-rose-100 text-rose-700",
};

export default async function PlacementsPage() {
  const profile = (await getProfile())!;
  if (profile.role !== "recruiter") redirect("/dashboard");
  const supabase = await createClient();

  const { data: placements } = await supabase
    .from("placements")
    .select("id, status, commission, created_at, jobs(title)")
    .eq("recruiter_id", profile.id)
    .order("created_at", { ascending: false });

  const placed = (placements ?? []).filter((p) => p.status === "placed").length;
  const commission = (placements ?? []).reduce(
    (s, p) => s + Number(p.commission ?? 0),
    0,
  );

  return (
    <>
      <PageHeader
        title="Placements"
        subtitle="Candidates you've sourced and your commission."
        action={<ButtonLink href="/jobs" variant="secondary">Browse roles</ButtonLink>}
      />
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-3">
        <Stat label="Total" value={placements?.length ?? 0} icon={<Icons.handshake className="h-5 w-5" />} />
        <Stat label="Placed" value={placed} accent="emerald" icon={<Icons.check className="h-5 w-5" />} />
        <Stat label="Commission" value={`₹${commission.toLocaleString()}`} accent="amber" icon={<Icons.bolt className="h-5 w-5" />} />
      </div>
      {placements && placements.length ? (
        <div className="space-y-2">
          {placements.map((p) => {
            const job = p.jobs as { title?: string } | null;
            return (
              <Card key={p.id} className="flex items-center justify-between p-4">
                <span className="font-medium text-slate-900">
                  {job?.title ?? "Role"}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500">
                    ₹{Number(p.commission ?? 0).toLocaleString()}
                  </span>
                  <Badge className={STATUS_CLS[p.status]}>{p.status}</Badge>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={<Icons.handshake className="h-7 w-7" />}
          title="No placements yet"
          hint="Source candidates for open roles to start tracking placements and commission."
          action={<ButtonLink href="/jobs">Find roles to fill</ButtonLink>}
        />
      )}
    </>
  );
}
