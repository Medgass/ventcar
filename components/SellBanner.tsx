import Link from "next/link";
import { ArrowRight, CheckCircle2, Megaphone } from "lucide-react";
import type { SiteContent } from "@/lib/content";

export default function SellBanner({
  banniere,
}: {
  banniere: SiteContent["banniere"];
}) {
  return (
    <section id="apropos" className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl bg-[#efe9fb]">
        {/* Image */}
        <img
          src={banniere.image}
          alt=""
          className="absolute inset-y-0 right-0 hidden h-full w-[62%] object-cover object-[72%_center] md:block"
        />
        {/* Fondu pour la lisibilité du texte */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-[#efe9fb] from-35% via-[#efe9fb]/80 via-55% to-transparent md:block" />

        <div className="relative z-10 max-w-xl p-8 sm:p-10 lg:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-violet-600">
            {banniere.surtitre}
          </p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {banniere.titreAvant}
            <br />
            <span className="bg-gradient-to-r from-fuchsia-500 to-red-500 bg-clip-text text-transparent">
              {banniere.motDegrade}
            </span>{" "}
            {banniere.titreApres}
          </h2>

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2.5">
            {banniere.avantages.map((perk) => (
              <li
                key={perk}
                className="flex items-center gap-2 text-sm font-medium text-slate-700"
              >
                <CheckCircle2 className="h-[18px] w-[18px] text-violet-600" />
                {perk}
              </li>
            ))}
          </ul>

          <Link
            href="/deposer-annonce"
            className="mt-8 inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-fuchsia-600 via-rose-500 to-red-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/30 transition hover:opacity-90"
          >
            <Megaphone className="h-4 w-4" />
            {banniere.bouton}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Indicateurs */}
      <div className="mt-6 flex justify-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-violet-600" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
      </div>
    </section>
  );
}
