"use client";

import { useState } from "react";
import {
  User,
  Bot,
  Sparkles,
  TrendingUp,
  Mail,
  CheckCircle,
} from "lucide-react"; // <-- CheckCircle sudah ditambahkan di sini!

export type NegotiationData = {
  supplier: string;
  targetDiscount: string;
  successRate: number;
  ourStrategy: string;
  vendorCounter: string;
};

export default function NegotiationCard({ data }: { data: NegotiationData }) {
  const [simulated, setSimulated] = useState(false);

  // SIHIR FITUR: Ekspor Strategi Negosiasi Langsung ke Email
  const handleExportEmail = () => {
    const emailTo = `sales@${data.supplier.replace(/\s+/g, "").toLowerCase()}.com`;
    const subject = encodeURIComponent(
      `Partnership & Pricing Proposal - ${data.supplier}`,
    );
    const body = encodeURIComponent(
      `Hi ${data.supplier} Team,\n\nWe highly value our ongoing partnership. Regarding our upcoming procurement cycle, we would like to propose the following arrangement:\n\n"${data.ourStrategy}"\n\nWe believe this is mutually beneficial and look forward to your thoughts.\n\nBest Regards,\nSupplyMind Procurement Team`,
    );

    // Buka aplikasi mail default pengguna
    window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;
    setSimulated(true);
  };

  return (
    <div className="my-4 p-3 sm:p-5 border border-slate-200 rounded-xl bg-gradient-to-br from-slate-50 to-blue-50/30 shadow-sm w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 pb-3 mb-4 gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" />
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            AI Negotiation Simulator
          </h3>
        </div>
        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 w-fit">
          <TrendingUp className="w-3 h-3" /> {data.successRate}% Success Rate
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
        <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-blue-700 font-bold">
            <User className="w-4 h-4" /> Recommended Pitch
          </div>
          <p className="text-slate-600 bg-slate-50 p-2 sm:p-3 rounded-lg italic leading-relaxed">
            "{data.ourStrategy}"
          </p>
        </div>

        <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-amber-700 font-bold">
            <Bot className="w-4 h-4" /> Predicted Counter
          </div>
          <p className="text-slate-600 bg-slate-50 p-2 sm:p-3 rounded-lg italic leading-relaxed">
            "{data.vendorCounter}"
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-1">
        <div className="flex flex-wrap justify-between text-[10px] sm:text-xs font-semibold text-slate-500 gap-1">
          <span>Target: {data.targetDiscount} Reduction</span>
          <span>Confidence: High</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${data.successRate}%` }}
          ></div>
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={handleExportEmail}
          disabled={simulated}
          className={`w-full p-2.5 rounded-lg text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 text-center
            ${simulated ? "bg-emerald-100 text-emerald-800 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
        >
          {simulated ? (
            <>
              <CheckCircle className="w-4 h-4" /> Script Exported to Email
            </>
          ) : (
            <>
              <Mail className="w-4 h-4" /> Lock Strategy & Export to Email
            </>
          )}
        </button>
      </div>
    </div>
  );
}
