"use client";

import RoleToggle from "@/src/components/ui/RoleToggle";
import ThemeToggle from "@/src/components/ui/ThemeToggle";
import ChartsSection from "@/src/features/dashboard/ChartsSection";
import SummaryCards from "@/src/features/dashboard/SummaryCards";
import TransactionsSection from "@/src/features/transactions/TransactionsSection";
import { motion } from "framer-motion";
import { getInsights } from "@/src/lib/insights";
import { useFinanceStore } from "@/src/store/useFinanceStore";

export default function DashboardPage() {
  const { transactions } = useFinanceStore();

  const insights = getInsights(transactions);

  return (
    <motion.main
      className="p-6 space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="flex gap-3">
          <RoleToggle />
          <ThemeToggle />
        </div>
      </div>
      

      <SummaryCards />
      <ChartsSection />
      <TransactionsSection />

      <div className="mt-6 space-y-2">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          💡 You spent most on <strong>{insights.highestCategory}</strong>
        </p>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          Total expenses: ₹{insights.totalExpense}
        </p>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          💡 Your highest spending category is{" "}
          <strong>{insights.highestCategory}</strong>
        </p>
      </div>
    </motion.main>
  );
}
