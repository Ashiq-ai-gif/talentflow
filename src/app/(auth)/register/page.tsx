import { redirect } from "next/navigation";
import { getProfile } from "@/lib/auth";
import { RegisterForm } from "@/components/auth-forms";

export const metadata = { title: "Create your account" };

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  if (await getProfile()) redirect("/dashboard");
  const { role } = await searchParams;
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-slate-900">
          Create your account
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Join TalentFlow and start hiring smarter.
        </p>
      </div>
      <RegisterForm defaultRole={role ?? "job_seeker"} />
    </div>
  );
}
