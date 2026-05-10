"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { useFinanceStore } from "@/src/store/useFinanceStore";
import {
  getMonthlySummaries,
  getCategoryTotals,
  formatCurrency,
} from "@/src/lib/finance";
import { useTheme } from "next-themes";
import Card from "@/src/components/ui/Card";
import { motion } from "framer-motion";

function MonthlyBarChart() {
  const { transactions } = useFinanceStore();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const data = getMonthlySummaries(transactions);
  const axisColor = isDark ? "#6b7280" : "#9ca3af";
  const gridColor = isDark ? "#1f2937" : "#f3f4f6";

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }} barGap={4}>
          <CartesianGrid stroke={gridColor} strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: axisColor }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: axisColor }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            formatter={(val: number) => [`₹${val.toLocaleString("en-IN")}`, ""]}
            contentStyle={{
              background: isDark ? "#111827" : "#fff",
              border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
              borderRadius: 8,
              fontSize: 12,
            }}
          />
          <Legend
            iconType="square"
            iconSize={8}
            formatter={(value) => (
              <span style={{ fontSize: 11, color: isDark ? "#9ca3af" : "#6b7280" }}>
                {value}
              </span>
            )}
          />
          <Bar dataKey="income" name="Income" fill="#22c55e" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expense" name="Expenses" fill="#f87171" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function CategoryBreakdown() {
  const { transactions } = useFinanceStore();
  const totals = getCategoryTotals(transactions);

  const grandTotal = totals.reduce((s, t) => s + t.value, 0);

  return (
    <div className="space-y-3">
      {totals.map(({ name, value }, i) => {
        const pct = grandTotal > 0 ? (value / grandTotal) * 100 : 0;
        return (
          <div key={name}>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-700 dark:text-gray-300">{name}</span>
              <span className="text-gray-500 dark:text-gray-400 tabular-nums">
                {formatCurrency(value)}{" "}
                <span className="text-xs text-gray-400">({pct.toFixed(0)}%)</span>
              </span>
            </div>
            <motion.div
              className="h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden"
              initial={false}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.5, delay: i * 0.04, ease: "easeOut" }}
                style={{
                  background: `hsl(${240 - i * 25}, 70%, 60%)`,
                }}
                className="h-full rounded-full"
              />
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function AnalyticsSection() {
  const { transactions } = useFinanceStore();
  const summaries = getMonthlySummaries(transactions);

  return (
    <motion.div
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {/* Monthly overview bar chart */}
      <motion.div variants={item}>
        <Card>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
            Monthly Overview
          </h3>
          <MonthlyBarChart />
        </Card>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Category spend breakdown */}
        <motion.div variants={item}>
          <Card>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Spending by Category
            </h3>
            <CategoryBreakdown />
          </Card>
        </motion.div>

        {/* Month-by-month summary table */}
        <motion.div variants={item}>
          <Card>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Monthly Summary
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    {["Month", "Income", "Expenses", "Saved"].map((h) => (
                      <th
                        key={h}
                        className="py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 pr-3"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {summaries.map((row) => (
                    <tr
                      key={row.month}
                      className="border-b border-gray-50 dark:border-gray-800/60"
                    >
                      <td className="py-2.5 pr-3 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                        {row.month}
                      </td>
                      <td className="py-2.5 pr-3 text-green-600 dark:text-green-400 tabular-nums">
                        {formatCurrency(row.income)}
                      </td>
                      <td className="py-2.5 pr-3 text-red-600 dark:text-red-400 tabular-nums">
                        {formatCurrency(row.expense)}
                      </td>
                      <td
                        className={`py-2.5 tabular-nums font-medium ${
                          row.balance >= 0
                            ? "text-indigo-600 dark:text-indigo-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {formatCurrency(row.balance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
