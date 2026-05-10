"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useFinanceStore } from "@/src/store/useFinanceStore";
import { getBudgetStatus, formatCurrency } from "@/src/lib/finance";
import { TRANSACTION_CATEGORIES, TransactionCategory } from "@/src/types";
import { Plus, Pencil, Trash2, AlertTriangle } from "lucide-react";

// --- Set/Edit Budget Modal ---
type ModalProps = {
  initial?: { category: TransactionCategory; limit: number };
  onSave: (category: TransactionCategory, limit: number) => void;
  onClose: () => void;
};

function BudgetModal({ initial, onSave, onClose }: ModalProps) {
  const { budgets } = useFinanceStore();
  const existingCategories = new Set(budgets.map((b) => b.category));

  const [category, setCategory] = useState<TransactionCategory>(
    initial?.category ?? "Food & Dining"
  );
  const [limit, setLimit] = useState(initial?.limit?.toString() ?? "");

  const available = TRANSACTION_CATEGORIES.filter(
    (c) => !existingCategories.has(c) || c === initial?.category
  );

  const handleSave = () => {
    const n = Number(limit);
    if (!n || n <= 0) return;
    onSave(category, n);
    onClose();
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
        transition={{ duration: 0.18 }}
        className="w-full max-w-sm rounded-2xl p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl"
      >
        <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
          {initial ? "Edit Budget" : "Set Budget"}
        </h2>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as TransactionCategory)}
              disabled={!!initial}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white disabled:opacity-60"
            >
              {available.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">
              Monthly Limit (₹)
            </label>
            <input
              type="number"
              placeholder="e.g. 5000"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-5">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-1.5 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// --- Budget Row ---
type BudgetRowProps = {
  category: TransactionCategory;
  limit: number;
  spent: number;
  remaining: number;
  pct: number;
  isOver: boolean;
  canEdit: boolean;
  onEdit: () => void;
  onDelete: () => void;
};

function BudgetRow({ category, limit, spent, remaining, pct, isOver, canEdit, onEdit, onDelete }: BudgetRowProps) {
  return (
    <div className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          {isOver && (
            <AlertTriangle size={14} className="text-red-500 shrink-0" />
          )}
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {category}
          </span>
        </div>
        {canEdit && (
          <div className="flex items-center gap-1">
            <button
              onClick={onEdit}
              className="p-1.5 rounded-md text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors"
            >
              <Pencil size={13} />
            </button>
            <button
              onClick={onDelete}
              className="p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
            >
              <Trash2 size={13} />
            </button>
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden mb-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={clsx(
            "h-full rounded-full",
            isOver
              ? "bg-red-500"
              : pct >= 80
              ? "bg-amber-500"
              : "bg-indigo-500"
          )}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>
          {formatCurrency(spent)} spent
        </span>
        <span className={clsx(isOver ? "text-red-500 font-medium" : "")}>
          {isOver
            ? `${formatCurrency(spent - limit)} over`
            : `${formatCurrency(remaining)} left`}
        </span>
      </div>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
        Limit: {formatCurrency(limit)}
      </p>
    </div>
  );
}

// --- Main Section ---
export default function BudgetsSection() {
  const { budgets, role, setBudget, deleteBudget, transactions } = useFinanceStore();
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<{ category: TransactionCategory; limit: number } | null>(null);

  const statuses = getBudgetStatus(transactions, budgets);
  const isAdmin = role === "admin";

  const overCount = statuses.filter((s) => s.isOver).length;

  return (
    <div className="space-y-4">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Monthly budget tracking — {budgets.length} categories
          </p>
          {overCount > 0 && (
            <p className="text-xs text-red-500 font-medium mt-0.5">
              {overCount} {overCount === 1 ? "category" : "categories"} over budget this month
            </p>
          )}
        </div>
        {isAdmin && (
          <button
            onClick={() => {
              setEditing(null);
              setShowModal(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            <Plus size={14} />
            Add Budget
          </button>
        )}
      </div>

      {budgets.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-200 dark:border-gray-700 p-10 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No budgets set yet.{isAdmin ? " Add one above." : ""}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {statuses.map((s) => (
            <BudgetRow
              key={s.category}
              {...s}
              canEdit={isAdmin}
              onEdit={() => {
                setEditing({ category: s.category, limit: s.limit });
                setShowModal(true);
              }}
              onDelete={() => deleteBudget(s.category)}
            />
          ))}
        </div>
      )}

      {showModal && (
        <BudgetModal
          initial={editing ?? undefined}
          onSave={(category, limit) => setBudget({ category, limit })}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
