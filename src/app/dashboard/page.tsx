import SummaryCards from "@/src/features/dashboard/SummaryCards";

export default function DashboardPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      <SummaryCards />
      {/* Sections will go here */}
    </main>
  );
}
