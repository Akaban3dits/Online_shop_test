"use client";

import { useEffect, useState, useCallback } from "react";
import type { Order, OrderStats } from "./types/order";
import StatsCards from "./components/statscards";
import OrdersTable from "./components/orderstable";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const fetchOrders = useCallback((isManual = false) => {
    if (isManual) setRefreshing(true);

    fetch("http://localhost:3000/orders")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener las órdenes");
        return res.json();
      })
      .then((data) => {
        setOrders(data);
        setError(null);
        setLastUpdated(new Date());
      })
      .catch((err) => setError(err.message))
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOrders();

    const interval = setInterval(() => {
      fetchOrders();
    }, 2 * 60 * 1000);

    return () => clearInterval(interval);
  }, [fetchOrders]);

  const stats: OrderStats = {
    total: orders.length,
    revenue: orders
      .filter((o) => o.status === "paid")
      .reduce((sum, o) => sum + o.amount, 0),
    confirmed: orders.filter((o) => o.status === "paid").length,
    pending: orders.filter((o) => o.status === "pending").length,
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1">
              Panel de pagos
            </p>

            <h1 className="text-3xl font-bold text-slate-900">
              Órdenes recibidas
            </h1>

            <p className="text-slate-500 mt-1">
              Resumen de las transacciones procesadas a través de tu webhook de
              pagos.
            </p>
          </div>

          {/* Botón actualizar */}
          <div className="flex flex-col items-end gap-1.5 mt-1">
            <button
              onClick={() => fetchOrders(true)}
              disabled={refreshing || loading}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-medium rounded-xl shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>

              {refreshing ? "Actualizando..." : "Actualizar"}
            </button>

            {lastUpdated && (
              <p
                suppressHydrationWarning
                className="text-xs text-slate-400"
              >
                Última actualización:{" "}
                {lastUpdated.toLocaleTimeString("es-MX", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            )}
          </div>
        </div>

        {/* KPIs */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-100 p-6 h-28 animate-pulse"
              >
                <div className="h-3 bg-slate-200 rounded w-1/2 mb-3" />
                <div className="h-7 bg-slate-100 rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : (
          <StatsCards stats={stats} />
        )}

        {/* Error */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4 text-sm">
            {error}
          </div>
        )}

        {/* Tabla */}
        {loading ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-8 animate-pulse space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-10 bg-slate-100 rounded-lg" />
            ))}
          </div>
        ) : (
          <OrdersTable orders={orders} />
        )}
      </div>
    </div>
  );
}