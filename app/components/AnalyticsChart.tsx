"use client";

export type ChartData = {
  title: string;
  labels: string[];
  values: number[];
};

export default function AnalyticsChart({ data }: { data: ChartData }) {
  // Cari nilai tertinggi untuk kalkulasi persentase lebar batang grafik
  const maxValue = Math.max(...data.values, 100);

  return (
    <div className="my-4 p-5 border border-slate-200 rounded-xl bg-slate-50 shadow-sm w-full">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-900">{data.title}</h3>
        <p className="text-xs text-slate-500">
          Visualisasi data langsung dari sistem SupplyMind
        </p>
      </div>

      <div className="space-y-4">
        {data.labels.map((label, index) => {
          const value = data.values[index];
          const widthPercent = (value / maxValue) * 100;

          // Tentukan warna batang berdasarkan skor kesehatan
          let barColor = "bg-blue-600"; // Default
          if (value >= 90)
            barColor = "bg-emerald-500"; // Excellent
          else if (value >= 75)
            barColor = "bg-amber-500"; // Good
          else if (value < 70) barColor = "bg-rose-500"; // Warning

          return (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-slate-700">{label}</span>
                <span className="font-bold text-slate-900">{value} / 100</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                <div
                  className={`h-full ${barColor} rounded-full transition-all duration-1000 ease-out hover:opacity-80`}
                  style={{ width: `${widthPercent}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-200 flex justify-between text-xs text-slate-400">
        <div className="flex gap-2">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> ≥90
            Excellent
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span> 75-89
            Good
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span> &lt;70
            Warning
          </span>
        </div>
      </div>
    </div>
  );
}
