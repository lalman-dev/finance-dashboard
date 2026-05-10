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
  const axisColor = isDark ? "#4b5563" : "#d1d5db";
  const gridColor = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";

  return (
    <div className="w-full h-60">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 4, right: 8, left: -8, bottom: 0 }}
        >
          <CartesianGrid
            stroke={gridColor}
            strokeDasharray="0"
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
              background: isDark ? "#1a1d27" : "#fff",
              border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
              borderRadius: 10,
              fontSize: 12,
              boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
            }}
            labelStyle={{
              color: isDark ? "#9ca3af" : "#6b7280",
              marginBottom: 4,
            }}
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#34d399"
            strokeWidth={2}
            dot={false}
            name="Income"
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#f87171"
            strokeWidth={2}
            dot={false}
            name="Expenses"
          />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#818cf8"
            strokeWidth={2.5}
            dot={{ r: 3, fill: "#818cf8", strokeWidth: 0 }}
            name="Balance"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
