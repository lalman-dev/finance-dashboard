"use client";

import Card from "@/src/components/ui/Card";
import Filters from "./Filters";
import TransactionsTable from "./TransactionsTable";
import { useFinanceStore } from "@/src/store/useFinanceStore";
import { useState } from "react";
import AddTransactionModal from "./AddTransactionModal";

export default function TransactionsSection() {
  const [open, setOpen] = useState(false);
  const { role } = useFinanceStore();

  return (
    <Card>
      <div className="flex items-center justify-between mb-4 ">
        <h3 className="text-lg font-medium">Transactions</h3>

        {role === "admin" && (
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
          >
            + Add Transaction
          </button>
        )}
      </div>
      <Filters />
      <TransactionsTable />
      <AddTransactionModal open={open} onClose={() => setOpen(false)} />
    </Card>
  );
}
