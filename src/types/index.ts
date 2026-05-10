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
  date: string;
  note?: string;
  isRecurring?: boolean;
  tags?: string[];
};

// Budget per category. Stored separately from transactions so we can
// mutate them without touching the transaction log.
export type Budget = {
  category: TransactionCategory;
  limit: number; // monthly limit
};

// Derived insight
export type Insight = {
  label: string;
  value: string;
  trend?: "up" | "down" | "neutral";
  highlight?: boolean;
};

// Month-level summary
export type MonthlySummary = {
  month: string;
  income: number;
  expense: number;
  balance: number;
};

export type Role = "viewer" | "admin";
export type FilterType = "all" | "income" | "expense";
export type SortField = "date" | "amount" | "category";
export type SortOrder = "asc" | "desc";