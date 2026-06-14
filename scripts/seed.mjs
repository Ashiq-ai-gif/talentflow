// Seed demo data using the Supabase service role key.
// Usage: SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/seed.mjs
import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}
const sb = createClient(url, key, { auth: { persistSession: false } });

const PASSWORD = "Demo12345!";
const USERS = [
  { email: "employer@talentflow.demo", full_name: "Erin Employer", role: "employer" },
  { email: "seeker@talentflow.demo", full_name: "Sam Seeker", role: "job_seeker" },
  { email: "recruiter@talentflow.demo", full_name: "Riya Recruiter", role: "recruiter" },
  { email: "admin@talentflow.demo", full_name: "Ada Admin", role: "admin" },
];

async function ensureUser(u) {
  // Try create; if exists, look it up.
  const { data, error } = await sb.auth.admin.createUser({
    email: u.email,
    password: PASSWORD,
    email_confirm: true,
    user_metadata: { full_name: u.full_name, role: u.role },
  });
  if (data?.user) return data.user.id;
  // Already exists — page through users to find it.
  if (error && !/registered|exists/i.test(error.message)) throw error;
  let page = 1;
  for (;;) {
    const { data: list } = await sb.auth.admin.listUsers({ page, perPage: 200 });
    const found = list?.users?.find((x) => x.email === u.email);
    if (found) return found.id;
    if (!list || list.users.length < 200) break;
    page++;
  }
  throw new Error("could not resolve user " + u.email);
}

const JOBS = [
  { title: "Senior Frontend Engineer", department: "Engineering", work_mode: "remote", employment_type: "full_time", location: "Remote (India)", salary_min: 2500000, salary_max: 4000000, experience_min: 4, skills: ["React", "TypeScript", "Next.js", "Tailwind"] },
  { title: "Product Designer", department: "Design", work_mode: "hybrid", employment_type: "full_time", location: "Bengaluru", salary_min: 1800000, salary_max: 3000000, experience_min: 3, skills: ["Figma", "Design Systems", "Prototyping"] },
  { title: "Backend Engineer (Node)", department: "Engineering", work_mode: "onsite", employment_type: "full_time", location: "Hyderabad", salary_min: 2000000, salary_max: 3500000, experience_min: 3, skills: ["Node.js", "PostgreSQL", "AWS"] },
  { title: "Data Analyst Intern", department: "Data", work_mode: "remote", employment_type: "internship", location: "Remote", salary_min: 25000, salary_max: 40000, experience_min: 0, skills: ["SQL", "Excel", "Python"] },
  { title: "Sales Development Rep", department: "Sales", work_mode: "hybrid", employment_type: "full_time", location: "Mumbai", salary_min: 600000, salary_max: 1200000, experience_min: 1, skills: ["Communication", "CRM", "Negotiation"] },
];

async function main() {
  const ids = {};
  for (const u of USERS) {
    ids[u.role] = await ensureUser(u);
    console.log("user", u.email, "->", ids[u.role]);
  }
  // Give a moment for the auth trigger to create profile rows.
  await new Promise((r) => setTimeout(r, 1500));

  // Company for employer
  let { data: company } = await sb
    .from("companies")
    .select("id")
    .eq("owner_id", ids.employer)
    .maybeSingle();
  if (!company) {
    const { data } = await sb
      .from("companies")
      .insert({
        owner_id: ids.employer,
        name: "Nimbus Technologies",
        industry: "Software",
        website: "https://nimbus.example",
        employee_count: "51–200",
        description: "We build delightful developer tools used by teams worldwide.",
        locations: ["Bengaluru", "Remote"],
        business_reg_status: "verified",
      })
      .select("id")
      .single();
    company = data;
  }
  console.log("company", company.id);

  // Jobs
  const { data: existingJobs } = await sb
    .from("jobs")
    .select("id")
    .eq("company_id", company.id);
  if (!existingJobs?.length) {
    for (const j of JOBS) {
      await sb.from("jobs").insert({
        company_id: company.id,
        created_by: ids.employer,
        title: j.title,
        department: j.department,
        employment_type: j.employment_type,
        work_mode: j.work_mode,
        location: j.location,
        salary_min: j.salary_min,
        salary_max: j.salary_max,
        experience_min: j.experience_min,
        skills_required: j.skills,
        description: `Join Nimbus Technologies as a ${j.title}. Work with a talented team on products that matter.`,
        responsibilities: "Own initiatives end to end.\nCollaborate cross-functionally.\nRaise the quality bar.",
        requirements: `${j.experience_min}+ years of relevant experience.\nStrong communication.\nOwnership mindset.`,
        status: "open",
      });
    }
    console.log("inserted", JOBS.length, "jobs");
  }

  // Candidate profile basics + one application
  const { data: cand } = await sb
    .from("candidate_profiles")
    .select("id")
    .eq("user_id", ids.job_seeker)
    .maybeSingle();
  if (cand) {
    await sb
      .from("candidate_profiles")
      .update({
        headline: "Frontend Engineer · React & TypeScript",
        location: "Pune, India",
        about: "Frontend engineer who loves building accessible, fast UIs.",
        career_score: 72,
        market_readiness: 80,
        badge: "silver",
      })
      .eq("id", cand.id);
    await sb.from("skills").upsert(
      [
        { candidate_id: cand.id, name: "React", category: "technical" },
        { candidate_id: cand.id, name: "TypeScript", category: "technical" },
      ],
      { onConflict: "id", ignoreDuplicates: true },
    );
    const { data: firstJob } = await sb
      .from("jobs")
      .select("id")
      .eq("company_id", company.id)
      .limit(1)
      .single();
    if (firstJob) {
      const { data: appExists } = await sb
        .from("applications")
        .select("id")
        .eq("job_id", firstJob.id)
        .eq("candidate_id", cand.id)
        .maybeSingle();
      if (!appExists) {
        await sb.from("applications").insert({
          job_id: firstJob.id,
          candidate_id: cand.id,
          status: "shortlisted",
          match_score: 88,
          match_band: "best",
        });
        console.log("seeded application");
      }
    }
  }

  console.log("\n✅ Seed complete. Demo logins (password: %s):", PASSWORD);
  USERS.forEach((u) => console.log("  -", u.role.padEnd(11), u.email));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
