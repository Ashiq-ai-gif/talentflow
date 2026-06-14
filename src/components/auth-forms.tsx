"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signIn, signUp, type AuthState } from "@/lib/actions/auth";
import { Button, Input, Field } from "@/components/ui";
import { ROLE_LABELS } from "@/lib/constants";

function ErrorBox({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div className="rounded-xl bg-rose-50 px-3.5 py-2.5 text-sm text-rose-700 ring-1 ring-rose-100">
      {message}
    </div>
  );
}

export function RegisterForm({ defaultRole }: { defaultRole: string }) {
  const [state, action, pending] = useActionState<AuthState, FormData>(
    signUp,
    undefined,
  );
  return (
    <form action={action} className="space-y-4">
      <ErrorBox message={state?.error} />
      <Field label="Full name" htmlFor="full_name">
        <Input id="full_name" name="full_name" placeholder="Asha Sharma" required />
      </Field>
      <Field label="Email" htmlFor="email">
        <Input id="email" name="email" type="email" placeholder="you@email.com" required />
      </Field>
      <Field label="Password" htmlFor="password" hint="At least 6 characters.">
        <Input id="password" name="password" type="password" required minLength={6} />
      </Field>
      <Field label="I am a…" htmlFor="role">
        <div className="grid grid-cols-3 gap-2">
          {(["job_seeker", "employer", "recruiter"] as const).map((r) => (
            <label
              key={r}
              className="flex cursor-pointer items-center justify-center rounded-xl border border-slate-200 px-2 py-2 text-xs font-medium text-slate-600 has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-50 has-[:checked]:text-indigo-700"
            >
              <input
                type="radio"
                name="role"
                value={r}
                defaultChecked={defaultRole === r}
                className="sr-only"
              />
              {ROLE_LABELS[r]}
            </label>
          ))}
        </div>
      </Field>
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Creating account…" : "Create account"}
      </Button>
      <p className="text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-700">
          Sign in
        </Link>
      </p>
    </form>
  );
}

export function LoginForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState<AuthState, FormData>(
    signIn,
    undefined,
  );
  return (
    <form action={action} className="space-y-4">
      <ErrorBox message={state?.error} />
      <input type="hidden" name="next" value={next} />
      <Field label="Email" htmlFor="email">
        <Input id="email" name="email" type="email" placeholder="you@email.com" required />
      </Field>
      <Field label="Password" htmlFor="password">
        <Input id="password" name="password" type="password" required />
      </Field>
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Signing in…" : "Sign in"}
      </Button>
      <p className="text-center text-sm text-slate-500">
        New to TalentFlow?{" "}
        <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-700">
          Create an account
        </Link>
      </p>
    </form>
  );
}
