"use client";
import AnalyticsSection from "@/src/features/analytics/AnalyticsSection";
import { motion } from "framer-motion";

export default function AnalyticsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <AnalyticsSection />
    </motion.div>
  );
}
