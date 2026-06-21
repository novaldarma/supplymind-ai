"use client";

import { useState } from "react";
import {
  AlertTriangle,
  ShieldAlert,
  CheckCircle,
  Ban,
  Mail,
} from "lucide-react";

export type RiskData = {
  supplier: string;
  riskLevel: "High" | "Medium" | "Low";
  reason: string;
  affectedPO: string;
  action: string;
};

export default function RiskAlertCard({ data }: { data: RiskData }) {
  const isHighRisk = data.riskLevel === "High";
  const [isEscalated, setIsEscalated] = useState(false);
  const [isHeld, setIsHeld] = useState(false);

  // SIHIR FITUR 4: Buka Aplikasi Email Otomatis dengan Draf Teks dari AI
  const handleSendEmail = () => {
    const emailTo = `manager@${data.supplier.replace(/\s+/g, "").toLowerCase()}.com`;
    const subject = encodeURIComponent(
      `URGENT: Risk Alert - ${data.supplier} Performance`,
    );
    const body = encodeURIComponent(
      `Dear ${data.supplier} Team,\n\nOur AI Procurement System has detected a critical drop in your health score due to: ${data.reason}\n\nThis directly impacts our active order: ${data.affectedPO}.\n\nPlease provide a mitigation plan immediately, or we will have to withhold pending payments.\n\nBest Regards,\nSupplyMind Automated System`,
    );

    // Buka aplikasi mail default pengguna
    window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;
    setIsEscalated(true);
  };

  return (
    <div
      className={`my-4 p-5 border-l-4 rounded-r-xl shadow-sm w-full bg-white
      ${isHighRisk ? "border-l-rose-500" : "border-l-amber-500"}`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className={`p-2 rounded-lg ${isHighRisk ? "bg-rose-100 text-rose-600" : "bg-amber-100 text-amber-600"}`}
        >
          {isHighRisk ? (
            <ShieldAlert className="w-6 h-6" />
          ) : (
            <AlertTriangle className="w-6 h-6" />
          )}
        </div>
        <div>
          <h3
            className={`text-lg font-bold ${isHighRisk ? "text-rose-700" : "text-amber-700"}`}
          >
            System Warning: {data.riskLevel} Risk Detected
          </h3>
          <p className="text-sm font-medium text-slate-700">
            Vendor: {data.supplier}
          </p>
        </div>
      </div>

      <div className="space-y-3 mt-4 text-sm">
        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
          <p className="font-semibold text-slate-800 mb-1">Penyebab Risiko:</p>
          <p className="text-slate-600">{data.reason}</p>
        </div>

        <div className="flex gap-4">
          <div className="flex-1 bg-slate-50 p-3 rounded-lg border border-slate-100">
            <p className="font-semibold text-slate-800 mb-1">
              Transaksi Terdampak:
            </p>
            <p className="font-mono text-slate-600 font-bold">
              {data.affectedPO}
            </p>
          </div>
          <div className="flex-1 bg-blue-50 p-3 rounded-lg border border-blue-100">
            <p className="font-semibold text-blue-800 mb-1">Rekomendasi AI:</p>
            <p className="text-blue-700">{data.action}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        {/* Tombol Email Terintegrasi */}
        <button
          onClick={handleSendEmail}
          disabled={isEscalated}
          className={`flex-1 py-2 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2
            ${isEscalated ? "bg-emerald-100 text-emerald-800 cursor-not-allowed" : "bg-slate-900 text-white hover:bg-slate-800"}`}
        >
          {isEscalated ? (
            <>
              <CheckCircle className="w-4 h-4" /> Email Peringatan Terkirim
            </>
          ) : (
            <>
              <Mail className="w-4 h-4" /> Draft & Kirim Email Teguran
            </>
          )}
        </button>

        <button
          onClick={() => setIsHeld(true)}
          disabled={isHeld}
          className={`flex-1 py-2 px-4 rounded-lg font-semibold transition border flex items-center justify-center gap-2
            ${isHeld ? "bg-rose-100 text-rose-800 border-rose-200 cursor-not-allowed" : "bg-white text-slate-900 border-slate-300 hover:bg-slate-50"}`}
        >
          {isHeld ? (
            <>
              <Ban className="w-4 h-4" /> Pembayaran Ditahan
            </>
          ) : (
            "Tahan Pembayaran"
          )}
        </button>
      </div>
    </div>
  );
}
