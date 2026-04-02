import RoleToggle from "@/src/components/ui/RoleToggle";
import ChartsSection from "@/src/features/dashboard/ChartsSection";
import SummaryCards from "@/src/features/dashboard/SummaryCards";
import TransactionsSection from "@/src/features/transactions/TransactionsSection";

export default function DashboardPage() {
  return (
    <main className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <RoleToggle />
      </div>
      <SummaryCards />
      <ChartsSection />
      <TransactionsSection />
    </main>
  );
}
