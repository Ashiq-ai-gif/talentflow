"use client";

import { useRef } from "react";
import { updateApplicationStatus } from "@/lib/actions/jobs";
import { APPLICATION_STAGES, STAGE_LABELS } from "@/lib/constants";

/** Stage dropdown that submits the server action on change. */
export function StageSelect({
  applicationId,
  current,
}: {
  applicationId: string;
  current: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <form action={updateApplicationStatus} ref={formRef}>
      <input type="hidden" name="application_id" value={applicationId} />
      <select
        name="status"
        defaultValue={current}
        onChange={() => formRef.current?.requestSubmit()}
        className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs font-medium text-slate-700 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        aria-label="Move stage"
      >
        {APPLICATION_STAGES.map((s) => (
          <option key={s} value={s}>
            {STAGE_LABELS[s]}
          </option>
        ))}
        <option value="withdrawn">{STAGE_LABELS.withdrawn}</option>
      </select>
    </form>
  );
}
