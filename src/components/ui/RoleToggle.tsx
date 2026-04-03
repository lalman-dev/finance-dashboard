"use client";

import { useFinanceStore } from "@/src/store/useFinanceStore";

export default function RoleToggle() {
  const { role, setRole } = useFinanceStore();

  return (
    <div className="flex gap-2">
      {["viewer", "admin"].map((r) => (
        <button
          key={r}
          onClick={() => setRole(r as any)}
          className={`px-3 py-1 rounded-lg border ${
            role === r ? "bg-indigo-500 text-white" : " text-indigo-500"
          }`}
        >
          {r}
        </button>
      ))}
    </div>
  );
}
