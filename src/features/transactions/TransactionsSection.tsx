import Card from "@/src/components/ui/Card";
import Filters from "./Filters";
import TransactionsTable from "./TransactionsTable";

export default function TransactionsSection() {
  return (
    <Card>
      <h3 className="text-lg font-medium mb-4">Transactions</h3>

      <Filters />
      <TransactionsTable />
    </Card>
  );
}
