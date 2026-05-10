"use client";

import ChartsSection from "@/src/features/dashboard/ChartsSection";
import SummaryCards from "@/src/features/dashboard/SummaryCards";
import InsightsPanel from "@/src/features/dashboard/InsightsPanel";
import { motion } from "framer-motion";

export default function DashboardPage() {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <SummaryCards />
      <ChartsSection />
      <InsightsPanel />
    </motion.div>
  );
}

