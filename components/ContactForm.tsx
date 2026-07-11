"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-2xl border border-slate-100 bg-white p-10 text-center shadow-sm">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-green-50 text-green-600">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h2 className="mt-4 text-xl font-extrabold text-slate-900">
          Message envoyé !
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Merci de nous avoir contactés. Notre équipe vous répondra dans les
          plus brefs délais.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Envoyer un autre message
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
      className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8"
    >
      <h2 className="text-xl font-extrabold text-slate-900">
        Envoyez-nous un message
      </h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <input required name="nom" placeholder="Votre nom *" className={inputClass} />
        <input
          required
          type="email"
          name="email"
          placeholder="Votre email *"
          className={inputClass}
        />
        <input name="telephone" placeholder="Votre téléphone" className={inputClass} />
        <input name="sujet" placeholder="Sujet" className={inputClass} />
      </div>
      <textarea
        required
        name="message"
        placeholder="Votre message *"
        rows={5}
        className={`${inputClass} mt-4 resize-none`}
      />
      <button
        type="submit"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/30 transition hover:opacity-90"
      >
        <Send className="h-4 w-4" />
        Envoyer le message
      </button>
    </form>
  );
}
