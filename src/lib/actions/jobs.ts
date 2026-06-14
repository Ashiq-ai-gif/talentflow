"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/auth";
import { matchBand } from "@/lib/constants";

/* ---------------- Candidate: apply / withdraw ---------------- */

export async function applyToJob(formData: FormData) {
  const jobId = String(formData.get("job_id"));
  const coverNote = String(formData.get("cover_note") ?? "");
  const profile = await getProfile();
  if (!profile) redirect(`/login?next=/jobs/${jobId}`);

  const supabase = await createClient();
  const { data: candidate } = await supabase
    .from("candidate_profiles")
    .select("id")
    .eq("user_id", profile.id)
    .single();
  if (!candidate) redirect("/dashboard/profile");

  // Lightweight match score (stub for the AI ranking engine).
  const score = Math.floor(50 + Math.random() * 50);
  await supabase.from("applications").insert({
    job_id: jobId,
    candidate_id: candidate.id,
    cover_note: coverNote || null,
    match_score: score,
    match_band: matchBand(score),
  });

  revalidatePath(`/jobs/${jobId}`);
  revalidatePath("/dashboard/applications");
  redirect("/dashboard/applications");
}

export async function withdrawApplication(formData: FormData) {
  const id = String(formData.get("application_id"));
  const supabase = await createClient();
  await supabase
    .from("applications")
    .update({ status: "withdrawn" })
    .eq("id", id);
  revalidatePath("/dashboard/applications");
}

/* ---------------- Employer: post job ---------------- */

export async function createJob(formData: FormData) {
  const profile = await getProfile();
  if (!profile) redirect("/login");
  const supabase = await createClient();

  // Ensure the employer has a company; create a stub one if missing.
  let { data: company } = await supabase
    .from("companies")
    .select("id")
    .eq("owner_id", profile.id)
    .limit(1)
    .maybeSingle();
  if (!company) {
    const { data: created } = await supabase
      .from("companies")
      .insert({
        owner_id: profile.id,
        name: String(formData.get("company_name") ?? "My Company"),
      })
      .select("id")
      .single();
    company = created;
  }

  const skills = String(formData.get("skills_required") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const { data: job } = await supabase
    .from("jobs")
    .insert({
      company_id: company!.id,
      created_by: profile.id,
      title: String(formData.get("title")),
      department: String(formData.get("department") ?? "") || null,
      employment_type: String(formData.get("employment_type") ?? "full_time") as
        | "full_time"
        | "part_time"
        | "internship"
        | "contract"
        | "freelance",
      work_mode: String(formData.get("work_mode") ?? "onsite") as
        | "remote"
        | "hybrid"
        | "onsite",
      location: String(formData.get("location") ?? "") || null,
      salary_min: Number(formData.get("salary_min")) || null,
      salary_max: Number(formData.get("salary_max")) || null,
      description: String(formData.get("description") ?? "") || null,
      responsibilities: String(formData.get("responsibilities") ?? "") || null,
      requirements: String(formData.get("requirements") ?? "") || null,
      skills_required: skills.length ? skills : null,
      experience_min: Number(formData.get("experience_min")) || 0,
      vacancies: Number(formData.get("vacancies")) || 1,
      status: "open",
    })
    .select("id")
    .single();

  revalidatePath("/dashboard/jobs");
  redirect(job ? `/dashboard/jobs/${job.id}` : "/dashboard/jobs");
}

/* ---------------- Employer: move applicant stage / rate ---------------- */

export async function updateApplicationStatus(formData: FormData) {
  const id = String(formData.get("application_id"));
  const status = String(formData.get("status"));
  const supabase = await createClient();
  const profile = await getProfile();

  const { data: current } = await supabase
    .from("applications")
    .select("status, job_id")
    .eq("id", id)
    .single();

  await supabase
    .from("applications")
    .update({
      status: status as
        | "applied"
        | "viewed"
        | "screening"
        | "shortlisted"
        | "interview_scheduled"
        | "offer_sent"
        | "hired"
        | "rejected"
        | "withdrawn",
    })
    .eq("id", id);

  await supabase.from("application_events").insert({
    application_id: id,
    from_status: current?.status,
    to_status: status as never,
    actor_id: profile?.id,
  });

  if (current?.job_id) revalidatePath(`/dashboard/jobs/${current.job_id}`);
}

export async function addApplicationNote(formData: FormData) {
  const id = String(formData.get("application_id"));
  const body = String(formData.get("body") ?? "").trim();
  const jobId = String(formData.get("job_id") ?? "");
  if (!body) return;
  const supabase = await createClient();
  const profile = await getProfile();
  await supabase
    .from("application_notes")
    .insert({ application_id: id, author_id: profile?.id, body });
  if (jobId) revalidatePath(`/dashboard/jobs/${jobId}`);
}
