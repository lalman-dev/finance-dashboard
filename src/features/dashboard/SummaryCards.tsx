"use client";

import Card from "@/src/components/ui/Card";
import { useFinanceStore } from "@/src/store/useFinanceStore";

export default function SummaryCards() {
  const { transactions } = useFinanceStore();

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Card>
        <p className="text-sm text-gray-500 dark:text-gray-400">Balance</p>
        <h2 className="text-xl font-semibold dark:text-white">₹{balance}</h2>
      </Card>

      <Card>
        <p className="text-sm text-gray-500 dark:text-gray-400">Income</p>
        <h2 className="text-xl font-semibold dark:text-white">₹{income}</h2>
      </Card>

      <Card>
        <p className="text-sm text-gray-500 dark:text-gray-400">Expenses</p>
        <h2 className="text-xl font-semibold dark:text-white">₹{expense}</h2>
      </Card>
    </div>
  );
}
