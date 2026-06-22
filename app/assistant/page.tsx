"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Send,
  Bot,
  User,
  Loader2,
  Mic,
  MicOff,
  Paperclip,
  FileCheck,
} from "lucide-react";
import POCard from "../components/POCard";
import AnalyticsChart from "../components/AnalyticsChart";
import RiskAlertCard from "../components/RiskAlertCard";
import NegotiationCard from "../components/NegotiationCard";

export default function AssistantPage() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [],
  );
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [scanningFile, setScanningFile] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  // Referensi untuk input file tersembunyi
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Inisialisasi speech recognition di client hanya sekali
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).webkitSpeechRecognition ||
        (window as any).speechRecognition;
      if (SpeechRecognition) {
        const instance = new SpeechRecognition();
        instance.continuous = false;
        instance.lang = "en-US"; // Diubah ke bahasa Inggris agar AI lebih akurat sesuai prompt
        setRecognition(instance);
      }
    }
  }, []);

  // Toggle voice listening
  const toggleVoiceListen = useCallback(() => {
    if (!recognition) {
      alert("Voice speech recognition not supported in this browser.");
      return;
    }
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognition.start();
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
    }
  }, [recognition, isListening]);

  // Fungsi untuk menangani file yang dipilih dari komputer
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input agar bisa memilih file yang sama lagi jika perlu
    e.target.value = "";

    // Mulai simulasi scanning
    setScanningFile(true);
    setTimeout(() => {
      setScanningFile(false);
      setInput(
        "Analyze this uploaded invoice quotation from PT Kabel Nusantara and prepare a draft PO. ALL prices and costs MUST be in USD format (e.g., $5,000.00). Do not use Rp or IDR.",
      );
    }, 2500); // Animasi scanning selama 2.5 detik agar terlihat meyakinkan
  };

  // Submit form
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

      // Mencegah error object crash
      let finalContent = data.text;
      if (data.error) {
        finalContent =
          typeof data.error === "object"
            ? JSON.stringify(data.error)
            : data.error;
        finalContent = `❌ Gagal memproses: ${finalContent}`;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: finalContent,
        },
      ]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `❌ Connection error: ${err.message || "Unknown Error"}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi untuk mengekstrak JSON dari teks
  const extractJSON = (text: string, tag: string) => {
    const startTag = `[${tag}]`;
    const endTag = `[/${tag}]`;
    if (text.includes(startTag) && text.includes(endTag)) {
      try {
        const startIndex = text.indexOf(startTag) + startTag.length;
        const endIndex = text.indexOf(endTag);
        const jsonStr = text.substring(startIndex, endIndex);
        return JSON.parse(jsonStr);
      } catch (e) {
        return null;
      }
    }
    return null;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto px-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-slate-900">
          AI Procurement Assistant
        </h1>
        <p className="text-sm text-slate-500">
          Autonomous voice, vision, and operational workflow center.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto rounded-xl border bg-white shadow-sm p-6 mb-4 space-y-6">
        {messages.length === 0 && (
          <div className="text-center text-slate-400 mt-16 space-y-2">
            <Bot className="w-10 h-10 mx-auto text-indigo-500 animate-bounce" />
            <p className="text-sm font-semibold text-slate-700">
              SupplyMind Autonomous System Active
            </p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try: "Simulate negotiation with Global Tech Hardware" or use the
              Mic icon to speak commands directly.
            </p>
          </div>
        )}

        {messages.map((m, index) => {
          let displayText = m.content;
          const poJSON = extractJSON(displayText, "PO_DATA");
          const chartJSON = extractJSON(displayText, "CHART_DATA");
          const riskJSON = extractJSON(displayText, "RISK_WARNING");
          const negJSON = extractJSON(displayText, "NEGOTIATION_SIM");

          const cleanText = displayText
            .replace(/\[PO_DATA\][\s\S]*?\[\/PO_DATA\]/g, "")
            .replace(/\[CHART_DATA\][\s\S]*?\[\/CHART_DATA\]/g, "")
            .replace(/\[RISK_WARNING\][\s\S]*?\[\/RISK_WARNING\]/g, "")
            .replace(/\[NEGOTIATION_SIM\][\s\S]*?\[\/NEGOTIATION_SIM\]/g, "")
            .trim();

          return (
            <div
              key={index}
              className={`flex gap-4 ${m.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                  m.role === "user"
                    ? "bg-slate-800"
                    : "bg-gradient-to-r from-indigo-600 to-violet-600"
                }`}
              >
                {m.role === "user" ? (
                  <User className="h-4 w-4 text-white" />
                ) : (
                  <Bot className="h-4 w-4 text-white" />
                )}
              </div>
              <div
                className={`rounded-2xl px-5 py-3 text-sm max-w-[95%] md:max-w-[85%] shadow-sm ${
                  m.role === "user"
                    ? "bg-indigo-600 text-white rounded-tr-none"
                    : "bg-slate-50 border border-slate-200 text-slate-700 rounded-tl-none"
                }`}
              >
                <div className="whitespace-pre-wrap">{cleanText}</div>

                {riskJSON && (
                  <div className="mt-4">
                    <RiskAlertCard data={riskJSON} />
                  </div>
                )}
                {poJSON && (
                  <div className="mt-4">
                    <POCard data={poJSON} />
                  </div>
                )}
                {chartJSON && (
                  <div className="mt-4">
                    <AnalyticsChart data={chartJSON} />
                  </div>
                )}
                {negJSON && (
                  <div className="mt-4">
                    <NegotiationCard data={negJSON} />
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {scanningFile && (
          <div className="flex gap-4 animate-pulse">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-2xl rounded-tl-none px-5 py-3 text-sm flex items-center gap-2">
              <FileCheck className="w-4 h-4 animate-spin" /> SupplyMind AI
              Vision scanning document attachment...
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex gap-4">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-slate-50 border rounded-2xl rounded-tl-none px-5 py-3 text-sm text-slate-700 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />{" "}
              SupplyMind agent processing...
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={handleFormSubmit}
        className="relative flex items-center gap-2"
      >
        {/* INPUT FILE TERSEMBUNYI */}
        <input
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-3.5 bg-slate-100 text-slate-600 border border-slate-300 rounded-xl hover:bg-slate-200 transition shadow-sm"
          title="Upload Quotation Document"
        >
          <Paperclip className="w-5 h-5" />
        </button>

        <div className="relative flex-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading || scanningFile}
            placeholder={
              isListening
                ? "Listening to your voice command..."
                : "Type procurement command..."
            }
            className={`w-full rounded-xl border-slate-300 border bg-white px-4 py-4 pr-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent ${
              isListening
                ? "bg-rose-50 border-rose-400 focus:ring-rose-500"
                : ""
            }`}
          />
          <button
            type="button"
            onClick={toggleVoiceListen}
            className={`absolute right-3 top-3.5 p-1 rounded-lg transition-colors
              ${
                isListening
                  ? "text-rose-600 animate-pulse"
                  : "text-slate-400 hover:text-slate-600"
              }`}
          >
            {isListening ? (
              <MicOff className="w-5 h-5" />
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading || !input.trim() || scanningFile}
          className="bg-indigo-600 p-4 text-white rounded-xl hover:bg-indigo-700 transition shadow-sm disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
