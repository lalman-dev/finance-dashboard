"use client";

import { useFinanceStore } from "@/src/store/useFinanceStore";
import { mockTransactions, mockBudgets } from "@/src/lib/mockData";
import Card from "@/src/components/ui/Card";
import { motion } from "framer-motion";
import { useState } from "react";
import { RotateCcw, Trash2, Database, ShieldAlert } from "lucide-react";

function ConfirmDialog({
  message,
  onConfirm,
  onCancel,
}: {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50" onClick={onCancel}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-xl"
      >
        <div className="flex items-center gap-3 mb-4">
          <ShieldAlert className="text-red-500 shrink-0" size={20} />
          <p className="text-sm text-gray-700 dark:text-gray-300">{message}</p>
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="px-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 text-sm font-medium rounded-lg bg-red-600 text-white hover:bg-red-700">
            Confirm
          </button>
        </div>
      </motion.div>
    </div>
  );
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

export default function SettingsSection() {
  const { role, transactions, budgets } = useFinanceStore();
  const [confirm, setConfirm] = useState<"reset" | "clear" | null>(null);

  const isAdmin = role === "admin";

  const handleReset = () => {
    useFinanceStore.setState({
      transactions: mockTransactions,
      budgets: mockBudgets,
    });
    setConfirm(null);
  };

  const handleClear = () => {
    useFinanceStore.setState({ transactions: [], budgets: [] });
    setConfirm(null);
  };

  return (
    <motion.div
      className="max-w-xl space-y-6"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {/* Data overview */}
      <motion.div variants={item}>
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Database size={15} className="text-indigo-500" />
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Data Summary
            </h3>
          </div>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex justify-between">
              <span>Transactions stored</span>
              <span className="font-medium text-gray-900 dark:text-white">{transactions.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Budgets configured</span>
              <span className="font-medium text-gray-900 dark:text-white">{budgets.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Storage</span>
              <span className="font-medium text-gray-900 dark:text-white">localStorage</span>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Danger zone — admin only */}
      {isAdmin && (
        <motion.div variants={item}>
          <Card>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
              Data Management
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
              These actions cannot be undone. Admin access only.
            </p>
            <div className="space-y-2">
              <button
                onClick={() => setConfirm("reset")}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950 transition-colors"
              >
                <RotateCcw size={14} />
                Reset to sample data
              </button>
              <button
                onClick={() => setConfirm("clear")}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
              >
                <Trash2 size={14} />
                Clear all data
              </button>
            </div>
          </Card>
        </motion.div>
      )}

      {confirm && (
        <ConfirmDialog
          message={
            confirm === "reset"
              ? "Reset all transactions and budgets to sample data?"
              : "Delete all transactions and budgets permanently?"
          }
          onConfirm={confirm === "reset" ? handleReset : handleClear}
          onCancel={() => setConfirm(null)}
        />
      )}
    </motion.div>
  );
}
