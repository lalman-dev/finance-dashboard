"use client";

import RoleToggle from "@/src/components/ui/RoleToggle";
import ThemeToggle from "@/src/components/ui/ThemeToggle";
import ChartsSection from "@/src/features/dashboard/ChartsSection";
import SummaryCards from "@/src/features/dashboard/SummaryCards";
import TransactionsSection from "@/src/features/transactions/TransactionsSection";
import { motion } from "framer-motion";

export default function DashboardPage() {
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
    </motion.main>
  );
}
