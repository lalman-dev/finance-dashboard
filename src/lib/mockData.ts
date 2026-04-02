import { Transaction } from "../types";

export const transactions: Transaction[] = [
  {
    id: "1",
    amount: 50000,
    category: "Salary",
    type: "income",
    date: "2026-04-01",
  },
  {
    id: "2",
    amount: 2000,
    category: "Food",
    type: "expense",
    date: "2026-04-02",
  },
  {
    id: "3",
    amount: 1500,
    category: "Transport",
    type: "expense",
    date: "2026-04-03",
  },
];
