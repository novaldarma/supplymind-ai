import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  MessageSquare,
  Box,
} from "lucide-react";

export function Sidebar() {
  return (
    <div className="flex h-screen w-64 flex-col border-r bg-slate-50 px-4 py-8">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="rounded-lg bg-blue-600 p-2">
          <Box className="h-6 w-6 text-white" />
        </div>
        <span className="text-2xl font-bold text-slate-900">SupplyMind</span>
      </div>

      <nav className="flex flex-col gap-2">
        <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
          Main Menu
        </p>

        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-200 transition-all"
        >
          <LayoutDashboard className="h-5 w-5" /> Dashboard
        </Link>

        <Link
          href="/suppliers"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-200 transition-all"
        >
          <Users className="h-5 w-5" /> Suppliers
        </Link>

        <Link
          href="/transactions"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-200 transition-all"
        >
          <ShoppingCart className="h-5 w-5" /> Transactions
        </Link>

        <div className="mt-8">
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
            Intelligence
          </p>
          <Link
            href="/assistant"
            className="flex items-center gap-3 rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-all shadow-sm"
          >
            <MessageSquare className="h-5 w-5" /> AI Assistant
          </Link>
        </div>
      </nav>
    </div>
  );
}
