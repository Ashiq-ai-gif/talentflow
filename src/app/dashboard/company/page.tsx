import { redirect } from "next/navigation";
import { getProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { PageHeader, Card, Button, Input, Textarea, Field, Badge } from "@/components/ui";
import { BADGE_META } from "@/lib/constants";
import { upsertCompany } from "@/lib/actions/company";

export const metadata = { title: "Company" };

export default async function CompanyPage() {
  const profile = (await getProfile())!;
  if (profile.role !== "employer") redirect("/dashboard");
  const supabase = await createClient();

  const { data: company } = await supabase
    .from("companies")
    .select("*")
    .eq("owner_id", profile.id)
    .limit(1)
    .maybeSingle();

  const regBadge =
    company?.business_reg_status === "verified"
      ? BADGE_META.gold
      : BADGE_META.none;

  return (
    <>
      <PageHeader
        title="Company Profile"
        subtitle="A verified company attracts better candidates."
      />
      <Card className="p-6">
        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm text-slate-500">Business registration:</span>
          <Badge className={regBadge.cls}>
            {company?.business_reg_status === "verified"
              ? "Verified"
              : "Unverified"}
          </Badge>
        </div>
        <form action={upsertCompany} className="space-y-4">
          <Field label="Company name" htmlFor="name">
            <Input id="name" name="name" defaultValue={company?.name ?? ""} required />
          </Field>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Industry" htmlFor="industry">
              <Input id="industry" name="industry" defaultValue={company?.industry ?? ""} placeholder="Software" />
            </Field>
            <Field label="Website" htmlFor="website">
              <Input id="website" name="website" defaultValue={company?.website ?? ""} placeholder="https://" />
            </Field>
            <Field label="Employee count" htmlFor="employee_count">
              <Input id="employee_count" name="employee_count" defaultValue={company?.employee_count ?? ""} placeholder="11–50" />
            </Field>
            <Field label="GST number" htmlFor="gst_number" hint="Used for verification.">
              <Input id="gst_number" name="gst_number" defaultValue={company?.gst_number ?? ""} />
            </Field>
          </div>
          <Field label="About the company" htmlFor="description">
            <Textarea id="description" name="description" defaultValue={company?.description ?? ""} rows={4} />
          </Field>
          <Button type="submit">Save company</Button>
        </form>
      </Card>
    </>
  );
}
