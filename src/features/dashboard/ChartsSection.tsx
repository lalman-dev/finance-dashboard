"use client";

import Card from "@/src/components/ui/Card";
import BalanceLineChart from "@/src/components/charts/BalanceLineChart";
import SpendingPieChart from "@/src/components/charts/SpendingPieChart";
import { motion } from "framer-motion";

export default function ChartsSection() {
  return (
    <motion.div
      className="grid md:grid-cols-2 gap-4 bg-transparent"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <Card>
          <h3 className="text-sm text-gray-500 mb-2 dark:text-gray-400">
            Balance Trend
          </h3>
          <BalanceLineChart />
        </Card>
      </motion.div>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <Card>
          <h3 className="text-sm text-gray-500 mb-2 dark:text-gray-400">
            Spending Breakdown
          </h3>
          <SpendingPieChart />
        </Card>
      </motion.div>
    </motion.div>
  );
}
