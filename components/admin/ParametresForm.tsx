"use client";

import { useState } from "react";
import { Check, KeyRound, Loader2, MapPin, Save, UserRound } from "lucide-react";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100";

export default function ParametresForm({
  initialEmail,
  initialAdresse,
}: {
  initialEmail: string;
  initialAdresse: string;
}) {
  const [email, setEmail] = useState(initialEmail);
  const [adresse, setAdresse] = useState(initialAdresse);
  const [mdp, setMdp] = useState("");
  const [mdp2, setMdp2] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(
    null
  );

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    if (mdp && mdp !== mdp2) {
      setMessage({ ok: false, text: "Les deux mots de passe ne correspondent pas." });
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/credentials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          adresse,
          nouveauMotDePasse: mdp || undefined,
        }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok) {
        setMessage({ ok: true, text: "Paramètres enregistrés." });
        setMdp("");
        setMdp2("");
      } else {
        setMessage({ ok: false, text: data?.error ?? "Erreur lors de l'enregistrement." });
      }
    } catch {
      setMessage({ ok: false, text: "Erreur réseau, réessayez." });
    }
    setSaving(false);
  }

  return (
    <form onSubmit={submit} className="mt-6 grid max-w-3xl gap-6">
      {/* Compte */}
      <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-100 text-violet-600">
            <UserRound className="h-5 w-5" strokeWidth={1.8} />
          </span>
          <h2 className="font-extrabold text-slate-900">Compte administrateur</h2>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <p className="mb-1.5 text-xs font-semibold text-slate-500">
              Email de connexion
            </p>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="sm:col-span-2">
            <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
              <MapPin className="h-3.5 w-3.5" />
              Adresse
            </p>
            <input
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* Mot de passe */}
      <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-100 text-violet-600">
            <KeyRound className="h-5 w-5" strokeWidth={1.8} />
          </span>
          <h2 className="font-extrabold text-slate-900">Changer le mot de passe</h2>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <input
            type="password"
            placeholder="Nouveau mot de passe (6 caractères min.)"
            value={mdp}
            onChange={(e) => setMdp(e.target.value)}
            className={inputClass}
            minLength={6}
          />
          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            value={mdp2}
            onChange={(e) => setMdp2(e.target.value)}
            className={inputClass}
            minLength={6}
          />
        </div>
        <p className="mt-3 text-xs text-slate-400">
          Laissez vide pour conserver le mot de passe actuel.
        </p>
      </section>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/25 transition hover:opacity-90 disabled:opacity-60"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Enregistrer les modifications
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
    </form>
  );
}
