import Link from "next/link";
import { getProfile } from "@/lib/auth";
import { SiteHeader, SiteFooter } from "@/components/site";
import { Card, ButtonLink, Badge } from "@/components/ui";

const MODULES = [
  { icon: "🔎", title: "Job Discovery", desc: "Smart search & filters across remote, hybrid, and onsite roles." },
  { icon: "🗂️", title: "Applicant Tracking", desc: "Drag-style pipeline from Applied to Hired with notes & tags." },
  { icon: "🤖", title: "AI Ranking & Screening", desc: "Rank candidates and auto-summarise screening calls." },
  { icon: "🛡️", title: "Verification", desc: "Identity, education & employment checks with badge levels." },
  { icon: "🎯", title: "Assessments", desc: "Coding, aptitude, language & subject tests with auto-eval." },
  { icon: "📅", title: "Interviews", desc: "Scheduling, scorecards, and structured feedback forms." },
  { icon: "🚀", title: "Onboarding", desc: "Offer letters, NDA, documents and training checklists." },
  { icon: "📊", title: "Analytics", desc: "Hiring funnel, time-to-hire, cost-per-hire & source analysis." },
];

const ROLES = [
  { title: "Job Seekers", desc: "Build a verified profile, get a Career Score, and track every application.", href: "/register?role=job_seeker" },
  { title: "Employers", desc: "Post jobs with AI assistance and run a full ATS from screen to hire.", href: "/register?role=employer" },
  { title: "Recruiters", desc: "Source and recommend candidates, track placements, earn commission.", href: "/register?role=recruiter" },
];

const PLANS = [
  { name: "Free", price: "₹0", features: ["Limited job posts", "Limited applications", "Basic profile"], cta: "Start free", featured: false },
  { name: "Professional", price: "₹4,999/mo", features: ["Unlimited jobs", "Full ATS access", "Analytics dashboard"], cta: "Go Professional", featured: true },
  { name: "Enterprise", price: "Custom", features: ["AI hiring suite", "Custom branding", "Dedicated support"], cta: "Contact sales", featured: false },
];

export default async function Home() {
  const profile = await getProfile();
  return (
    <>
      <SiteHeader authed={!!profile} />

      {/* Hero */}
      <section className="gradient-hero">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <Badge className="bg-indigo-100 text-indigo-700">
            Smart Hiring &amp; Recruitment Platform
          </Badge>
          <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Hiring, <span className="text-gradient">made smart</span>.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
            TalentFlow is a complete hiring ecosystem — recruitment, applicant
            tracking, verification, AI screening, interviews, onboarding and
            analytics, in one platform.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/register" size="md">
              Get started — it&apos;s free
            </ButtonLink>
            <ButtonLink href="/jobs" variant="secondary" size="md">
              Browse jobs
            </ButtonLink>
          </div>
          <p className="mt-4 text-xs text-slate-500">
            For job seekers, employers, and recruiters.
          </p>
        </div>
      </section>

      {/* Modules */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Everything hiring needs, in one place
          </h2>
          <p className="mt-2 text-slate-600">
            A complete ecosystem instead of just another job board.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MODULES.map((m) => (
            <Card key={m.title} hover className="p-5">
              <div className="text-2xl">{m.icon}</div>
              <h3 className="mt-3 text-base font-semibold text-slate-900">
                {m.title}
              </h3>
              <p className="mt-1 text-sm text-slate-500">{m.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Roles */}
      <section id="employers" className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              Built for every side of hiring
            </h2>
            <p className="mt-2 text-slate-600">
              One platform, tailored experiences.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {ROLES.map((r) => (
              <Card key={r.title} className="flex flex-col p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  {r.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-slate-600">{r.desc}</p>
                <Link
                  href={r.href}
                  className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                >
                  Join as {r.title.toLowerCase()} →
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Simple, scalable pricing
          </h2>
          <p className="mt-2 text-slate-600">Start free. Upgrade when you grow.</p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {PLANS.map((p) => (
            <Card key={p.name} className={p.featured ? "p-6 ring-2 ring-indigo-500" : "p-6"}>
              {p.featured ? (
                <Badge className="bg-indigo-100 text-indigo-700">Most popular</Badge>
              ) : null}
              <h3 className="mt-2 text-lg font-semibold text-slate-900">{p.name}</h3>
              <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                {p.price}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-emerald-600">✓</span> {f}
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
      </section>

      <SiteFooter />
    </>
  );
}
