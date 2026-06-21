"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  ShoppingCart,
  Bot,
  Box,
} from "lucide-react";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Suppliers", href: "/suppliers", icon: Users },
    { name: "Transactions", href: "/transactions", icon: ShoppingCart },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/85 backdrop-blur-md border-b border-slate-200/80 z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-2.5 font-semibold text-[15px] text-slate-900 tracking-tight">
          <div className="p-1.5 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg shadow-sm shadow-indigo-600/20">
            <Box className="w-4 h-4 text-white" strokeWidth={2.25} />
          </div>
          SupplyMind
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200/80 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 flex flex-col ${isMobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}`}
      >
        <div className="hidden md:flex items-center gap-2.5 font-semibold text-[15px] tracking-tight p-6 pb-5">
          <div className="p-2 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl shadow-sm shadow-indigo-600/25">
            <Box className="w-5 h-5 text-white" strokeWidth={2.25} />
          </div>
          SupplyMind
        </div>

        <div className="px-3 mt-4 md:mt-0 flex-1 overflow-y-auto">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 px-3">
            Main Menu
          </p>
          <nav className="space-y-0.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`relative flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13.5px] font-medium transition-colors ${isActive ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-full bg-gradient-to-b from-indigo-500 to-violet-500" />
                  )}
                  <link.icon className="w-[17px] h-[17px]" strokeWidth={2} />{" "}
                  {link.name}
                </Link>
              );
            })}
          </nav>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 mt-7 px-3">
            Intelligence
          </p>
          <Link
            href="/assistant"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13.5px] font-medium transition-all ${pathname === "/assistant" ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm shadow-indigo-600/25 hover:shadow-md hover:shadow-indigo-600/30" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
          >
            <Bot className="w-[17px] h-[17px]" strokeWidth={2} /> AI Assistant
          </Link>
        </div>

        <div className="p-3">
          <div className="flex items-center gap-2.5 px-2 py-2 rounded-xl bg-slate-50/80 border border-slate-200/60">
            <div className="relative shrink-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white font-semibold text-xs">
                N
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            <div className="min-w-0">
              <div className="text-[13px] font-semibold text-slate-900 truncate">
                Noval Darmawan
              </div>
              <div className="text-[11px] text-slate-400 truncate">
                Procurement Lead
              </div>
            </div>
          </div>
        </div>
      </aside>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      <main className="flex-1 h-screen overflow-y-auto pt-16 md:pt-0 bg-slate-50">
        {children}
      </main>
    </div>
  );
}
