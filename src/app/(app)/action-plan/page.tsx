"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { actionPlan } from "@/lib/data";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils";

export default function ActionPlan() {
  const [done, setDone] = useState<number[]>([]);
  const toggle = (id: number) => setDone((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const progress = Math.round((done.length / actionPlan.length) * 100);

  // group by "when"
  const groups = actionPlan.reduce((acc, a) => {
    (acc[a.when] = acc[a.when] || []).push(a);
    return acc;
  }, {} as Record<string, typeof actionPlan>);

  return (
    <div className="flex flex-col">
      <ScreenHeader title="Plan d'action" subtitle="Ton chemin vers le sommet" back />

      <div className="space-y-4 px-4 pt-3 pb-4">
        {/* Overall progress */}
        <Card glow="gold">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-text-secondary">Progression du plan</span>
            <span className="font-tight text-lg font-bold text-gold">{progress}%</span>
          </div>
          <ProgressBar value={progress} color="gold" className="mt-2" height={8} />
          <p className="mt-2 text-xs text-text-muted">{done.length} / {actionPlan.length} étapes complétées</p>
        </Card>

        {/* Timeline */}
        {Object.entries(groups).map(([when, items]) => (
          <div key={when}>
            <h2 className="mb-2 ml-1 font-tight text-sm font-semibold text-text-secondary">{when}</h2>
            <div className="relative space-y-2 pl-5">
              {/* timeline line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
              {items.map((a, i) => {
                const isDone = done.includes(a.id);
                return (
                  <motion.div
                    key={a.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="relative"
                  >
                    {/* node */}
                    <span className={cn(
                      "absolute -left-[18px] top-3 h-3.5 w-3.5 rounded-full border-2 transition-colors",
                      isDone ? "border-green-progress bg-green-progress" : a.current ? "border-gold bg-gold shadow-gold-sm" : "border-border bg-surface"
                    )} />
                    <Card
                      padding="sm"
                      glow={a.current && !isDone ? "gold" : "none"}
                      className={cn("flex items-center gap-3", isDone && "opacity-60")}
                      onClick={() => toggle(a.id)}
                    >
                      <button className={cn(
                        "flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border",
                        isDone ? "border-green-progress bg-green-progress/15" : "border-border"
                      )}>
                        {isDone && <Icon name="check" size={14} className="text-green-progress" strokeWidth={2.5} />}
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className={cn("text-sm font-medium", isDone ? "text-text-muted line-through" : "text-text-primary")}>
                          {a.title}
                        </p>
                        <div className="mt-1 flex items-center gap-2 text-2xs text-text-muted">
                          <Icon name="zap" size={11} className="text-green-progress" />
                          <span className="text-green-progress">{a.impact}</span>
                          <span>·</span>
                          <span>{a.duration}</span>
                        </div>
                      </div>
                      <Badge variant="neutral" size="sm">{a.goal}</Badge>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
