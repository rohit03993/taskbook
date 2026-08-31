import { LoginForm } from "@/app/admin/LoginForm";
import { isAdmin } from "@/lib/admin-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export const metadata = { title: "Admin login", robots: { index: false, follow: false } };

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-5 py-16">
      <div className="w-full max-w-md rounded-[1.6rem] bg-white p-8 ring-1 ring-navy-900/[0.06]">
        <span className="relative block h-14 w-14">
          <Image src="/logos/taskbook-icon.png" alt="" fill sizes="56px" className="object-contain" />
        </span>
        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-navy-600">Task Book</p>
        <h1 className="mt-3 font-display text-3xl text-navy-900">Staff login</h1>
        <p className="mt-2 text-sm text-navy-700">Staff phone and password. Only for Task Book people.</p>
        <LoginForm />
      </div>
    </div>
  );
}
