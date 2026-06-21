"use client";

import { useState } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import POCard from "../components/POCard";
import AnalyticsChart from "../components/AnalyticsChart";
import RiskAlertCard from "../components/RiskAlertCard"; // Import komponen baru!

export default function AssistantPage() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [],
  );
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await res.json();

      if (data.error) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: `❌ Error API: ${data.error}` },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.text },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "❌ Gagal terhubung ke server lokal." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          AI Procurement Assistant
        </h1>
        <p className="text-slate-500">
          Tanyakan wawasan data, performa vendor, draf PO, atau peringatan dini
          risiko.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto rounded-xl border bg-white shadow-sm p-6 mb-4 space-y-6">
        {messages.length === 0 && (
          <div className="flex gap-4">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div className="bg-slate-50 border rounded-2xl rounded-tl-none px-5 py-3 text-sm text-slate-700 max-w-[80%]">
              Halo! Saya asisten pintar SupplyMind. Coba ketik: <br />
              <span className="italic font-semibold text-rose-600">
                "Tolong analisis apakah ada risiko pada transaksi kita saat
                ini?"
              </span>
            </div>
          </div>
        )}

        {messages.map((m, index) => {
          let displayText = m.content;

          // FUNGSI PEMBERSIH & PENGAMBIL JSON OTOMATIS
          const extractJSON = (tag: string) => {
            const startTag = `[${tag}]`;
            const endTag = `[/${tag}]`;
            if (
              m.role === "assistant" &&
              displayText.includes(startTag) &&
              displayText.includes(endTag)
            ) {
              try {
                const startIndex =
                  displayText.indexOf(startTag) + startTag.length;
                const endIndex = displayText.indexOf(endTag);
                const jsonStr = displayText.substring(startIndex, endIndex);

                // Hapus tag JSON dari teks yang ditampilkan ke layar pengguna
                const textToRemove = displayText.substring(
                  displayText.indexOf(startTag),
                  endIndex + endTag.length,
                );
                displayText = displayText.replace(textToRemove, "").trim();

                return JSON.parse(jsonStr);
              } catch (e) {
                return null;
              }
            }
            return null;
          };

          // Eksekusi penarikan data untuk ke-3 fitur
          const poJSON = extractJSON("PO_DATA");
          const chartJSON = extractJSON("CHART_DATA");
          const riskJSON = extractJSON("RISK_WARNING");

          return (
            <div
              key={index}
              className={`flex gap-4 ${m.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${m.role === "user" ? "bg-slate-800" : "bg-blue-600"}`}
              >
                {m.role === "user" ? (
                  <User className="h-5 w-5 text-white" />
                ) : (
                  <Bot className="h-5 w-5 text-white" />
                )}
              </div>
              <div
                className={`rounded-2xl px-5 py-3 text-sm max-w-[85%] shadow-sm ${m.role === "user" ? "bg-blue-600 text-white rounded-tr-none" : "bg-slate-50 border text-slate-700 rounded-tl-none"}`}
              >
                <div className="whitespace-pre-wrap">{displayText}</div>

                {/* 3 KILLER FEATURES RENDERER */}
                {riskJSON && (
                  <div className="mt-4 w-full min-w-[300px]">
                    <RiskAlertCard data={riskJSON} />
                  </div>
                )}
                {poJSON && (
                  <div className="mt-4 w-full min-w-[280px]">
                    <POCard data={poJSON} />
                  </div>
                )}
                {chartJSON && (
                  <div className="mt-4 w-full min-w-[320px] md:min-w-[450px]">
                    <AnalyticsChart data={chartJSON} />
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-4">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div className="bg-slate-50 border rounded-2xl rounded-tl-none px-5 py-3 text-sm text-slate-700 flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-blue-600" /> Sedang
              menganalisis anomali data...
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleFormSubmit} className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          placeholder="Ketik perintah pengadaan di sini..."
          className="w-full rounded-xl border-slate-300 border bg-white px-4 py-4 pr-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:opacity-50 disabled:bg-slate-50"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="absolute right-2 top-2 rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </button>
      </form>
    </div>
  );
}
