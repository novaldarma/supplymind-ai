"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Download,
  ShieldCheck,
  ShieldAlert,
  Loader2,
} from "lucide-react";

type Supplier = {
  id: string;
  name: string;
  category: string;
  score: number;
  status: string;
  location: string;
};

function StatusBadge({ status }: { status: string }) {
  // Mapping status dari AWS agar sesuai dengan style warna UI Anda
  const styles: Record<string, string> = {
    Excellent: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Good: "bg-blue-50 text-blue-700 border-blue-100",
    Warning: "bg-rose-50 text-rose-700 border-rose-100",
    Active: "bg-emerald-50 text-emerald-700 border-emerald-100",
    "Under Review": "bg-rose-50 text-rose-700 border-rose-100",
  };

  const currentStyle =
    styles[status] || "bg-slate-50 text-slate-700 border-slate-100";
  const isAlert = status === "Warning" || status === "Under Review";

  return (
    <span
      className={`inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-[11px] font-bold border ${currentStyle}`}
    >
      {isAlert ? (
        <ShieldAlert className="w-3 h-3" />
      ) : (
        <ShieldCheck className="w-3 h-3" />
      )}
      {status}
    </span>
  );
}

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Mengambil data asli dari AWS DynamoDB lewat API internal
  useEffect(() => {
    async function fetchSuppliers() {
      try {
        const res = await fetch("/api/suppliers");
        const data = await res.json();
        if (Array.isArray(data)) {
          // Menyelaraskan field AWS (riskScore) ke state UI (score)
          const mappedData = data.map((item: any) => ({
            id: item.id,
            name: item.name,
            category: item.category,
            score: item.riskScore,
            status:
              item.riskScore >= 90
                ? "Excellent"
                : item.riskScore >= 75
                  ? "Good"
                  : "Warning",
            location: item.location,
          }));
          setSuppliers(mappedData);
        }
      } catch (error) {
        console.error("Gagal memuat data supplier dari AWS:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSuppliers();
  }, []);

  const filteredSuppliers = suppliers.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Fungsi Export CSV Dinamis menggunakan data asli dari AWS
  const handleExportCSV = () => {
    let csvContent = "ID,Name,Category,Health Score,Status,Location\n";
    filteredSuppliers.forEach((s) => {
      csvContent += `${s.id},${s.name},${s.category},${s.score},${s.status},${s.location}\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "suppliers_aws_export.csv";
    a.click();
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10 px-4 sm:px-6 lg:px-8 pt-6 w-full">
      {/* Header */}
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
          onClick={handleExportCSV}
          disabled={loading}
          className="flex items-center gap-2 bg-white border border-slate-300 text-slate-700 px-4 py-2.5 rounded-xl hover:bg-slate-50 text-sm font-semibold shadow-sm disabled:opacity-50"
        >
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col w-full">
        {/* Search Bar */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/40 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or category..."
              className="w-full pl-10 pr-3 py-2.5 border rounded-xl text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table View */}
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
              {loading ? (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-10 text-center text-slate-400"
                  >
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-indigo-600" />
                    Menghubungkan ke AWS DynamoDB...
                  </td>
                </tr>
              ) : filteredSuppliers.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-10 text-center text-slate-400"
                  >
                    Tidak ada supplier yang ditemukan.
                  </td>
                </tr>
              ) : (
                filteredSuppliers.map((supplier) => (
                  <tr
                    key={supplier.id}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="px-6 py-4 font-bold text-slate-900">
                      <div>
                        <p>{supplier.name}</p>
                        <p className="text-xs text-slate-400 font-normal mt-0.5">
                          {supplier.category} • {supplier.location}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold tabular-nums">
                      {supplier.score} / 100
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={supplier.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
