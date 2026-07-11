import { ChevronDown, Search } from "lucide-react";

function Field({
  label,
  name,
  placeholder,
  options,
  defaultValue = "",
}: {
  label: string;
  name: string;
  placeholder: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
}) {
  return (
    <label className="relative block cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-2.5 transition focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-100">
      <span className="block text-[11px] font-medium text-slate-400">
        {label}
      </span>
      <select
        name={name}
        defaultValue={defaultValue}
        className="w-full cursor-pointer appearance-none bg-transparent pr-5 text-sm font-semibold text-slate-800 outline-none"
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
    </label>
  );
}

const priceOptions = [50000, 80000, 100000, 150000, 200000, 300000, 500000].map(
  (p) => ({
    value: String(p),
    label: `${p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} DT`,
  })
);

const yearOptions = [2024, 2023, 2022, 2021, 2020, 2019, 2018].map((y) => ({
  value: String(y),
  label: String(y),
}));

export type SearchDefaults = {
  marque?: string;
  modele?: string;
  prix?: string;
  annee?: string;
  categorie?: string;
};

export default function SearchCard({
  brands,
  models,
  defaults = {},
}: {
  brands: string[];
  models: string[];
  defaults?: SearchDefaults;
}) {
  return (
    <form
      action="/vehicules"
      className="relative z-10 -mt-4 grid gap-3 rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_25px_70px_-20px_rgba(15,23,42,0.25)] sm:grid-cols-2 lg:-mt-8 xl:grid-cols-[1fr_1fr_1fr_1fr_auto]"
    >
      {defaults.categorie && (
        <input type="hidden" name="categorie" value={defaults.categorie} />
      )}
      <Field
        label="Marque"
        name="marque"
        placeholder="Toutes les marques"
        defaultValue={defaults.marque}
        options={brands.map((b) => ({ value: b, label: b }))}
      />
      <Field
        label="Modèle"
        name="modele"
        placeholder="Tous les modèles"
        defaultValue={defaults.modele}
        options={models.map((m) => ({ value: m, label: m }))}
      />
      <Field
        label="Prix max"
        name="prix"
        placeholder="Prix maximum"
        defaultValue={defaults.prix}
        options={priceOptions}
      />
      <Field
        label="Année min"
        name="annee"
        placeholder="Année minimum"
        defaultValue={defaults.annee}
        options={yearOptions}
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/25 transition hover:opacity-90"
      >
        <Search className="h-4 w-4" />
        Rechercher
      </button>
    </form>
  );
}
