import Link from "next/link";
import { redirect } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import LoginForm from "@/components/admin/LoginForm";
import Logo from "@/components/Logo";
import { readContent } from "@/lib/content";
import { isAdmin } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect("/admin");
  const content = await readContent();

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#151030] px-4 py-10">
      {/* Halos décoratifs */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-600/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-fuchsia-600/25 blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="rounded-3xl border border-white/10 bg-white p-8 shadow-2xl sm:p-10">
          <div className="flex flex-col items-center text-center">
            <Logo className="h-16 w-20" src={content.identite.logo} />
            <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900">
              Espace{" "}
              <span className="bg-gradient-to-r from-fuchsia-600 to-red-500 bg-clip-text text-transparent">
                administration
              </span>
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">
              Connectez-vous pour gérer 100% du contenu de votre site.
            </p>
          </div>

          <div className="mt-8">
            <LoginForm />
          </div>

          <div className="mt-6 rounded-xl bg-violet-50 px-4 py-3 text-center text-xs text-violet-700">
            <p className="font-bold">Accès de démonstration</p>
            <p className="mt-0.5">
              admin@autovente.tn — mot de passe : admin123
            </p>
          </div>
        </div>

        <Link
          href="/"
          className="mt-6 flex items-center justify-center gap-1.5 text-sm font-medium text-white/70 transition hover:text-white"
        >
          <ChevronLeft className="h-4 w-4" />
          Retour au site
        </Link>
      </div>
    </main>
  );
}
