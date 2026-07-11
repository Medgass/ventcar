"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Car,
  Globe,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  PenSquare,
  Settings,
} from "lucide-react";
import Logo from "@/components/Logo";
import { messages } from "@/lib/admin";

const navItems = [
  { label: "Tableau de bord", href: "/admin", icon: LayoutDashboard },
  { label: "Contenu du site", href: "/admin/contenu", icon: PenSquare },
  { label: "Véhicules", href: "/admin/vehicules", icon: Car },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
  { label: "Paramètres", href: "/admin/parametres", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const unread = messages.filter((m) => m.unread).length;

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-white/10 bg-[#151030] text-white md:min-h-screen md:w-64 md:border-b-0">
      {/* Logo */}
      <Link href="/admin" className="flex items-center gap-2.5 px-5 py-5">
        <Logo className="h-9 w-11" />
        <div className="leading-tight">
          <p className="text-base font-extrabold tracking-tight">
            AUTO{" "}
            <span className="bg-gradient-to-r from-fuchsia-400 to-orange-400 bg-clip-text text-transparent">
              VENTE
            </span>
          </p>
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-white/40">
            Administration
          </p>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-1 md:flex-col md:overflow-visible md:pb-0 md:pt-2">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-fuchsia-900/40"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon className="h-[18px] w-[18px]" strokeWidth={1.9} />
              <span className="whitespace-nowrap">{item.label}</span>
              {item.label === "Messages" && unread > 0 && (
                <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-full bg-pink-500 px-1.5 text-[10px] font-bold">
                  {unread}
                </span>
              )}
            </Link>
          );
        })}
        {/* Déconnexion (mobile) */}
        <button
          type="button"
          onClick={logout}
          className="flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/60 transition hover:bg-white/5 hover:text-white md:hidden"
        >
          <LogOut className="h-[18px] w-[18px]" strokeWidth={1.9} />
          Déconnexion
        </button>
      </nav>

      {/* Pied de sidebar */}
      <div className="hidden border-t border-white/10 p-4 md:block">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-white/60 transition hover:bg-white/5 hover:text-white"
        >
          <Globe className="h-[18px] w-[18px]" strokeWidth={1.9} />
          Retour au site
        </Link>
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-white/60 transition hover:bg-white/5 hover:text-white"
        >
          <LogOut className="h-[18px] w-[18px]" strokeWidth={1.9} />
          Déconnexion
        </button>
        <div className="mt-3 flex items-center gap-3 rounded-xl bg-white/5 p-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xs font-bold">
            AV
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold">Admin</p>
            <p className="text-[11px] text-white/40">Espace sécurisé</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
