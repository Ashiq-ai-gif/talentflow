import { signOut } from "@/lib/actions/auth";
import { Icons } from "@/components/icons";

export function SignOutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-rose-300"
      >
        <Icons.logout className="h-5 w-5" />
        Sign out
      </button>
    </form>
  );
}
