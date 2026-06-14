"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/auth";

export async function upsertCompany(formData: FormData) {
  const profile = await getProfile();
  if (!profile) return;
  const supabase = await createClient();

  const payload = {
    owner_id: profile.id,
    name: String(formData.get("name") ?? "").trim() || "My Company",
    industry: String(formData.get("industry") ?? "") || null,
    website: String(formData.get("website") ?? "") || null,
    employee_count: String(formData.get("employee_count") ?? "") || null,
    description: String(formData.get("description") ?? "") || null,
    gst_number: String(formData.get("gst_number") ?? "") || null,
  };

  const { data: existing } = await supabase
    .from("companies")
    .select("id")
    .eq("owner_id", profile.id)
    .limit(1)
    .maybeSingle();

  if (existing) {
    await supabase.from("companies").update(payload).eq("id", existing.id);
  } else {
    await supabase.from("companies").insert(payload);
  }
  revalidatePath("/dashboard/company");
}
