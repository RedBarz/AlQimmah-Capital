"use client";

import { useApp } from "@/lib/tracker";
import { cn } from "@/lib/utils";

export function VersionToggle() {
  const { state, setDashboardVersion } = useApp();

  return (
    <div className="flex items-center gap-0.5 rounded-lg border border-border bg-surface p-0.5">
      {(["pro", "classic"] as const).map((v) => {
        const active = state.dashboardVersion === v;
        return (
          <button
            key={v}
            onClick={() => setDashboardVersion(v)}
            className={cn(
              "rounded-md px-2.5 py-1 text-2xs font-semibold uppercase tracking-wide transition-all",
              active ? "bg-gold-gradient text-[#09090B] shadow-gold-sm" : "text-text-muted hover:text-text-secondary"
            )}
          >
            {v === "pro" ? "Pro" : "Classique"}
          </button>
        );
      })}
    </div>
  );
}
