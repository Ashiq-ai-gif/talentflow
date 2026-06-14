import Link from "next/link";
import { Badge } from "@/components/ui";
import { STAGE_LABELS, STAGE_COLORS, MATCH_LABELS } from "@/lib/constants";

/** TalentFlow mark — solid emerald tile with a simple flow glyph. */
export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <span
      className="grid place-items-center rounded-md bg-emerald-600"
      style={{ width: size, height: size }}
    >
      <svg
        width={size * 0.62}
        height={size * 0.62}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path d="M5 7h14M5 12h9M5 17h5" stroke="white" strokeWidth={2.4} strokeLinecap="round" />
      </svg>
    </span>
  );
}

/** Wordmark + mark. `light` flips the wordmark to white for dark surfaces. */
export function Logo({
  href = "/",
  light = false,
  size = 28,
}: {
  href?: string;
  light?: boolean;
  size?: number;
}) {
  return (
    <Link href={href} className="inline-flex items-center gap-2">
      <LogoMark size={size} />
      <span
        className={cnText(light)}
      >
        TalentFlow
      </span>
    </Link>
  );
}

function cnText(light: boolean) {
  return light
    ? "text-[17px] font-semibold tracking-tight text-white"
    : "text-[17px] font-semibold tracking-tight text-slate-900";
}

/** Application-stage chip. */
export function PipelineBadge({ status }: { status: string }) {
  return (
    <Badge className={STAGE_COLORS[status] ?? "bg-slate-100 text-slate-600"}>
      {STAGE_LABELS[status] ?? status}
    </Badge>
  );
}

const MATCH_CLS: Record<string, string> = {
  best: "bg-emerald-50 text-emerald-700",
  good: "bg-sky-50 text-sky-700",
  average: "bg-amber-50 text-amber-700",
  poor: "bg-rose-50 text-rose-700",
};

export function MatchBadge({ band, score }: { band: string; score?: number }) {
  return (
    <Badge className={MATCH_CLS[band] ?? "bg-slate-100 text-slate-600"}>
      {MATCH_LABELS[band] ?? band}
      {typeof score === "number" ? ` · ${score}` : ""}
    </Badge>
  );
}
