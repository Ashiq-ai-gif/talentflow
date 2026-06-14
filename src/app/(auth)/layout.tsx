import { Logo } from "@/components/brand";
import { Icons } from "@/components/icons";

const HIGHLIGHTS = [
  { icon: "sparkles" as const, text: "AI-assisted job posting & candidate ranking" },
  { icon: "shield" as const, text: "Verified profiles you can trust" },
  { icon: "folder" as const, text: "A full ATS from applied to hired" },
  { icon: "chart" as const, text: "Analytics that shorten time-to-hire" },
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen">
      {/* Brand panel */}
      <aside className="gradient-brand relative hidden w-1/2 flex-col justify-between overflow-hidden p-12 lg:flex">
        <div className="bg-grid absolute inset-0 opacity-20" />
        <div className="relative">
          <Logo href="/" light />
        </div>
        <div className="relative">
          <h2 className="max-w-md text-3xl font-bold leading-tight tracking-tight text-white">
            The smartest way to hire — and get hired.
          </h2>
          <ul className="mt-8 space-y-4">
            {HIGHLIGHTS.map((h) => {
              const Icon = Icons[h.icon];
              return (
                <li key={h.text} className="flex items-center gap-3 text-indigo-100">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 ring-1 ring-white/20">
                    <Icon className="h-5 w-5 text-white" />
                  </span>
                  <span className="text-sm">{h.text}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <p className="relative text-xs text-indigo-200">
          © {new Date().getFullYear()} TalentFlow. Hiring, made smart.
        </p>
      </aside>

      {/* Form panel */}
      <section className="flex w-full flex-col items-center justify-center px-4 py-12 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Logo href="/" />
          </div>
          <div className="animate-fade-up">{children}</div>
        </div>
      </section>
    </main>
  );
}
