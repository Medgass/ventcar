"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, User, X } from "lucide-react";
import Logo from "./Logo";
import { useFavorites } from "./FavoritesProvider";

export type HeaderProps = {
  identite: {
    nomPartie1: string;
    nomPartie2: string;
    slogan: string;
    logo: string;
  };
  menu: { label: string; lien: string }[];
  boutonAnnonce: string;
};

export default function Header({ identite, menu, boutonAnnonce }: HeaderProps) {
  const pathname = usePathname();
  const { favorites } = useFavorites();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Logo className="h-10 w-12 sm:h-11 sm:w-14" src={identite.logo} />
          <div className="leading-tight">
            <p className="text-lg font-extrabold tracking-tight sm:text-[1.35rem]">
              <span className="text-slate-900">{identite.nomPartie1}</span>{" "}
              <span className="bg-gradient-to-r from-fuchsia-600 to-red-500 bg-clip-text text-transparent">
                {identite.nomPartie2}
              </span>
            </p>
            <p className="hidden text-[0.7rem] text-slate-500 sm:block">
              {identite.slogan}
            </p>
          </div>
        </Link>

        {/* Navigation desktop */}
        <nav className="hidden items-center gap-8 lg:flex">
          {menu.map((item) => (
            <Link
              key={item.label}
              href={item.lien}
              className={`relative text-sm font-medium transition-colors ${
                isActive(item.lien)
                  ? "font-semibold text-slate-900"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {item.label}
              {isActive(item.lien) && (
                <span className="absolute -bottom-2 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-rose-500" />
              )}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/favoris"
            aria-label="Mes favoris"
            className="relative grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-fuchsia-300 hover:text-fuchsia-600 sm:h-11 sm:w-11"
          >
            <Heart className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 grid h-[18px] w-[18px] place-items-center rounded-full bg-pink-500 text-[10px] font-bold leading-none text-white">
              {favorites.length}
            </span>
          </Link>
          <Link
            href="/admin"
            aria-label="Espace admin"
            className="hidden h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-violet-300 hover:text-violet-600 sm:grid"
          >
            <User className="h-5 w-5" />
          </Link>
          <Link
            href="/deposer-annonce"
            className="hidden rounded-xl bg-gradient-to-r from-fuchsia-600 via-rose-500 to-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/25 transition hover:opacity-90 lg:block"
          >
            {boutonAnnonce}
          </Link>
          {/* Bouton menu mobile */}
          <button
            type="button"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {open && (
        <nav className="border-t border-slate-100 bg-white px-4 pb-5 pt-3 shadow-xl lg:hidden">
          <div className="flex flex-col gap-1">
            {menu.map((item) => (
              <Link
                key={item.label}
                href={item.lien}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  isActive(item.lien)
                    ? "bg-violet-50 text-violet-700"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Espace admin
            </Link>
            <Link
              href="/deposer-annonce"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-xl bg-gradient-to-r from-fuchsia-600 via-rose-500 to-orange-500 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/25"
            >
              {boutonAnnonce}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
