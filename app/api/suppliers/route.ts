import { NextResponse } from "next/server";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../../../lib/dynamodb";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const response = await docClient.send(
      new ScanCommand({
        TableName: "Suppliers", // Harus sama persis dengan nama tabel di AWS DynamoDB Anda
      }),
    );

    const formattedSuppliers = (response.Items || []).map((item) => ({
      id: item.id || "SUP-UNKNOWN",
      name: item.name || "Unknown Vendor",
      category: item.category || "General",
      riskScore: item.riskScore || 0,
      status: item.status || "Active",
      location: item.location || "Unknown",
    }));

    return NextResponse.json(formattedSuppliers);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
