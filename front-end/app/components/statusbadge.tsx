import type { Order } from "../types/order";

const statusConfig: Record<
  Order["status"],
  { label: string; dot: string; bg: string; text: string }
> = {
  paid: {
    label: "Pagado",
    dot: "bg-emerald-500",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
  },
  pending: {
    label: "Pendiente",
    dot: "bg-amber-400",
    bg: "bg-amber-50",
    text: "text-amber-700",
  },
  failed: {
    label: "Fallido",
    dot: "bg-red-500",
    bg: "bg-red-50",
    text: "text-red-700",
  },
  refunded: {
    label: "Reembolsado",
    dot: "bg-slate-400",
    bg: "bg-slate-100",
    text: "text-slate-600",
  },
};

export default function StatusBadge({ status }: { status: Order["status"] }) {
  const cfg = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}