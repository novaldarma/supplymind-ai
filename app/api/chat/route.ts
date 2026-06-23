import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../../../lib/dynamodb";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // REFACTOR: Menggunakan ProjectionExpression untuk efisiensi data
    const txRes = await docClient.send(
      new ScanCommand({
        TableName: "Transactions",
        ProjectionExpression: "id, supplier, amount, #st",
        ExpressionAttributeNames: { "#st": "status" },
      }),
    );

    const supRes = await docClient.send(
      new ScanCommand({
        TableName: "Suppliers",
        ProjectionExpression: "#nm, category, riskScore, #st, #loc",
        ExpressionAttributeNames: {
          "#nm": "name",
          "#st": "status",
          "#loc": "location",
        },
      }),
    );

    const transactions = txRes.Items || [];
    const suppliers = supRes.Items || [];

    const supplierList = suppliers
      .map(
        (s) =>
          `- ${s.name} (${s.category}) - Score: ${s.riskScore}/100 - Status: ${s.status} - Location: ${s.location}`,
      )
      .join("\n");

    const chartLabels = suppliers.map((s) => s.name);
    const chartValues = suppliers.map((s) => s.riskScore);

    const riskiestSupplier = suppliers.reduce(
      (prev, current) =>
        (prev.riskScore || 100) < (current.riskScore || 100) ? prev : current,
      suppliers[0] || { name: "Unknown", riskScore: 100 },
    );

    const dynamicSystemPrompt = `
You are "SupplyMind AI", an elite enterprise B2B procurement assistant.
CRITICAL RULE 1: ALWAYS respond in ENGLISH.
CRITICAL RULE 2: You are equipped with "Vision Capabilities". If asked to analyze an invoice, ACT as if you scanned it and process it.

Live Company Database (Efficiency Optimized):
${supplierList}

Live Transaction History (Efficiency Optimized):
${JSON.stringify(transactions)}

JSON Payloads (Maintain strict format):
1. PO FEATURE: [PO_DATA] {"id": "PO-GEN-${Math.floor(Math.random() * 1000)}", "supplier": "${suppliers[0]?.name || "Select Supplier"}", "item": "Fiber Optic Hardware", "quantity": 100, "total": 5000000} [/PO_DATA]
2. CHART FEATURE: [CHART_DATA] {"title": "Live Supplier Health Scores", "labels": ${JSON.stringify(chartLabels)}, "values": ${JSON.stringify(chartValues)}} [/CHART_DATA]
3. RISK FEATURE: [RISK_WARNING] {"supplier": "${riskiestSupplier.name}", "riskLevel": "High", "reason": "Score: ${riskiestSupplier.riskScore}/100.", "action": "Hold payments."} [/RISK_WARNING]
`;

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
