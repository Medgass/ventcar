import Link from "next/link";
import { ArrowRight, Bus, Car, CarFront } from "lucide-react";
import type { SiteContent } from "@/lib/content";

const icons = [CarFront, Car, CarFront, Bus, Car];

export default function Categories({
  section,
}: {
  section: SiteContent["sectionCategories"];
}) {
  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      {/* En-tête de section */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-[1.75rem]">
          {section.titre}
        </h2>
        <Link
          href="/vehicules"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-violet-600"
        >
          {section.lien}
          <ArrowRight className="h-4 w-4 text-violet-600" />
        </Link>
      </div>

      {/* Cartes */}
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        {section.liste.map((cat, i) => {
          const Icon = icons[i % icons.length];
          return (
            <Link
              key={cat.nom}
              href={`/vehicules?categorie=${encodeURIComponent(cat.nom)}`}
              className="group rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-100 text-violet-600 transition group-hover:bg-violet-600 group-hover:text-white">
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-900">{cat.nom}</p>
                  <p className="text-xs text-slate-400">{cat.nombre}</p>
                </div>
              </div>
              <div className="mt-4 h-20 overflow-hidden rounded-xl bg-slate-50">
                <img
                  src={cat.image}
                  alt={cat.nom}
                  className="h-full w-full object-cover transition duration-500 group-hover:brightness-105"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
