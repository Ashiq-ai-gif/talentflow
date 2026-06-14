import { redirect } from "next/navigation";
import { getProfile } from "@/lib/auth";
import { NAV_BY_ROLE } from "@/lib/nav";
import { ROLE_LABELS } from "@/lib/constants";
import { Logo } from "@/components/brand";
import { Avatar } from "@/components/ui";
import { SidebarNav } from "@/components/sidebar";
import { SignOutButton } from "@/components/signout-button";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getProfile();
  if (!profile) redirect("/login?next=/dashboard");

  const items = NAV_BY_ROLE[profile.role] ?? NAV_BY_ROLE.job_seeker;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white p-4 md:flex">
        <div className="px-2 py-2">
          <Logo href="/dashboard" />
        </div>
        <div className="mt-6 flex-1">
          <SidebarNav items={items} />
        </div>
        <div className="border-t border-slate-200 pt-3">
          <div className="flex items-center gap-3 px-2 py-2">
            <Avatar name={profile.full_name ?? profile.email} />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-900">
                {profile.full_name ?? "Member"}
              </p>
              <p className="truncate text-xs text-slate-500">
                {ROLE_LABELS[profile.role]}
              </p>
            </div>
          </div>
          <SignOutButton />
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:hidden">
          <Logo href="/dashboard" />
          <Avatar name={profile.full_name ?? profile.email} size={32} />
        </header>
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
          {children}
        </main>
      </div>
    </div>
  );
}
