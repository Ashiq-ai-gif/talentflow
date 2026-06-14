import { createClient } from "@/lib/supabase/server";
import type { Role } from "@/lib/constants";

export type Profile = {
  id: string;
  role: Role;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
};

/** Returns the current auth user + profile row, or null if signed out. */
export async function getProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("id, role, full_name, email, avatar_url")
    .eq("id", user.id)
    .single();

  if (!data) {
    return {
      id: user.id,
      role: "job_seeker",
      full_name: (user.user_metadata?.full_name as string) ?? null,
      email: user.email ?? null,
      avatar_url: null,
    };
  }
  return data as Profile;
}
