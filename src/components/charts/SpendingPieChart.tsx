"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useFinanceStore } from "@/src/store/useFinanceStore";
import { getCategoryTotals } from "@/src/lib/finance";
import { useTheme } from "next-themes";

const COLORS = [
  "#6366f1",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
];

export default function SpendingPieChart() {
  const { transactions } = useFinanceStore();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const data = getCategoryTotals(transactions).slice(0, 6); // top 6 only

  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-sm text-gray-400">
        No expense data yet
      </div>
    );
  }

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="40%"
            outerRadius={80}
            innerRadius={45}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} strokeWidth={0} />
            ))}
          </Pie>
          <Tooltip
            formatter={(val) => [`₹${Number(val).toLocaleString("en-IN")}`, ""]}
            contentStyle={{
              background: isDark ? "#111827" : "#fff",
              border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
              borderRadius: 8,
              fontSize: 12,
            }}
          />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            iconType="circle"
            iconSize={8}
            formatter={(value) => (
              <span
                style={{ fontSize: 11, color: isDark ? "#9ca3af" : "#6b7280" }}
              >
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
