import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  HandshakeIcon,
  Heart,
  ShieldCheck,
  Star,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import Testimonials from "@/components/Testimonials";
import { readContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "À propos — Auto Vente",
  description:
    "Auto Vente, votre partenaire de confiance pour l'achat et la vente de voitures en Tunisie.",
};

const valueIcons = [ShieldCheck, HandshakeIcon, Heart, Award];

export default async function AProposPage() {
  const content = await readContent();
  const page = content.pageAPropos;

  return (
    <>
      <SiteHeader />
      <main>
        <PageHeader
          title={page.titre}
          highlight={page.motDegrade}
          subtitle={page.sousTitre}
        />

        <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6">
          {/* Histoire + image */}
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                {page.histoireTitre}
              </h2>
              <span className="mt-2 block h-[3px] w-14 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500" />
              <p className="mt-5 leading-relaxed text-slate-500">{page.histoire1}</p>
              <p className="mt-4 leading-relaxed text-slate-500">{page.histoire2}</p>
              <div className="mt-6 flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-1 text-sm font-semibold text-slate-700">
                  {content.hero.note} — plus de 400 avis
                </span>
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl">
              <img
                src={page.image}
                alt="Notre agence"
                className="w-full object-cover"
              />
            </div>
          </div>

          {/* Statistiques */}
          <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {page.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm"
              >
                <p className="bg-gradient-to-r from-violet-700 to-fuchsia-600 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent">
                  {stat.valeur}
                </p>
                <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Valeurs */}
          <div className="mt-14">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Nos valeurs
            </h2>
            <span className="mt-2 block h-[3px] w-14 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500" />
            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {page.valeurs.map((value, i) => {
                const Icon = valueIcons[i % valueIcons.length];
                return (
                  <div
                    key={value.titre}
                    className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-violet-100 text-violet-600">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <h3 className="mt-4 font-bold text-slate-900">{value.titre}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Avis clients */}
        <Testimonials section={content.sectionAvis} />

        {/* CTA */}
        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
          <div className="flex flex-col items-center gap-5 rounded-3xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 px-8 py-12 text-center text-white">
            <h2 className="text-2xl font-extrabold sm:text-3xl">
              Prêt à trouver la voiture de vos rêves ?
            </h2>
            <Link
              href="/vehicules"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-violet-700 shadow-lg transition hover:bg-violet-50"
            >
              {content.hero.boutonPrincipal}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
