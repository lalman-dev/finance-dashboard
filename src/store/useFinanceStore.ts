import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  Budget,
  FilterType,
  Role,
  SortField,
  SortOrder,
  Transaction,
} from "../types";
import { mockBudgets, mockTransactions } from "../lib/mockData";

type Store = {
  transactions: Transaction[];
  budgets: Budget[];

  // UI state — not persisted, resets on load which is fine
  role: Role;
  filter: FilterType;
  search: string;
  sortBy: SortField;
  sortOrder: SortOrder;
  activePage: number;
  pageSize: number;

  // Actions
  addTransaction: (t: Transaction) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (id: string, updated: Partial<Transaction>) => void;

  setBudget: (budget: Budget) => void;
  deleteBudget: (category: string) => void;

  setRole: (role: Role) => void;
  setFilter: (filter: FilterType) => void;
  setSearch: (search: string) => void;
  setSort: (field: SortField) => void;
  setActivePage: (page: number) => void;
  resetFilters: () => void;
};

export const useFinanceStore = create<Store>()(
  persist(
    (set) => ({
      transactions: mockTransactions,
      budgets: mockBudgets,

      role: "viewer",
      filter: "all",
      search: "",
      sortBy: "date",
      sortOrder: "desc",
      activePage: 1,
      pageSize: 10,

      addTransaction: (t) =>
        set((state) => ({
          transactions: [t, ...state.transactions],
          activePage: 1,
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      updateTransaction: (id, updated) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updated } : t
          ),
        })),

      setBudget: (budget) =>
        set((state) => {
          const existing = state.budgets.findIndex(
            (b) => b.category === budget.category
          );
          if (existing >= 0) {
            const updated = [...state.budgets];
            updated[existing] = budget;
            return { budgets: updated };
          }
          return { budgets: [...state.budgets, budget] };
        }),

      deleteBudget: (category) =>
        set((state) => ({
          budgets: state.budgets.filter((b) => b.category !== category),
        })),

      setRole: (role) => set({ role }),
      setFilter: (filter) => set({ filter, activePage: 1 }),
      setSearch: (search) => set({ search, activePage: 1 }),
      setActivePage: (activePage) => set({ activePage }),

      setSort: (field) =>
        set((state) => ({
          sortBy: field,
          sortOrder:
            state.sortBy === field && state.sortOrder === "asc" ? "desc" : "asc",
          activePage: 1,
        })),

      resetFilters: () =>
        set({ filter: "all", search: "", sortBy: "date", sortOrder: "desc", activePage: 1 }),
    }),
    {
      name: "finance-dashboard-store",
      // Only persist the data, not UI state like role/filters
      partialize: (state) => ({
        transactions: state.transactions,
        budgets: state.budgets,
      }),
    }
  )
);
