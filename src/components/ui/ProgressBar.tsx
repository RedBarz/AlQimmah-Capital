"use client";

import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  color?: "gold" | "blue" | "green" | "red";
  height?: number;
  showLabel?: boolean;
  className?: string;
}

const fillMap = {
  gold: "bg-gold-gradient shadow-gold-sm",
  blue: "bg-blue-gradient shadow-blue-sm",
  green: "bg-green-progress shadow-green-sm",
  red: "bg-red-risk",
};

export function ProgressBar({
  value,
  color = "gold",
  height = 6,
  showLabel = false,
  className,
}: ProgressBarProps) {
  const v = Math.min(Math.max(value, 0), 100);
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className="flex-1 rounded-full bg-surface-3 overflow-hidden"
        style={{ height }}
      >
        <div
          className={cn("h-full rounded-full transition-all duration-1000 ease-out", fillMap[color])}
          style={{ width: `${v}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-2xs font-semibold text-text-secondary tabular-nums w-9 text-right">
          {v}%
        </span>
      )}
    </div>
  );
}
