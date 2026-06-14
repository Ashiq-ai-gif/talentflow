import Link from "next/link";
import { Badge } from "@/components/ui";
import { STAGE_LABELS, STAGE_COLORS, MATCH_LABELS } from "@/lib/constants";

/** TalentFlow wordmark + monogram. */
export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2">
      <span className="grid h-8 w-8 place-items-center rounded-xl bg-indigo-600 text-sm font-bold text-white">
        TF
      </span>
      <span className="text-lg font-semibold tracking-tight text-slate-900">
        Talent<span className="text-gradient">Flow</span>
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
