import Link from "next/link";
import {
  ArrowRight,
  Car,
  Megaphone,
  MessageSquare,
  Plus,
  TrendingUp,
  Wallet,
} from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import { messages, monthlySales, vehicleStatuses } from "@/lib/admin";
import { readContent } from "@/lib/content";
import { formatPrice } from "@/lib/vehicles";

export default async function AdminDashboard() {
  const content = await readContent();
  const vehicles = content.vehicules;
  const maxSales = Math.max(...monthlySales.map((m) => m.value));
  const recentVehicles = vehicles.slice(0, 5);
  const recentMessages = messages.slice(0, 3);

  const stats = [
    {
      icon: Car,
      label: "Véhicules en stock",
      value: String(vehicles.length),
      trend: "+2 ce mois",
    },
    { icon: Wallet, label: "Ventes du mois", value: "19", trend: "+12% vs juin" },
    {
      icon: MessageSquare,
      label: "Messages non lus",
      value: String(messages.filter((m) => m.unread).length),
      trend: "3 aujourd'hui",
    },
    {
      icon: Megaphone,
      label: "Annonces actives",
      value: "12",
      trend: "+4 cette semaine",
    },
  ];

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      {/* En-tête */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
            Tableau de bord
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Bonjour Admin, voici l&apos;activité de votre agence.
          </p>
        </div>
        <Link
          href="/admin/vehicules/nouveau"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/25 transition hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Ajouter un véhicule
        </Link>
      </div>

      {/* Statistiques */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-violet-100 text-violet-600">
                <stat.icon className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-700">
                <TrendingUp className="h-3 w-3" />
                {stat.trend}
              </span>
            </div>
            <p className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">
              {stat.value}
            </p>
            <p className="mt-0.5 text-sm text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        {/* Graphique des ventes */}
        <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-slate-900">
              Ventes des 6 derniers mois
            </h2>
            <span className="text-xs text-slate-400">Véhicules vendus</span>
          </div>

          <div className="relative mt-6">
            <div className="pointer-events-none absolute inset-x-0 top-0 flex h-44 flex-col justify-between">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="border-t border-slate-100" />
              ))}
            </div>

            <div className="relative flex h-44 items-end gap-3 sm:gap-5">
              {monthlySales.map((m) => (
                <div
                  key={m.month}
                  className="group relative flex h-full flex-1 flex-col items-center justify-end"
                >
                  <span className="pointer-events-none absolute -top-1 hidden -translate-y-full rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs font-semibold text-white shadow-lg group-hover:block">
                    {m.value} ventes
                  </span>
                  {m.value === maxSales && (
                    <span className="mb-1.5 text-xs font-bold text-slate-700">
                      {m.value}
                    </span>
                  )}
                  <div
                    role="img"
                    aria-label={`${m.month} : ${m.value} ventes`}
                    style={{ height: `${(m.value / maxSales) * 100}%` }}
                    className="w-full max-w-12 rounded-t-[4px] bg-violet-600 transition group-hover:bg-violet-700"
                  />
                </div>
              ))}
            </div>

            <div className="mt-2 flex gap-3 sm:gap-5">
              {monthlySales.map((m) => (
                <p
                  key={m.month}
                  className="flex-1 text-center text-xs font-medium text-slate-400"
                >
                  {m.month}
                </p>
              ))}
            </div>
          </div>

          {/* Table accessible (lecteurs d'écran) */}
          <table className="sr-only">
            <caption>Ventes des 6 derniers mois</caption>
            <thead>
              <tr>
                <th>Mois</th>
                <th>Ventes</th>
              </tr>
            </thead>
            <tbody>
              {monthlySales.map((m) => (
                <tr key={m.month}>
                  <td>{m.month}</td>
                  <td>{m.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Messages récents */}
        <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-slate-900">Messages récents</h2>
            <Link
              href="/admin/messages"
              className="inline-flex items-center gap-1 text-xs font-semibold text-violet-600 transition hover:text-violet-800"
            >
              Tout voir
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <ul className="mt-4 space-y-3">
            {recentMessages.map((msg) => (
              <li key={msg.id}>
                <Link
                  href="/admin/messages"
                  className="flex gap-3 rounded-xl border border-slate-100 p-3.5 transition hover:border-violet-200 hover:bg-violet-50/40"
                >
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br ${msg.gradient} text-xs font-bold text-white`}
                  >
                    {msg.initials}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-bold text-slate-900">
                        {msg.name}
                      </p>
                      {msg.unread && (
                        <span className="h-2 w-2 shrink-0 rounded-full bg-pink-500" />
                      )}
                      <span className="ml-auto shrink-0 text-[11px] text-slate-400">
                        {msg.time}
                      </span>
                    </div>
                    <p className="truncate text-xs font-semibold text-slate-600">
                      {msg.subject}
                    </p>
                    <p className="truncate text-xs text-slate-400">
                      {msg.preview}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Derniers véhicules */}
      <section className="mt-6 rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="flex items-center justify-between p-6 pb-4">
          <h2 className="font-extrabold text-slate-900">Derniers véhicules</h2>
          <Link
            href="/admin/vehicules"
            className="inline-flex items-center gap-1 text-xs font-semibold text-violet-600 transition hover:text-violet-800"
          >
            Gérer les véhicules
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-y border-slate-100 bg-slate-50/60 text-xs uppercase tracking-wide text-slate-400">
                <th className="px-6 py-3 font-semibold">Véhicule</th>
                <th className="px-6 py-3 font-semibold">Catégorie</th>
                <th className="px-6 py-3 font-semibold">Année</th>
                <th className="px-6 py-3 font-semibold">Prix</th>
                <th className="px-6 py-3 font-semibold">Statut</th>
              </tr>
            </thead>
            <tbody>
              {recentVehicles.map((v) => (
                <tr
                  key={v.id}
                  className="border-b border-slate-50 transition hover:bg-violet-50/30"
                >
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <span className="block h-10 w-14 overflow-hidden rounded-lg bg-slate-100">
                        <img
                          src={v.img}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </span>
                      <span className="font-bold text-slate-900">{v.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-slate-500">{v.category}</td>
                  <td className="px-6 py-3 text-slate-500">{v.year}</td>
                  <td className="px-6 py-3 font-bold text-indigo-950">
                    {formatPrice(v.price)}
                  </td>
                  <td className="px-6 py-3">
                    <StatusBadge
                      status={v.status ?? vehicleStatuses[v.id] ?? "Disponible"}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
