import Link from "next/link";
import { getProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { SiteHeader, SiteFooter } from "@/components/site";
import { Card, ButtonLink, Badge } from "@/components/ui";
import { Icons, type IconName } from "@/components/icons";

const MODULES: { icon: IconName; title: string; desc: string }[] = [
  { icon: "search", title: "Job Discovery", desc: "Smart search & filters across remote, hybrid, and onsite roles." },
  { icon: "folder", title: "Applicant Tracking", desc: "A pipeline from Applied to Hired with notes, tags & ratings." },
  { icon: "sparkles", title: "AI Ranking & Screening", desc: "Rank candidates and auto-summarise screening calls." },
  { icon: "shield", title: "Verification", desc: "Identity, education & employment checks with badge levels." },
  { icon: "bolt", title: "Assessments", desc: "Coding, aptitude, language & subject tests with auto-eval." },
  { icon: "calendar", title: "Interviews", desc: "Scheduling, scorecards, and structured feedback forms." },
  { icon: "rocket", title: "Onboarding", desc: "Offer letters, NDA, documents and training checklists." },
  { icon: "chart", title: "Analytics", desc: "Hiring funnel, time-to-hire, cost-per-hire & source analysis." },
];

const ROLES: { icon: IconName; title: string; desc: string; href: string }[] = [
  { icon: "user", title: "Job Seekers", desc: "Build a verified profile, get a Career Score, and track every application in real time.", href: "/register?role=job_seeker" },
  { icon: "briefcase", title: "Employers", desc: "Post jobs with AI assistance and run a full ATS from first screen to signed offer.", href: "/register?role=employer" },
  { icon: "handshake", title: "Recruiters", desc: "Source and recommend candidates, track placements, and earn commission.", href: "/register?role=recruiter" },
];

const STEPS = [
  { n: "01", title: "Create your profile", desc: "Sign up in seconds and pick your role — seeker, employer, or recruiter." },
  { n: "02", title: "Match & apply", desc: "Discover roles or candidates with AI-powered ranking and one-click apply." },
  { n: "03", title: "Hire & onboard", desc: "Move through the pipeline, interview, make an offer, and onboard — all in one place." },
];

const PLANS = [
  { name: "Free", price: "₹0", note: "For getting started", features: ["Limited job posts", "Limited applications", "Basic profile"], cta: "Start free", featured: false },
  { name: "Professional", price: "₹4,999", note: "per month", features: ["Unlimited jobs", "Full ATS access", "Analytics dashboard", "AI candidate ranking"], cta: "Go Professional", featured: true },
  { name: "Enterprise", price: "Custom", note: "For scale", features: ["AI hiring suite", "Custom branding", "Dedicated support", "SSO & audit logs"], cta: "Contact sales", featured: false },
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
      <section className="gradient-hero relative overflow-hidden">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <div className="animate-fade-up inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-100 backdrop-blur">
            <Icons.sparkles className="h-3.5 w-3.5" />
            Smart Hiring &amp; Recruitment Platform
          </div>
          <h1 className="animate-fade-up mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
            Hiring, <span className="text-gradient">made smart</span>.
          </h1>
          <p className="animate-fade-up mx-auto mt-5 max-w-2xl text-lg text-slate-600">
            A complete hiring ecosystem — recruitment, applicant tracking,
            verification, AI screening, interviews, onboarding and analytics — in
            one beautifully simple platform.
          </p>
          <div className="animate-fade-up mt-9 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/register" size="lg">
              Get started — it&apos;s free
              <Icons.arrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/jobs" variant="secondary" size="lg">
              <Icons.search className="h-4 w-4" />
              Browse jobs
            </ButtonLink>
          </div>

          {/* Stat band */}
          <div className="animate-fade-up mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-4">
            {[
              { v: `${jobCount ?? 0}+`, l: "Open roles" },
              { v: `${companyCount ?? 0}+`, l: "Companies hiring" },
              { v: "5", l: "Tools in one" },
            ].map((s) => (
              <div key={s.l} className="glass rounded-2xl px-4 py-5 ring-1 ring-white/60">
                <p className="text-2xl font-bold text-slate-900">{s.v}</p>
                <p className="text-xs text-slate-500">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Platform"
          title="Everything hiring needs, in one place"
          subtitle="A complete ecosystem instead of just another job board."
        />
        <div className="stagger mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MODULES.map((m) => {
            const Icon = Icons[m.icon];
            return (
              <Card key={m.title} hover className="p-5">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-slate-900">
                  {m.title}
                </h3>
                <p className="mt-1 text-sm text-slate-500">{m.desc}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading
            eyebrow="How it works"
            title="From first click to signed offer"
            subtitle="Three simple steps for every side of hiring."
          />
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            {STEPS.map((s) => (
              <Card key={s.n} className="relative p-6">
                <span className="text-4xl font-bold text-gradient">{s.n}</span>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">
                  {s.title}
                </h3>
                <p className="mt-1 text-sm text-slate-600">{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section id="employers" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Built for everyone"
          title="One platform, tailored experiences"
          subtitle="Whether you're searching, hiring, or placing talent."
        />
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {ROLES.map((r) => {
            const Icon = Icons[r.icon];
            return (
              <Card key={r.title} hover className="flex flex-col p-6">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-brand">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  {r.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-slate-600">{r.desc}</p>
                <Link
                  href={r.href}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:gap-2 hover:text-indigo-700"
                >
                  Join as {r.title.toLowerCase()}
                  <Icons.arrowRight className="h-4 w-4" />
                </Link>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading
            eyebrow="Pricing"
            title="Simple, scalable pricing"
            subtitle="Start free. Upgrade when you grow."
          />
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            {PLANS.map((p) => (
              <Card
                key={p.name}
                className={p.featured ? "relative p-6 ring-2 ring-indigo-500" : "p-6"}
              >
                {p.featured ? (
                  <span className="absolute -top-3 left-6">
                    <Badge className="bg-indigo-600 text-white">Most popular</Badge>
                  </span>
                ) : null}
                <h3 className="text-lg font-semibold text-slate-900">{p.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-bold tracking-tight text-slate-900">
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
      <section className="px-4 py-20 sm:px-6">
        <div className="gradient-brand relative mx-auto max-w-6xl overflow-hidden rounded-3xl px-6 py-16 text-center shadow-brand">
          <div className="bg-grid absolute inset-0 opacity-20" />
          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to hire smarter?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-indigo-100">
              Join TalentFlow today — it&apos;s free to get started, for job
              seekers and employers alike.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/register" variant="secondary" size="lg">
                Create your account
              </ButtonLink>
              <ButtonLink
                href="/jobs"
                size="lg"
                className="bg-white/10 text-white ring-1 ring-white/30 hover:bg-white/20 shadow-none"
              >
                Explore jobs
              </ButtonLink>
            </div>
          </div>
        </div>
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
  subtitle: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
        {title}
      </h2>
      <p className="mt-2 text-slate-600">{subtitle}</p>
    </div>
  );
}
