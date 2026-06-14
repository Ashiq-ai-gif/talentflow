"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/lib/nav";
import { Icons } from "@/components/icons";
import { cn } from "@/components/ui";

export function SidebarNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  return (
    <nav className="space-y-0.5">
      {items.map((it) => {
        const active =
          it.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(it.href);
        const Icon = Icons[it.icon];
        return (
          <Link
            key={it.href}
            href={it.href}
            className={cn(
              "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-emerald-50 text-emerald-700"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
            )}
          >
            {active ? (
              <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-emerald-600" />
            ) : null}
            <Icon
              className={cn(
                "h-[18px] w-[18px] shrink-0",
                active ? "text-emerald-600" : "text-slate-400 group-hover:text-slate-500",
              )}
            />
            {it.label}
          </Link>
        );
      })}
    </nav>
  );
}
