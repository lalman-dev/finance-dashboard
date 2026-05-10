"use client";

import { usePathname } from "next/navigation";
import RoleToggle from "@/src/components/ui/RoleToggle";
import ThemeToggle from "@/src/components/ui/ThemeToggle";

const PAGE_TITLES: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": {
    title: "Overview",
    subtitle: "Your financial snapshot at a glance",
  },
  "/dashboard/transactions": {
    title: "Transactions",
    subtitle: "All income and expense records",
  },
  "/dashboard/budgets": {
    title: "Budgets",
    subtitle: "Track spending against your monthly limits",
  },
  "/dashboard/analytics": {
    title: "Analytics",
    subtitle: "Trends and breakdowns over time",
  },
  "/dashboard/settings": {
    title: "Settings",
    subtitle: "Preferences and account configuration",
  },
};

export default function Header() {
  const pathname = usePathname();
  const page = PAGE_TITLES[pathname] ?? { title: "Dashboard", subtitle: "" };

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shrink-0">
      <div>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white leading-tight">
          {page.title}
        </h1>
        {page.subtitle && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {page.subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <RoleToggle />
        <ThemeToggle />
      </div>
    </header>
  );
}
