import type { Role } from "@/lib/constants";
import type { IconName } from "@/components/icons";

export type NavItem = { href: string; label: string; icon: IconName };

export const NAV_BY_ROLE: Record<Role, NavItem[]> = {
  job_seeker: [
    { href: "/dashboard", label: "Overview", icon: "home" },
    { href: "/jobs", label: "Find Jobs", icon: "search" },
    { href: "/dashboard/applications", label: "My Applications", icon: "folder" },
    { href: "/dashboard/profile", label: "My Profile", icon: "user" },
  ],
  employer: [
    { href: "/dashboard", label: "Overview", icon: "home" },
    { href: "/dashboard/jobs", label: "Jobs", icon: "briefcase" },
    { href: "/dashboard/jobs/new", label: "Post a Job", icon: "plus" },
    { href: "/dashboard/company", label: "Company", icon: "building" },
  ],
  recruiter: [
    { href: "/dashboard", label: "Overview", icon: "home" },
    { href: "/jobs", label: "Open Roles", icon: "search" },
    { href: "/dashboard/placements", label: "Placements", icon: "handshake" },
  ],
  admin: [
    { href: "/dashboard", label: "Overview", icon: "home" },
    { href: "/dashboard/admin", label: "Moderation", icon: "shield" },
    { href: "/dashboard/admin/reports", label: "Reports", icon: "flag" },
  ],
  super_admin: [
    { href: "/dashboard", label: "Overview", icon: "home" },
    { href: "/dashboard/admin", label: "Moderation", icon: "shield" },
    { href: "/dashboard/admin/reports", label: "Reports", icon: "flag" },
    { href: "/dashboard/platform", label: "Platform", icon: "settings" },
  ],
};
