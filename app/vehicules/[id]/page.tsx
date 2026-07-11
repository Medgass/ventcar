import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  ChevronLeft,
  Fuel,
  Gauge,
  MessageCircle,
  Palette,
  Phone,
  Settings2,
  ShieldCheck,
  Zap,
} from "lucide-react";
import ImageGallery from "@/components/ImageGallery";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import VehicleCard from "@/components/VehicleCard";
import { readContent } from "@/lib/content";
import { formatNumber, formatPrice, vehicleImages } from "@/lib/vehicles";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const content = await readContent();
  const vehicle = content.vehicules.find((v) => v.id === id);
  return {
    title: vehicle
      ? `${vehicle.name} — Auto Vente`
      : "Véhicule introuvable — Auto Vente",
  };
}

export default async function VehiclePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const content = await readContent();
  const vehicles = content.vehicules;
  const vehicle = vehicles.find((v) => v.id === id);
  if (!vehicle) notFound();

  const telHref = `tel:${content.contact.telephone.replace(/\s+/g, "")}`;
  const waHref = `https://wa.me/${content.contact.telephone.replace(/[^0-9]/g, "")}`;

  const specs = [
    { icon: Calendar, label: "Année", value: String(vehicle.year) },
    { icon: Fuel, label: "Carburant", value: vehicle.fuel },
    { icon: Gauge, label: "Kilométrage", value: `${formatNumber(vehicle.km)} km` },
    { icon: Settings2, label: "Boîte", value: vehicle.gearbox },
    { icon: Zap, label: "Puissance", value: vehicle.power },
    { icon: Palette, label: "Couleur", value: vehicle.color },
  ];

  const similar = [
    ...vehicles.filter((v) => v.category === vehicle.category && v.id !== vehicle.id),
    ...vehicles.filter((v) => v.category !== vehicle.category && v.id !== vehicle.id),
  ].slice(0, 4);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Fil d'ariane */}
        <Link
          href="/vehicules"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-violet-600"
        >
          <ChevronLeft className="h-4 w-4" />
          Retour aux véhicules
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.15fr_1fr]">
          {/* Galerie photos */}
          <ImageGallery
            images={vehicleImages(vehicle)}
            alt={vehicle.name}
            vehicleId={vehicle.id}
            badge={vehicle.badge}
          />

          {/* Détails */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-violet-600">
              {vehicle.category}
            </p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {vehicle.name}
            </h1>
            <p className="mt-3 text-2xl font-extrabold tracking-tight text-transparent bg-gradient-to-r from-violet-700 to-fuchsia-600 bg-clip-text">
              {formatPrice(vehicle.price)}
            </p>

            <p className="mt-5 leading-relaxed text-slate-500">
              {vehicle.description}
            </p>

            {/* Caractéristiques */}
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="rounded-xl border border-slate-100 bg-white p-3.5 shadow-sm"
                >
                  <spec.icon className="h-[18px] w-[18px] text-violet-600" />
                  <p className="mt-2 text-[11px] text-slate-400">{spec.label}</p>
                  <p className="text-sm font-bold text-slate-900">{spec.value}</p>
                </div>
              ))}
            </div>

            {/* Garantie */}
            <div className="mt-6 flex items-center gap-3 rounded-xl bg-violet-50 p-4">
              <ShieldCheck className="h-6 w-6 shrink-0 text-violet-600" />
              <p className="text-sm text-slate-600">
                <span className="font-bold text-slate-900">
                  Véhicule vérifié.
                </span>{" "}
                Contrôle qualité complet et garantie Auto Vente incluse.
              </p>
            </div>

            {/* Actions */}
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={telHref}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/30 transition hover:opacity-90"
              >
                <Phone className="h-4 w-4" />
                Appeler le vendeur
              </a>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
              >
                <MessageCircle className="h-4 w-4 text-green-600" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Véhicules similaires */}
        <section className="mt-16">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
            Véhicules similaires
          </h2>
          <span className="mt-2 block h-[3px] w-14 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {similar.map((v) => (
              <VehicleCard key={v.id} vehicle={v} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
