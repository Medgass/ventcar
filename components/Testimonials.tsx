import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import type { SiteContent } from "@/lib/content";

const gradients = [
  "from-violet-500 to-fuchsia-500",
  "from-sky-500 to-indigo-500",
  "from-orange-400 to-rose-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
];

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Testimonials({
  section,
}: {
  section: SiteContent["sectionAvis"];
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      {/* En-tête de section */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-[1.75rem]">
          {section.titre}
        </h2>
        <Link
          href="/a-propos"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-violet-600"
        >
          {section.lien}
          <ArrowRight className="h-4 w-4 text-violet-600" />
        </Link>
      </div>

      {/* Cartes */}
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {section.liste.map((review, i) => (
          <article
            key={`${review.nom}-${i}`}
            className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-lg"
          >
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="bg-gradient-to-br from-violet-600 to-fuchsia-500 bg-clip-text font-serif text-5xl font-bold leading-[0.6] text-transparent"
              >
                &ldquo;
              </span>
              <span className="flex items-center gap-0.5 pt-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              {review.texte}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <span
                className={`grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br ${gradients[i % gradients.length]} text-xs font-bold text-white`}
              >
                {initialsOf(review.nom)}
              </span>
              <div>
                <p className="text-sm font-bold text-slate-900">{review.nom}</p>
                <p className="text-xs text-slate-400">{review.ville}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Indicateurs */}
      <div className="mt-8 flex justify-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-violet-600" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
      </div>
    </section>
  );
}
