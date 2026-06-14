"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/lib/nav";
import { Icons } from "@/components/icons";
import { cn } from "@/components/ui";

export function SidebarNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  return (
    <nav className="space-y-1">
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
              "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
              active
                ? "bg-white/10 text-white"
                : "text-slate-400 hover:bg-white/5 hover:text-white",
            )}
          >
            <Icon
              className={cn(
                "h-5 w-5 shrink-0 transition",
                active ? "text-indigo-300" : "text-slate-500 group-hover:text-slate-300",
              )}
            />
            {it.label}
            {active ? (
              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-400" />
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
