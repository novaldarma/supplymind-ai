import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "../components/ui/sidebar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SupplyMind | AI Procurement",
  description: "AI-powered supplier intelligence platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex h-screen bg-white overflow-hidden`}
      >
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-slate-50/50 p-8">
          {children}
        </main>
      </body>
    </html>
  );
}
