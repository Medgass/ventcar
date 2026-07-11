import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import VehicleForm from "@/components/admin/VehicleForm";
import { readContent } from "@/lib/content";

export default async function ModifierVehicule({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const content = await readContent();
  const vehicle = content.vehicules.find((v) => v.id === id);
  if (!vehicle) notFound();

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <Link
        href="/admin/vehicules"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-violet-600"
      >
        <ChevronLeft className="h-4 w-4" />
        Retour aux véhicules
      </Link>
      <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900">
        Modifier : {vehicle.name}
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        Les modifications sont publiées immédiatement sur le site.
      </p>

      <div className="mt-6">
        <VehicleForm initial={vehicle} />
      </div>
    </main>
  );
}
