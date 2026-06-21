"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { domains, trajectory, monthlyRevenue } from "@/lib/data";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { SegmentedTabs } from "@/components/ui/Tabs";
import { AreaSpark, MultiArea } from "@/components/charts/Charts";
import { ProgressBar } from "@/components/ui/ProgressBar";

const tabs = [
  { id: "present", label: "Présent" },
  { id: "futureA", label: "Futur A" },
  { id: "futureB", label: "Futur B" },
];

const heroByTab: Record<string, { revenue: string; freedom: number; label: string }> = {
  present: { revenue: "4 320 €", freedom: 68, label: "Trajectoire actuelle" },
  futureA: { revenue: "8 900 €", freedom: 91, label: "Si tu lances l'entreprise" },
  futureB: { revenue: "4 180 €", freedom: 64, label: "Si tu restes salarié" },
};

export default function DigitalTwin() {
  const [tab, setTab] = useState("present");
  const hero = heroByTab[tab];

  const series =
    tab === "present"
      ? [{ name: "present", data: trajectory.present, color: "green" as const }]
      : tab === "futureA"
      ? [
          { name: "present", data: trajectory.present, color: "blue" as const },
          { name: "futureA", data: trajectory.futureA, color: "gold-light" as const },
        ]
      : [
          { name: "present", data: trajectory.present, color: "blue" as const },
          { name: "futureB", data: trajectory.futureB, color: "gold" as const },
        ];

  return (
    <div className="flex flex-col">
      <ScreenHeader title="Digital Twin" subtitle="Ton jumeau numérique vivant" />

      <div className="space-y-4 px-4 pt-3 pb-4">
        <SegmentedTabs options={tabs} active={tab} onChange={setTab} />

        {/* Hero metric + trajectory */}
        <Card glow="green" padding="lg">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-text-muted">Revenus mensuels projetés</p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={hero.revenue}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mt-1 font-tight text-3xl font-extrabold text-green-progress"
                >
                  {hero.revenue}
                </motion.p>
              </AnimatePresence>
            </div>
            <Badge variant="blue" dot>{hero.label}</Badge>
          </div>
          <div className="mt-3">
            <MultiArea series={series} height={180} />
          </div>
          <p className="mt-1 text-center text-2xs text-text-muted">
            Patrimoine projeté (k€) · 2026 → 2036
          </p>
        </Card>

        {/* Financial freedom */}
        <Card>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="wallet" size={16} className="text-gold" />
              <span className="text-sm font-medium text-text-secondary">Liberté financière</span>
            </div>
            <span className="font-tight text-lg font-bold text-gold">{hero.freedom}%</span>
          </div>
          <ProgressBar value={hero.freedom} color="gold" className="mt-2" height={8} />
        </Card>

        {/* Monthly revenue trend */}
        <Card>
          <p className="mb-1 text-xs text-text-muted">Évolution des revenus (7 mois)</p>
          <AreaSpark data={monthlyRevenue} color="green" height={90} suffix=" €" showAxis />
        </Card>

        {/* Domains grid */}
        <div>
          <h2 className="mb-2 font-tight text-sm font-semibold text-text-secondary">
            9 domaines de vie
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {domains.map((d, i) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
              >
                <Card padding="sm" className="flex flex-col gap-1.5" hover>
                  <span className={`flex h-8 w-8 items-center justify-center rounded-lg bg-surface-3 ${
                    d.color === "gold" ? "text-gold" : d.color === "blue" ? "text-blue-ai" : "text-green-progress"
                  }`}>
                    <Icon name={d.icon} size={16} />
                  </span>
                  <div>
                    <p className="text-2xs text-text-muted">{d.label}</p>
                    <p className="font-tight text-sm font-bold text-text-primary leading-tight truncate">{d.value}</p>
                  </div>
                  <span className={`text-2xs font-medium ${d.delta >= 0 ? "text-green-progress" : "text-red-risk"}`}>
                    {d.delta >= 0 ? "+" : ""}{d.delta}%
                  </span>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
