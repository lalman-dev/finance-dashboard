"use client";

import { useFinanceStore } from "@/src/store/useFinanceStore";
import { motion } from "framer-motion";

export default function RoleToggle() {
  const { role, setRole } = useFinanceStore();

  return (
    <div className="flex gap-2">
      {["viewer", "admin"].map((r) => (
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          key={r}
          onClick={() => setRole(r as any)}
          className={`px-3 py-1 rounded-lg border ${
            role === r ? "bg-indigo-500 text-white" : " text-indigo-500"
          }`}
        >
          {r}
        </motion.button>
      ))}
    </div>
  );
}
