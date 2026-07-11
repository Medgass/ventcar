import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatNumber, formatPrice, type Vehicle } from "@/lib/vehicles";
import FavoriteButton from "./FavoriteButton";

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <Link
        href={`/vehicules/${vehicle.id}`}
        className="relative block h-44 overflow-hidden bg-slate-100"
      >
        <img
          src={vehicle.img}
          alt={vehicle.name}
          className="h-full w-full object-cover transition duration-500 group-hover:brightness-105"
        />
        {vehicle.badge && (
          <span className="absolute left-3 top-3 rounded-md bg-violet-600 px-2.5 py-1 text-[10px] font-bold tracking-wide text-white shadow">
            {vehicle.badge}
          </span>
        )}
        <span className="absolute right-3 top-3">
          <FavoriteButton vehicleId={vehicle.id} />
        </span>
      </Link>

      {/* Contenu */}
      <div className="p-4">
        <h3 className="text-[0.95rem] font-bold text-slate-900">
          <Link
            href={`/vehicules/${vehicle.id}`}
            className="transition hover:text-violet-600"
          >
            {vehicle.name}
          </Link>
        </h3>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
          <span>{vehicle.year}</span>
          <span className="text-slate-300">•</span>
          <span>{vehicle.fuel}</span>
          <span className="text-slate-300">•</span>
          <span>{formatNumber(vehicle.km)} km</span>
        </p>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-lg font-extrabold tracking-tight text-indigo-950">
            {formatPrice(vehicle.price)}
          </p>
          <Link
            href={`/vehicules/${vehicle.id}`}
            aria-label={`Voir ${vehicle.name}`}
            className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-slate-700 transition hover:border-violet-500 hover:bg-violet-600 hover:text-white"
          >
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
