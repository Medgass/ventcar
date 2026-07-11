import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Vehicle } from "@/lib/vehicles";
import VehicleCard from "./VehicleCard";

export default function Featured({
  titre,
  lien,
  vehicles,
}: {
  titre: string;
  lien: string;
  vehicles: Vehicle[];
}) {
  return (
    <section id="vehicules" className="mx-auto max-w-7xl px-4 pb-6 pt-16 sm:px-6">
      {/* En-tête de section */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-[1.75rem]">
            {titre}
          </h2>
          <span className="mt-2 block h-[3px] w-14 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500" />
        </div>
        <Link
          href="/vehicules"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-violet-600"
        >
          {lien}
          <ArrowRight className="h-4 w-4 text-violet-600" />
        </Link>
      </div>

      {/* Cartes */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {vehicles.slice(0, 4).map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </section>
  );
}
