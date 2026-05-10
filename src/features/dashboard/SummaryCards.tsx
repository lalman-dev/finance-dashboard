"use client";

import { useFinanceStore } from "@/src/store/useFinanceStore";
import {
  formatCurrency,
  getMonthOverMonth,
  getSavingsRate,
} from "@/src/lib/finance";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  PiggyBank,
} from "lucide-react";
import clsx from "clsx";

type CardData = {
  label: string;
  value: string;
  subtext?: string;
  change: number | null;
  icon: React.ReactNode;
  borderColor: string;
  iconColor: string;
  changePositiveIsGood: boolean;
};

function TrendBadge({
  change,
  positiveIsGood,
}: {
  change: number | null;
  positiveIsGood: boolean;
}) {
  if (change === null) return null;
  const isGood = change > 0 === positiveIsGood;
  return (
    <div
      className={clsx(
        "flex items-center gap-1 text-[11px] font-semibold",
        isGood ? "text-emerald-500" : "text-red-500",
      )}
    >
      {change > 0 ? (
        <TrendingUp size={11} strokeWidth={2.5} />
      ) : (
        <TrendingDown size={11} strokeWidth={2.5} />
      )}
      {Math.abs(change)}%
    </div>
  );
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.26 } },
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
      icon: <Wallet size={16} strokeWidth={1.8} />,
      borderColor: "border-l-indigo-400",
      iconColor: "text-indigo-400",
      changePositiveIsGood: true,
    },
    {
      label: "Income",
      value: formatCurrency(mom.income.current),
      change: mom.income.change,
      icon: <ArrowUpCircle size={16} strokeWidth={1.8} />,
      borderColor: "border-l-emerald-400",
      iconColor: "text-emerald-400",
      changePositiveIsGood: true,
    },
    {
      label: "Expenses",
      value: formatCurrency(mom.expense.current),
      change: mom.expense.change,
      icon: <ArrowDownCircle size={16} strokeWidth={1.8} />,
      borderColor: "border-l-red-400",
      iconColor: "text-red-400",
      changePositiveIsGood: false,
    },
    {
      label: "Savings Rate",
      value: `${savingsRate}%`,
      change: null,
      icon: <PiggyBank size={16} strokeWidth={1.8} />,
      borderColor: "border-l-amber-400",
      iconColor: "text-amber-400",
      changePositiveIsGood: true,
    },
  ];

  return (
    <motion.div
      className="grid grid-cols-2 lg:grid-cols-4 gap-3"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {cards.map((card) => (
        <motion.div
          key={card.label}
          variants={item}
          className={clsx(
            "relative rounded-xl p-5 border-l-[3px]",
            "bg-white dark:bg-[#111318]",
            "border border-black/[0.06] dark:border-white/[0.06]",
            "border-l-[3px]",
            card.borderColor,
          )}
        >
          {/* Icon + trend */}
          <div className="flex items-center justify-between mb-4">
            <div
              className={clsx(
                "p-1.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.05]",
                card.iconColor,
              )}
            >
              {card.icon}
            </div>
            <TrendBadge
              change={card.change}
              positiveIsGood={card.changePositiveIsGood}
            />
          </div>

          {/* Value */}
          <p className="text-[22px] font-bold text-gray-900 dark:text-white leading-none tracking-tight tabular-nums">
            {card.value}
          </p>

          {/* Label */}
          <p className="mt-1.5 text-xs text-gray-400 dark:text-gray-500 font-medium">
            {card.label}
            {card.change !== null && (
              <span className="ml-1 text-gray-300 dark:text-gray-600">
                · vs last month
              </span>
            )}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
