"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/auth";

async function requireAdmin() {
  const p = await getProfile();
  if (!p || (p.role !== "admin" && p.role !== "super_admin")) return null;
  return p;
}

export async function setJobStatus(formData: FormData) {
  if (!(await requireAdmin())) return;
  const id = String(formData.get("job_id"));
  const status = String(formData.get("status")) as
    | "draft"
    | "open"
    | "paused"
    | "closed";
  const supabase = await createClient();
  await supabase.from("jobs").update({ status }).eq("id", id);
  revalidatePath("/dashboard/admin");
}

export async function resolveReport(formData: FormData) {
  if (!(await requireAdmin())) return;
  const id = String(formData.get("report_id"));
  const supabase = await createClient();
  await supabase.from("reports").update({ resolved: true }).eq("id", id);
  revalidatePath("/dashboard/admin/reports");
}

export async function toggleFeatureFlag(formData: FormData) {
  const p = await requireAdmin();
  if (!p) return;
  const key = String(formData.get("key"));
  const enabled = formData.get("enabled") === "true";
  const supabase = await createClient();
  await supabase
    .from("feature_flags")
    .upsert({ key, enabled: !enabled }, { onConflict: "key" });
  revalidatePath("/dashboard/platform");
}
