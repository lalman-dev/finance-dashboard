"use client";

import { usePathname } from "next/navigation";
import RoleToggle from "@/src/components/ui/RoleToggle";
import ThemeToggle from "@/src/components/ui/ThemeToggle";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard":              "Overview",
  "/dashboard/transactions": "Transactions",
  "/dashboard/budgets":      "Budgets",
  "/dashboard/analytics":    "Analytics",
  "/dashboard/settings":     "Settings",
};

export default function Header() {
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] ?? "Dashboard";

  return (
    <header className="flex items-center justify-between px-6 h-[60px] shrink-0
      bg-white dark:bg-[#111318]
      border-b border-black/[0.06] dark:border-white/[0.06]">
      <h1 className="text-[15px] font-semibold text-gray-900 dark:text-white">
        {title}
      </h1>

      <div className="flex items-center gap-2">
        <RoleToggle />
        <div className="w-px h-4 bg-black/10 dark:bg-white/10" />
        <ThemeToggle />
      </div>
    </header>
  );
}