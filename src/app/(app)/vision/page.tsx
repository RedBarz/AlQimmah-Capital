"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { VisionChart } from "@/components/charts/Charts";
import { cn, formatCurrency } from "@/lib/utils";
import { useProfile } from "@/lib/profile";
import { netWorthTrajectory, yearsToFreedom, fireNumber, netWorth } from "@/lib/engine";

export default function Vision() {
  const { profile, ready } = useProfile();
  const [yearIdx, setYearIdx] = useState(10);

  const data = useMemo(() => {
    if (!ready) return [];
    const traj = netWorthTrajectory(profile, 10);
    const ytf = yearsToFreedom(profile);
    return traj.map((d, i) => ({
      year: d.year,
      value: d.value,
      label: i === 0 ? "Aujourd'hui" : i === 10 ? "Sommet" : `Année ${i}`,
      type: i === 0 ? "start" : i === 10 ? "summit" : ytf != null && Math.round(ytf) === i ? "milestone" : "mid",
    }));
  }, [profile, ready]);

  if (!ready || data.length === 0) return null;

  const active = data[Math.min(yearIdx, data.length - 1)];
  const ytf = yearsToFreedom(profile);
  const fire = fireNumber(profile);
  const start = netWorth(profile);
  const end = data[data.length - 1].value * 1000;
  const multiple = start > 0 ? (end / start).toFixed(1) : "—";

  return (
    <div className="flex flex-col">
      <ScreenHeader title="Vision 10 ans" subtitle="Ta trajectoire réelle, projetée" back />

      <div className="space-y-4 px-4 pt-3 pb-4">
        <Card glow="gold" padding="lg">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <p className="text-xs text-text-muted">Patrimoine projeté en {active.year}</p>
              <motion.p key={active.value} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="font-tight text-3xl font-extrabold text-gold-shimmer tabular-nums">
                {active.value} k€
              </motion.p>
            </div>
            <Badge variant="gold" dot>{active.label}</Badge>
          </div>
          <VisionChart data={data} height={240} />
          <p className="mt-2 text-center text-2xs text-text-muted">
            Croissance à {Math.round(profile.expectedReturn * 100)} %/an + ton épargne mensuelle
          </p>
        </Card>

        {/* Year scrubber */}
        <Card>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs text-text-muted">Voyage dans le temps</span>
            <span className="font-tight text-sm font-bold text-gold">{active.year}</span>
          </div>
          <input type="range" min={0} max={10} step={1} value={yearIdx > 10 ? 10 : yearIdx} onChange={(e) => setYearIdx(Number(e.target.value))} className="w-full accent-[#D4AF37]" />
          <div className="flex justify-between text-2xs text-text-muted">
            <span>{data[0].year}</span>
            <span>{data[data.length - 1].year}</span>
          </div>
        </Card>

        {/* Real insights */}
        <div className="grid grid-cols-2 gap-2">
          <Card padding="sm">
            <p className="text-2xs text-text-muted">Multiplicateur 10 ans</p>
            <p className="font-tight text-xl font-bold text-gold tabular-nums">×{multiple}</p>
          </Card>
          <Card padding="sm">
            <p className="text-2xs text-text-muted">Liberté financière</p>
            <p className="font-tight text-xl font-bold text-green-progress tabular-nums">
              {ytf == null ? "—" : `${ytf} ans`}
            </p>
          </Card>
        </div>

        <div className="rounded-2xl border border-gold/20 bg-gold-subtle p-4 text-center">
          <Icon name="trending-up" size={24} className="mx-auto text-gold" />
          <p className="mt-2 font-tight text-base font-bold text-text-primary">
            {ytf == null
              ? "À ce rythme, la liberté financière reste hors de portée."
              : `Tu atteins ${formatCurrency(fire)} en ${ytf} ans.`}
          </p>
          <p className="mt-1 text-xs text-text-secondary">
            {ytf == null
              ? "Augmente ton épargne mensuelle pour débloquer la trajectoire."
              : "Chaque euro épargné en plus rapproche ce sommet."}
          </p>
        </div>
      </div>
    </div>
  );
}
