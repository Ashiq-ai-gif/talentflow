import Link from "next/link";
import { Logo } from "@/components/brand";
import { ButtonLink } from "@/components/ui";

export function SiteHeader({ authed }: { authed?: boolean }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
          <Link href="/jobs" className="hover:text-slate-900">
            Find Jobs
          </Link>
          <Link href="/#employers" className="hover:text-slate-900">
            For Employers
          </Link>
          <Link href="/#features" className="hover:text-slate-900">
            Platform
          </Link>
          <Link href="/#pricing" className="hover:text-slate-900">
            Pricing
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          {authed ? (
            <ButtonLink href="/dashboard" size="sm">
              Dashboard
            </ButtonLink>
          ) : (
            <>
              <ButtonLink href="/login" variant="ghost" size="sm">
                Sign in
              </ButtonLink>
              <ButtonLink href="/register" size="sm">
                Get started
              </ButtonLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-slate-500 sm:flex-row">
        <Logo />
        <p>© {new Date().getFullYear()} TalentFlow. Hiring, made smart.</p>
        <div className="flex gap-5">
          <Link href="/jobs" className="hover:text-slate-800">
            Jobs
          </Link>
          <Link href="/register" className="hover:text-slate-800">
            Sign up
          </Link>
          <Link href="/login" className="hover:text-slate-800">
            Sign in
          </Link>
        </div>
      </div>
    </footer>
  );
}
