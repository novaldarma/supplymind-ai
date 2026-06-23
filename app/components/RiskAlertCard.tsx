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

  // UPGRADE: Terintegrasi langsung dengan API AWS SES backend
  const handleSendEmail = async () => {
    setIsEscalated(true); // Ubah state tombol menjadi loading/sent

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          supplierName: data.supplier,
          riskScore: data.reason, // Mengirim reason sebagai konteks peringatan
        }),
      });

      const resultData = await res.json();

      if (res.ok) {
        alert("✅ SUCCESS: " + resultData.message);
      } else {
        alert("❌ FAILED: " + resultData.error);
        setIsEscalated(false); // Kembalikan tombol jika gagal
      }
    } catch (error) {
      alert("❌ CRITICAL ERROR: Network request failed.");
      setIsEscalated(false); // Kembalikan tombol jika gagal
    }
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
          <p className="font-semibold text-slate-800 mb-1">Risk Factor:</p>
          <p className="text-slate-600">{data.reason}</p>
        </div>

        <div className="flex gap-4">
          <div className="flex-1 bg-slate-50 p-3 rounded-lg border border-slate-100">
            <p className="font-semibold text-slate-800 mb-1">
              Affected Transaction:
            </p>
            <p className="font-mono text-slate-600 font-bold">
              {data.affectedPO}
            </p>
          </div>
          <div className="flex-1 bg-blue-50 p-3 rounded-lg border border-blue-100">
            <p className="font-semibold text-blue-800 mb-1">
              AI Recommendation:
            </p>
            <p className="text-blue-700">{data.action}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        {/* Integrated Email Button */}
        <button
          onClick={handleSendEmail}
          disabled={isEscalated}
          className={`flex-1 py-2 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2
            ${isEscalated ? "bg-emerald-100 text-emerald-800 cursor-not-allowed" : "bg-slate-900 text-white hover:bg-slate-800"}`}
        >
          {isEscalated ? (
            <>
              <CheckCircle className="w-4 h-4" /> Warning Email Sent
            </>
          ) : (
            <>
              <Mail className="w-4 h-4" /> Draft & Send Warning Email
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
              <Ban className="w-4 h-4" /> Payment Held
            </>
          ) : (
            "Hold Payment"
          )}
        </button>
      </div>
    </div>
  );
}
