"use client";

import { useFinanceStore } from "@/src/store/useFinanceStore";
import { getInsights } from "@/src/lib/insights";
import { motion } from "framer-motion";
import clsx from "clsx";
import { TrendingUp, TrendingDown, Minus, Lightbulb } from "lucide-react";

const trendIcon = (trend?: string) => {
  if (trend === "up") return <TrendingUp size={14} className="text-green-500 shrink-0" />;
  if (trend === "down") return <TrendingDown size={14} className="text-red-500 shrink-0" />;
  return <Minus size={14} className="text-gray-400 shrink-0" />;
};

export default function InsightsPanel() {
  const { transactions } = useFinanceStore();
  const insights = getInsights(transactions);

  if (insights.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb size={15} className="text-amber-500" />
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          Insights
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {insights.map((insight, i) => (
          <motion.div
            key={insight.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.06 }}
            className={clsx(
              "flex gap-3 p-4 rounded-xl border text-sm",
              insight.highlight
                ? "bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800"
                : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
            )}
          >
            <div className="mt-0.5">{trendIcon(insight.trend)}</div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white text-xs">
                {insight.label}
              </p>
              <p className="text-gray-500 dark:text-gray-400 mt-0.5 text-xs leading-relaxed">
                {insight.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
