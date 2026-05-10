"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useFinanceStore } from "@/src/store/useFinanceStore";
import { TRANSACTION_CATEGORIES, Transaction, TransactionCategory } from "@/src/types";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  editing?: Transaction | null;
};

const INITIAL = {
  amount: "",
  category: "Food & Dining" as TransactionCategory,
  type: "expense" as "income" | "expense",
  date: new Date().toISOString().slice(0, 10),
  note: "",
  isRecurring: false,
};

export default function AddTransactionModal({ open, onClose, editing }: Props) {
  const { addTransaction, updateTransaction } = useFinanceStore();

  const [form, setForm] = useState(() =>
    editing
      ? {
          amount: editing.amount.toString(),
          category: editing.category,
          type: editing.type,
          date: editing.date,
          note: editing.note ?? "",
          isRecurring: editing.isRecurring ?? false,
        }
      : INITIAL
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!open) return null;

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.amount || Number(form.amount) <= 0) e.amount = "Enter a valid amount";
    if (!form.date) e.date = "Date is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    if (editing) {
      updateTransaction(editing.id, {
        amount: Number(form.amount),
        category: form.category,
        type: form.type,
        date: form.date,
        note: form.note || undefined,
        isRecurring: form.isRecurring,
      });
    } else {
      addTransaction({
        id: `t-${Date.now()}`,
        amount: Number(form.amount),
        category: form.category,
        type: form.type,
        date: form.date,
        note: form.note || undefined,
        isRecurring: form.isRecurring,
      });
    }

    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.18 }}
        className="w-full max-w-md rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">
            {editing ? "Edit Transaction" : "New Transaction"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          {/* Type toggle */}
          <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            {(["expense", "income"] as const).map((t) => (
              <button
                key={t}
                onClick={() => set("type", t)}
                className={`flex-1 py-2 text-sm font-medium transition-colors capitalize ${
                  form.type === t
                    ? t === "expense"
                      ? "bg-red-500 text-white"
                      : "bg-green-500 text-white"
                    : "bg-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Amount */}
          <div>
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 block mb-1">
              Amount (₹)
            </label>
            <input
              type="number"
              placeholder="0"
              value={form.amount}
              onChange={(e) => set("amount", e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            />
            {errors.amount && (
              <p className="text-xs text-red-500 mt-1">{errors.amount}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 block mb-1">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => set("category", e.target.value as TransactionCategory)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white"
            >
              {TRANSACTION_CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 block mb-1">
              Date
            </label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => set("date", e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white"
            />
            {errors.date && (
              <p className="text-xs text-red-500 mt-1">{errors.date}</p>
            )}
          </div>

          {/* Note */}
          <div>
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 block mb-1">
              Note <span className="font-normal">(optional)</span>
            </label>
            <input
              type="text"
              placeholder="What was this for?"
              value={form.note}
              onChange={(e) => set("note", e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Recurring */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={form.isRecurring}
              onChange={(e) => set("isRecurring", e.target.checked)}
              className="rounded accent-indigo-600"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">Recurring monthly</span>
          </label>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 px-6 py-4 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {editing ? "Update" : "Add"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

