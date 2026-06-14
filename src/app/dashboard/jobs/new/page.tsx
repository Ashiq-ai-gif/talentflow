import { redirect } from "next/navigation";
import { getProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { PageHeader, Card } from "@/components/ui";
import { JobForm } from "@/components/job-form";

export const metadata = { title: "Post a Job" };

export default async function NewJobPage() {
  const profile = (await getProfile())!;
  if (profile.role !== "employer") redirect("/dashboard");
  const supabase = await createClient();
  const { data: company } = await supabase
    .from("companies")
    .select("name")
    .eq("owner_id", profile.id)
    .limit(1)
    .maybeSingle();

  return (
    <>
      <PageHeader
        title="Post a Job"
        subtitle="Fill the details — or let AI draft them for you."
      />
      <Card className="p-6">
        <JobForm defaultCompany={company?.name ?? profile.full_name ?? "My Company"} />
      </Card>
    </>
  );
}
