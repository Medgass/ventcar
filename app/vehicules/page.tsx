import type { Metadata } from "next";
import Link from "next/link";
import { SearchX } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import SearchCard from "@/components/SearchCard";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import VehicleCard from "@/components/VehicleCard";
import { readContent } from "@/lib/content";
import { brandsOf, categoryNames, modelsOf } from "@/lib/vehicles";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Nos véhicules — Auto Vente",
  description:
    "Parcourez tous nos véhicules vérifiés : citadines, berlines, SUV, utilitaires et sportives.",
};

type SearchParams = { [key: string]: string | string[] | undefined };

function param(sp: SearchParams, key: string): string {
  const v = sp[key];
  return typeof v === "string" ? v : "";
}

export default async function VehiculesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const marque = param(sp, "marque");
  const modele = param(sp, "modele");
  const prix = param(sp, "prix");
  const annee = param(sp, "annee");
  const categorie = param(sp, "categorie");

  const content = await readContent();
  const vehicles = content.vehicules;

  const results = vehicles.filter(
    (v) =>
      (!marque || v.brand === marque) &&
      (!modele || v.model === modele) &&
      (!prix || v.price <= Number(prix)) &&
      (!annee || v.year >= Number(annee)) &&
      (!categorie || v.category === categorie)
  );

  return (
    <>
      <SiteHeader />
      <main>
        <PageHeader
          title={content.pageVehicules.titre}
          highlight={content.pageVehicules.motDegrade}
          subtitle={content.pageVehicules.sousTitre}
        />

        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
          {/* Filtres */}
          <SearchCard
            brands={brandsOf(vehicles)}
            models={modelsOf(vehicles)}
            defaults={{ marque, modele, prix, annee, categorie }}
          />

          {/* Catégories */}
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <Link
              href="/vehicules"
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                !categorie
                  ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-violet-300 hover:text-violet-600"
              }`}
            >
              Toutes
            </Link>
            {categoryNames.map((cat) => (
              <Link
                key={cat}
                href={`/vehicules?categorie=${encodeURIComponent(cat)}`}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  categorie === cat
                    ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-violet-300 hover:text-violet-600"
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>

          {/* Résultats */}
          <p className="mt-6 text-sm text-slate-500">
            <span className="font-bold text-slate-900">{results.length}</span>{" "}
            véhicule{results.length > 1 ? "s" : ""} trouvé
            {results.length > 1 ? "s" : ""}
          </p>

          {results.length > 0 ? (
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {results.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 px-6 py-16 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-violet-50 text-violet-500">
                <SearchX className="h-6 w-6" />
              </span>
              <p className="mt-4 font-bold text-slate-900">
                Aucun véhicule ne correspond à votre recherche
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Essayez d&apos;élargir vos critères ou de réinitialiser les
                filtres.
              </p>
              <Link
                href="/vehicules"
                className="mt-6 inline-block rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:opacity-90"
              >
                Réinitialiser les filtres
              </Link>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
