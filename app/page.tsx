"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Activity,
  ShoppingCart,
  DollarSign,
  ArrowUpRight,
  AlertCircle,
  CheckCircle2,
  Clock,
  Loader2,
  Sparkles,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

type MetricColor = "blue" | "emerald" | "amber" | "violet";

// Mapping warna untuk metrik
const colorStyles: Record<MetricColor, { bg: string; text: string }> = {
  blue: { bg: "bg-blue-50", text: "text-blue-600" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-600" },
  amber: { bg: "bg-amber-50", text: "text-amber-600" },
  violet: { bg: "bg-violet-50", text: "text-violet-600" },
};

export default function Dashboard() {
  const router = useRouter();

  // State untuk menyimpan data dari AWS DynamoDB
  const [transactions, setTransactions] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk mengambil data dari API saat halaman dimuat
  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [txRes, supRes] = await Promise.all([
          fetch("/api/transactions"),
          fetch("/api/suppliers"),
        ]);

        const txData = await txRes.json();
        const supData = await supRes.json();

        if (Array.isArray(txData)) setTransactions(txData);
        if (Array.isArray(supData)) setSuppliers(supData);
      } catch (error) {
        console.error("Gagal memuat data Dashboard:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  // -------------------------------------------------------------
  // LOGIKA PERHITUNGAN DINAMIS
  // -------------------------------------------------------------

  const totalSuppliers = suppliers.length;

  // Menghitung rata-rata Health Score
  const avgHealthScore =
    totalSuppliers > 0
      ? Math.round(
          suppliers.reduce((acc, curr) => acc + (curr.riskScore || 0), 0) /
            totalSuppliers,
        )
      : 0;

  // Menghitung order yang belum selesai
  const activeOrders = transactions.filter(
    (tx) => tx.status !== "Completed",
  ).length;

  // Membersihkan format string nominal (misal: "$12,500.00") menjadi angka murni untuk dihitung
  const parseAmount = (val: string | number) => {
    if (typeof val === "number") return val;
    if (!val) return 0;
    return parseFloat(val.toString().replace(/[^0-9.-]/g, "")) || 0;
  };

  const totalSpend = transactions.reduce(
    (acc, curr) => acc + parseAmount(curr.amount),
    0,
  );
  const formattedSpend =
    totalSpend >= 1000
      ? `$${(totalSpend / 1000).toFixed(1)}k`
      : `$${totalSpend.toFixed(2)}`;

  // Menyiapkan Array Metrik Dinamis untuk dirender
  const dynamicMetrics = [
    {
      title: "Total Suppliers",
      val: totalSuppliers.toString(),
      icon: Users,
      color: "blue" as MetricColor,
      sub: "Active in AWS Cloud",
      subIcon: ArrowUpRight,
      subColor: "text-emerald-600",
    },
    {
      title: "Avg Health Score",
      val: avgHealthScore.toString(),
      suffix: " / 100",
      icon: Activity,
      color: "emerald" as MetricColor,
      sub: "Real-time average",
      subIcon: Activity,
      subColor: "text-emerald-600",
    },
    {
      title: "Active Orders",
      val: activeOrders.toString(),
      icon: ShoppingCart,
      color: "amber" as MetricColor,
      sub: "Requires fulfillment",
      subIcon: Clock,
      subColor: "text-amber-600",
    },
    {
      title: "Total Spend",
      val: formattedSpend,
      icon: DollarSign,
      color: "violet" as MetricColor,
      sub: "Total PO Records",
      subIcon: DollarSign,
      subColor: "text-violet-600",
    },
  ];

  // Mengambil data untuk tabel dan list (dibatasi jumlahnya)
  const recentTransactions = transactions.slice(0, 3);

  // Mengurutkan supplier dari skor terendah ke tertinggi untuk Risk Watchlist (Ambil 2 terburuk)
  const atRiskSuppliers = [...suppliers]
    .sort((a, b) => (a.riskScore || 0) - (b.riskScore || 0))
    .slice(0, 2);

  // Helper untuk styling status transaksi
  const getTxStatusUI = (status: string) => {
    switch (status) {
      case "Completed":
        return {
          bg: "bg-emerald-50 text-emerald-700 border-emerald-100",
          icon: CheckCircle2,
          spin: false,
        };
      case "Processing":
        return {
          bg: "bg-blue-50 text-blue-700 border-blue-100",
          icon: Loader2,
          spin: true,
        };
      case "Pending":
        return {
          bg: "bg-amber-50 text-amber-700 border-amber-100",
          icon: Clock,
          spin: false,
        };
      case "In Transit":
        return {
          bg: "bg-purple-50 text-purple-700 border-purple-100",
          icon: Truck,
          spin: false,
        };
      default:
        return {
          bg: "bg-slate-50 text-slate-700 border-slate-100",
          icon: Activity,
          spin: false,
        };
    }
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] w-full items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          <p className="text-sm font-semibold text-slate-500 animate-pulse">
            Syncing Dashboard with AWS DynamoDB...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-10 px-4 sm:px-6 lg:px-8 pt-6 w-full">
      <div>
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1.5">
          Overview
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Dashboard
        </h1>
        <p className="text-slate-500 mt-1.5 text-[15px]">
          Live overview of supplier network performance and transaction
          activities pulled from AWS.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Metric Cards */}
        {dynamicMetrics.map((m) => {
          const styles = colorStyles[m.color];
          const Icon = m.icon;
          const SubIcon = m.subIcon;
          return (
            <div
              key={m.title}
              className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200"
            >
              <div className="flex items-center justify-between pb-3">
                <h3 className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  {m.title}
                </h3>
                <div className={`p-2 ${styles.bg} rounded-lg`}>
                  <Icon
                    className={`h-4 w-4 ${styles.text}`}
                    strokeWidth={2.25}
                  />
                </div>
              </div>
              <p className="text-[28px] leading-none font-bold text-slate-900 tabular-nums">
                {m.val}{" "}
                {m.suffix && (
                  <span className="text-base font-semibold text-slate-300">
                    {m.suffix}
                  </span>
                )}
              </p>
              <p
                className={`text-[13px] font-medium ${m.subColor} flex items-center mt-3`}
              >
                <SubIcon className="h-3.5 w-3.5 mr-1" /> {m.sub}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* RECENT TRANSACTIONS TABLE */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 sm:p-6 border-b border-slate-100 flex justify-between items-center">
            <div>
              <h2 className="text-[15px] font-bold text-slate-900">
                Recent Transactions
              </h2>
              <p className="text-[13px] text-slate-500 mt-0.5">
                Latest purchase orders from your network.
              </p>
            </div>
            <button
              onClick={() => router.push("/transactions")}
              className="text-[13px] font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              View All
            </button>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm text-left text-slate-600">
              <thead className="text-[11px] text-slate-400 uppercase tracking-wider bg-slate-50/70 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3.5 font-semibold">Order ID</th>
                  <th className="px-6 py-3.5 font-semibold">Supplier</th>
                  <th className="px-6 py-3.5 font-semibold">Status</th>
                  <th className="px-6 py-3.5 font-semibold text-right">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentTransactions.map((tx, idx) => {
                  const UI = getTxStatusUI(tx.status);
                  const StatusIcon = UI.icon;
                  return (
                    <tr
                      key={idx}
                      className="hover:bg-slate-50/70 transition-colors"
                    >
                      <td className="px-6 py-4 font-mono text-[13px] font-semibold text-slate-900">
                        {tx.id}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-700">
                        {tx.supplier}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-[11px] font-bold border ${UI.bg}`}
                        >
                          <StatusIcon
                            className={`w-3 h-3 ${UI.spin ? "animate-spin" : ""}`}
                          />
                          {tx.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-900 text-right tabular-nums">
                        {typeof tx.amount === "number"
                          ? `$${tx.amount.toLocaleString()}`
                          : tx.amount}
                      </td>
                    </tr>
                  );
                })}
                {recentTransactions.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-8 text-center text-slate-400"
                    >
                      No recent transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* RISK WATCHLIST */}
        <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 sm:p-6 border-b border-slate-100">
            <h2 className="text-[15px] font-bold text-slate-900">
              Risk Watchlist
            </h2>
            <p className="text-[13px] text-slate-500 mt-0.5">
              Suppliers automatically flagged by lowest health scores.
            </p>
          </div>
          <div className="p-5 sm:p-6 flex-1 space-y-5">
            {atRiskSuppliers.map((supplier, idx) => {
              const score = supplier.riskScore || 0;
              const isCritical = score < 70;
              const barColor = isCritical
                ? "from-rose-500 to-rose-400"
                : "from-amber-500 to-amber-400";
              const textColor = isCritical ? "text-rose-600" : "text-amber-600";
              const bgIcon = isCritical ? "bg-rose-50" : "bg-amber-50";

              return (
                <div
                  key={idx}
                  className={`group ${idx > 0 ? "pt-5 border-t border-slate-100" : ""}`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-md ${bgIcon}`}>
                        <AlertCircle className={`w-3.5 h-3.5 ${textColor}`} />
                      </div>
                      <span
                        className="text-[13px] font-bold text-slate-900 truncate max-w-[140px]"
                        title={supplier.name}
                      >
                        {supplier.name}
                      </span>
                    </div>
                    <span
                      className={`text-[13px] font-extrabold tabular-nums ${textColor}`}
                    >
                      {score} / 100
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 mb-2 overflow-hidden">
                    <div
                      className={`bg-gradient-to-r ${barColor} h-1.5 rounded-full transition-all group-hover:opacity-80`}
                      style={{ width: `${score}%` }}
                    ></div>
                  </div>
                  <p className="text-xs font-medium text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    {isCritical
                      ? "Critical score detected. High risk of supply chain disruption."
                      : "Score dropped. Requires monitoring to prevent future issues."}
                  </p>
                </div>
              );
            })}
            {atRiskSuppliers.length === 0 && (
              <p className="text-sm text-center text-slate-400 pt-4">
                All suppliers are currently healthy.
              </p>
            )}
          </div>

          {/* AI ASSISTANT ACTION */}
          <div className="p-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-center hover:from-indigo-700 hover:to-violet-700 transition-colors cursor-pointer mt-auto">
            <button
              onClick={() => router.push("/assistant")}
              className="text-[13px] font-bold text-white flex items-center justify-center gap-2 w-full"
            >
              <Sparkles className="w-4 h-4" /> Ask AI for Mitigation Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
