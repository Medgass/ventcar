import Link from "next/link";
import { ArrowRight, Phone, Star } from "lucide-react";
import type { SiteContent } from "@/lib/content";
import Logo from "./Logo";
import SearchCard from "./SearchCard";

const clientAvatars = [
  { initials: "AK", gradient: "from-violet-500 to-fuchsia-500" },
  { initials: "SM", gradient: "from-sky-500 to-indigo-500" },
  { initials: "YB", gradient: "from-orange-400 to-rose-500" },
];

export default function Hero({
  hero,
  identite,
  brands,
  models,
}: {
  hero: SiteContent["hero"];
  identite: SiteContent["identite"];
  brands: string[];
  models: string[];
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-slate-50/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-6 pt-6 lg:grid-cols-[0.95fr_1.15fr] lg:gap-2">
          {/* Texte */}
          <div className="pb-4 pt-6 lg:py-10">
            <h1 className="text-4xl font-extrabold leading-[1.12] tracking-tight text-slate-900 sm:text-5xl xl:text-[3.4rem]">
              {hero.titreLigne1}
              <br />
              {hero.titreLigne2}{" "}
              <span className="bg-gradient-to-r from-fuchsia-500 to-red-500 bg-clip-text text-transparent">
                {hero.motDegrade}
              </span>
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-slate-500">
              {hero.sousTitre}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/vehicules"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/30 transition hover:opacity-90"
              >
                {hero.boutonPrincipal}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
              >
                <Phone className="h-4 w-4" />
                {hero.boutonSecondaire}
              </Link>
            </div>

            {/* Preuve sociale */}
            <div className="mt-9 flex items-center gap-4">
              <div className="flex -space-x-3">
                {clientAvatars.map((c) => (
                  <span
                    key={c.initials}
                    className={`grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br ${c.gradient} text-xs font-bold text-white ring-2 ring-white`}
                  >
                    {c.initials}
                  </span>
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">{hero.clients}</p>
                <p className="mt-0.5 flex items-center gap-1.5">
                  <span className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    {hero.note}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src={hero.image}
              alt="Voiture mise en avant"
              className="w-full select-none"
            />
            <span className="absolute left-[56%] top-[63%] hidden items-center gap-1.5 rounded-full bg-slate-900/90 py-1 pl-1.5 pr-3 shadow-lg lg:flex">
              <Logo className="h-4 w-5" src={identite.logo} />
              <span className="text-[9px] font-bold tracking-wider text-white">
                {identite.nomPartie1} {identite.nomPartie2}
              </span>
            </span>
          </div>
        </div>

        {/* Carte de recherche flottante */}
        <SearchCard brands={brands} models={models} />
      </div>
    </section>
  );
}
