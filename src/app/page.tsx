import Link from "next/link";
import { getProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { SiteHeader, SiteFooter } from "@/components/site";
import { Card, ButtonLink, Badge } from "@/components/ui";
import { Icons, type IconName } from "@/components/icons";

const MODULES: { icon: IconName; title: string; desc: string }[] = [
  { icon: "search", title: "Job Discovery", desc: "Keyword, location & skill search with smart filters." },
  { icon: "folder", title: "Applicant Tracking", desc: "A clear pipeline from applied to hired." },
  { icon: "sparkles", title: "AI Ranking", desc: "Candidates scored and banded by fit." },
  { icon: "shield", title: "Verification", desc: "Identity, education & employment checks." },
  { icon: "bolt", title: "Assessments", desc: "Coding, aptitude & subject tests, auto-scored." },
  { icon: "calendar", title: "Interviews", desc: "Scheduling, scorecards & feedback forms." },
  { icon: "rocket", title: "Onboarding", desc: "Offers, NDA, documents & checklists." },
  { icon: "chart", title: "Analytics", desc: "Funnel, time-to-hire & cost-per-hire." },
];

const ROLES: { icon: IconName; title: string; desc: string; href: string }[] = [
  { icon: "user", title: "For job seekers", desc: "A verified profile, a Career Score, and real-time tracking of every application.", href: "/register?role=job_seeker" },
  { icon: "briefcase", title: "For employers", desc: "Post roles with AI help and run a full ATS from first screen to signed offer.", href: "/register?role=employer" },
  { icon: "handshake", title: "For recruiters", desc: "Source and recommend candidates, track placements, and earn commission.", href: "/register?role=recruiter" },
];

const STEPS = [
  { n: "1", title: "Create your profile", desc: "Sign up in seconds and pick your role." },
  { n: "2", title: "Match & apply", desc: "Discover roles or candidates with AI ranking." },
  { n: "3", title: "Hire & onboard", desc: "Interview, offer, and onboard in one place." },
];

const PLANS = [
  { name: "Free", price: "₹0", note: "to get started", features: ["Limited job posts", "Limited applications", "Basic profile"], cta: "Start free", featured: false },
  { name: "Professional", price: "₹4,999", note: "/ month", features: ["Unlimited jobs", "Full ATS access", "Analytics dashboard", "AI candidate ranking"], cta: "Go Professional", featured: true },
  { name: "Enterprise", price: "Custom", note: "for scale", features: ["AI hiring suite", "Custom branding", "Dedicated support", "SSO & audit logs"], cta: "Contact sales", featured: false },
];

export default async function Home() {
  const profile = await getProfile();
  const supabase = await createClient();
  const [{ count: jobCount }, { count: companyCount }] = await Promise.all([
    supabase.from("jobs").select("id", { count: "exact", head: true }).eq("status", "open"),
    supabase.from("companies").select("id", { count: "exact", head: true }),
  ]);

  return (
    <>
      <SiteHeader authed={!!profile} />

      {/* Hero */}
      <section className="border-b border-slate-200">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Smart hiring &amp; recruitment platform
            </span>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-slate-900 sm:text-5xl">
              Hiring,{" "}
              <span className="text-emerald-600">made smart.</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-slate-600">
              Recruitment, applicant tracking, verification, AI screening,
              interviews, onboarding and analytics — one platform instead of ten.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <ButtonLink href="/register" size="lg">
                Get started — free
                <Icons.arrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/jobs" variant="secondary" size="lg">
                Browse jobs
              </ButtonLink>
            </div>
            <div className="mt-8 flex items-center gap-5 text-sm text-slate-500">
              <span><strong className="font-semibold text-slate-900">{jobCount ?? 0}</strong> open roles</span>
              <span className="h-4 w-px bg-slate-200" />
              <span><strong className="font-semibold text-slate-900">{companyCount ?? 0}</strong> companies</span>
              <span className="h-4 w-px bg-slate-200" />
              <span><strong className="font-semibold text-slate-900">5</strong> tools in one</span>
            </div>
          </div>

          {/* Product mock */}
          <div className="animate-fade-up">
            <HeroMock />
          </div>
        </div>
      </section>

      {/* Modules */}
      <section id="features" className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionHeading
            eyebrow="Platform"
            title="Everything hiring needs, in one place"
            subtitle="A complete ecosystem instead of just another job board."
          />
          <div className="stagger mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {MODULES.map((m) => {
              const Icon = Icons[m.icon];
              return (
                <Card key={m.title} hover className="p-5">
                  <span className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white text-emerald-600">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <h3 className="mt-4 text-sm font-semibold text-slate-900">
                    {m.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">
                    {m.desc}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionHeading
            eyebrow="How it works"
            title="From first click to signed offer"
            subtitle="Three steps for every side of hiring."
          />
          <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-3">
            {STEPS.map((s) => (
              <Card key={s.n} className="p-6">
                <span className="grid h-7 w-7 place-items-center rounded-md bg-emerald-50 text-sm font-semibold text-emerald-700">
                  {s.n}
                </span>
                <h3 className="mt-4 text-base font-semibold text-slate-900">
                  {s.title}
                </h3>
                <p className="mt-1 text-sm text-slate-600">{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section id="employers" className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionHeading
            eyebrow="Built for everyone"
            title="One platform, tailored to each role"
          />
          <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-3">
            {ROLES.map((r) => {
              const Icon = Icons[r.icon];
              return (
                <Card key={r.title} hover className="flex flex-col p-6">
                  <span className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-emerald-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-slate-900">
                    {r.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                    {r.desc}
                  </p>
                  <Link
                    href={r.href}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-emerald-700 hover:gap-2 transition-all"
                  >
                    Get started
                    <Icons.arrowRight className="h-4 w-4" />
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionHeading
            eyebrow="Pricing"
            title="Simple, scalable pricing"
            subtitle="Start free. Upgrade when you grow."
          />
          <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-3">
            {PLANS.map((p) => (
              <Card
                key={p.name}
                className={p.featured ? "border-emerald-500 p-6" : "p-6"}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-900">{p.name}</h3>
                  {p.featured ? (
                    <Badge className="bg-emerald-50 text-emerald-700">Popular</Badge>
                  ) : null}
                </div>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-semibold tracking-tight text-slate-900">
                    {p.price}
                  </span>
                  <span className="text-sm text-slate-500">{p.note}</span>
                </div>
                <ul className="mt-5 space-y-2.5 text-sm text-slate-600">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <Icons.check className="h-4 w-4 text-emerald-600" /> {f}
                    </li>
                  ))}
                </ul>
                <ButtonLink
                  href="/register"
                  variant={p.featured ? "primary" : "secondary"}
                  className="mt-6 w-full"
                >
                  {p.cta}
                </ButtonLink>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Card className="flex flex-col items-center gap-4 px-6 py-14 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Ready to hire smarter?
          </h2>
          <p className="max-w-md text-sm text-slate-600">
            Join TalentFlow today — free to get started, for job seekers and
            employers alike.
          </p>
          <div className="mt-1 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/register" size="lg">
              Create your account
            </ButtonLink>
            <ButtonLink href="/jobs" variant="secondary" size="lg">
              Explore jobs
            </ButtonLink>
          </div>
        </Card>
      </section>

      <SiteFooter />
    </>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
        {title}
      </h2>
      {subtitle ? <p className="mt-2 text-slate-600">{subtitle}</p> : null}
    </div>
  );
}

/* A lightweight, on-brand product preview (ATS pipeline). */
function HeroMock() {
  const cols = [
    { t: "Applied", n: 12, tone: "bg-slate-100 text-slate-600" },
    { t: "Screening", n: 7, tone: "bg-emerald-50 text-emerald-700" },
    { t: "Offer", n: 2, tone: "bg-emerald-600 text-white" },
  ];
  const cands = [
    ["AP", "Aarav Patel", "Frontend Engineer", "92"],
    ["MS", "Meera Shah", "Product Designer", "88"],
    ["RK", "Rohan Kumar", "Backend Engineer", "81"],
  ];
  return (
    <div className="relative">
      <div className="bg-dots absolute -inset-4 -z-10 rounded-2xl" />
      <Card className="overflow-hidden p-0 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
          </div>
          <span className="text-xs font-medium text-slate-500">
            Senior Frontend Engineer · Pipeline
          </span>
          <span className="w-12" />
        </div>
        <div className="grid grid-cols-3 gap-3 p-4">
          {cols.map((c) => (
            <div key={c.t} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-slate-600">{c.t}</span>
                <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${c.tone}`}>
                  {c.n}
                </span>
              </div>
              <div className="h-12 rounded-lg border border-slate-200 bg-slate-50" />
              <div className="h-12 rounded-lg border border-slate-200 bg-slate-50" />
            </div>
          ))}
        </div>
        <div className="border-t border-slate-200 p-4">
          <p className="mb-2 text-[11px] font-medium text-slate-500">Top candidates</p>
          <div className="space-y-2">
            {cands.map(([ini, name, role, score]) => (
              <div
                key={name}
                className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 py-2"
              >
                <span className="grid h-7 w-7 place-items-center rounded-md bg-emerald-50 text-[11px] font-semibold text-emerald-700">
                  {ini}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-slate-900">{name}</p>
                  <p className="truncate text-[11px] text-slate-500">{role}</p>
                </div>
                <span className="rounded-md bg-emerald-600 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                  {score}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
