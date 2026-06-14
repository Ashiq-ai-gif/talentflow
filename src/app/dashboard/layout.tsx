import { redirect } from "next/navigation";
import { getProfile } from "@/lib/auth";
import { NAV_BY_ROLE } from "@/lib/nav";
import { ROLE_LABELS } from "@/lib/constants";
import { Logo } from "@/components/brand";
import { Avatar, ButtonLink } from "@/components/ui";
import { SidebarNav } from "@/components/sidebar";
import { SignOutButton } from "@/components/signout-button";
import { MobileNav } from "@/components/mobile-nav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getProfile();
  if (!profile) redirect("/login?next=/dashboard");

  const items = NAV_BY_ROLE[profile.role] ?? NAV_BY_ROLE.job_seeker;
  const name = profile.full_name ?? profile.email ?? "Member";

  const userCard = (
    <>
      <div className="flex items-center gap-3 px-2 py-2">
        <Avatar name={name} size={34} />
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
    </>
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Desktop sidebar (light) */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-slate-200 bg-white p-3 md:flex">
        <div className="px-2 py-2">
          <Logo href="/dashboard" />
        </div>
        <div className="mt-5 flex-1">
          <SidebarNav items={items} />
        </div>
        <div className="border-t border-slate-200 pt-2">{userCard}</div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
          <div className="flex items-center gap-2 md:hidden">
            <MobileNav items={items} footer={userCard} />
            <Logo href="/dashboard" />
          </div>
          <p className="hidden text-sm font-medium text-slate-500 md:block">
            {ROLE_LABELS[profile.role]} workspace
          </p>
          <div className="flex items-center gap-3">
            <ButtonLink href="/" variant="ghost" size="sm">
              View site
            </ButtonLink>
            <Avatar name={name} size={32} />
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
          <div className="animate-fade-up">{children}</div>
        </main>
      </div>
    </div>
  );
}
