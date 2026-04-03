import { ReactNode } from "react";
import clsx from "clsx";

export default function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "rounded-2xl p-4 shadow-sm border transition-colors",
        "bg-white text-gray-900 border-gray-200",
        "dark:bg-gray-900 dark:text-white dark:border-gray-700",
        className,
      )}
    >
      {children}
    </div>
  );
}
