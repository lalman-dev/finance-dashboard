"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useFinanceStore } from "@/src/store/useFinanceStore";
import { getMonthlySummaries } from "@/src/lib/finance";
import { useTheme } from "next-themes";

export default function BalanceLineChart() {
  const { transactions } = useFinanceStore();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const data = getMonthlySummaries(transactions);

  const axisColor = isDark ? "#6b7280" : "#9ca3af";
  const gridColor = isDark ? "#1f2937" : "#f3f4f6";

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            stroke={gridColor}
            strokeDasharray="3 3"
            vertical={false}
          />
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
            formatter={(val) => [`₹${Number(val).toLocaleString("en-IN")}`, ""]}
            contentStyle={{
              background: isDark ? "#111827" : "#fff",
              border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
              borderRadius: 8,
              fontSize: 12,
            }}
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#22c55e"
            strokeWidth={2}
            dot={false}
            name="Income"
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#ef4444"
            strokeWidth={2}
            dot={false}
            name="Expenses"
          />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#6366f1"
            strokeWidth={2.5}
            dot={{ r: 3, fill: "#6366f1" }}
            name="Balance"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
