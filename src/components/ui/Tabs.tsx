"use client";

import { cn } from "@/lib/utils";

interface TabsProps {
  options: { id: string; label: string }[];
  active: string;
  onChange: (id: string) => void;
  className?: string;
}

export function SegmentedTabs({ options, active, onChange, className }: TabsProps) {
  return (
    <div
      className={cn(
        "relative flex items-center gap-1 rounded-xl bg-surface p-1 border border-border",
        className
      )}
    >
      {options.map((opt) => {
        const isActive = opt.id === active;
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={cn(
              "relative flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-all duration-300",
              isActive
                ? "text-[#09090B]"
                : "text-text-secondary hover:text-text-primary"
            )}
          >
            {isActive && (
              <span className="absolute inset-0 rounded-lg bg-gold-gradient shadow-gold-sm transition-all duration-300" />
            )}
            <span className="relative z-10">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
