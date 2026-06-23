import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SidebarLayout from "./components/SidebarLayout";

// Inisialisasi font Inter yang super modern
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SupplyMind",
  description: "AI-Powered Procurement Engine",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* className inter.className ini akan memaksa seluruh web memakai font sans-serif */}
      <body
        className={`${inter.className} bg-slate-50 text-slate-900 antialiased`}
      >
        <SidebarLayout>{children}</SidebarLayout>
      </body>
    </html>
  );
}
