"use client";

import { useFinanceStore } from "@/src/store/useFinanceStore";
import { getInsights } from "@/src/lib/insights";
import { motion } from "framer-motion";
import clsx from "clsx";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const trendIcon = (trend?: string) => {
  if (trend === "up")
    return (
      <TrendingUp
        size={13}
        className="text-emerald-500 shrink-0"
        strokeWidth={2.5}
      />
    );
  if (trend === "down")
    return (
      <TrendingDown
        size={13}
        className="text-red-400 shrink-0"
        strokeWidth={2.5}
      />
    );
  return <Minus size={13} className="text-gray-400 shrink-0" strokeWidth={2} />;
};

export default function InsightsPanel() {
  const { transactions } = useFinanceStore();
  const insights = getInsights(transactions);
  if (insights.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <p className="text-[13px] font-semibold text-gray-900 dark:text-white">
          Insights
        </p>
        <span
          className="text-[11px] px-1.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-500/10
          text-indigo-500 dark:text-indigo-400 font-medium"
        >
          {insights.length}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {insights.map((insight, i) => (
          <motion.div
            key={insight.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, delay: i * 0.05 }}
            className={clsx(
              "flex gap-3 px-4 py-3.5 rounded-xl border",
              insight.highlight
                ? "bg-red-50 dark:bg-red-500/[0.07] border-red-200/60 dark:border-red-500/20"
                : "bg-white dark:bg-[#111318] border-black/[0.06] dark:border-white/[0.06]",
            )}
          >
            <div className="mt-0.5 shrink-0">{trendIcon(insight.trend)}</div>
            <div className="min-w-0">
              <p className="text-[12px] font-semibold text-gray-800 dark:text-gray-200 leading-tight">
                {insight.label}
              </p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                {insight.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
