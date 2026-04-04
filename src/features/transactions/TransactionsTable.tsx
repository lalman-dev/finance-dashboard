"use client";

import { useFinanceStore } from "@/src/store/useFinanceStore";
import { motion } from "framer-motion";

export default function TransactionsTable() {
  const { transactions, filter, search, sortBy, sortOrder, setSort } =
    useFinanceStore();

  const filtered = transactions
    .filter((t) => (filter === "all" ? true : t.type === filter))
    .filter((t) => t.category.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "amount") {
        return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
      }

      if (sortBy === "date") {
        return sortOrder === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      }

      return 0;
    });

  const renderSortIcon = (field: "date" | "amount") => {
    if (sortBy !== field) return "↕";
    return sortOrder === "asc" ? "↑" : "↓";
  };

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
          <motion.tr
            className="text-left text-sm text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Date */}
            <th
              className="py-2 cursor-pointer select-none"
              onClick={() => setSort("date")}
            >
              Date <span className="ml-1">{renderSortIcon("date")}</span>
            </th>

            <th>Category</th>
            <th>Type</th>

            {/* Amount */}
            <th
              className="text-right cursor-pointer select-none"
              onClick={() => setSort("amount")}
            >
              Amount <span className="ml-1">{renderSortIcon("amount")}</span>
            </th>
          </motion.tr>
        </thead>

        <tbody>
          {filtered.map((t) => (
            <tr
              key={t.id}
              className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <td className="py-2">{t.date}</td>
              <td>{t.category}</td>
              <td className="capitalize">{t.type}</td>
              <td className="text-right font-medium text-gray-900 dark:text-white">
                ₹{t.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
