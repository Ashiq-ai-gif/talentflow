import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import type { Role } from "@/lib/constants";

export type Profile = {
  id: string;
  role: Role;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
};

/** True when the request carries a Supabase auth-token cookie. */
async function hasAuthCookie(): Promise<boolean> {
  const store = await cookies();
  return store
    .getAll()
    .some((c) => c.name.startsWith("sb-") && c.name.includes("auth-token"));
}

/**
 * Returns the current auth user + profile row, or null if signed out.
 *
 * getProfile runs on nearly every page (and the dashboard layout), so it must
 * be cheap. Two optimizations vs. a naive `getUser()`:
 *  1. If there's no auth cookie at all, the visitor is signed out — return
 *     immediately without any network or DB call.
 *  2. Verify the JWT locally with `getClaims()` (cached JWKS) instead of a
 *     per-request network round-trip to the auth server via `getUser()`.
 */
export async function getProfile(): Promise<Profile | null> {
  if (!(await hasAuthCookie())) return null;

  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  const claims = claimsData?.claims as
    | {
        sub?: string;
        email?: string;
        user_metadata?: { full_name?: string };
      }
    | undefined;
  if (!claims?.sub) return null;

  const { data } = await supabase
    .from("profiles")
    .select("id, role, full_name, email, avatar_url")
    .eq("id", claims.sub)
    .single();

  if (!data) {
    return {
      id: claims.sub,
      role: "job_seeker",
      full_name: claims.user_metadata?.full_name ?? null,
      email: claims.email ?? null,
      avatar_url: null,
    };
  }
  return data as Profile;
}
