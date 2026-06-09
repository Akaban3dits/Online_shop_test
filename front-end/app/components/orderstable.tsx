import type { Order } from "../types/order";
import StatusBadge from "./statusbadge";

function Avatar({ order_id }: { order_id: string }) {
  const colors = [
    "bg-blue-100 text-blue-700",
    "bg-violet-100 text-violet-700",
    "bg-emerald-100 text-emerald-700",
    "bg-amber-100 text-amber-700",
    "bg-rose-100 text-rose-700",
  ];
  const color = colors[parseInt(order_id) % colors.length];

  return (
    <span
      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${color}`}
    >
      #{order_id.slice(-2)}
    </span>
  );
}

export default function OrdersTable({ orders }: { orders: Order[] }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
        <div>
          <h2 className="text-base font-semibold text-slate-800">Órdenes recibidas</h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Listado de las últimas transacciones procesadas.
          </p>
        </div>
        <span className="text-xs bg-slate-100 text-slate-500 font-medium px-3 py-1.5 rounded-full">
          {orders.length} registros
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-slate-400 uppercase tracking-wider border-b border-slate-100">
              <th className="text-left px-6 py-3 font-medium">Orden</th>
              <th className="text-left px-6 py-3 font-medium">Artículos</th>
              <th className="text-left px-6 py-3 font-medium">Estado</th>
              <th className="text-right px-6 py-3 font-medium">Monto</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-12 text-slate-400">
                  No hay órdenes registradas aún.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order.order_id}
                  className="hover:bg-slate-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar order_id={order.order_id} />
                      <span className="font-mono font-semibold text-slate-700">
                        #{order.order_id}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {order.items.map((item) => (
                      <span
                        key={item.sku}
                        className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 text-xs font-medium px-2 py-0.5 rounded-md mr-1"
                      >
                        {item.sku} × {item.qty}
                      </span>
                    ))}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-slate-800">
                    USD {order.amount.toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}