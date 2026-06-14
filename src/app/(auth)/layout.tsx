import { Logo } from "@/components/brand";
import { Card } from "@/components/ui";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="gradient-hero flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="mb-6">
        <Logo />
      </div>
      <Card className="w-full max-w-md p-7">{children}</Card>
      <p className="mt-6 text-xs text-slate-500">
        Hiring, made smart. © {new Date().getFullYear()} TalentFlow.
      </p>
    </main>
  );
}
