import { Insight, Transaction } from "../types";
import { getCategoryTotals, getMonthOverMonth, getSavingsRate } from "./finance";

export function getInsights(transactions: Transaction[]): Insight[] {
  const insights: Insight[] = [];

  const mom = getMonthOverMonth(transactions);
  const savingsRate = getSavingsRate(transactions);
  const categoryTotals = getCategoryTotals(transactions);

  // Savings rate
  if (savingsRate >= 20) {
    insights.push({
      label: "Healthy savings rate",
      value: `You're saving ${savingsRate}% of your income this month — keep it up`,
      trend: "up",
      highlight: false,
    });
  } else if (savingsRate > 0) {
    insights.push({
      label: "Low savings rate",
      value: `Only ${savingsRate}% saved this month. Try reducing discretionary spend`,
      trend: "down",
      highlight: true,
    });
  } else if (savingsRate <= 0) {
    insights.push({
      label: "Spending exceeds income",
      value: `You're spending more than you earn this month. Review your budget`,
      trend: "down",
      highlight: true,
    });
  }

  // Biggest expense category
  if (categoryTotals.length > 0) {
    const top = categoryTotals[0];
    const totalExpense = categoryTotals.reduce((s, c) => s + c.value, 0);
    const pct = totalExpense > 0 ? Math.round((top.value / totalExpense) * 100) : 0;
    insights.push({
      label: "Largest expense category",
      value: `${top.name} accounts for ${pct}% of total spending`,
      trend: "neutral",
    });
  }

  // MoM expense change
  if (mom.expense.change !== null) {
    const dir = mom.expense.change > 0 ? "up" : "down";
    insights.push({
      label: "Expense trend",
      value:
        mom.expense.change === 0
          ? "Expenses unchanged vs last month"
          : `Expenses ${dir} ${Math.abs(mom.expense.change)}% compared to last month`,
      trend: dir === "up" ? "down" : "up", // expense going up is bad
      highlight: mom.expense.change > 20,
    });
  }

  // MoM income change
  if (mom.income.change !== null && mom.income.change !== 0) {
    insights.push({
      label: "Income trend",
      value: `Income ${mom.income.change > 0 ? "increased" : "decreased"} by ${Math.abs(mom.income.change)}% vs last month`,
      trend: mom.income.change > 0 ? "up" : "down",
    });
  }

  return insights;
}

