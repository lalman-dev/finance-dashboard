"use client";

import { useState } from "react";
import { useFinanceStore } from "@/src/store/useFinanceStore";
import { formatCurrency, formatDate } from "@/src/lib/finance";
import { Transaction } from "@/src/types";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { Pencil, Trash2, RefreshCw, ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";
import AddTransactionModal from "./AddTransactionModal";

const PAGE_SIZE = 10;

type Props = {
  canEdit: boolean;
};

export default function TransactionsTable({ canEdit }: Props) {
  const {
    transactions,
    filter,
    search,
    sortBy,
    sortOrder,
    setSort,
    deleteTransaction,
  } = useFinanceStore();

  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<Transaction | null>(null);

  const filtered = transactions
    .filter((t) => (filter === "all" ? true : t.type === filter))
    .filter((t) => {
      const q = search.toLowerCase();
      return (
        t.category.toLowerCase().includes(q) ||
        (t.note ?? "").toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (sortBy === "amount") {
        return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
      }
      if (sortBy === "date") {
        return sortOrder === "asc"
          ? a.date.localeCompare(b.date)
          : b.date.localeCompare(a.date);
      }
      if (sortBy === "category") {
        return sortOrder === "asc"
          ? a.category.localeCompare(b.category)
          : b.category.localeCompare(a.category);
      }
      return 0;
    });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Reset to p1 if filters change and current page is out of range
  if (page > totalPages) setPage(1);

  const SortIcon = ({ field }: { field: typeof sortBy }) => (
    <ArrowUpDown
      size={12}
      className={clsx(
        "inline-block ml-1",
        sortBy === field ? "text-indigo-500" : "text-gray-400"
      )}
    />
  );

  if (filtered.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm text-gray-400 dark:text-gray-500">
          No transactions match your filters
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <th
                className="py-3 pr-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 cursor-pointer select-none"
                onClick={() => setSort("date")}
              >
                Date <SortIcon field="date" />
              </th>
              <th
                className="py-3 pr-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 cursor-pointer select-none"
                onClick={() => setSort("category")}
              >
                Category <SortIcon field="category" />
              </th>
              <th className="py-3 pr-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                Note
              </th>
              <th className="py-3 pr-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                Type
              </th>
              <th
                className="py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 cursor-pointer select-none"
                onClick={() => setSort("amount")}
              >
                Amount <SortIcon field="amount" />
              </th>
              {canEdit && <th className="py-3 w-16" />}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {paginated.map((t) => (
                <motion.tr
                  key={t.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.18 }}
                  className="border-b border-gray-50 dark:border-gray-800/60 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
                >
                  <td className="py-3 pr-4 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    {formatDate(t.date)}
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-1.5">
                      <span className="text-gray-900 dark:text-white">{t.category}</span>
                      {t.isRecurring && (
                        <RefreshCw size={11} className="text-gray-400" title="Recurring" />
                      )}
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-gray-500 dark:text-gray-400 max-w-[180px] truncate">
                    {t.note ?? "—"}
                  </td>
                  <td className="py-3 pr-4">
                    <span
                      className={clsx(
                        "inline-flex px-2 py-0.5 rounded-md text-xs font-medium",
                        t.type === "income"
                          ? "bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400"
                          : "bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400"
                      )}
                    >
                      {t.type}
                    </span>
                  </td>
                  <td
                    className={clsx(
                      "py-3 text-right font-medium tabular-nums",
                      t.type === "income"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    )}
                  >
                    {t.type === "income" ? "+" : "-"}
                    {formatCurrency(t.amount)}
                  </td>
                  {canEdit && (
                    <td className="py-3 pl-2">
                      <div className="flex items-center gap-1 justify-end">
                        <button
                          onClick={() => setEditing(t)}
                          className="p-1.5 rounded-md text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          onClick={() => deleteTransaction(t.id)}
                          className="p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  )}
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 text-xs text-gray-500 dark:text-gray-400">
          <span>
            {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={14} />
            </button>
            <span className="px-2">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Edit modal */}
      <AddTransactionModal
        open={!!editing}
        editing={editing}
        onClose={() => setEditing(null)}
      />
    </>
  );
}

