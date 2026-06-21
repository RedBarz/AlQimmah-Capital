"use client";

import { motion } from "framer-motion";
import { goals } from "@/lib/data";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { ProgressBar } from "@/components/ui/ProgressBar";

export default function Objectives() {
  const avg = Math.round(goals.reduce((a, g) => a + g.progress, 0) / goals.length);

  return (
    <div className="flex flex-col">
      <ScreenHeader
        title="Mes sommets"
        subtitle={`${goals.length} objectifs · ${avg}% en moyenne`}
        action={
          <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-gradient text-[#09090B] shadow-gold-sm active:scale-95">
            <Icon name="plus" size={18} strokeWidth={2.5} />
          </button>
        }
      />

      <div className="space-y-3 px-4 pt-3 pb-4">
        {goals.map((g, i) => (
          <motion.div
            key={g.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <Card glow={i === 0 ? "gold" : "none"} hover padding={i === 0 ? "lg" : "md"}>
              <div className="flex items-start gap-3">
                <span className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${
                  g.color === "gold" ? "bg-gold/10 text-gold" : g.color === "blue" ? "bg-blue-ai/10 text-blue-ai" : "bg-green-progress/10 text-green-progress"
                }`}>
                  <Icon name={g.icon} size={22} />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-tight text-base font-bold text-text-primary truncate">{g.label}</h3>
                    <Badge variant="neutral" size="sm">{g.domain}</Badge>
                  </div>
                  <div className="mt-2.5 flex items-center gap-3">
                    <ProgressBar value={g.progress} color={g.color} className="flex-1" height={6} />
                    <span className="font-tight text-sm font-bold text-text-primary tabular-nums w-9 text-right">
                      {g.progress}%
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-text-muted">
                    <Icon name="clock" size={12} />
                    <span>Échéance estimée : {g.eta}</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
