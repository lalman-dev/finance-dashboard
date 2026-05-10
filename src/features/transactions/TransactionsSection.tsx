"use client";

import { useState } from "react";
import Card from "@/src/components/ui/Card";
import Filters from "./Filters";
import TransactionsTable from "./TransactionsTable";
import { useFinanceStore } from "@/src/store/useFinanceStore";
import AddTransactionModal from "./AddTransactionModal";
import { motion } from "framer-motion";
import { exportTransactionsPDF } from "@/src/lib/exportPdf";
import { exportTransactionsCsv } from "@/src/lib/exportCsv";
import { Plus, Download } from "lucide-react";

export default function TransactionsSection() {
  const [addOpen, setAddOpen] = useState(false);
  const { role, transactions, filter, search } = useFinanceStore();
  const isAdmin = role === "admin";

  // Apply same filters as the table so export matches what's visible
  const visibleTransactions = transactions
    .filter((t) => (filter === "all" ? true : t.type === filter))
    .filter((t) => {
      const q = search.toLowerCase();
      return (
        t.category.toLowerCase().includes(q) ||
        (t.note ?? "").toLowerCase().includes(q)
      );
    });

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Transactions</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {visibleTransactions.length} records
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative group">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <Download size={14} />
              Export
            </button>
            <div className="absolute right-0 top-full mt-1 w-36 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              <button
                onClick={() => exportTransactionsPDF(visibleTransactions)}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-t-lg"
              >
                Export PDF
              </button>
              <button
                onClick={() => exportTransactionsCsv(visibleTransactions)}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-b-lg"
              >
                Export CSV
              </button>
            </div>
          </div>

          {isAdmin && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setAddOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            >
              <Plus size={14} />
              Add
            </motion.button>
          )}
        </div>
      </div>

      <Filters />
      <TransactionsTable canEdit={isAdmin} />
      <AddTransactionModal open={addOpen} onClose={() => setAddOpen(false)} />
    </Card>
  );
}

