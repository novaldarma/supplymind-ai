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
];

export default function SuppliersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Fitur Pencarian Otomatis
  const filteredSuppliers = suppliersData.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10 px-4 sm:px-6 lg:px-8 pt-6 w-full">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Supplier Directory
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Monitor health scores and performance of every vendor in your
            network.
          </p>
        </div>
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 transition text-sm font-semibold shadow-sm">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col w-full">
        {/* Search Bar */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search by supplier name or category..."
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent sm:text-sm transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Responsive Table Wrapper (Ini kunci agar tidak hancur di HP) */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-semibold">Supplier Name</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Health Score</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSuppliers.map((supplier) => (
                <tr
                  key={supplier.id}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">
                      {supplier.name}
                    </div>
                    <div className="text-xs text-slate-500">{supplier.id}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {supplier.category}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-slate-900 w-8">
                        {supplier.score}
                      </span>
                      <div className="w-24 bg-slate-100 rounded-full h-2 hidden sm:block">
                        <div
                          className={`h-2 rounded-full ${supplier.score >= 90 ? "bg-emerald-500" : supplier.score >= 75 ? "bg-amber-500" : "bg-rose-500"}`}
                          style={{ width: `${supplier.score}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 py-1 px-2.5 rounded-md text-xs font-bold
                      ${
                        supplier.status === "Excellent"
                          ? "bg-emerald-100 text-emerald-800"
                          : supplier.status === "Good"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      {supplier.status === "Warning" ? (
                        <ShieldAlert className="w-3.5 h-3.5" />
                      ) : (
                        <ShieldCheck className="w-3.5 h-3.5" />
                      )}
                      {supplier.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredSuppliers.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-slate-500"
                  >
                    No suppliers found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
