"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { visionMilestones } from "@/lib/data";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { VisionChart } from "@/components/charts/Charts";
import { cn } from "@/lib/utils";

const milestoneIcons: Record<string, string> = {
  "2026": "play",
  "2028": "rocket",
  "2030": "home",
  "2033": "wallet",
  "2036": "star",
};

export default function Vision() {
  const [selected, setSelected] = useState("2036");
  const active = visionMilestones.find((m) => m.year === selected)!;

  return (
    <div className="flex flex-col">
      <ScreenHeader title="Vision 10 ans" subtitle="Ton ascension vers le sommet" back />

      <div className="space-y-4 px-4 pt-3 pb-4">
        {/* The ascent chart */}
        <Card glow="gold" padding="lg">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <p className="text-xs text-text-muted">Patrimoine projeté en {active.year}</p>
              <motion.p
                key={active.value}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-tight text-3xl font-extrabold text-gold-shimmer"
              >
                {active.value} k€
              </motion.p>
            </div>
            <Badge variant="gold" dot>{active.label}</Badge>
          </div>
          <VisionChart data={visionMilestones} height={240} />
          <div className="mt-2 flex items-center justify-center gap-1.5 text-2xs text-text-muted">
            <span className="h-1.5 w-3 rounded-full bg-gold-gradient" />
            Trajectoire médiane (P50) · bandes P10–P90 disponibles en Pro
          </div>
        </Card>

        {/* Year scrubber */}
        <div className="flex justify-between gap-1.5">
          {visionMilestones.map((m) => (
            <button
              key={m.year}
              onClick={() => setSelected(m.year)}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 rounded-xl border py-2 transition-all",
                selected === m.year ? "border-gold/40 bg-gold/10" : "border-border bg-surface-2"
              )}
            >
              <span className={cn("flex h-7 w-7 items-center justify-center rounded-lg", selected === m.year ? "bg-gold/15 text-gold" : "bg-surface-3 text-text-muted")}>
                <Icon name={milestoneIcons[m.year]} size={14} />
              </span>
              <span className={cn("text-2xs font-semibold", selected === m.year ? "text-gold" : "text-text-muted")}>
                {m.year}
              </span>
            </button>
          ))}
        </div>

        {/* Life milestone cards */}
        <div>
          <h2 className="mb-2 font-tight text-sm font-semibold text-text-secondary">Étapes de vie</h2>
          <div className="space-y-2">
            {visionMilestones.filter((m) => m.type !== "start").map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Card
                  padding="sm"
                  glow={m.type === "summit" ? "gold" : "none"}
                  className="flex items-center gap-3"
                  hover
                  onClick={() => setSelected(m.year)}
                >
                  <span className={cn(
                    "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl",
                    m.type === "summit" ? "bg-gold/15 text-gold" : "bg-surface-3 text-text-secondary"
                  )}>
                    <Icon name={milestoneIcons[m.year]} size={18} />
                  </span>
                  <div className="flex-1">
                    <p className="font-tight text-sm font-bold text-text-primary">{m.label}</p>
                    <p className="text-2xs text-text-muted">{m.year} · {m.value} k€ de patrimoine</p>
                  </div>
                  {m.type === "summit" && <Icon name="sparkles" size={18} className="text-gold" />}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Emotional anchor */}
        <div className="rounded-2xl border border-gold/20 bg-gold-subtle p-4 text-center">
          <Icon name="trending-up" size={24} className="mx-auto text-gold" />
          <p className="mt-2 font-tight text-base font-bold text-text-primary">
            Tu es à 41 % de ton premier sommet.
          </p>
          <p className="mt-1 text-xs text-text-secondary">
            Chaque décision d'aujourd'hui dessine la courbe de demain.
          </p>
        </div>
      </div>
    </div>
  );
}
