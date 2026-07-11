"use client";

import { useState } from "react";
import { CheckCircle2, ImagePlus, Megaphone } from "lucide-react";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100";

function SectionTitle({ step, title }: { step: string; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-sm font-bold text-white">
        {step}
      </span>
      <h2 className="text-lg font-extrabold text-slate-900">{title}</h2>
    </div>
  );
}

export default function AnnonceForm() {
  const [sent, setSent] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  if (sent) {
    return (
      <div className="rounded-2xl border border-slate-100 bg-white p-10 text-center shadow-sm">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-green-50 text-green-600">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h2 className="mt-4 text-xl font-extrabold text-slate-900">
          Annonce envoyée !
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Votre annonce sera vérifiée par notre équipe puis publiée sous 24h.
          Vous recevrez une confirmation par email.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Déposer une autre annonce
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="space-y-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8"
    >
      {/* Étape 1 : véhicule */}
      <div>
        <SectionTitle step="1" title="Votre véhicule" />
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <input required name="marque" placeholder="Marque *" className={inputClass} />
          <input required name="modele" placeholder="Modèle *" className={inputClass} />
          <input
            required
            type="number"
            name="annee"
            placeholder="Année *"
            min={1990}
            max={2026}
            className={inputClass}
          />
          <input
            required
            type="number"
            name="kilometrage"
            placeholder="Kilométrage (km) *"
            min={0}
            className={inputClass}
          />
          <select required name="carburant" defaultValue="" className={inputClass}>
            <option value="" disabled>
              Carburant *
            </option>
            <option>Essence</option>
            <option>Diesel</option>
            <option>Hybride</option>
            <option>Électrique</option>
          </select>
          <select required name="boite" defaultValue="" className={inputClass}>
            <option value="" disabled>
              Boîte de vitesses *
            </option>
            <option>Manuelle</option>
            <option>Automatique</option>
          </select>
          <input
            required
            type="number"
            name="prix"
            placeholder="Prix demandé (DT) *"
            min={0}
            className={`${inputClass} sm:col-span-2`}
          />
        </div>
      </div>

      {/* Étape 2 : photos */}
      <div>
        <SectionTitle step="2" title="Photos" />
        <label className="mt-5 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 px-6 py-10 text-center transition hover:border-violet-300 hover:bg-violet-50/40">
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) =>
              setFileName(
                e.target.files && e.target.files.length > 0
                  ? `${e.target.files.length} photo(s) sélectionnée(s)`
                  : null
              )
            }
          />
          <span className="grid h-12 w-12 place-items-center rounded-full bg-violet-100 text-violet-600">
            <ImagePlus className="h-6 w-6" />
          </span>
          <p className="text-sm font-semibold text-slate-900">
            {fileName ?? "Ajoutez des photos de votre véhicule"}
          </p>
          <p className="text-xs text-slate-400">
            JPG ou PNG — jusqu&apos;à 10 photos
          </p>
        </label>
      </div>

      {/* Étape 3 : description */}
      <div>
        <SectionTitle step="3" title="Description" />
        <textarea
          name="description"
          rows={4}
          placeholder="Décrivez votre véhicule : état, options, historique d'entretien…"
          className={`${inputClass} mt-5 resize-none`}
        />
      </div>

      {/* Étape 4 : coordonnées */}
      <div>
        <SectionTitle step="4" title="Vos coordonnées" />
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <input required name="nom" placeholder="Votre nom *" className={inputClass} />
          <input
            required
            name="telephone"
            placeholder="Votre téléphone *"
            className={inputClass}
          />
          <input
            type="email"
            name="email"
            placeholder="Votre email"
            className={inputClass}
          />
        </div>
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-600 via-rose-500 to-red-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/30 transition hover:opacity-90"
      >
        <Megaphone className="h-4 w-4" />
        Publier mon annonce gratuitement
      </button>
    </form>
  );
}
