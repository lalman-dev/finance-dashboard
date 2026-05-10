"use client";

import { useFinanceStore } from "@/src/store/useFinanceStore";
import { formatCurrency, getMonthOverMonth, getSavingsRate } from "@/src/lib/finance";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Wallet, ArrowDownCircle, ArrowUpCircle, PiggyBank } from "lucide-react";
import clsx from "clsx";

type CardData = {
  label: string;
  value: string;
  change: number | null;
  icon: React.ReactNode;
  iconBg: string;
  changePositiveIsGood: boolean;
};

function TrendBadge({ change, positiveIsGood }: { change: number | null; positiveIsGood: boolean }) {
  if (change === null) return null;

  const isPositive = change > 0;
  const isGood = isPositive === positiveIsGood;

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 text-xs font-medium px-1.5 py-0.5 rounded-md",
        isGood
          ? "bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400"
          : "bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400"
      )}
    >
      {change === 0 ? (
        <Minus size={11} />
      ) : isPositive ? (
        <TrendingUp size={11} />
      ) : (
        <TrendingDown size={11} />
      )}
      {Math.abs(change)}%
    </span>
  );
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function SummaryCards() {
  const { transactions } = useFinanceStore();
  const mom = getMonthOverMonth(transactions);
  const savingsRate = getSavingsRate(transactions);

  const cards: CardData[] = [
    {
      label: "Net Balance",
      value: formatCurrency(mom.balance.current),
      change: mom.balance.change,
      icon: <Wallet size={18} />,
      iconBg: "bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400",
      changePositiveIsGood: true,
    },
    {
      label: "Income",
      value: formatCurrency(mom.income.current),
      change: mom.income.change,
      icon: <ArrowUpCircle size={18} />,
      iconBg: "bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-400",
      changePositiveIsGood: true,
    },
    {
      label: "Expenses",
      value: formatCurrency(mom.expense.current),
      change: mom.expense.change,
      icon: <ArrowDownCircle size={18} />,
      iconBg: "bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400",
      changePositiveIsGood: false,
    },
    {
      label: "Savings Rate",
      value: `${savingsRate}%`,
      change: null,
      icon: <PiggyBank size={18} />,
      iconBg: "bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400",
      changePositiveIsGood: true,
    },
  ];

  return (
    <motion.div
      className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {cards.map((card) => (
        <motion.div
          key={card.label}
          variants={item}
          className="rounded-xl p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div className={clsx("p-2 rounded-lg", card.iconBg)}>
              {card.icon}
            </div>
            <TrendBadge change={card.change} positiveIsGood={card.changePositiveIsGood} />
          </div>
          <p className="mt-3 text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">
            {card.value}
          </p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{card.label}</p>
          {card.change !== null && (
            <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">vs last month</p>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}

