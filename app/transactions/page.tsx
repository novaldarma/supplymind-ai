const transactions = [
  {
    id: "PO-2026-089",
    date: "20 Jun 2026",
    supplier: "PT Kabel Nusantara",
    amount: "Rp 45.000.000",
    status: "Completed",
  },
  {
    id: "PO-2026-090",
    date: "18 Jun 2026",
    supplier: "Baja Konstruksi Utama",
    amount: "Rp 125.500.000",
    status: "Pending",
  },
  {
    id: "PO-2026-091",
    date: "15 Jun 2026",
    supplier: "Global Tech Hardware",
    amount: "Rp 85.000.000",
    status: "Processing",
  },
  {
    id: "PO-2026-092",
    date: "12 Jun 2026",
    supplier: "Makmur Sentosa Logistik",
    amount: "Rp 12.000.000",
    status: "Completed",
  },
];

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Riwayat Transaksi
        </h1>
        <p className="text-slate-500">
          Daftar Purchase Order (PO) dan status pengiriman saat ini.
        </p>
      </div>

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 border-b text-slate-900">
            <tr>
              <th className="px-6 py-4 font-medium">Nomor PO</th>
              <th className="px-6 py-4 font-medium">Tanggal</th>
              <th className="px-6 py-4 font-medium">Pemasok</th>
              <th className="px-6 py-4 font-medium">Total Harga</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {transactions.map((trx) => (
              <tr key={trx.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-900">{trx.id}</td>
                <td className="px-6 py-4">{trx.date}</td>
                <td className="px-6 py-4">{trx.supplier}</td>
                <td className="px-6 py-4 font-medium">{trx.amount}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold
                    ${
                      trx.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : trx.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {trx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
