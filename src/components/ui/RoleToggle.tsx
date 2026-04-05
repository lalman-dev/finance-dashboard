"use client";

import { useFinanceStore } from "@/src/store/useFinanceStore";
import { motion } from "framer-motion";
import clsx from "clsx";

const roles = ["viewer", "admin"] as const;

export default function RoleToggle() {
  const { role, setRole } = useFinanceStore();

  return (
    <div className="relative flex bg-gray-200 dark:bg-gray-800 rounded-xl">
      <motion.div
        layout
        className="absolute top-1 bottom-1 w-1/2 rounded-lg bg-white dark:bg-gray-900 shadow"
        initial={false}
        animate={{
          x: role === "viewer" ? 0 : "100%",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />

      {roles.map((r) => (
        <button
          key={r}
          onClick={() => setRole(r)}
          className={clsx(
            "relative z-10 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
            role === r
              ? "text-black dark:text-white"
              : "text-gray-600 dark:text-gray-300",
          )}
        >
          {r}
        </button>
      ))}
    </div>
  );
}
