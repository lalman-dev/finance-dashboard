import { create } from "zustand";
import { Transaction } from "../types";
import { transactions as initialData } from "../lib/mockData";

type Role = "viewer" | "admin";
type FilterType = "all" | "income" | "expense";
type SortField = "date" | "amount";
type SortOrder = "asc" | "desc";

type Store = {
  transactions: Transaction[];

  role: Role;
  filter: FilterType;
  search: string;
  sortBy: SortField;
  sortOrder: SortOrder;

  setSort: (field: SortField) => void;

  setRole: (role: Role) => void;
  addTransaction: (t: Transaction) => void;

  setFilter: (filter: FilterType) => void;
  setSearch: (search: string) => void;
};

export const useFinanceStore = create<Store>((set) => ({
  transactions: initialData,
  role: "viewer",
  filter: "all",
  search: "",
  sortBy: "date",
  sortOrder: "desc",

  setSort: (field) =>
    set((state) => ({
      sortBy: field,
      sortOrder:
        state.sortBy === field && state.sortOrder === "asc" ? "desc" : "asc",
    })),

  setRole: (role) => set({ role }),

  addTransaction: (t) =>
    set((state) => ({
      transactions: [t, ...state.transactions],
    })),

  setFilter: (filter) => set({ filter }),

  setSearch: (search) => set({ search }),
}));
