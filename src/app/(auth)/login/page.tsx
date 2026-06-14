import { redirect } from "next/navigation";
import { getProfile } from "@/lib/auth";
import { LoginForm } from "@/components/auth-forms";

export const metadata = { title: "Sign in" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  if (await getProfile()) redirect("/dashboard");
  const { next } = await searchParams;
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-slate-900">
          Welcome back
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Sign in to your TalentFlow account.
        </p>
      </div>
      <LoginForm next={next ?? "/dashboard"} />
    </div>
  );
}
