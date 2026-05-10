// Core domain types for the finance dashboard.
// Keeping these strict at the type level saves us from a whole class of bugs
// that only show up at runtime otherwise — learned that the hard way.

export const TRANSACTION_CATEGORIES = [
  "Food & Dining",
  "Transport",
  "Shopping",
  "Salary",
  "Freelance",
  "Utilities",
  "Healthcare",
  "Entertainment",
  "Rent",
  "Investments",
  "Education",
  "Other",
] as const;

export type TransactionCategory = (typeof TRANSACTION_CATEGORIES)[number];

export type TransactionType = "income" | "expense";

export type Transaction = {
  id: string;
  amount: number;
  category: TransactionCategory;
  type: TransactionType;
  date: string; // ISO 8601 — always store as string, format on display
  note?: string;
  isRecurring?: boolean;
  tags?: string[];
};

// Budget per category. Stored separately from transactions so we can
// mutate them without touching the transaction log.
export type Budget = {
  category: TransactionCategory;
  limit: number; // monthly limit in base currency
};

// Derived insight — computed, never stored
export type Insight = {
  label: string;
  value: string;
  trend?: "up" | "down" | "neutral";
  highlight?: boolean;
};

// Month-level summary used in charts and breakdown views
export type MonthlySummary = {
  month: string; // e.g. "Jan 2026"
  income: number;
  expense: number;
  balance: number;
};

export type Role = "viewer" | "admin";
export type FilterType = "all" | "income" | "expense";
export type SortField = "date" | "amount" | "category";
export type SortOrder = "asc" | "desc";
