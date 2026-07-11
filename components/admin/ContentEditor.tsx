"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2, Plus, Save, Trash2 } from "lucide-react";
import ImageField from "./ImageField";

type Json = string | number | boolean | Json[] | { [k: string]: Json };
type JsonObject = { [k: string]: Json };

const IMAGE_KEY = /image|logo|img|photo/i;
const LONG_TEXT = /description|texte|sousTitre|histoire|preview/i;

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100";

const LABELS: Record<string, string> = {
  identite: "Identité & logo",
  nomPartie1: "Nom (1re partie)",
  nomPartie2: "Nom (2e partie, en dégradé)",
  slogan: "Slogan",
  logo: "Logo",
  menu: "Menu de navigation",
  label: "Libellé",
  lien: "Lien",
  hero: "Section d'accueil (héro)",
  titreLigne1: "Titre — ligne 1",
  titreLigne2: "Titre — ligne 2",
  motDegrade: "Mot en dégradé",
  sousTitre: "Sous-titre",
  boutonPrincipal: "Bouton principal",
  boutonSecondaire: "Bouton secondaire",
  boutonAnnonce: "Bouton « Déposer une annonce »",
  image: "Image",
  clients: "Texte clients",
  note: "Note",
  sectionVedette: "Section « Véhicules en vedette »",
  titre: "Titre",
  sectionCategories: "Catégories populaires",
  liste: "Liste",
  nom: "Nom",
  nombre: "Nombre",
  banniere: "Bannière « Vendez votre voiture »",
  surtitre: "Surtitre",
  titreAvant: "Titre (avant le mot en dégradé)",
  titreApres: "Titre (après le mot en dégradé)",
  avantages: "Avantages",
  bouton: "Bouton",
  sectionAvis: "Témoignages",
  texte: "Texte",
  ville: "Ville",
  footer: "Pied de page",
  description: "Description",
  colonnes: "Colonnes",
  liens: "Liens",
  copyright: "Copyright",
  contact: "Coordonnées",
  telephone: "Téléphone",
  email: "Email",
  adresse: "Adresse",
  horaires: "Horaires",
  pageVehicules: "Page Véhicules",
  pageServices: "Page Services",
  services: "Services",
  points: "Points",
  pageAPropos: "Page À propos",
  histoireTitre: "Titre de l'histoire",
  histoire1: "Histoire — paragraphe 1",
  histoire2: "Histoire — paragraphe 2",
  stats: "Statistiques",
  valeur: "Valeur",
  valeurs: "Valeurs",
  pageAnnonce: "Page Déposer une annonce",
  vehicules: "Véhicules",
  name: "Nom",
  brand: "Marque",
  model: "Modèle",
  year: "Année",
  fuel: "Carburant",
  km: "Kilométrage",
  price: "Prix (DT)",
  category: "Catégorie",
  gearbox: "Boîte",
  power: "Puissance",
  color: "Couleur",
  badge: "Badge (optionnel)",
  img: "Photo principale",
  images: "Galerie de photos",
  id: "Identifiant (URL)",
};

function labelOf(key: string) {
  if (LABELS[key]) return LABELS[key];
  const spaced = key.replace(/([a-z0-9])([A-Z])/g, "$1 $2").toLowerCase();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function emptyLike(value: Json): Json {
  if (Array.isArray(value)) return [];
  if (typeof value === "object" && value !== null) {
    const out: JsonObject = {};
    for (const [k, v] of Object.entries(value)) out[k] = emptyLike(v);
    return out;
  }
  if (typeof value === "number") return 0;
  if (typeof value === "boolean") return false;
  return "";
}

function Field({
  name,
  value,
  onChange,
}: {
  name: string;
  value: Json;
  onChange: (v: Json) => void;
}) {
  if (typeof value === "string") {
    if (IMAGE_KEY.test(name)) {
      return <ImageField value={value} onChange={onChange} />;
    }
    if (value.length > 90 || LONG_TEXT.test(name)) {
      return (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClass} resize-y`}
        />
      );
    }
    return (
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
    );
  }

  if (typeof value === "number") {
    return (
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className={inputClass}
      />
    );
  }

  if (typeof value === "boolean") {
    return (
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        className="h-5 w-5 accent-violet-600"
      />
    );
  }

  if (Array.isArray(value)) {
    return (
      <div className="space-y-3">
        {value.map((item, i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5"
          >
            <div className="mb-2.5 flex items-center justify-between">
              <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                Élément {i + 1}
              </p>
              <button
                type="button"
                onClick={() => onChange(value.filter((_, j) => j !== i))}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-500 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600"
              >
                <Trash2 className="h-3 w-3" />
                Supprimer
              </button>
            </div>
            <Field
              name={name}
              value={item}
              onChange={(v) => onChange(value.map((x, j) => (j === i ? v : x)))}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            onChange([
              ...value,
              value.length > 0 ? emptyLike(value[value.length - 1]) : "",
            ])
          }
          className="inline-flex items-center gap-1.5 rounded-xl border border-dashed border-violet-300 bg-violet-50/50 px-4 py-2.5 text-xs font-semibold text-violet-700 transition hover:bg-violet-50"
        >
          <Plus className="h-4 w-4" />
          Ajouter un élément
        </button>
      </div>
    );
  }

  // Objet
  const entries = Object.entries(value as JsonObject);
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {entries.map(([k, v]) => {
        const wide =
          typeof v !== "string" ||
          v.length > 60 ||
          LONG_TEXT.test(k) ||
          IMAGE_KEY.test(k);
        return (
          <div key={k} className={wide ? "sm:col-span-2" : ""}>
            <p className="mb-1.5 text-xs font-semibold text-slate-500">
              {labelOf(k)}
            </p>
            <Field
              name={k}
              value={v}
              onChange={(nv) => onChange({ ...(value as JsonObject), [k]: nv })}
            />
          </div>
        );
      })}
    </div>
  );
}

const SECTIONS: { key: string; titre: string }[] = [
  { key: "identite", titre: "Identité & logo" },
  { key: "menu", titre: "Menu" },
  { key: "hero", titre: "Accueil — Héro" },
  { key: "sectionVedette", titre: "Vedette" },
  { key: "sectionCategories", titre: "Catégories" },
  { key: "banniere", titre: "Bannière" },
  { key: "sectionAvis", titre: "Témoignages" },
  { key: "footer", titre: "Pied de page" },
  { key: "contact", titre: "Coordonnées" },
  { key: "pageVehicules", titre: "Page Véhicules" },
  { key: "pageServices", titre: "Page Services" },
  { key: "pageAPropos", titre: "Page À propos" },
  { key: "pageAnnonce", titre: "Page Annonce" },
];

export default function ContentEditor({
  initial,
  initialSection,
}: {
  initial: JsonObject;
  initialSection?: string;
}) {
  const router = useRouter();
  const [content, setContent] = useState<JsonObject>(initial);
  const [active, setActive] = useState(
    SECTIONS.some((s) => s.key === initialSection)
      ? (initialSection as string)
      : SECTIONS[0].key
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(
    null
  );

  async function save() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setMessage({ ok: true, text: "Modifications publiées sur le site." });
        router.refresh();
      } else {
        const data = await res.json().catch(() => null);
        setMessage({ ok: false, text: data?.error ?? "Erreur d'enregistrement." });
      }
    } catch {
      setMessage({ ok: false, text: "Erreur réseau, réessayez." });
    }
    setSaving(false);
  }

  const section = SECTIONS.find((s) => s.key === active)!;

  return (
    <div>
      {/* Onglets */}
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
        {SECTIONS.map((s) => (
          <button
            key={s.key}
            type="button"
            onClick={() => setActive(s.key)}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition ${
              active === s.key
                ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow"
                : "border border-slate-200 bg-white text-slate-600 hover:border-violet-300 hover:text-violet-600"
            }`}
          >
            {s.titre}
          </button>
        ))}
      </div>

      {/* Panneau d'édition */}
      <div className="mt-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="font-extrabold text-slate-900">{labelOf(section.key)}</h2>
        <p className="mt-1 text-xs text-slate-400">
          Modifiez les champs puis cliquez sur « Publier les modifications ».
        </p>
        <div className="mt-5">
          <Field
            name={section.key}
            value={content[section.key]}
            onChange={(v) => setContent({ ...content, [section.key]: v })}
          />
        </div>
      </div>

      {/* Barre d'enregistrement */}
      <div className="sticky bottom-0 z-10 mt-5 flex flex-wrap items-center gap-4 rounded-2xl border border-slate-100 bg-white/95 p-4 shadow-lg backdrop-blur">
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/25 transition hover:opacity-90 disabled:opacity-60"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Publier les modifications
        </button>
        {message && (
          <span
            className={`inline-flex items-center gap-1.5 text-sm font-semibold ${
              message.ok ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            {message.ok && <Check className="h-4 w-4" />}
            {message.text}
          </span>
        )}
      </div>
    </div>
  );
}
