export type Transaction = {
  id: string;
  amount: number;
  category: "Food" | "Transport" | "Salary" | "Shopping";
  type: "income" | "expense";
  date: string;
  note?: string;
};
