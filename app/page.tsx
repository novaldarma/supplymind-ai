import {
  Users,
  Activity,
  ShoppingCart,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle,
  CheckCircle2,
  Clock,
  Loader2,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-10 px-4 pt-6">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Dashboard
        </h1>
        <p className="text-slate-500 mt-1">
          Overview of supplier network performance and recent transaction
          activities.
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Metric Card 1 */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
              Total Suppliers
            </h3>
            <div className="p-2 bg-blue-50 rounded-lg">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900 mt-2">5</p>
          <p className="text-sm font-medium text-emerald-600 flex items-center mt-2">
            <ArrowUpRight className="h-4 w-4 mr-1" /> +1 this month
          </p>
        </div>

        {/* Metric Card 2 */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
              Avg Health Score
            </h3>
            <div className="p-2 bg-emerald-50 rounded-lg">
              <Activity className="h-5 w-5 text-emerald-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900 mt-2">
            87 <span className="text-xl text-slate-400">/ 100</span>
          </p>
          <p className="text-sm font-medium text-emerald-600 flex items-center mt-2">
            <ArrowUpRight className="h-4 w-4 mr-1" /> +2.4 pts improvement
          </p>
        </div>

        {/* Metric Card 3 */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
              Active Orders
            </h3>
            <div className="p-2 bg-amber-50 rounded-lg">
              <ShoppingCart className="h-5 w-5 text-amber-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900 mt-2">12</p>
          <p className="text-sm font-medium text-amber-600 flex items-center mt-2">
            <Clock className="h-4 w-4 mr-1" /> 3 pending approval
          </p>
        </div>

        {/* Metric Card 4 */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
              Monthly Spend
            </h3>
            <div className="p-2 bg-purple-50 rounded-lg">
              <DollarSign className="h-5 w-5 text-purple-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900 mt-2">$267.5k</p>
          <p className="text-sm font-medium text-rose-600 flex items-center mt-2">
            <ArrowDownRight className="h-4 w-4 mr-1" /> -4.1% vs last month
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Recent Transactions Table (Takes up 2/3 width) */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Recent Transactions
              </h2>
              <p className="text-sm text-slate-500">
                Latest purchase orders from your network.
              </p>
            </div>
            <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition">
              View All
            </button>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm text-left text-slate-600">
              <thead className="text-xs text-slate-400 uppercase bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 font-semibold">Order ID</th>
                  <th className="px-6 py-4 font-semibold">Supplier</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">
                    PO-2026-090
                  </td>
                  <td className="px-6 py-4 font-medium">Baja Construct</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                      <Clock className="w-3.5 h-3.5" /> Pending
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900">
                    $12,500.00
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">
                    PO-2026-089
                  </td>
                  <td className="px-6 py-4 font-medium">Nusantara Cables</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900">
                    $4,500.00
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">
                    PO-2026-091
                  </td>
                  <td className="px-6 py-4 font-medium">
                    Global Tech Hardware
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />{" "}
                      Processing
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900">
                    $8,500.00
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Supplier Risk Watchlist (Takes up 1/3 width) */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-lg font-bold text-slate-900">Risk Watchlist</h2>
            <p className="text-sm text-slate-500">
              Suppliers requiring immediate attention.
            </p>
          </div>

          <div className="p-6 flex-1 space-y-6">
            {/* Watchlist Item 1 (High Risk) */}
            <div className="group">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-rose-100 rounded-md">
                    <AlertCircle className="w-4 h-4 text-rose-600" />
                  </div>
                  <span className="text-sm font-bold text-slate-900">
                    Baja Construct
                  </span>
                </div>
                <span className="text-sm font-extrabold text-rose-600">
                  64 / 100
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 mb-2 overflow-hidden">
                <div
                  className="bg-rose-500 h-2.5 rounded-full transition-all group-hover:opacity-80"
                  style={{ width: "64%" }}
                ></div>
              </div>
              <p className="text-xs font-medium text-slate-500 bg-slate-50 p-2 rounded border border-slate-100">
                Delivery delays reported. High risk of disruption for active
                orders.
              </p>
            </div>

            {/* Watchlist Item 2 (Medium Risk) */}
            <div className="group pt-2 border-t border-slate-100">
              <div className="flex justify-between items-center mb-2 mt-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-amber-100 rounded-md">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                  </div>
                  <span className="text-sm font-bold text-slate-900">
                    Global Tech Hardware
                  </span>
                </div>
                <span className="text-sm font-extrabold text-amber-600">
                  85 / 100
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 mb-2 overflow-hidden">
                <div
                  className="bg-amber-500 h-2.5 rounded-full transition-all group-hover:opacity-80"
                  style={{ width: "85%" }}
                ></div>
              </div>
              <p className="text-xs font-medium text-slate-500 bg-slate-50 p-2 rounded border border-slate-100">
                Score dropped 3 points this month due to minor packaging issues.
              </p>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border-t border-blue-100 text-center hover:bg-blue-100 transition-colors cursor-pointer">
            <button className="text-sm font-bold text-blue-700 flex items-center justify-center gap-2 w-full">
              <Activity className="w-4 h-4" /> Ask AI for Mitigation Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
