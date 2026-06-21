"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Clock,
  Loader2,
  ArrowRight,
  X,
  Building2,
  CalendarDays,
  Wallet,
  Truck,
  PackageCheck,
  CircleDot,
  Download,
  MessageCircle,
} from "lucide-react";

const txData = [
  {
    id: "PO-2026-089",
    date: "Jun 20, 2026",
    supplier: "PT Kabel Nusantara",
    amount: "$4,500.00",
    status: "Completed",
  },
  {
    id: "PO-2026-090",
    date: "Jun 18, 2026",
    supplier: "Baja Konstruksi Utama",
    amount: "$12,500.00",
    status: "Pending",
  },
  {
    id: "PO-2026-091",
    date: "Jun 15, 2026",
    supplier: "Global Tech Hardware",
    amount: "$8,500.00",
    status: "Processing",
  },
  {
    id: "PO-2026-092",
    date: "Jun 12, 2026",
    supplier: "Makmur Sentosa Logistik",
    amount: "$1,200.00",
    status: "Completed",
  },
  {
    id: "PO-2026-093",
    date: "Jun 10, 2026",
    supplier: "Lintas Elektronika",
    amount: "$3,400.00",
    status: "Completed",
  },
  {
    id: "PO-2026-094",
    date: "Jun 08, 2026",
    supplier: "Andalas Chemical Supply",
    amount: "$6,750.00",
    status: "Processing",
  },
  {
    id: "PO-2026-095",
    date: "Jun 05, 2026",
    supplier: "Mitra Solusi Digital",
    amount: "$15,200.00",
    status: "Completed",
  },
  {
    id: "PO-2026-096",
    date: "Jun 03, 2026",
    supplier: "Borneo Mineral Resources",
    amount: "$22,000.00",
    status: "Pending",
  },
  {
    id: "PO-2026-097",
    date: "May 29, 2026",
    supplier: "Surya Tekstil Indonesia",
    amount: "$5,300.00",
    status: "Completed",
  },
  {
    id: "PO-2026-098",
    date: "May 27, 2026",
    supplier: "Cipta Energi Terbarukan",
    amount: "$31,800.00",
    status: "Completed",
  },
  {
    id: "PO-2026-099",
    date: "May 24, 2026",
    supplier: "Garuda Office Solutions",
    amount: "$980.00",
    status: "Pending",
  },
  {
    id: "PO-2026-100",
    date: "May 21, 2026",
    supplier: "Prima Cyber Security",
    amount: "$9,450.00",
    status: "Processing",
  },
  {
    id: "PO-2026-101",
    date: "May 18, 2026",
    supplier: "Nusantara Precision Parts",
    amount: "$14,600.00",
    status: "Completed",
  },
  {
    id: "PO-2026-102",
    date: "May 15, 2026",
    supplier: "Selat Sunda Freight Co.",
    amount: "$7,100.00",
    status: "Pending",
  },
];

type Transaction = (typeof txData)[number];

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Completed: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Processing: "bg-blue-50 text-blue-700 border-blue-100",
    Pending: "bg-amber-50 text-amber-700 border-amber-100",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-[11px] font-bold border ${styles[status]}`}
    >
      {status === "Completed" && <CheckCircle2 className="w-3 h-3" />}
      {status === "Processing" && <Loader2 className="w-3 h-3 animate-spin" />}
      {status === "Pending" && <Clock className="w-3 h-3" />}
      {status}
    </span>
  );
}

// Maps an order status to how many of the 4 timeline steps are complete
function completedSteps(status: string) {
  if (status === "Completed") return 4;
  if (status === "Processing") return 3;
  return 1;
}

function parseAmount(amount: string) {
  return parseFloat(amount.replace(/[^0-9.-]/g, "")) || 0;
}

function formatCurrency(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

export default function TransactionsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  // Fitur Filter Tab
  const filteredTx =
    activeTab === "All"
      ? txData
      : txData.filter((tx) => tx.status === activeTab);

  const timelineSteps = [
    { label: "Order Created", icon: CircleDot },
    { label: "Approved", icon: CheckCircle2 },
    { label: "Shipped", icon: Truck },
    { label: "Delivered", icon: PackageCheck },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10 px-4 sm:px-6 lg:px-8 pt-6 w-full">
      {/* Header */}
      <div>
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1.5">
          Procurement
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Transaction History
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          List of Purchase Orders (PO) and their current delivery statuses.
        </p>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col w-full">
        {/* Interactive Tabs */}
        <div className="px-4 pt-4 border-b border-slate-100 bg-slate-50/40 flex gap-6 overflow-x-auto no-scrollbar">
          {["All", "Completed", "Processing", "Pending"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === tab
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab} Orders
            </button>
          ))}
        </div>

        {/* Responsive Table Wrapper */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-[11px] text-slate-400 uppercase tracking-wider bg-slate-50/70 border-b border-slate-100">
              <tr>
                <th className="px-6 py-3.5 font-semibold">Order Number</th>
                <th className="px-6 py-3.5 font-semibold">Date</th>
                <th className="px-6 py-3.5 font-semibold">Supplier</th>
                <th className="px-6 py-3.5 font-semibold">Total Amount</th>
                <th className="px-6 py-3.5 font-semibold">Status</th>
                <th className="px-6 py-3.5 font-semibold text-right">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTx.map((tx) => (
                <tr
                  key={tx.id}
                  className="hover:bg-slate-50/70 transition-colors"
                >
                  <td className="px-6 py-4 font-mono text-[13px] font-bold text-slate-900">
                    {tx.id}
                  </td>
                  <td className="px-6 py-4 text-slate-500">{tx.date}</td>
                  <td className="px-6 py-4 font-medium text-slate-700">
                    {tx.supplier}
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900 tabular-nums">
                    {tx.amount}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={tx.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedTx(tx)}
                      className="inline-flex items-center justify-center text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                      View <ArrowRight className="ml-1 w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over backdrop */}
      <div
        onClick={() => setSelectedTx(null)}
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          selectedTx
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Slide-over detail panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[440px] bg-white z-50 shadow-2xl border-l border-slate-200 flex flex-col transform transition-transform duration-300 ease-out ${
          selectedTx ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {selectedTx && (
          <>
            {/* Panel Header */}
            <div className="p-6 border-b border-slate-100 flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
                  Purchase Order
                </p>
                <h2 className="font-mono text-lg font-bold text-slate-900">
                  {selectedTx.id}
                </h2>
                <div className="mt-2">
                  <StatusBadge status={selectedTx.status} />
                </div>
              </div>
              <button
                onClick={() => setSelectedTx(null)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Panel Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-7">
              {/* Quick info grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3.5">
                  <div className="flex items-center gap-1.5 text-slate-400 mb-1.5">
                    <Building2 className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-semibold uppercase tracking-wide">
                      Supplier
                    </span>
                  </div>
                  <p className="text-sm font-bold text-slate-900 leading-tight">
                    {selectedTx.supplier}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3.5">
                  <div className="flex items-center gap-1.5 text-slate-400 mb-1.5">
                    <CalendarDays className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-semibold uppercase tracking-wide">
                      Order Date
                    </span>
                  </div>
                  <p className="text-sm font-bold text-slate-900">
                    {selectedTx.date}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 col-span-2">
                  <div className="flex items-center gap-1.5 text-slate-400 mb-1.5">
                    <Wallet className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-semibold uppercase tracking-wide">
                      Total Amount
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-slate-900 tabular-nums">
                    {selectedTx.amount}
                  </p>
                </div>
              </div>

              {/* Fulfillment timeline */}
              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-4">
                  Fulfillment Status
                </p>
                <div className="space-y-0">
                  {timelineSteps.map((step, idx) => {
                    const done = idx < completedSteps(selectedTx.status);
                    const isLast = idx === timelineSteps.length - 1;
                    const Icon = step.icon;
                    return (
                      <div key={step.label} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                              done
                                ? "bg-emerald-500 text-white"
                                : idx === completedSteps(selectedTx.status)
                                  ? "bg-indigo-100 text-indigo-600"
                                  : "bg-slate-100 text-slate-300"
                            }`}
                          >
                            {done ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              <Icon className="w-3.5 h-3.5" />
                            )}
                          </div>
                          {!isLast && (
                            <div
                              className={`w-0.5 flex-1 min-h-[24px] ${
                                done ? "bg-emerald-300" : "bg-slate-100"
                              }`}
                            />
                          )}
                        </div>
                        <div className="pb-6">
                          <p
                            className={`text-sm font-semibold ${
                              done || idx === completedSteps(selectedTx.status)
                                ? "text-slate-900"
                                : "text-slate-400"
                            }`}
                          >
                            {step.label}
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {done
                              ? "Completed"
                              : idx === completedSteps(selectedTx.status)
                                ? "In progress"
                                : "Awaiting previous step"}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Line items */}
              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Line Items
                </p>
                <div className="rounded-xl border border-slate-100 divide-y divide-slate-100 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 bg-slate-50/60">
                    <span className="text-sm text-slate-600">
                      Goods / Materials
                    </span>
                    <span className="text-sm font-semibold text-slate-900 tabular-nums">
                      {formatCurrency(parseAmount(selectedTx.amount) * 0.75)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-4 py-3 bg-slate-50/60">
                    <span className="text-sm text-slate-600">
                      Logistics &amp; Handling
                    </span>
                    <span className="text-sm font-semibold text-slate-900 tabular-nums">
                      {formatCurrency(parseAmount(selectedTx.amount) * 0.25)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-4 py-3 bg-white">
                    <span className="text-sm font-bold text-slate-900">
                      Total
                    </span>
                    <span className="text-sm font-bold text-slate-900 tabular-nums">
                      {selectedTx.amount}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel Footer */}
            <div className="p-6 border-t border-slate-100 flex gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 flex items-center justify-center gap-2 bg-white border border-slate-300 text-slate-700 px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-sm font-semibold shadow-sm"
              >
                <Download className="w-4 h-4" /> Invoice
              </button>
              <button
                onClick={() => {
                  const email = `support@${selectedTx.supplier.replace(/\s+/g, "").toLowerCase()}.com`;
                  window.location.href = `mailto:${email}?subject=Inquiry regarding ${selectedTx.id}`;
                }}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-4 py-2.5 rounded-xl hover:from-indigo-700 hover:to-violet-700 transition-colors text-sm font-semibold shadow-sm shadow-indigo-600/20"
              >
                <MessageCircle className="w-4 h-4" /> Contact Supplier
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
