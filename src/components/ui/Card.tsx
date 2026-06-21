"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  glow?: "gold" | "blue" | "green" | "red" | "none";
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  onClick?: () => void;
}

const glowMap = {
  gold: "shadow-gold-sm hover:shadow-gold-md border-gold/20",
  blue: "shadow-blue-sm hover:shadow-blue-md border-blue-ai/20",
  green: "shadow-green-sm border-green-progress/20",
  red: "border-red-risk/20",
  none: "border-border",
};

const paddingMap = {
  none: "",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

export function Card({
  children,
  className,
  glow = "none",
  hover = false,
  padding = "md",
  onClick,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-xl border bg-surface-2 backdrop-blur-sm",
        "transition-all duration-300",
        glowMap[glow],
        paddingMap[padding],
        hover && "cursor-pointer hover:bg-surface-3 hover:scale-[1.01] hover:-translate-y-0.5",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  changeType?: "up" | "down" | "neutral";
  icon?: ReactNode;
  color?: "gold" | "blue" | "green" | "red";
  className?: string;
}

export function StatCard({ label, value, change, changeType = "neutral", icon, color = "gold", className }: StatCardProps) {
  const changeColor = changeType === "up" ? "text-green-progress" : changeType === "down" ? "text-red-risk" : "text-text-muted";
  const colorClass = {
    gold: "text-gold",
    blue: "text-blue-ai",
    green: "text-green-progress",
    red: "text-red-risk",
  }[color];

  return (
    <Card className={cn("flex flex-col gap-2", className)} glow={color}>
      <div className="flex items-start justify-between">
        <span className="text-xs text-text-muted font-medium uppercase tracking-wide">{label}</span>
        {icon && <span className={cn("opacity-60", colorClass)}>{icon}</span>}
      </div>
      <div className="flex items-end justify-between">
        <span className={cn("text-2xl font-tight font-bold", colorClass)}>{value}</span>
        {change && (
          <span className={cn("text-xs font-medium", changeColor)}>{change}</span>
        )}
      </div>
    </Card>
  );
}
