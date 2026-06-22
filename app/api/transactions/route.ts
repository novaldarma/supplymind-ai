import { NextResponse } from "next/server";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../../../lib/dynamodb";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const response = await docClient.send(
      new ScanCommand({
        TableName: "Transactions", // Harus sama dengan nama tabel di AWS Anda
      }),
    );

    // Format ulang data dari AWS agar strukturnya sama persis dengan yang diharapkan UI Anda
    const formattedTransactions = (response.Items || []).map((item) => ({
      id: item.id || "PO-UNKNOWN",
      date: item.date || "Unknown Date",
      supplier: item.supplier || "Unknown Supplier",
      amount:
        typeof item.amount === "number"
          ? `$${item.amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
          : item.amount || "$0.00",
      status: item.status || "Pending",
    }));

    return NextResponse.json(formattedTransactions);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
