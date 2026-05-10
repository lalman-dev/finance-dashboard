"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useFinanceStore } from "@/src/store/useFinanceStore";
import { getCategoryTotals, formatCurrency } from "@/src/lib/finance";
import { useTheme } from "next-themes";

const COLORS = [
  "#818cf8",
  "#34d399",
  "#fbbf24",
  "#f87171",
  "#60a5fa",
  "#a78bfa",
  "#fb7185",
  "#2dd4bf",
];

export default function SpendingPieChart() {
  const { transactions } = useFinanceStore();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const data = getCategoryTotals(transactions).slice(0, 6);
  const total = data.reduce((s, d) => s + d.value, 0);

  if (data.length === 0) {
    return (
      <div className="h-60 flex items-center justify-center text-sm text-gray-400">
        No expense data yet
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 h-60">
      {/* Donut */}
      <div className="w-40 shrink-0 h-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={72}
              innerRadius={44}
              paddingAngle={2}
            >
              {data.map((_, i) => (
                <Cell
                  key={i}
                  fill={COLORS[i % COLORS.length]}
                  strokeWidth={0}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(val) => [formatCurrency(Number(val)), ""]}
              contentStyle={{
                background: isDark ? "#1a1d27" : "#fff",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                borderRadius: 10,
                fontSize: 12,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend — custom, more readable than Recharts default */}
      <div className="flex-1 space-y-2.5 min-w-0">
        {data.map(({ name, value }, i) => {
          const pct = total > 0 ? ((value / total) * 100).toFixed(0) : "0";
          return (
            <div key={name} className="flex items-center gap-2 min-w-0">
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: COLORS[i % COLORS.length] }}
              />
              <span className="text-[12px] text-gray-600 dark:text-gray-400 truncate flex-1 min-w-0">
                {name}
              </span>
              <span className="text-[12px] font-medium text-gray-900 dark:text-white tabular-nums shrink-0">
                {pct}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
