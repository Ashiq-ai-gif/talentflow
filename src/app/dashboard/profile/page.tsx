import { redirect } from "next/navigation";
import { getProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import {
  PageHeader,
  Card,
  Button,
  Input,
  Textarea,
  Select,
  Field,
  Stat,
  Badge,
  ProgressRing,
} from "@/components/ui";
import { Icons } from "@/components/icons";
import { BADGE_META } from "@/lib/constants";
import {
  updateCandidateProfile,
  addEducation,
  addExperience,
  addSkill,
  deleteRow,
} from "@/lib/actions/profile";

export const metadata = { title: "My Profile" };

export default async function ProfilePage() {
  const profile = (await getProfile())!;
  if (profile.role !== "job_seeker") redirect("/dashboard");
  const supabase = await createClient();

  const { data: cp } = await supabase
    .from("candidate_profiles")
    .select("*")
    .eq("user_id", profile.id)
    .single();

  if (!cp) {
    return (
      <Card className="p-6">
        Setting up your profile… please refresh in a moment.
      </Card>
    );
  }

  const [{ data: education }, { data: experiences }, { data: skills }] =
    await Promise.all([
      supabase.from("education").select("*").eq("candidate_id", cp.id),
      supabase.from("experiences").select("*").eq("candidate_id", cp.id),
      supabase.from("skills").select("*").eq("candidate_id", cp.id),
    ]);

  const badge = BADGE_META[cp.badge] ?? BADGE_META.none;

  return (
    <>
      <PageHeader
        title="My Profile"
        subtitle="A complete, verified profile boosts your Career Score."
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card className="flex items-center gap-4 p-5">
          <ProgressRing value={cp.career_score} label="score" />
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Career Score
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Complete your profile to grow it.
            </p>
          </div>
        </Card>
        <Stat label="Market Readiness" value={`${cp.market_readiness}%`} accent="emerald" icon={<Icons.chart className="h-5 w-5" />} />
        <Card className="p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Verification
          </p>
          <p className="mt-2">
            <Badge className={badge.cls}>{badge.label}</Badge>
          </p>
        </Card>
        <Card className="p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Status
          </p>
          <p className="mt-2">
            <Badge
              className={
                cp.open_to_work
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-slate-100 text-slate-600"
              }
            >
              {cp.open_to_work ? "Open to work" : "Not looking"}
            </Badge>
          </p>
        </Card>
      </div>

      {/* Basic info */}
      <Card className="p-6">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Basics</h2>
        <form action={updateCandidateProfile} className="space-y-4">
          <Field label="Headline" htmlFor="headline">
            <Input id="headline" name="headline" defaultValue={cp.headline ?? ""} placeholder="Senior Frontend Engineer" />
          </Field>
          <Field label="Location" htmlFor="location">
            <Input id="location" name="location" defaultValue={cp.location ?? ""} placeholder="Bengaluru, India" />
          </Field>
          <Field label="About" htmlFor="about">
            <Textarea id="about" name="about" defaultValue={cp.about ?? ""} rows={4} />
          </Field>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Field label="GitHub" htmlFor="github_url">
              <Input id="github_url" name="github_url" defaultValue={cp.github_url ?? ""} />
            </Field>
            <Field label="LinkedIn" htmlFor="linkedin_url">
              <Input id="linkedin_url" name="linkedin_url" defaultValue={cp.linkedin_url ?? ""} />
            </Field>
            <Field label="Website" htmlFor="website_url">
              <Input id="website_url" name="website_url" defaultValue={cp.website_url ?? ""} />
            </Field>
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" name="open_to_work" defaultChecked={cp.open_to_work} className="h-4 w-4 rounded" />
            Open to work
          </label>
          <Button type="submit">Save profile</Button>
        </form>
      </Card>

      {/* Experience */}
      <Card className="mt-6 p-6">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Experience</h2>
        <ul className="mb-4 space-y-2">
          {(experiences ?? []).map((e) => (
            <li key={e.id} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
              <span className="text-sm text-slate-700">
                <span className="font-medium">{e.position}</span> · {e.company}
              </span>
              <DeleteBtn table="experiences" id={e.id} />
            </li>
          ))}
          {!experiences?.length && <p className="text-sm text-slate-400">No experience added.</p>}
        </ul>
        <form action={addExperience} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Input name="position" placeholder="Position" required />
          <Input name="company" placeholder="Company" required />
          <Input name="responsibilities" placeholder="Responsibilities" className="sm:col-span-2" />
          <Button type="submit" variant="secondary" size="sm" className="w-fit">+ Add experience</Button>
        </form>
      </Card>

      {/* Education */}
      <Card className="mt-6 p-6">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Education</h2>
        <ul className="mb-4 space-y-2">
          {(education ?? []).map((e) => (
            <li key={e.id} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
              <span className="text-sm text-slate-700">
                <span className="font-medium">{e.degree}</span> · {e.college} {e.graduation_year ? `(${e.graduation_year})` : ""}
              </span>
              <DeleteBtn table="education" id={e.id} />
            </li>
          ))}
          {!education?.length && <p className="text-sm text-slate-400">No education added.</p>}
        </ul>
        <form action={addEducation} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Input name="degree" placeholder="Degree" required />
          <Input name="college" placeholder="College / University" required />
          <Input name="field" placeholder="Field of study" />
          <Input name="graduation_year" type="number" placeholder="Graduation year" />
          <Button type="submit" variant="secondary" size="sm" className="w-fit">+ Add education</Button>
        </form>
      </Card>

      {/* Skills */}
      <Card className="mt-6 p-6">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Skills</h2>
        <div className="mb-4 flex flex-wrap gap-2">
          {(skills ?? []).map((s) => (
            <span key={s.id} className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
              {s.name}
              <DeleteBtn table="skills" id={s.id} compact />
            </span>
          ))}
          {!skills?.length && <p className="text-sm text-slate-400">No skills added.</p>}
        </div>
        <form action={addSkill} className="flex flex-wrap gap-3">
          <Input name="name" placeholder="e.g. React" required className="w-48" />
          <Select name="category" className="w-40">
            <option value="technical">Technical</option>
            <option value="soft">Soft</option>
            <option value="language">Language</option>
          </Select>
          <Button type="submit" variant="secondary" size="sm">+ Add skill</Button>
        </form>
      </Card>
    </>
  );
}

function DeleteBtn({
  table,
  id,
  compact,
}: {
  table: string;
  id: string;
  compact?: boolean;
}) {
  return (
    <form action={deleteRow}>
      <input type="hidden" name="table" value={table} />
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className={
          compact
            ? "text-indigo-400 hover:text-rose-600"
            : "text-sm font-medium text-slate-400 hover:text-rose-600"
        }
        aria-label="Remove"
      >
        ✕
      </button>
    </form>
  );
}
