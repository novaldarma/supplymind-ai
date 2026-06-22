import { NextResponse } from "next/server";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../../../lib/dynamodb";

// ==========================================
// 1. DATA DUMMY TRANSACTIONS
// ==========================================
const dummyTransactions = [
  {
    id: "PO-2026-089",
    supplier: "Global Tech Hardware",
    status: "Completed",
    date: "2026-06-20",
    amount: 12500,
    items: 50,
  },
  {
    id: "PO-2026-090",
    supplier: "PT Kabel Nusantara",
    status: "Pending",
    date: "2026-06-21",
    amount: 5000,
    items: 100,
  },
  {
    id: "PO-2026-091",
    supplier: "Baja Konstruksi Utama",
    status: "In Transit",
    date: "2026-06-22",
    amount: 45000,
    items: 200,
  },
];

// ==========================================
// 2. DATA DUMMY SUPPLIERS
// ==========================================
const dummySuppliers = [
  {
    id: "SUP-001",
    name: "Global Tech Hardware",
    category: "Electronics",
    riskScore: 92,
    status: "Active",
    location: "Singapore",
  },
  {
    id: "SUP-002",
    name: "PT Kabel Nusantara",
    category: "Infrastructure",
    riskScore: 85,
    status: "Active",
    location: "Jakarta, ID",
  },
  {
    id: "SUP-003",
    name: "Baja Konstruksi Utama",
    category: "Raw Materials",
    riskScore: 64,
    status: "Under Review",
    location: "Surabaya, ID",
  },
  {
    id: "SUP-004",
    name: "Makmur Sentosa Logistik",
    category: "Logistics",
    riskScore: 78,
    status: "Active",
    location: "Medan, ID",
  },
];

export async function GET() {
  try {
    // Eksekusi Injeksi Tabel Transactions
    for (const tx of dummyTransactions) {
      await docClient.send(
        new PutCommand({
          TableName: "Transactions",
          Item: tx,
        }),
      );
    }

    // Eksekusi Injeksi Tabel Suppliers
    for (const sup of dummySuppliers) {
      await docClient.send(
        new PutCommand({
          TableName: "Suppliers",
          Item: sup,
        }),
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "⚡ Master Seed Sukses! Data Transactions dan Suppliers berhasil diinjeksi ke AWS DynamoDB!",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
