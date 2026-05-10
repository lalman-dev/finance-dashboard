"use client";

import { useFinanceStore } from "@/src/store/useFinanceStore";
import clsx from "clsx";

const roles = ["viewer", "admin"] as const;

export default function RoleToggle() {
  const { role, setRole } = useFinanceStore();

  return (
    <div className="flex items-center gap-0.5 bg-black/[0.05] dark:bg-white/[0.06] rounded-lg p-0.5">
      {roles.map((r) => (
        <button
          key={r}
          onClick={() => setRole(r)}
          className={clsx(
            "px-3 py-1.5 text-[12px] font-medium rounded-md capitalize transition-all duration-150",
            role === r
              ? "bg-white dark:bg-[#1e2130] text-gray-900 dark:text-white shadow-sm"
              : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300",
          )}
        >
          {r}
        </button>
      ))}
    </div>
  );
}
