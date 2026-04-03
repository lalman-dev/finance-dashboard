"use client";

import { useState } from "react";
import { useFinanceStore } from "@/src/store/useFinanceStore";
import { motion } from "framer-motion";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function AddTransactionModal({ open, onClose }: Props) {
  const { addTransaction } = useFinanceStore();

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [date, setDate] = useState("");

  if (!open) return null;

  const handleSubmit = () => {
    if (!amount || !date) return;

    addTransaction({
      id: Date.now().toString(),
      amount: Number(amount),
      category: category as any,
      type,
      date,
    });

    onClose();
    setAmount("");
    setDate("");
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-md rounded-2xl p-6 bg-white border shadow-xl"
      >
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Add Transaction
        </h2>

        <div className="space-y-3">
          {/* Amount */}
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-gray-800 dark:text-white border-gray-200 dark:border-gray-700"
          />

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-gray-800 dark:text-white border-gray-200 dark:border-gray-700"
          >
            <option>Food</option>
            <option>Transport</option>
            <option>Shopping</option>
            <option>Salary</option>
          </select>

          {/* Type */}
          <select
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-gray-800 dark:text-white border-gray-200 dark:border-gray-700"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          {/* Date */}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-gray-800 dark:text-white border-gray-200 dark:border-gray-700"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-5">
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
          >
            Add
          </button>
        </div>
      </motion.div>
    </div>
  );
}
