"use client";

import { useState } from "react";
import {
  Search,
  Download,
  ShieldCheck,
  ShieldAlert,
  MoreHorizontal,
} from "lucide-react";

const suppliersData = [
  {
    id: "SUP-001",
    name: "PT Kabel Nusantara",
    category: "Fiber Optic",
    score: 92,
    status: "Excellent",
  },
  {
    id: "SUP-002",
    name: "Global Tech Hardware",
    category: "Server & Rack",
    score: 85,
    status: "Good",
  },
  {
    id: "SUP-003",
    name: "Baja Konstruksi Utama",
    category: "Infrastructure",
    score: 64,
    status: "Warning",
  },
  {
    id: "SUP-004",
    name: "Lintas Elektronika",
    category: "Sensors",
    score: 88,
    status: "Good",
  },
  {
    id: "SUP-005",
    name: "Makmur Sentosa Logistik",
    category: "Packaging",
    score: 95,
    status: "Excellent",
  },
  {
    id: "SUP-006",
    name: "Andalas Chemical",
    category: "Chemicals",
    score: 78,
    status: "Good",
  },
  {
    id: "SUP-007",
    name: "Mitra Solusi Digital",
    category: "Software",
    score: 91,
    status: "Excellent",
  },
  {
    id: "SUP-008",
    name: "Borneo Mineral",
    category: "Raw Materials",
    score: 58,
    status: "Warning",
  },
];

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Excellent: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Good: "bg-blue-50 text-blue-700 border-blue-100",
    Warning: "bg-rose-50 text-rose-700 border-rose-100",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-[11px] font-bold border ${styles[status]}`}
    >
      {status === "Warning" ? (
        <ShieldAlert className="w-3 h-3" />
      ) : (
        <ShieldCheck className="w-3 h-3" />
      )}
      {status}
    </span>
  );
}

export default function SuppliersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredSuppliers = suppliersData.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10 px-4 sm:px-6 lg:px-8 pt-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1.5">
            Network
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Supplier Directory
          </h1>
        </div>
        <button
          onClick={() => {
            const blob = new Blob(
              [
                "ID,Name,Category,Score,Status\nSUP-001,PT Kabel Nusantara,Fiber Optic,92,Excellent",
              ],
              { type: "text/csv" },
            );
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "suppliers_export.csv";
            a.click();
          }}
          className="flex items-center gap-2 bg-white border border-slate-300 text-slate-700 px-4 py-2.5 rounded-xl hover:bg-slate-50 text-sm font-semibold shadow-sm"
        >
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col w-full">
        <div className="p-4 border-b border-slate-100 bg-slate-50/40 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name..."
              className="w-full pl-10 pr-3 py-2.5 border rounded-xl text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-[11px] text-slate-400 uppercase tracking-wider bg-slate-50/70 border-b border-slate-100">
              <tr>
                <th className="px-6 py-3.5 font-semibold">Supplier Name</th>
                <th className="px-6 py-3.5 font-semibold">Health Score</th>
                <th className="px-6 py-3.5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSuppliers.map((supplier) => (
                <tr
                  key={supplier.id}
                  className="hover:bg-slate-50/70 transition-colors"
                >
                  <td className="px-6 py-4 font-bold text-slate-900">
                    {supplier.name}
                  </td>
                  <td className="px-6 py-4 font-bold tabular-nums">
                    {supplier.score} / 100
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={supplier.status} />
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
