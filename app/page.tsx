"use client"; // ✅ wajib untuk menggunakan useRouter

import {
  Users,
  Activity,
  ShoppingCart,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle,
  CheckCircle2,
  Clock,
  Loader2,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

type MetricColor = "blue" | "emerald" | "amber" | "violet";

interface Metric {
  title: string;
  val: string;
  suffix?: string;
  icon: LucideIcon;
  color: MetricColor;
  sub: string;
  subIcon: LucideIcon;
  subColor: string;
}

// Mapping warna untuk menghindari dynamic Tailwind class
const colorStyles: Record<MetricColor, { bg: string; text: string }> = {
  blue: { bg: "bg-blue-50", text: "text-blue-600" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-600" },
  amber: { bg: "bg-amber-50", text: "text-amber-600" },
  violet: { bg: "bg-violet-50", text: "text-violet-600" },
};

const metrics: Metric[] = [
  {
    title: "Total Suppliers",
    val: "5",
    icon: Users,
    color: "blue",
    sub: "+1 this month",
    subIcon: ArrowUpRight,
    subColor: "text-emerald-600",
  },
  {
    title: "Avg Health Score",
    val: "87",
    suffix: " / 100",
    icon: Activity,
    color: "emerald",
    sub: "+2.4 pts improvement",
    subIcon: ArrowUpRight,
    subColor: "text-emerald-600",
  },
  {
    title: "Active Orders",
    val: "12",
    icon: ShoppingCart,
    color: "amber",
    sub: "3 pending approval",
    subIcon: Clock,
    subColor: "text-amber-600",
  },
  {
    title: "Monthly Spend",
    val: "$267.5k",
    icon: DollarSign,
    color: "violet",
    sub: "-4.1% vs last month",
    subIcon: ArrowDownRight,
    subColor: "text-rose-600",
  },
];

export default function Dashboard() {
  const router = useRouter(); // ✅ router sekarang tersedia

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
          Overview of supplier network performance and recent transaction
          activities.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Metric Cards */}
        {metrics.map((m) => {
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
            <button className="text-[13px] font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
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
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-6 py-4 font-mono text-[13px] font-semibold text-slate-900">
                    PO-2026-090
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700">
                    Baja Konstruksi Utama
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-100">
                      <Clock className="w-3 h-3" /> Pending
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900 text-right tabular-nums">
                    $12,500.00
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-6 py-4 font-mono text-[13px] font-semibold text-slate-900">
                    PO-2026-089
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700">
                    PT Kabel Nusantara
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                      <CheckCircle2 className="w-3 h-3" /> Completed
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900 text-right tabular-nums">
                    $4,500.00
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-6 py-4 font-mono text-[13px] font-semibold text-slate-900">
                    PO-2026-091
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700">
                    Global Tech Hardware
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
                      <Loader2 className="w-3 h-3 animate-spin" /> Processing
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900 text-right tabular-nums">
                    $8,500.00
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 sm:p-6 border-b border-slate-100">
            <h2 className="text-[15px] font-bold text-slate-900">
              Risk Watchlist
            </h2>
            <p className="text-[13px] text-slate-500 mt-0.5">
              Suppliers requiring immediate attention.
            </p>
          </div>
          <div className="p-5 sm:p-6 flex-1 space-y-5">
            <div className="group">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-rose-50 rounded-md">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                  </div>
                  <span className="text-[13px] font-bold text-slate-900">
                    Baja Konstruksi Utama
                  </span>
                </div>
                <span className="text-[13px] font-extrabold text-rose-600 tabular-nums">
                  64 / 100
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 mb-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-rose-500 to-rose-400 h-1.5 rounded-full transition-all group-hover:opacity-80"
                  style={{ width: "64%" }}
                ></div>
              </div>
              <p className="text-xs font-medium text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                Delivery delays reported. High risk of disruption.
              </p>
            </div>
            <div className="group pt-5 border-t border-slate-100">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-amber-50 rounded-md">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  </div>
                  <span className="text-[13px] font-bold text-slate-900">
                    Global Tech Hardware
                  </span>
                </div>
                <span className="text-[13px] font-extrabold text-amber-600 tabular-nums">
                  85 / 100
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 mb-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-500 to-amber-400 h-1.5 rounded-full transition-all group-hover:opacity-80"
                  style={{ width: "85%" }}
                ></div>
              </div>
              <p className="text-xs font-medium text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                Score dropped 3 points this month due to minor issues.
              </p>
            </div>
          </div>
          <div className="p-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-center hover:from-indigo-700 hover:to-violet-700 transition-colors cursor-pointer">
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
