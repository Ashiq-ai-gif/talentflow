import Link from "next/link";
import { Badge } from "@/components/ui";
import { STAGE_LABELS, STAGE_COLORS, MATCH_LABELS } from "@/lib/constants";

/** TalentFlow logo mark — a flow glyph in a gradient tile. */
export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <span
      className="grid place-items-center rounded-xl shadow-brand"
      style={{
        width: size,
        height: size,
        background: "linear-gradient(135deg,#6366f1,#8b5cf6 55%,#10b981)",
      }}
    >
      <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 7h16M4 12h10M4 17h6"
          stroke="white"
          strokeWidth={2.4}
          strokeLinecap="round"
        />
        <circle cx="18.5" cy="15.5" r="2.4" stroke="white" strokeWidth={2.2} />
      </svg>
    </span>
  );
}

/** TalentFlow wordmark + mark. Set `light` on dark backgrounds. */
export function Logo({
  href = "/",
  light = false,
  size = 32,
}: {
  href?: string;
  light?: boolean;
  size?: number;
}) {
  return (
    <Link href={href} className="inline-flex items-center gap-2.5">
      <LogoMark size={size} />
      <span
        className={
          light
            ? "text-lg font-semibold tracking-tight text-white"
            : "text-lg font-semibold tracking-tight text-slate-900"
        }
      >
        Talent
        <span className={light ? "text-emerald-300" : "text-gradient"}>Flow</span>
      </span>
    </Link>
  );
}

/** Application-stage chip mapped to the brand status palette. */
export function PipelineBadge({ status }: { status: string }) {
  return (
    <Badge className={STAGE_COLORS[status] ?? "bg-slate-100 text-slate-700"}>
      {STAGE_LABELS[status] ?? status}
    </Badge>
  );
}

const MATCH_CLS: Record<string, string> = {
  best: "bg-emerald-100 text-emerald-700",
  good: "bg-sky-100 text-sky-700",
  average: "bg-amber-100 text-amber-700",
  poor: "bg-rose-100 text-rose-700",
};

export function MatchBadge({ band, score }: { band: string; score?: number }) {
  return (
    <Badge className={MATCH_CLS[band] ?? "bg-slate-100 text-slate-700"}>
      {MATCH_LABELS[band] ?? band}
      {typeof score === "number" ? ` · ${score}` : ""}
    </Badge>
  );
}
