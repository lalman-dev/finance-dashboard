// Pure computation helpers. Nothing stateful here — take data in, return
// derived values out. This makes them trivially testable and keeps the
// components thin.

import { Budget, MonthlySummary, Transaction, TransactionCategory } from "../types";

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Get the month key (e.g. "2026-04") from a date string
function monthKey(dateStr: string): string {
  return dateStr.slice(0, 7);
}

// Human-readable month label from a key
function monthLabel(key: string): string {
  const [year, month] = key.split("-");
  return new Date(Number(year), Number(month) - 1).toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric",
  });
}

export function getMonthlySummaries(transactions: Transaction[]): MonthlySummary[] {
  const map = new Map<string, { income: number; expense: number }>();

  for (const t of transactions) {
    const key = monthKey(t.date);
    if (!map.has(key)) map.set(key, { income: 0, expense: 0 });
    const entry = map.get(key)!;
    if (t.type === "income") entry.income += t.amount;
    else entry.expense += t.amount;
  }

  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, { income, expense }]) => ({
      month: monthLabel(key),
      income,
      expense,
      balance: income - expense,
    }));
}

export function getCategoryTotals(
  transactions: Transaction[]
): { name: string; value: number }[] {
  const map: Record<string, number> = {};

  for (const t of transactions.filter((t) => t.type === "expense")) {
    map[t.category] = (map[t.category] ?? 0) + t.amount;
  }

  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({ name, value }));
}

export function getBudgetStatus(
  transactions: Transaction[],
  budgets: Budget[],
  month?: string // e.g. "2026-04", defaults to current
) {
  const targetMonth = month ?? new Date().toISOString().slice(0, 7);

  const expensesThisMonth = transactions.filter(
    (t) => t.type === "expense" && monthKey(t.date) === targetMonth
  );

  return budgets.map((b) => {
    const spent = expensesThisMonth
      .filter((t) => t.category === b.category)
      .reduce((sum, t) => sum + t.amount, 0);

    const pct = b.limit > 0 ? Math.min((spent / b.limit) * 100, 100) : 0;
    const isOver = spent > b.limit;

    return {
      category: b.category as TransactionCategory,
      limit: b.limit,
      spent,
      remaining: Math.max(b.limit - spent, 0),
      pct,
      isOver,
    };
  });
}

export function getSavingsRate(transactions: Transaction[], month?: string): number {
  const targetMonth = month ?? new Date().toISOString().slice(0, 7);
  const monthTx = transactions.filter((t) => monthKey(t.date) === targetMonth);

  const income = monthTx.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const expense = monthTx.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);

  if (income === 0) return 0;
  return Math.round(((income - expense) / income) * 100);
}

// Compare this month's totals to last month's
export function getMonthOverMonth(transactions: Transaction[]) {
  const now = new Date();
  const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1);
  const lastMonth = `${lastMonthDate.getFullYear()}-${String(lastMonthDate.getMonth() + 1).padStart(2, "0")}`;

  const sum = (month: string, type: "income" | "expense") =>
    transactions
      .filter((t) => monthKey(t.date) === month && t.type === type)
      .reduce((s, t) => s + t.amount, 0);

  const thisIncome = sum(thisMonth, "income");
  const lastIncome = sum(lastMonth, "income");
  const thisExpense = sum(thisMonth, "expense");
  const lastExpense = sum(lastMonth, "expense");

  const pctChange = (curr: number, prev: number) => {
    if (prev === 0) return null;
    return Math.round(((curr - prev) / prev) * 100);
  };

  return {
    income: { current: thisIncome, change: pctChange(thisIncome, lastIncome) },
    expense: { current: thisExpense, change: pctChange(thisExpense, lastExpense) },
    balance: {
      current: thisIncome - thisExpense,
      change: pctChange(thisIncome - thisExpense, lastIncome - lastExpense),
    },
  };
}
