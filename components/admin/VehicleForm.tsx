"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Car,
  Check,
  FileText,
  Images,
  Loader2,
  Plus,
  Save,
  Settings2,
  Trash2,
} from "lucide-react";
import { categoryNames, type Vehicle } from "@/lib/vehicles";
import ImageField from "./ImageField";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100";

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-100 text-violet-600">
          <Icon className="h-5 w-5" strokeWidth={1.8} />
        </span>
        <h2 className="font-extrabold text-slate-900">{title}</h2>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="mb-1.5 text-xs font-semibold text-slate-500">{label}</p>
      {children}
    </div>
  );
}

type FormState = {
  name: string;
  brand: string;
  model: string;
  year: number;
  km: number;
  price: number;
  category: string;
  fuel: string;
  gearbox: string;
  power: string;
  color: string;
  badge: string;
  status: string;
  description: string;
  images: string[];
};

export default function VehicleForm({ initial }: { initial?: Vehicle }) {
  const router = useRouter();
  const [v, setV] = useState<FormState>({
    name: initial?.name ?? "",
    brand: initial?.brand ?? "",
    model: initial?.model ?? "",
    year: initial?.year ?? new Date().getFullYear(),
    km: initial?.km ?? 0,
    price: initial?.price ?? 0,
    category: initial?.category ?? categoryNames[0],
    fuel: initial?.fuel ?? "Essence",
    gearbox: initial?.gearbox ?? "Manuelle",
    power: initial?.power ?? "",
    color: initial?.color ?? "",
    badge: initial?.badge ?? "",
    status: initial?.status ?? "Disponible",
    description: initial?.description ?? "",
    images: initial?.images?.length ? [...initial.images] : [""],
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setV((prev) => ({ ...prev, [key]: value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const payload = { ...v, images: v.images.filter((i) => i.trim() !== "") };
      const res = await fetch(
        initial ? `/api/admin/vehicles/${initial.id}` : "/api/admin/vehicles",
        {
          method: initial ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (res.ok) {
        router.push("/admin/vehicules");
        router.refresh();
        return;
      }
      const data = await res.json().catch(() => null);
      setError(data?.error ?? "Erreur lors de l'enregistrement.");
    } catch {
      setError("Erreur réseau, réessayez.");
    }
    setSaving(false);
  }

  return (
    <form onSubmit={submit} className="grid max-w-4xl gap-5">
      {/* Informations principales */}
      <Section icon={Car} title="Informations principales">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nom affiché *" className="sm:col-span-2">
            <input
              required
              value={v.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="ex : Audi A4"
              className={inputClass}
            />
          </Field>
          <Field label="Marque">
            <input
              value={v.brand}
              onChange={(e) => set("brand", e.target.value)}
              placeholder="ex : Audi"
              className={inputClass}
            />
          </Field>
          <Field label="Modèle">
            <input
              value={v.model}
              onChange={(e) => set("model", e.target.value)}
              placeholder="ex : A4"
              className={inputClass}
            />
          </Field>
          <Field label="Prix (DT)">
            <input
              type="number"
              min={0}
              value={v.price}
              onChange={(e) => set("price", Number(e.target.value) || 0)}
              className={inputClass}
            />
          </Field>
          <Field label="Catégorie">
            <select
              value={v.category}
              onChange={(e) => set("category", e.target.value)}
              className={inputClass}
            >
              {categoryNames.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field label="Badge (optionnel)">
            <input
              value={v.badge}
              onChange={(e) => set("badge", e.target.value)}
              placeholder="ex : NOUVEAU, PREMIUM…"
              className={inputClass}
            />
          </Field>
          <Field label="Statut">
            <select
              value={v.status}
              onChange={(e) => set("status", e.target.value)}
              className={inputClass}
            >
              <option>Disponible</option>
              <option>Réservé</option>
              <option>Vendu</option>
            </select>
          </Field>
        </div>
      </Section>

      {/* Caractéristiques */}
      <Section icon={Settings2} title="Caractéristiques">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Année">
            <input
              type="number"
              min={1950}
              max={2100}
              value={v.year}
              onChange={(e) => set("year", Number(e.target.value) || 0)}
              className={inputClass}
            />
          </Field>
          <Field label="Kilométrage (km)">
            <input
              type="number"
              min={0}
              value={v.km}
              onChange={(e) => set("km", Number(e.target.value) || 0)}
              className={inputClass}
            />
          </Field>
          <Field label="Carburant">
            <select
              value={v.fuel}
              onChange={(e) => set("fuel", e.target.value)}
              className={inputClass}
            >
              <option>Essence</option>
              <option>Diesel</option>
              <option>Hybride</option>
              <option>Électrique</option>
            </select>
          </Field>
          <Field label="Boîte de vitesses">
            <select
              value={v.gearbox}
              onChange={(e) => set("gearbox", e.target.value)}
              className={inputClass}
            >
              <option>Manuelle</option>
              <option>Automatique</option>
            </select>
          </Field>
          <Field label="Puissance">
            <input
              value={v.power}
              onChange={(e) => set("power", e.target.value)}
              placeholder="ex : 150 ch"
              className={inputClass}
            />
          </Field>
          <Field label="Couleur">
            <input
              value={v.color}
              onChange={(e) => set("color", e.target.value)}
              placeholder="ex : Gris métallisé"
              className={inputClass}
            />
          </Field>
        </div>
      </Section>

      {/* Photos */}
      <Section icon={Images} title="Photos">
        <p className="-mt-2 mb-4 text-xs text-slate-400">
          La première photo est la photo principale (affichée sur les cartes).
        </p>
        <div className="space-y-3">
          {v.images.map((img, i) => (
            <div
              key={i}
              className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5"
            >
              <div className="mb-2.5 flex items-center justify-between">
                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                  {i === 0 ? "Photo principale" : `Photo ${i + 1}`}
                </p>
                {v.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      set("images", v.images.filter((_, j) => j !== i))
                    }
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-500 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600"
                  >
                    <Trash2 className="h-3 w-3" />
                    Retirer
                  </button>
                )}
              </div>
              <ImageField
                value={img}
                onChange={(val) =>
                  set("images", v.images.map((x, j) => (j === i ? val : x)))
                }
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => set("images", [...v.images, ""])}
            className="inline-flex items-center gap-1.5 rounded-xl border border-dashed border-violet-300 bg-violet-50/50 px-4 py-2.5 text-xs font-semibold text-violet-700 transition hover:bg-violet-50"
          >
            <Plus className="h-4 w-4" />
            Ajouter une photo
          </button>
        </div>
      </Section>

      {/* Description */}
      <Section icon={FileText} title="Description">
        <textarea
          rows={4}
          value={v.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="État, options, historique d'entretien…"
          className={`${inputClass} resize-y`}
        />
      </Section>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/25 transition hover:opacity-90 disabled:opacity-60"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : initial ? (
            <Save className="h-4 w-4" />
          ) : (
            <Check className="h-4 w-4" />
          )}
          {initial ? "Enregistrer les modifications" : "Ajouter le véhicule"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/vehicules")}
          className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
        >
          Annuler
        </button>
        {error && (
          <span className="text-sm font-semibold text-rose-600">{error}</span>
        )}
      </div>
    </form>
  );
}
