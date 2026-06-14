import type { Role } from "@/lib/constants";

export type NavItem = { href: string; label: string; icon: string };

const COMMON_TAIL: NavItem[] = [];

export const NAV_BY_ROLE: Record<Role, NavItem[]> = {
  job_seeker: [
    { href: "/dashboard", label: "Overview", icon: "🏠" },
    { href: "/jobs", label: "Find Jobs", icon: "🔎" },
    { href: "/dashboard/applications", label: "My Applications", icon: "🗂️" },
    { href: "/dashboard/profile", label: "My Profile", icon: "👤" },
    ...COMMON_TAIL,
  ],
  employer: [
    { href: "/dashboard", label: "Overview", icon: "🏠" },
    { href: "/dashboard/jobs", label: "Jobs", icon: "💼" },
    { href: "/dashboard/jobs/new", label: "Post a Job", icon: "➕" },
    { href: "/dashboard/company", label: "Company", icon: "🏢" },
    ...COMMON_TAIL,
  ],
  recruiter: [
    { href: "/dashboard", label: "Overview", icon: "🏠" },
    { href: "/jobs", label: "Open Roles", icon: "🔎" },
    { href: "/dashboard/placements", label: "Placements", icon: "🤝" },
    ...COMMON_TAIL,
  ],
  admin: [
    { href: "/dashboard", label: "Overview", icon: "🏠" },
    { href: "/dashboard/admin", label: "Moderation", icon: "🛡️" },
    { href: "/dashboard/admin/reports", label: "Reports", icon: "🚩" },
    ...COMMON_TAIL,
  ],
  super_admin: [
    { href: "/dashboard", label: "Overview", icon: "🏠" },
    { href: "/dashboard/admin", label: "Moderation", icon: "🛡️" },
    { href: "/dashboard/admin/reports", label: "Reports", icon: "🚩" },
    { href: "/dashboard/platform", label: "Platform", icon: "⚙️" },
    ...COMMON_TAIL,
  ],
};
