"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/auth";

async function candidateId() {
  const profile = await getProfile();
  if (!profile) return null;
  const supabase = await createClient();
  const { data } = await supabase
    .from("candidate_profiles")
    .select("id")
    .eq("user_id", profile.id)
    .maybeSingle();
  return data?.id ?? null;
}

/** Recompute a simple Career Score from profile signals. */
async function recomputeScore(cid: string) {
  const supabase = await createClient();
  const [
    { data: cp },
    { count: eduCount },
    { count: expCount },
    { count: skillCount },
    { count: certCount },
    { count: verifiedCount },
  ] = await Promise.all([
    supabase
      .from("candidate_profiles")
      .select("headline, location, about")
      .eq("id", cid)
      .single(),
    supabase.from("education").select("id", { count: "exact", head: true }).eq("candidate_id", cid),
    supabase.from("experiences").select("id", { count: "exact", head: true }).eq("candidate_id", cid),
    supabase.from("skills").select("id", { count: "exact", head: true }).eq("candidate_id", cid),
    supabase.from("certifications").select("id", { count: "exact", head: true }).eq("candidate_id", cid),
    supabase
      .from("verifications")
      .select("id", { count: "exact", head: true })
      .eq("candidate_id", cid)
      .eq("status", "verified"),
  ]);

  let score = 0;
  if (cp?.headline) score += 10;
  if (cp?.location) score += 5;
  if (cp?.about) score += 10;
  score += Math.min(eduCount ?? 0, 2) * 7; // up to 14
  score += Math.min(expCount ?? 0, 3) * 8; // up to 24
  score += Math.min(skillCount ?? 0, 8) * 2; // up to 16
  score += Math.min(certCount ?? 0, 3) * 3; // up to 9
  score += Math.min(verifiedCount ?? 0, 3) * 4; // up to 12
  score = Math.min(score, 100);
  const readiness = Math.min(100, Math.round(score * 0.9 + (expCount ?? 0) * 2));

  await supabase
    .from("candidate_profiles")
    .update({ career_score: score, market_readiness: readiness })
    .eq("id", cid);
}

export async function updateCandidateProfile(formData: FormData) {
  const cid = await candidateId();
  if (!cid) return;
  const supabase = await createClient();
  await supabase
    .from("candidate_profiles")
    .update({
      headline: String(formData.get("headline") ?? "") || null,
      location: String(formData.get("location") ?? "") || null,
      about: String(formData.get("about") ?? "") || null,
      github_url: String(formData.get("github_url") ?? "") || null,
      linkedin_url: String(formData.get("linkedin_url") ?? "") || null,
      website_url: String(formData.get("website_url") ?? "") || null,
      open_to_work: formData.get("open_to_work") === "on",
    })
    .eq("id", cid);
  await recomputeScore(cid);
  revalidatePath("/dashboard/profile");
}

export async function addEducation(formData: FormData) {
  const cid = await candidateId();
  if (!cid) return;
  const supabase = await createClient();
  await supabase.from("education").insert({
    candidate_id: cid,
    college: String(formData.get("college") ?? "") || null,
    degree: String(formData.get("degree") ?? "") || null,
    field: String(formData.get("field") ?? "") || null,
    graduation_year: Number(formData.get("graduation_year")) || null,
  });
  await recomputeScore(cid);
  revalidatePath("/dashboard/profile");
}

export async function addExperience(formData: FormData) {
  const cid = await candidateId();
  if (!cid) return;
  const supabase = await createClient();
  await supabase.from("experiences").insert({
    candidate_id: cid,
    company: String(formData.get("company")),
    position: String(formData.get("position")),
    responsibilities: String(formData.get("responsibilities") ?? "") || null,
    is_current: formData.get("is_current") === "on",
  });
  await recomputeScore(cid);
  revalidatePath("/dashboard/profile");
}

export async function addSkill(formData: FormData) {
  const cid = await candidateId();
  if (!cid) return;
  const supabase = await createClient();
  await supabase.from("skills").insert({
    candidate_id: cid,
    name: String(formData.get("name")),
    category: String(formData.get("category") ?? "technical"),
  });
  await recomputeScore(cid);
  revalidatePath("/dashboard/profile");
}

export async function deleteRow(formData: FormData) {
  const table = String(formData.get("table")) as
    | "education"
    | "experiences"
    | "skills";
  const id = String(formData.get("id"));
  const cid = await candidateId();
  if (!cid) return;
  const supabase = await createClient();
  await supabase.from(table).delete().eq("id", id).eq("candidate_id", cid);
  await recomputeScore(cid);
  revalidatePath("/dashboard/profile");
}
