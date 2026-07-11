import Link from "next/link";
import { Plus } from "lucide-react";
import VehiclesTable from "@/components/admin/VehiclesTable";
import { readContent } from "@/lib/content";

export default async function AdminVehicules() {
  const content = await readContent();

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      {/* En-tête */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
            Véhicules
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Gérez votre parc : ajoutez, modifiez ou supprimez des véhicules.
          </p>
        </div>
        <Link
          href="/admin/vehicules/nouveau"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/25 transition hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Ajouter un véhicule
        </Link>
      </div>

      <div className="mt-6">
        <VehiclesTable vehicles={content.vehicules} />
      </div>
    </main>
  );
}
