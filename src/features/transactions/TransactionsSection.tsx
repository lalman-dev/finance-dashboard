"use client";

import Card from "@/src/components/ui/Card";
import Filters from "./Filters";
import TransactionsTable from "./TransactionsTable";
import { useFinanceStore } from "@/src/store/useFinanceStore";
import { useState } from "react";
import AddTransactionModal from "./AddTransactionModal";
import { motion } from "framer-motion";
import { exportTransactionsPDF } from "@/src/lib/exportPdf";

export default function TransactionsSection() {
  const [open, setOpen] = useState(false);
  const { role } = useFinanceStore();
  const { transactions } = useFinanceStore();

  return (
    <Card>
      <div className="flex items-center justify-between mb-4 ">
        <h3 className="text-xl font-medium">Transactions</h3>
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-end">
          {role === "admin" && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setOpen(true)}
              className="w-full sm:w-auto px-4 py-2 text-sm font-medium rounded-lg border border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white transition"
            >
              + Add Transaction
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => exportTransactionsPDF(transactions)}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium rounded-lg border border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white transition"
          >
            💾 Export PDF
          </motion.button>
        </div>
      </div>
      <Filters />
      <TransactionsTable />
      <AddTransactionModal open={open} onClose={() => setOpen(false)} />
    </Card>
  );
}
