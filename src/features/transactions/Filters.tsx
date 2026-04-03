"use client";

import { useFinanceStore } from "@/src/store/useFinanceStore";

export default function Filters() {
  const { filter, setFilter, search, setSearch } = useFinanceStore();

  return (
    <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
      {/* Search */}
      <input
        type="text"
        placeholder="Search transactions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg px-3 py-2"
      />

      {/* Filter */}
      <div className="flex gap-2">
        {["all", "income", "expense"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type as any)}
            className={`px-3 py-1 rounded-lg border ${
              filter === type
                ? "bg-indigo-500 text-white"
                : "bg-white dark:bg-gray-800 dark:text-white border-gray-200 dark:border-gray-700"
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}
