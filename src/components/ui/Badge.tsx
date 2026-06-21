import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "gold" | "blue" | "green" | "red" | "neutral" | "outline";
  size?: "sm" | "md";
  dot?: boolean;
  className?: string;
}

const variantMap = {
  gold: "bg-gold/10 text-gold border border-gold/20",
  blue: "bg-blue-ai/10 text-blue-ai border border-blue-ai/20",
  green: "bg-green-progress/10 text-green-progress border border-green-progress/20",
  red: "bg-red-risk/10 text-red-risk border border-red-risk/20",
  neutral: "bg-surface-3 text-text-secondary border border-border",
  outline: "bg-transparent text-text-secondary border border-border",
};

const dotMap = {
  gold: "bg-gold",
  blue: "bg-blue-ai",
  green: "bg-green-progress",
  red: "bg-red-risk",
  neutral: "bg-text-muted",
  outline: "bg-text-muted",
};

export function Badge({ children, variant = "neutral", size = "sm", dot = false, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium",
        size === "sm" ? "px-2 py-0.5 text-2xs" : "px-3 py-1 text-xs",
        variantMap[variant],
        className
      )}
    >
      {dot && (
        <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", dotMap[variant])} />
      )}
      {children}
    </span>
  );
}
