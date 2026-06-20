import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export const dynamic = "force-dynamic";

const systemPrompt = `
Anda adalah "SupplyMind AI", asisten ahli pengadaan barang (procurement) tingkat enterprise.
Anda harus menjawab pertanyaan dengan profesional, ringkas, dan fokus pada data.

Berikut adalah data perusahaan saat ini:

[DATA PEMASOK]
1. PT Kabel Nusantara (Fiber Optic) - Skor: 92/100 (Excellent)
2. Global Tech Hardware (Server & Rack) - Skor: 85/100 (Good)
3. Baja Konstruksi Utama (Infrastructure) - Skor: 64/100 (Warning)
4. Lintas Elektronika (Sensors) - Skor: 88/100 (Good)
5. Makmur Sentosa Logistik (Packaging) - Skor: 95/100 (Excellent)

[TRANSAKSI TERAKHIR]
- PO-2026-089 (20 Jun 2026): PT Kabel Nusantara, Rp 45.000.000 (Completed)
- PO-2026-090 (18 Jun 2026): Baja Konstruksi Utama, Rp 125.500.000 (Pending)
- PO-2026-091 (15 Jun 2026): Global Tech Hardware, Rp 85.000.000 (Processing)
- PO-2026-092 (12 Jun 2026): Makmur Sentosa Logistik, Rp 12.000.000 (Completed)

Aturan:
1. Jika ditanya rekomendasi pemasok, lihat Skor Kesehatan.
2. Jika ditanya status transaksi, lihat data Transaksi Terakhir.
3. Jangan pernah mengarang data di luar yang diberikan di atas.
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await generateText({
      // Kita panggil nama model yang sama persis dengan yang ada di akun Anda!
      model: google("gemini-2.5-flash"),
      system: systemPrompt,
      messages,
    });

    return Response.json({ text: result.text });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
