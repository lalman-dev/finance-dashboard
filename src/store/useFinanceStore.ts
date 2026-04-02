import { create } from "zustand";
import { Transaction } from "../types";
import { transactions as initialData } from "../lib/mockData";

type Role = "viewer" | "admin";

type Store = {
  transactions: Transaction[];
  role: Role;

  setRole: (role: Role) => void;
  addTransaction: (t: Transaction) => void;
};

export const useFinanceStore = create<Store>((set) => ({
  transactions: initialData,
  role: "viewer",

  setRole: (role) => set({ role }),

  addTransaction: (t) =>
    set((state) => ({
      transactions: [t, ...state.transactions],
    })),
}));
