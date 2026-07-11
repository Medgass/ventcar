"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, Pencil, Search, Trash2 } from "lucide-react";
import { formatNumber, formatPrice, type Vehicle } from "@/lib/vehicles";
import StatusBadge from "./StatusBadge";

export default function VehiclesTable({ vehicles }: { vehicles: Vehicle[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState("");

  const q = query.trim().toLowerCase();
  const filtered = vehicles.filter(
    (v) =>
      (!q ||
        `${v.name} ${v.brand} ${v.model} ${v.category}`
          .toLowerCase()
          .includes(q)) &&
      (!statusFilter || (v.status ?? "Disponible") === statusFilter)
  );

  async function remove(v: Vehicle) {
    if (!window.confirm(`Supprimer « ${v.name} » ? Cette action est définitive.`)) {
      return;
    }
    setDeleting(v.id);
    setError("");
    try {
      const res = await fetch(`/api/admin/vehicles/${v.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
      } else {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Suppression impossible.");
      }
    } catch {
      setError("Erreur réseau, réessayez.");
    }
    setDeleting(null);
  }

  return (
    <div>
      {/* Barre d'outils */}
      <div className="flex flex-wrap items-center gap-3">
        <label className="relative min-w-56 flex-1 sm:max-w-sm">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher (nom, marque, catégorie…)"
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
          />
        </label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
        >
          <option value="">Tous les statuts</option>
          <option>Disponible</option>
          <option>Réservé</option>
          <option>Vendu</option>
        </select>
        <p className="text-sm text-slate-500">
          <span className="font-bold text-slate-900">{filtered.length}</span>{" "}
          véhicule{filtered.length > 1 ? "s" : ""}
        </p>
      </div>

      {error && (
        <p className="mt-3 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">
          {error}
        </p>
      )}

      {/* Tableau */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60 text-xs uppercase tracking-wide text-slate-400">
                <th className="px-6 py-3.5 font-semibold">Véhicule</th>
                <th className="px-6 py-3.5 font-semibold">Catégorie</th>
                <th className="px-6 py-3.5 font-semibold">Année</th>
                <th className="px-6 py-3.5 font-semibold">Kilométrage</th>
                <th className="px-6 py-3.5 font-semibold">Prix</th>
                <th className="px-6 py-3.5 font-semibold">Statut</th>
                <th className="px-6 py-3.5 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((v) => (
                <tr
                  key={v.id}
                  className="border-b border-slate-50 transition last:border-0 hover:bg-violet-50/30"
                >
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="block h-11 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                        {v.img && (
                          <img
                            src={v.img}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        )}
                      </span>
                      <div>
                        <p className="font-bold text-slate-900">{v.name}</p>
                        <p className="text-xs text-slate-400">
                          {v.fuel} • {v.gearbox}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 text-slate-500">{v.category}</td>
                  <td className="px-6 py-3.5 text-slate-500">{v.year}</td>
                  <td className="px-6 py-3.5 text-slate-500">
                    {formatNumber(v.km)} km
                  </td>
                  <td className="px-6 py-3.5 font-bold text-indigo-950">
                    {formatPrice(v.price)}
                  </td>
                  <td className="px-6 py-3.5">
                    <StatusBadge status={v.status ?? "Disponible"} />
                  </td>
                  <td className="px-6 py-3.5">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/vehicules/${v.id}`}
                        aria-label={`Modifier ${v.name}`}
                        className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-600"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => remove(v)}
                        disabled={deleting === v.id}
                        aria-label={`Supprimer ${v.name}`}
                        className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 disabled:opacity-50"
                      >
                        {deleting === v.id ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-sm text-slate-400">
                    Aucun véhicule ne correspond à votre recherche.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
