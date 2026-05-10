"use client";
import TransactionsSection from "@/src/features/transactions/TransactionsSection";
import { motion } from "framer-motion";

export default function TransactionsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <TransactionsSection />
    </motion.div>
  );
}
