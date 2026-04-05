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
        <div className="flex gap-2">
          {role === "admin" && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setOpen(true)}
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              + Add Transaction
            </motion.button>
          )}
          <button
            onClick={() => exportTransactionsPDF(transactions)}
            className="px-4 py-2 text-sm rounded-lg bg-indigo-500 text-white hover:bg-indigo-700 transition"
          >
            💾 Export PDF
          </button>
        </div>
      </div>
      <Filters />
      <TransactionsTable />
      <AddTransactionModal open={open} onClose={() => setOpen(false)} />
    </Card>
  );
}
