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
        "rounded-xl p-5",
        "bg-white dark:bg-[#111318]",
        "border border-black/[0.06] dark:border-white/[0.06]",
        className,
      )}
    >
      {children}
    </div>
  );
}
