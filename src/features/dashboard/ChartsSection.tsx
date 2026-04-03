import Card from "@/src/components/ui/Card";
import BalanceLineChart from "@/src/components/charts/BalanceLineChart";
import SpendingPieChart from "@/src/components/charts/SpendingPieChart";

export default function ChartsSection() {
  return (
    <div className="grid md:grid-cols-2 gap-4 ">
      <Card>
        <h3 className="text-sm text-gray-500 mb-2 dark:text-gray-400">
          Balance Trend
        </h3>
        <BalanceLineChart />
      </Card>

      <Card>
        <h3 className="text-sm text-gray-500 mb-2 dark:text-gray-400">
          Spending Breakdown
        </h3>
        <SpendingPieChart />
      </Card>
    </div>
  );
}
