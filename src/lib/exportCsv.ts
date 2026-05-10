import { Transaction } from "../types";

export function exportTransactionsCsv(transactions: Transaction[]) {
  const headers = ["Date", "Category", "Type", "Amount (₹)", "Note", "Recurring"];
  const rows = transactions.map((t) => [
    t.date,
    t.category,
    t.type,
    t.amount.toString(),
    t.note ?? "",
    t.isRecurring ? "Yes" : "No",
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `transactions-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
