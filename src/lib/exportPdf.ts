import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Transaction } from "../types";

export function exportTransactionsPDF(transactions: Transaction[]) {
  const doc = new jsPDF();

  // ===== CALCULATIONS =====
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  // ===== HEADER =====
  doc.setFontSize(18);
  doc.text("Finance Dashboard Report", 14, 20);

  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 26);

  // ===== SUMMARY =====
  doc.setFontSize(12);
  doc.setTextColor(0);

  doc.text("Summary", 14, 38);
  doc.setFontSize(11);

  doc.text(`Total Income: ₹${income}`, 14, 46);
  doc.text(`Total Expense: ₹${expense}`, 14, 52);
  doc.text(`Balance: ₹${balance}`, 14, 58);
  if (balance < 0) {
    doc.setTextColor(200, 0, 0);
  } else {
    doc.setTextColor(0, 150, 0);
  }

  // ===== TABLE =====
  const tableData = transactions.map((t) => [
    t.date,
    t.category,
    t.type,
    `₹${t.amount}`,
  ]);

  autoTable(doc, {
    startY: 65,
    head: [["Date", "Category", "Type", "Amount"]],
    body: tableData,
    styles: {
      fontSize: 10,
    },
    headStyles: {
      fillColor: [79, 70, 229],
    },
  });

  // ===== FOOTER =====
  const finalY = (doc as any).lastAutoTable?.finalY || 80;

  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text(`Total Transactions: ${transactions.length}`, 14, finalY + 10);

  doc.save("finance-report.pdf");
}
