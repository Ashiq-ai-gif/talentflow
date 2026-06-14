export type Role =
  | "job_seeker"
  | "employer"
  | "recruiter"
  | "admin"
  | "super_admin";

export const ROLE_LABELS: Record<Role, string> = {
  job_seeker: "Job Seeker",
  employer: "Employer",
  recruiter: "Recruiter",
  admin: "Admin",
  super_admin: "Super Admin",
};

export const APPLICATION_STAGES = [
  "applied",
  "viewed",
  "screening",
  "shortlisted",
  "interview_scheduled",
  "offer_sent",
  "hired",
  "rejected",
] as const;

export const STAGE_LABELS: Record<string, string> = {
  applied: "Applied",
  viewed: "Viewed",
  screening: "Screening",
  shortlisted: "Shortlisted",
  interview_scheduled: "Interview",
  offer_sent: "Offer Sent",
  hired: "Hired",
  rejected: "Rejected",
  withdrawn: "Withdrawn",
};

export const STAGE_COLORS: Record<string, string> = {
  applied: "bg-slate-100 text-slate-700",
  viewed: "bg-sky-100 text-sky-700",
  screening: "bg-indigo-100 text-indigo-700",
  shortlisted: "bg-violet-100 text-violet-700",
  interview_scheduled: "bg-amber-100 text-amber-700",
  offer_sent: "bg-emerald-100 text-emerald-700",
  hired: "bg-green-100 text-green-700",
  rejected: "bg-rose-100 text-rose-700",
  withdrawn: "bg-gray-100 text-gray-500",
};

export const JOB_TYPES = [
  "full_time",
  "part_time",
  "internship",
  "contract",
  "freelance",
] as const;

export const JOB_TYPE_LABELS: Record<string, string> = {
  full_time: "Full Time",
  part_time: "Part Time",
  internship: "Internship",
  contract: "Contract",
  freelance: "Freelance",
};

export const WORK_MODES = ["remote", "hybrid", "onsite"] as const;
export const WORK_MODE_LABELS: Record<string, string> = {
  remote: "Remote",
  hybrid: "Hybrid",
  onsite: "Onsite",
};

export const BADGE_META: Record<string, { label: string; cls: string }> = {
  none: { label: "Unverified", cls: "bg-gray-100 text-gray-500" },
  bronze: { label: "Bronze Verified", cls: "bg-amber-100 text-amber-800" },
  silver: { label: "Silver Verified", cls: "bg-slate-200 text-slate-700" },
  gold: { label: "Gold Verified", cls: "bg-yellow-100 text-yellow-800" },
};

export function matchBand(score: number): "best" | "good" | "average" | "poor" {
  if (score >= 80) return "best";
  if (score >= 60) return "good";
  if (score >= 40) return "average";
  return "poor";
}

export const MATCH_LABELS: Record<string, string> = {
  best: "Best Match",
  good: "Good Match",
  average: "Average Match",
  poor: "Poor Match",
};
