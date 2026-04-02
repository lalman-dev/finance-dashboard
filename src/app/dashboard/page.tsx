import ChartsSection from "@/src/features/dashboard/ChartsSection";
import SummaryCards from "@/src/features/dashboard/SummaryCards";
import TransactionsSection from "@/src/features/transactions/TransactionsSection";

export default function DashboardPage() {
  return (
    <main className="p-6 space-y-8">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      <SummaryCards />
      <ChartsSection />
      <TransactionsSection />
    </main>
  );
}
