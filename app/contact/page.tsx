import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/PageHeader";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { readContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact — Auto Vente",
  description:
    "Contactez l'équipe Auto Vente : téléphone, email ou formulaire. Nous répondons 7j/7.",
};

export default async function ContactPage() {
  const content = await readContent();
  const c = content.contact;

  const infos = [
    {
      icon: Phone,
      title: "Téléphone",
      value: c.telephone,
      href: `tel:${c.telephone.replace(/\s+/g, "")}`,
    },
    { icon: Mail, title: "Email", value: c.email, href: `mailto:${c.email}` },
    { icon: MapPin, title: "Adresse", value: c.adresse, href: undefined },
    { icon: Clock, title: "Horaires", value: c.horaires, href: undefined },
  ];

  return (
    <>
      <SiteHeader />
      <main>
        <PageHeader
          title="Contactez-"
          highlight="nous"
          subtitle="Une question, un essai, une estimation ? Notre équipe vous répond 7j/7."
        />

        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
            {/* Coordonnées */}
            <div className="space-y-4">
              {infos.map((info) => (
                <div
                  key={info.title}
                  className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-violet-100 text-violet-600">
                    <info.icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="text-xs text-slate-400">{info.title}</p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="font-bold text-slate-900 transition hover:text-violet-600"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="font-bold text-slate-900">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Localisation */}
              <div className="relative grid h-48 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-violet-100 via-fuchsia-50 to-orange-50">
                <div className="text-center">
                  <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-white text-violet-600 shadow-lg">
                    <MapPin className="h-6 w-6" />
                  </span>
                  <p className="mt-3 font-bold text-slate-900">{c.adresse}</p>
                  <p className="text-xs text-slate-500">
                    Showroom ouvert du lundi au samedi
                  </p>
                </div>
              </div>
            </div>

            {/* Formulaire */}
            <ContactForm />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
