import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Car,
  CheckCircle2,
  CreditCard,
  Headphones,
  RefreshCw,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { readContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Nos services — Auto Vente",
  description:
    "Vente, reprise, financement, garantie et assistance : Auto Vente vous accompagne à chaque étape.",
};

const icons = [Car, RefreshCw, CreditCard, BadgeCheck, Headphones];

export default async function ServicesPage() {
  const content = await readContent();
  const page = content.pageServices;

  return (
    <>
      <SiteHeader />
      <main>
        <PageHeader
          title={page.titre}
          highlight={page.motDegrade}
          subtitle={page.sousTitre}
        />

        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {page.services.map((service, i) => {
              const Icon = icons[i % icons.length];
              return (
                <article
                  key={service.titre}
                  className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-violet-100 text-violet-600 transition group-hover:bg-violet-600 group-hover:text-white">
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  </span>
                  <h2 className="mt-4 text-lg font-bold text-slate-900">
                    {service.titre}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {service.description}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-2 text-sm font-medium text-slate-700"
                      >
                        <CheckCircle2 className="h-4 w-4 text-violet-600" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}

            {/* Carte CTA */}
            <article className="flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-rose-500 p-6 text-white shadow-lg">
              <div>
                <h2 className="text-xl font-extrabold">
                  Besoin d&apos;un conseil ?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-white/80">
                  Notre équipe vous répond 7j/7 et vous aide à trouver la
                  solution adaptée à votre projet.
                </p>
              </div>
              <Link
                href="/contact"
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-violet-700 shadow transition hover:bg-violet-50"
              >
                Nous contacter
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
