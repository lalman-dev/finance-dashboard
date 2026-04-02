"use client";

import { useFinanceStore } from "@/src/store/useFinanceStore";
export default function TransactionsTable() {
  const { transactions, filter, search } = useFinanceStore();

  const filtered = transactions
    .filter((t) => (filter === "all" ? true : t.type === filter))
    .filter((t) => t.category.toLowerCase().includes(search.toLowerCase()));

  if (filtered.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        No transactions found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse mt-4">
        <thead>
          <tr className="text-left text-sm text-gray-500">
            <th className="py-2">Date</th>
            <th>Category</th>
            <th>Type</th>
            <th className="text-right">Amount</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((t) => (
            <tr key={t.id} className="border-t hover:bg-gray-50 transition">
              <td className="py-2">{t.date}</td>
              <td>{t.category}</td>
              <td className="capitalize">{t.type}</td>
              <td className="text-right font-medium">₹{t.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
