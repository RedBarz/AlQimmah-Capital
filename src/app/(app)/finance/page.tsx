"use client";

import { motion } from "framer-motion";
import { finance } from "@/lib/data";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { AreaSpark, Donut } from "@/components/charts/Charts";
import { formatCurrency } from "@/lib/utils";

export default function Finance() {
  const total = finance.allocation.reduce((a, x) => a + x.value, 0);

  return (
    <div className="flex flex-col">
      <ScreenHeader title="Hub Financier" subtitle="Ta vue patrimoniale unifiée" />

      <div className="space-y-4 px-4 pt-3 pb-4">
        {/* Net worth hero */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
          <Card glow="gold" padding="lg">
            <p className="text-xs text-text-muted">Patrimoine net</p>
            <div className="mt-1 flex items-end gap-3">
              <p className="font-tight text-4xl font-extrabold text-text-primary tabular-nums">
                {formatCurrency(finance.netWorth)}
              </p>
              <Badge variant="green" dot className="mb-1.5">+{finance.change}%</Badge>
            </div>
            <div className="mt-3">
              <AreaSpark data={finance.evolution} color="green" height={70} suffix=" €" />
            </div>
          </Card>
        </motion.div>

        {/* Allocation donut */}
        <Card>
          <p className="mb-2 text-sm font-semibold text-text-secondary">Répartition</p>
          <div className="flex items-center gap-4">
            <div className="w-1/2">
              <Donut data={finance.allocation} height={150} centerValue={formatCurrency(total)} centerLabel="Total" />
            </div>
            <div className="flex-1 space-y-2">
              {finance.allocation.map((a) => (
                <div key={a.name} className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: a.color }} />
                  <span className="flex-1 text-xs text-text-secondary">{a.name}</span>
                  <span className="text-xs font-semibold text-text-primary tabular-nums">
                    {Math.round((a.value / total) * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Financial freedom trajectory */}
        <Card glow="green">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="target" size={16} className="text-green-progress" />
              <span className="text-sm font-medium text-text-secondary">Liberté financière</span>
            </div>
            <span className="font-tight text-lg font-bold text-green-progress">{finance.freedomProgress}%</span>
          </div>
          <ProgressBar value={finance.freedomProgress} color="green" className="mt-2" height={8} />
          <p className="mt-2 text-xs text-text-muted">
            Au rythme actuel : objectif atteint en <b className="text-text-primary">2032</b>.
          </p>
        </Card>

        {/* Drift alert */}
        <div className="rounded-2xl border border-amber-warn/30 bg-amber-warn/5 p-3.5">
          <div className="flex items-start gap-2.5">
            <Icon name="bell" size={18} className="mt-0.5 flex-shrink-0 text-amber-warn" />
            <div>
              <p className="text-sm font-semibold text-amber-warn">Dérive détectée</p>
              <p className="mt-0.5 text-xs text-text-secondary">
                Tes dépenses ce mois dépassent ta trajectoire de <b>-8 %</b>. Veux-tu simuler une correction ?
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
