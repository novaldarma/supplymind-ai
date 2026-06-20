// Data "dummy" (Data Sintetis) untuk MVP kita
const suppliers = [
  {
    id: 1,
    name: "PT Kabel Nusantara",
    category: "Fiber Optic",
    score: 92,
    status: "Excellent",
  },
  {
    id: 2,
    name: "Global Tech Hardware",
    category: "Server & Rack",
    score: 85,
    status: "Good",
  },
  {
    id: 3,
    name: "Baja Konstruksi Utama",
    category: "Infrastructure",
    score: 64,
    status: "Warning",
  },
  {
    id: 4,
    name: "Lintas Elektronika",
    category: "Sensors",
    score: 88,
    status: "Good",
  },
  {
    id: 5,
    name: "Makmur Sentosa Logistik",
    category: "Packaging",
    score: 95,
    status: "Excellent",
  },
];

export default function SuppliersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Direktori Pemasok
          </h1>
          <p className="text-slate-500">
            Pantau skor kesehatan dan performa setiap vendor.
          </p>
        </div>
      </div>

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 border-b text-slate-900">
            <tr>
              <th className="px-6 py-4 font-medium">Nama Pemasok</th>
              <th className="px-6 py-4 font-medium">Kategori</th>
              <th className="px-6 py-4 font-medium">Skor Kesehatan</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {suppliers.map((supplier) => (
              <tr
                key={supplier.id}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-slate-900">
                  {supplier.name}
                </td>
                <td className="px-6 py-4">{supplier.category}</td>
                <td className="px-6 py-4 font-bold text-slate-900">
                  {supplier.score} / 100
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold
                    ${
                      supplier.status === "Excellent"
                        ? "bg-green-100 text-green-800"
                        : supplier.status === "Warning"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {supplier.status}
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
