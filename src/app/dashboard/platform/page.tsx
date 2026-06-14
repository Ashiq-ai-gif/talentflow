import { redirect } from "next/navigation";
import { getProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { PageHeader, Card, Badge, Button, Stat } from "@/components/ui";
import { toggleFeatureFlag } from "@/lib/actions/admin";

export const metadata = { title: "Platform" };

const DEFAULT_FLAGS = [
  { key: "ai_screening_calls", description: "Automated AI screening calls" },
  { key: "video_resumes", description: "Video resume uploads & analytics" },
  { key: "recruiter_marketplace", description: "Recruiter sourcing & commission" },
  { key: "assessments", description: "Coding & aptitude assessments" },
];

export default async function PlatformPage() {
  const profile = (await getProfile())!;
  if (profile.role !== "super_admin") redirect("/dashboard");
  const supabase = await createClient();

  const { data: flags } = await supabase.from("feature_flags").select("*");
  const flagMap = new Map((flags ?? []).map((f) => [f.key, f.enabled]));

  const [{ count: subs }, { count: placements }] = await Promise.all([
    supabase.from("subscriptions").select("id", { count: "exact", head: true }).eq("active", true),
    supabase.from("placements").select("id", { count: "exact", head: true }).eq("status", "placed"),
  ]);

  return (
    <>
      <PageHeader
        title="Platform Control"
        subtitle="Feature flags, subscriptions, and platform health."
      />
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-3">
        <Stat label="Active subscriptions" value={subs ?? 0} />
        <Stat label="Total placements" value={placements ?? 0} />
        <Stat label="Plan tiers" value="3" />
      </div>

      <h2 className="mb-3 text-lg font-semibold text-slate-900">Feature Flags</h2>
      <div className="space-y-2">
        {DEFAULT_FLAGS.map((f) => {
          const enabled = flagMap.get(f.key) ?? true;
          return (
            <Card key={f.key} className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium text-slate-900">{f.key}</p>
                <p className="text-xs text-slate-500">{f.description}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  className={
                    enabled
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-100 text-slate-600"
                  }
                >
                  {enabled ? "On" : "Off"}
                </Badge>
                <form action={toggleFeatureFlag}>
                  <input type="hidden" name="key" value={f.key} />
                  <input type="hidden" name="enabled" value={String(enabled)} />
                  <Button type="submit" variant="secondary" size="sm">
                    {enabled ? "Disable" : "Enable"}
                  </Button>
                </form>
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
}
