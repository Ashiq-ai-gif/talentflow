import { Logo } from "@/components/brand";
import { Icons } from "@/components/icons";

const HIGHLIGHTS = [
  "AI-assisted job posting & candidate ranking",
  "Verified profiles you can trust",
  "A full ATS from applied to hired",
  "Analytics that shorten time-to-hire",
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen">
      {/* Brand panel */}
      <aside className="hidden w-1/2 flex-col justify-between border-r border-slate-200 bg-slate-50 p-12 lg:flex">
        <Logo href="/" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
            Hiring, made smart
          </p>
          <h2 className="mt-3 max-w-md text-2xl font-semibold leading-snug tracking-tight text-slate-900">
            The smartest way to hire — and get hired.
          </h2>
          <ul className="mt-8 space-y-3">
            {HIGHLIGHTS.map((h) => (
              <li key={h} className="flex items-center gap-3 text-sm text-slate-600">
                <span className="grid h-5 w-5 place-items-center rounded-md bg-emerald-50 text-emerald-600">
                  <Icons.check className="h-3.5 w-3.5" />
                </span>
                {h}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} TalentFlow
        </p>
      </aside>

      {/* Form panel */}
      <section className="flex w-full flex-col items-center justify-center px-4 py-12 lg:w-1/2">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <Logo href="/" />
          </div>
          <div className="animate-fade-up">{children}</div>
        </div>
      </section>
    </main>
  );
}
