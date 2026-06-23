"use client";

import { useState } from "react";
import {
  AlertTriangle,
  ShieldAlert,
  CheckCircle,
  Ban,
  Mail,
  Loader2,
  ChevronRight,
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
  const [emailStatus, setEmailStatus] = useState<
    "idle" | "loading" | "success"
  >("idle");
  const [isHeld, setIsHeld] = useState(false);

  const handleSendEmail = async () => {
    setEmailStatus("loading");

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          supplierName: data.supplier,
          riskScore: data.reason,
        }),
      });

      if (res.ok) {
        setEmailStatus("success");
      } else {
        const resultData = await res.json();
        alert("❌ FAILED: " + resultData.error);
        setEmailStatus("idle");
      }
    } catch (error) {
      alert("❌ CRITICAL ERROR: Network request failed.");
      setEmailStatus("idle");
    }
  };

  // ----------------------------------------------------------------------
  // 🌟 UI SUCCESS SCREEN (Desain Hyper-Modern)
  // ----------------------------------------------------------------------
  if (emailStatus === "success") {
    return (
      <div className="my-5 w-full bg-emerald-50/50 border border-emerald-200 rounded-2xl shadow-sm font-sans flex flex-col items-center justify-center p-8 text-center transition-all animate-in zoom-in-95 duration-300">
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-200 rounded-full animate-ping opacity-20"></div>
          <div className="relative w-14 h-14 bg-gradient-to-tr from-emerald-400 to-emerald-500 text-white rounded-full flex items-center justify-center mb-4 shadow-lg shadow-emerald-200">
            <CheckCircle className="w-7 h-7" strokeWidth={2.5} />
          </div>
        </div>
        <h3 className="text-[17px] font-bold text-slate-900 tracking-tight">
          Warning Successfully Dispatched
        </h3>
        <p className="text-[14px] text-slate-600 font-medium mt-1.5 max-w-sm leading-relaxed">
          The automated mitigation protocol has been executed. An email was sent
          to <strong className="text-slate-900">{data.supplier}</strong> via AWS
          SES.
        </p>
        <button
          onClick={() => setEmailStatus("idle")}
          className="mt-5 text-[13px] font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors"
        >
          View Case Details <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // 🌟 UI NORMAL ALERT CARD (Desain Enterprise SaaS)
  // ----------------------------------------------------------------------
  return (
    <div
      // Penambahan font-sans di sini akan memblokir font serif dari atasnya!
      className={`my-5 w-full bg-white border rounded-2xl shadow-sm font-sans overflow-hidden transition-all
      ${isHighRisk ? "border-rose-200/80 shadow-rose-100/50" : "border-amber-200/80 shadow-amber-100/50"}`}
    >
      {/* Top Header Bar */}
      <div
        className={`px-5 py-4 flex items-start gap-3.5 border-b
        ${isHighRisk ? "bg-rose-50/30 border-rose-100" : "bg-amber-50/30 border-amber-100"}`}
      >
        <div
          className={`p-2.5 rounded-xl flex-shrink-0 shadow-sm
          ${isHighRisk ? "bg-white text-rose-600 border border-rose-100" : "bg-white text-amber-600 border border-amber-100"}`}
        >
          {isHighRisk ? (
            <ShieldAlert className="w-5 h-5" strokeWidth={2.5} />
          ) : (
            <AlertTriangle className="w-5 h-5" strokeWidth={2.5} />
          )}
        </div>
        <div className="pt-0.5">
          <h3
            className={`text-[15px] font-bold tracking-tight
            ${isHighRisk ? "text-rose-700" : "text-amber-700"}`}
          >
            System Warning: {data.riskLevel} Risk Detected
          </h3>
          <p className="text-[13px] font-medium text-slate-500 mt-0.5">
            Vendor Entity:{" "}
            <span className="font-bold text-slate-900">{data.supplier}</span>
          </p>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 space-y-4">
        {/* Risk Factor */}
        <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-100/80">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Primary Risk Factor
          </p>
          <p className="text-[14px] text-slate-700 font-medium leading-relaxed">
            {data.reason}
          </p>
        </div>

        {/* Split Details */}
        <div className="flex gap-3">
          <div className="flex-1 bg-slate-50/80 p-4 rounded-xl border border-slate-100/80">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Affected Transaction
            </p>
            <p className="text-[14px] font-mono font-bold text-slate-800">
              {data.affectedPO}
            </p>
          </div>
          <div className="flex-1 bg-indigo-50/30 p-4 rounded-xl border border-indigo-100/50">
            <p className="text-[11px] font-bold text-indigo-500 uppercase tracking-wider mb-1.5">
              AI Action Plan
            </p>
            <p className="text-[14px] font-bold text-indigo-700">
              {data.action}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-5 pb-5 pt-1 flex gap-3">
        <button
          onClick={handleSendEmail}
          disabled={emailStatus === "loading"}
          className={`flex-[2] py-2.5 px-4 rounded-xl text-[13px] font-bold transition-all flex items-center justify-center gap-2 shadow-sm
            ${
              emailStatus === "loading"
                ? "bg-slate-50 text-slate-400 cursor-not-allowed border border-slate-200"
                : "bg-slate-900 text-white hover:bg-slate-800 hover:shadow-md"
            }`}
        >
          {emailStatus === "loading" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Transmitting to AWS
              SES...
            </>
          ) : (
            <>
              <Mail className="w-4 h-4" /> Dispatch Warning Email
            </>
          )}
        </button>

        <button
          onClick={() => setIsHeld(true)}
          disabled={isHeld}
          className={`flex-[1] py-2.5 px-4 rounded-xl text-[13px] font-bold transition-all border flex items-center justify-center gap-2
            ${
              isHeld
                ? "bg-rose-50 text-rose-600 border-rose-200 cursor-not-allowed"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
            }`}
        >
          {isHeld ? (
            <>
              <Ban className="w-4 h-4" /> Funds Held
            </>
          ) : (
            "Hold Payment"
          )}
        </button>
      </div>
    </div>
  );
}
