"use client";
import SettingsSection from "@/src/features/settings/SettingsSection";
import { motion } from "framer-motion";

export default function SettingsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <SettingsSection />
    </motion.div>
  );
}
