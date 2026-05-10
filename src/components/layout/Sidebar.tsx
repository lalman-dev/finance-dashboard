"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import {
  LayoutDashboard,
  ArrowLeftRight,
  PiggyBank,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard",              label: "Overview",     icon: LayoutDashboard },
  { href: "/dashboard/transactions", label: "Transactions", icon: ArrowLeftRight },
  { href: "/dashboard/budgets",      label: "Budgets",      icon: PiggyBank },
  { href: "/dashboard/analytics",    label: "Analytics",    icon: BarChart3 },
  { href: "/dashboard/settings",     label: "Settings",     icon: Settings },
];

type Props = { collapsed: boolean; onToggle: () => void };

export default function Sidebar({ collapsed, onToggle }: Props) {
  const pathname = usePathname();

  return (
    <motion.aside
      animate={{ width: collapsed ? 60 : 220 }}
      transition={{ type: "spring", stiffness: 320, damping: 32 }}
      className={clsx(
        "relative flex flex-col h-full shrink-0 overflow-hidden",
        "bg-white dark:bg-[#0e1016]",
        "border-r border-black/[0.06] dark:border-white/[0.06]"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-[60px] shrink-0 border-b border-black/[0.06] dark:border-white/[0.06]">
        <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center shrink-0">
          <TrendingUp size={14} className="text-white" strokeWidth={2.5} />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="text-[15px] font-semibold text-gray-900 dark:text-white whitespace-nowrap tracking-tight"
            >
              FinanceOS
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-hidden">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={clsx(
                "flex items-center gap-3 px-2.5 py-2 rounded-lg text-[13px] font-medium transition-colors duration-100 group",
                active
                  ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                  : "text-gray-500 dark:text-white/40 hover:text-gray-900 dark:hover:text-white/80 hover:bg-black/[0.04] dark:hover:bg-white/[0.05]"
              )}
            >
              <Icon
                size={16}
                strokeWidth={active ? 2.5 : 2}
                className={clsx(
                  "shrink-0 transition-colors",
                  active
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-gray-400 dark:text-white/30 group-hover:text-gray-600 dark:group-hover:text-white/70"
                )}
              />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    className="whitespace-nowrap"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* Collapse button */}
      <button
        onClick={onToggle}
        className={clsx(
          "absolute -right-3 top-[46px] w-6 h-6 rounded-full z-10",
          "bg-white dark:bg-[#0e1016]",
          "border border-black/[0.08] dark:border-white/[0.08]",
          "flex items-center justify-center",
          "text-gray-400 dark:text-white/30",
          "hover:text-gray-600 dark:hover:text-white/60",
          "transition-colors"
        )}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight size={11} /> : <ChevronLeft size={11} />}
      </button>
    </motion.aside>
  );
}