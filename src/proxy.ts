// Next.js 16 renamed Middleware to Proxy. This file refreshes the Supabase
// auth session cookie and guards protected routes.
import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  // Only run on protected routes. Public pages (landing, /jobs, auth) don't
  // need a session refresh or guard, so they skip the round-trip to the auth
  // server entirely — that network call was adding ~0.5s to every public click.
  matcher: ["/dashboard/:path*", "/onboarding-role/:path*"],
};
