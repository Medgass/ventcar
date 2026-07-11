import type { VehicleStatus } from "@/lib/admin";

const styles: Record<VehicleStatus, { chip: string; dot: string }> = {
  Disponible: { chip: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
  Réservé: { chip: "bg-amber-50 text-amber-700", dot: "bg-amber-500" },
  Vendu: { chip: "bg-slate-100 text-slate-600", dot: "bg-slate-400" },
};

export default function StatusBadge({ status }: { status: VehicleStatus }) {
  const s = styles[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${s.chip}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
}
