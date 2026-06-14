import { signOut } from "@/lib/actions/auth";
import { Icons } from "@/components/icons";

export function SignOutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-rose-600"
      >
        <Icons.logout className="h-[18px] w-[18px] text-slate-400" />
        Sign out
      </button>
    </form>
  );
}
