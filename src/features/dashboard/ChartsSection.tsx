"use client";

import Card from "@/src/components/ui/Card";
import BalanceLineChart from "@/src/components/charts/BalanceLineChart";
import SpendingPieChart from "@/src/components/charts/SpendingPieChart";
import { motion } from "framer-motion";

const variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28 } },
};

function CardHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-5 pb-4 border-b border-black/[0.05] dark:border-white/[0.05]">
      <p className="text-[13px] font-semibold text-gray-900 dark:text-white">
        {title}
      </p>
      <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">
        {subtitle}
      </p>
    </div>
  );
}

export default function ChartsSection() {
  return (
    <motion.div
      className="grid md:grid-cols-2 gap-3"
      variants={variants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={item}>
        <Card>
          <CardHeader
            title="Balance Trend"
            subtitle="Income · Expenses · Net over time"
          />
          <BalanceLineChart />
        </Card>
      </motion.div>
      <motion.div variants={item}>
        <Card>
          <CardHeader
            title="Spending Breakdown"
            subtitle="Category distribution this period"
          />
          <SpendingPieChart />
        </Card>
      </motion.div>
    </motion.div>
  );
}
