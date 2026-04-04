import { Transaction } from "../types";

export function getInsights(transactions: Transaction[]) {
  const expenses = transactions.filter((t) => t.type === "expense");

  const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0);

  // category-wise sum
  const categoryMap: Record<string, number> = {};

  expenses.forEach((t) => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
  });

  const highestCategory = Object.entries(categoryMap).sort(
    (a, b) => b[1] - a[1],
  )[0];

  return {
    totalExpense,
    highestCategory: highestCategory?.[0] || "N/A",
  };
}
