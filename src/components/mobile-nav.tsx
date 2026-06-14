"use client";

import { useState, type ReactNode } from "react";
import type { NavItem } from "@/lib/nav";
import { SidebarNav } from "@/components/sidebar";
import { Logo } from "@/components/brand";
import { Icons } from "@/components/icons";

export function MobileNav({
  items,
  footer,
}: {
  items: NavItem[];
  footer: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
      >
        <Icons.menu className="h-6 w-6" />
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-slate-900/30"
            onClick={() => setOpen(false)}
          />
          <div className="animate-fade-up absolute left-0 top-0 flex h-full w-72 flex-col border-r border-slate-200 bg-white p-3">
            <div className="flex items-center justify-between px-2 py-2">
              <Logo href="/dashboard" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <Icons.x className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-5 flex-1" onClick={() => setOpen(false)}>
              <SidebarNav items={items} />
            </div>
            <div className="border-t border-slate-200 pt-2">{footer}</div>
          </div>
        </div>
      ) : null}
    </>
  );
}
