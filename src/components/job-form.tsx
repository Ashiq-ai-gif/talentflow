"use client";

import { useState } from "react";
import { createJob } from "@/lib/actions/jobs";
import { Button, Input, Textarea, Select, Field } from "@/components/ui";
import {
  JOB_TYPES,
  JOB_TYPE_LABELS,
  WORK_MODES,
  WORK_MODE_LABELS,
} from "@/lib/constants";

/**
 * AI Assistance (stub): generates a starter JD client-side from the title.
 * Swap this for a call to your LLM endpoint to make it "smart".
 */
function generate(title: string) {
  const role = title.trim() || "this role";
  return {
    description: `We're looking for a ${role} to join our team. You'll work on impactful projects, collaborate across functions, and help us scale. This is a great opportunity to grow your career while shipping work that matters.`,
    responsibilities: [
      `Own and deliver key initiatives related to ${role}`,
      "Collaborate with cross-functional teams to ship high-quality work",
      "Continuously improve processes, quality, and team velocity",
      "Mentor peers and contribute to a strong engineering/work culture",
    ].join("\n"),
    requirements: [
      `Proven experience relevant to a ${role}`,
      "Strong communication and collaboration skills",
      "A bias for action and ownership",
      "Comfort working in a fast-paced environment",
    ].join("\n"),
  };
}

export function JobForm({ defaultCompany }: { defaultCompany: string }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [resp, setResp] = useState("");
  const [req, setReq] = useState("");

  function runAi() {
    const g = generate(title);
    setDesc(g.description);
    setResp(g.responsibilities);
    setReq(g.requirements);
  }

  return (
    <form action={createJob} className="space-y-5">
      <input type="hidden" name="company_name" value={defaultCompany} />

      <Field label="Job title" htmlFor="title">
        <Input
          id="title"
          name="title"
          required
          placeholder="Senior Frontend Engineer"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Field>

      <div className="flex items-center justify-between rounded-xl bg-indigo-50 px-4 py-3">
        <p className="text-sm text-indigo-700">
          ✨ Let AI draft the description, responsibilities & requirements.
        </p>
        <Button type="button" variant="secondary" size="sm" onClick={runAi}>
          Generate with AI
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Department" htmlFor="department">
          <Input id="department" name="department" placeholder="Engineering" />
        </Field>
        <Field label="Location" htmlFor="location">
          <Input id="location" name="location" placeholder="Bengaluru / Remote" />
        </Field>
        <Field label="Employment type" htmlFor="employment_type">
          <Select id="employment_type" name="employment_type" defaultValue="full_time">
            {JOB_TYPES.map((t) => (
              <option key={t} value={t}>
                {JOB_TYPE_LABELS[t]}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Work mode" htmlFor="work_mode">
          <Select id="work_mode" name="work_mode" defaultValue="onsite">
            {WORK_MODES.map((m) => (
              <option key={m} value={m}>
                {WORK_MODE_LABELS[m]}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Salary min (₹)" htmlFor="salary_min">
          <Input id="salary_min" name="salary_min" type="number" placeholder="800000" />
        </Field>
        <Field label="Salary max (₹)" htmlFor="salary_max">
          <Input id="salary_max" name="salary_max" type="number" placeholder="1500000" />
        </Field>
        <Field label="Min experience (yrs)" htmlFor="experience_min">
          <Input id="experience_min" name="experience_min" type="number" defaultValue={0} />
        </Field>
        <Field label="Vacancies" htmlFor="vacancies">
          <Input id="vacancies" name="vacancies" type="number" defaultValue={1} />
        </Field>
      </div>

      <Field label="Description" htmlFor="description">
        <Textarea id="description" name="description" rows={4} value={desc} onChange={(e) => setDesc(e.target.value)} />
      </Field>
      <Field label="Responsibilities" htmlFor="responsibilities">
        <Textarea id="responsibilities" name="responsibilities" rows={4} value={resp} onChange={(e) => setResp(e.target.value)} />
      </Field>
      <Field label="Requirements" htmlFor="requirements">
        <Textarea id="requirements" name="requirements" rows={4} value={req} onChange={(e) => setReq(e.target.value)} />
      </Field>
      <Field label="Skills required" htmlFor="skills_required" hint="Comma-separated, e.g. React, TypeScript, Node">
        <Input id="skills_required" name="skills_required" placeholder="React, TypeScript, Node" />
      </Field>

      <Button type="submit">Publish job</Button>
    </form>
  );
}
