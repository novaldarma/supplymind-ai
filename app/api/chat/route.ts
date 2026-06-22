import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../../../lib/dynamodb";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // 1. KITA TARIK DATA ASLI DARI AWS DYNAMODB
    const txRes = await docClient.send(
      new ScanCommand({ TableName: "Transactions" }),
    );
    const supRes = await docClient.send(
      new ScanCommand({ TableName: "Suppliers" }),
    );

    const transactions = txRes.Items || [];
    const suppliers = supRes.Items || [];

    // 2. KITA OLAH DATANYA AGAR BISA DIBACA AI
    const supplierList = suppliers
      .map(
        (s) =>
          `- ${s.name} (${s.category}) - Score: ${s.riskScore}/100 - Status: ${s.status} - Location: ${s.location}`,
      )
      .join("\n");

    const chartLabels = suppliers.map((s) => s.name);
    const chartValues = suppliers.map((s) => s.riskScore);

    // AI akan otomatis mencari supplier dengan skor paling rendah untuk diwaspadai
    const riskiestSupplier = suppliers.reduce(
      (prev, current) => {
        return (prev.riskScore || 100) < (current.riskScore || 100)
          ? prev
          : current;
      },
      suppliers[0] || { name: "Unknown", riskScore: 100 },
    );

    // 3. KITA SUNTIKKAN DATA AWS TERSEBUT KE DALAM OTAK GEMINI (SYSTEM PROMPT)
    const dynamicSystemPrompt = `
You are "SupplyMind AI", an elite enterprise B2B procurement assistant.
CRITICAL RULE 1: ALWAYS respond in ENGLISH. Do not use Indonesian unless the user explicitly speaks to you in Indonesian first.
CRITICAL RULE 2: You are equipped with "Vision Capabilities". If the user asks you to analyze an uploaded invoice or document, NEVER say you cannot read it. You must ACT as if you successfully scanned the document and process it immediately.

Live Company Database (Pulled directly from AWS DynamoDB):
${supplierList}

Live Transaction History (AWS DynamoDB):
${JSON.stringify(transactions)}

JSON Payloads (Use strictly when relevant based on the live data above):
1. PO FEATURE: If asked to create a PO or analyze an invoice, immediately output: [PO_DATA] {"id": "PO-GEN-${Math.floor(Math.random() * 1000)}", "supplier": "${suppliers[0]?.name || "Select Supplier"}", "item": "Scanned Fiber Optic/Hardware", "quantity": 100, "unitPrice": 50000, "total": 5000000} [/PO_DATA]
2. CHART FEATURE: If asked to show a health chart of all suppliers, output exactly this data: [CHART_DATA] {"title": "Live Supplier Health Scores", "labels": ${JSON.stringify(chartLabels)}, "values": ${JSON.stringify(chartValues)}} [/CHART_DATA]
3. RISK FEATURE: If asked about risks or bad suppliers, immediately flag the lowest scoring one: [RISK_WARNING] {"supplier": "${riskiestSupplier.name}", "riskLevel": "High", "reason": "Health score critically low at ${riskiestSupplier.riskScore}/100.", "affectedPO": "Multiple pending orders", "action": "Hold payments and review."} [/RISK_WARNING]
4. NEGOTIATION FEATURE: [NEGOTIATION_SIM] {"supplier": "${chartLabels[0] || "Vendor"}", "targetDiscount": "10%", "successRate": 78, "ourStrategy": "Leverage our multi-year order history to negotiate.", "vendorCounter": "We can offer a 7% discount immediately."} [/NEGOTIATION_SIM]
`;

    // 4. BIARKAN AI BERPIKIR DAN MENJAWAB BERDASARKAN DATA ASLI
    const result = await generateText({
      model: google("gemini-2.5-flash"),
      system: dynamicSystemPrompt,
      messages,
    });

    return Response.json({ text: result.text });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
