import { Reply } from "lucide-react";
import { messages } from "@/lib/admin";

export default function AdminMessages() {
  const unread = messages.filter((m) => m.unread).length;

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      {/* En-tête */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
          Messages
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {unread} message{unread > 1 ? "s" : ""} non lu{unread > 1 ? "s" : ""}{" "}
          sur {messages.length}.
        </p>
      </div>

      {/* Liste */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <ul className="divide-y divide-slate-50">
          {messages.map((msg) => (
            <li
              key={msg.id}
              className={`flex gap-4 p-5 transition hover:bg-violet-50/30 ${
                msg.unread ? "bg-violet-50/40" : ""
              }`}
            >
              <span
                className={`grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br ${msg.gradient} text-xs font-bold text-white`}
              >
                {msg.initials}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-slate-900">{msg.name}</p>
                  {msg.unread && (
                    <span className="rounded-full bg-pink-500 px-2 py-0.5 text-[10px] font-bold text-white">
                      Nouveau
                    </span>
                  )}
                  <span className="ml-auto shrink-0 text-xs text-slate-400">
                    {msg.time}
                  </span>
                </div>
                <p className="mt-0.5 text-sm font-semibold text-slate-700">
                  {msg.subject}
                </p>
                <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                  {msg.preview}
                </p>
                <button
                  type="button"
                  className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-600"
                >
                  <Reply className="h-3.5 w-3.5" />
                  Répondre
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
