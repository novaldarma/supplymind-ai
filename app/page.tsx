export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Dashboard
        </h1>
        <p className="text-slate-500">
          Ringkasan performa jaringan pemasok dan aktivitas transaksi.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Kartu Statistik 1 */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="text-sm font-medium text-slate-500">Total Pemasok</h3>
          <p className="mt-2 text-3xl font-bold text-slate-900">5</p>
        </div>

        {/* Kartu Statistik 2 */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="text-sm font-medium text-slate-500">
            Rata-rata Skor Kesehatan
          </h3>
          <p className="mt-2 text-3xl font-bold text-slate-900 text-green-600">
            87 / 100
          </p>
        </div>

        {/* Kartu Statistik 3 */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="text-sm font-medium text-slate-500">
            Pesanan Aktif (PO)
          </h3>
          <p className="mt-2 text-3xl font-bold text-slate-900">12</p>
        </div>
      </div>
    </div>
  );
}
