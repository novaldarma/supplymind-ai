"use client";

import { useState } from "react";
import { Filter, CheckCircle2, Clock, Loader2, ArrowRight } from "lucide-react";

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
];

export default function TransactionsPage() {
  const [activeTab, setActiveTab] = useState("All");

  // Fitur Filter Tab
  const filteredTx =
    activeTab === "All"
      ? txData
      : txData.filter((tx) => tx.status === activeTab);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10 px-4 sm:px-6 lg:px-8 pt-6 w-full">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Transaction History
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          List of Purchase Orders (PO) and their current delivery statuses.
        </p>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col w-full">
        {/* Interactive Tabs */}
        <div className="px-4 pt-4 border-b border-slate-100 bg-slate-50/50 flex gap-6 overflow-x-auto no-scrollbar">
          {["All", "Completed", "Processing", "Pending"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === tab
                  ? "border-blue-600 text-blue-600"
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
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-semibold">Order Number</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Supplier</th>
                <th className="px-6 py-4 font-semibold">Total Amount</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTx.map((tx) => (
                <tr
                  key={tx.id}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  <td className="px-6 py-4 font-bold text-slate-900">
                    {tx.id}
                  </td>
                  <td className="px-6 py-4 text-slate-500">{tx.date}</td>
                  <td className="px-6 py-4 font-medium text-slate-700">
                    {tx.supplier}
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900">
                    {tx.amount}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 py-1 px-2.5 rounded-md text-xs font-bold
                      ${
                        tx.status === "Completed"
                          ? "bg-emerald-100 text-emerald-800"
                          : tx.status === "Processing"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {tx.status === "Completed" && (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      )}
                      {tx.status === "Processing" && (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      )}
                      {tx.status === "Pending" && (
                        <Clock className="w-3.5 h-3.5" />
                      )}
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="inline-flex items-center justify-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition">
                      View <ArrowRight className="ml-1 w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
