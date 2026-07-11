"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import type { Vehicle } from "@/lib/vehicles";
import { useFavorites } from "./FavoritesProvider";
import VehicleCard from "./VehicleCard";

export default function FavorisList({ vehicles }: { vehicles: Vehicle[] }) {
  const { favorites } = useFavorites();
  const list = vehicles.filter((v) => favorites.includes(v.id));

  if (list.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 px-6 py-16 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-pink-50 text-pink-500">
          <Heart className="h-6 w-6" />
        </span>
        <p className="mt-4 font-bold text-slate-900">
          Aucun favori pour le moment
        </p>
        <p className="mt-1 text-sm text-slate-500">
          Cliquez sur le cœur d&apos;un véhicule pour l&apos;ajouter à vos
          favoris.
        </p>
        <Link
          href="/vehicules"
          className="mt-6 inline-block rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:opacity-90"
        >
          Parcourir les véhicules
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {list.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
}
