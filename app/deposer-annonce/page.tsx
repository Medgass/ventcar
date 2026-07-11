import type { Metadata } from "next";
import { CheckCircle2, Eye, ShieldCheck, Zap } from "lucide-react";
import AnnonceForm from "@/components/AnnonceForm";
import PageHeader from "@/components/PageHeader";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { readContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Déposer une annonce — Auto Vente",
  description:
    "Vendez votre voiture rapidement et gratuitement sur Auto Vente : annonce vérifiée, visibilité maximale, acheteurs sérieux.",
};

const icons = [CheckCircle2, Eye, ShieldCheck, Zap];

export default async function DeposerAnnoncePage() {
  const content = await readContent();
  const page = content.pageAnnonce;

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
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
            <AnnonceForm />

            {/* Avantages */}
            <aside className="space-y-4 self-start">
              {page.avantages.map((adv, i) => {
                const Icon = icons[i % icons.length];
                return (
                  <div
                    key={adv.titre}
                    className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-violet-100 text-violet-600">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <div>
                      <p className="font-bold text-slate-900">{adv.titre}</p>
                      <p className="mt-1 text-sm text-slate-500">
                        {adv.description}
                      </p>
                    </div>
                  </div>
                );
              })}

              <div className="overflow-hidden rounded-2xl">
                <img
                  src={page.image}
                  alt=""
                  className="h-44 w-full object-cover object-[70%_center]"
                />
              </div>
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
