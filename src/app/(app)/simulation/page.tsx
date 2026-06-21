"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { ScoreRing } from "@/components/ui/ScoreRing";
import { MultiArea } from "@/components/charts/Charts";
import { cn, formatCurrency } from "@/lib/utils";
import { useProfile } from "@/lib/profile";
import { evaluatePurchase, netWorthTrajectory } from "@/lib/engine";

export default function Simulation() {
  const { profile, ready } = useProfile();
  const [label, setLabel] = useState("Voiture");
  const [price, setPrice] = useState(35000);
  const [years, setYears] = useState(5);

  const result = useMemo(() => (ready ? evaluatePurchase(profile, { price, financingYears: years }) : null), [profile, price, years, ready]);

  const series = useMemo(() => {
    if (!ready) return [];
    const base = netWorthTrajectory(profile, 10);
    const afterProfile = { ...profile, savings: Math.max(profile.savings - price, 0) };
    const after = netWorthTrajectory(afterProfile, 10);
    return [
      { name: "Sans achat", data: base.map((d) => ({ year: d.year, value: d.value })), color: "gold-light" as const },
      { name: "Avec achat", data: after.map((d) => ({ year: d.year, value: d.value })), color: "red" as const },
    ];
  }, [profile, price, ready]);

  if (!ready || !result) return null;

  const scoreColor = result.score >= 65 ? "green" : result.score >= 45 ? "gold" : "red";
  const verdictColor = result.verdict === "favorable" ? "green" : result.verdict === "prudence" ? "gold" : "red";

  return (
    <div className="flex flex-col">
      <ScreenHeader title="Simuler un achat" back subtitle="Calculé sur ta situation réelle" />

      <div className="space-y-4 px-4 pt-3 pb-4">
        {/* What */}
        <Card>
          <label className="mb-1.5 block text-xs font-medium text-text-secondary">Qu'est-ce que tu veux acheter ?</label>
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Voiture, voyage, matériel…"
            className="w-full rounded-xl border border-border bg-surface-2 px-3 py-2.5 text-sm text-text-primary focus:border-gold/40 focus:outline-none"
          />
        </Card>

        {/* Sliders */}
        <Card>
          <div className="space-y-5">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-text-secondary">Prix</label>
                <span className="text-sm font-bold text-gold tabular-nums">{formatCurrency(price)}</span>
              </div>
              <input type="range" min={500} max={150000} step={500} value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full accent-[#D4AF37]" />
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-text-secondary">Financement</label>
                <span className="text-sm font-bold text-gold tabular-nums">{years} ans</span>
              </div>
              <input type="range" min={1} max={10} step={1} value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full accent-[#D4AF37]" />
            </div>
          </div>
        </Card>

        {/* Score */}
        <Card padding="lg">
          <div className="flex items-center gap-5">
            <ScoreRing value={result.score} size={104} strokeWidth={7} color={scoreColor} label="Score" />
            <div className="flex-1">
              <Badge variant={verdictColor === "green" ? "green" : verdictColor === "gold" ? "gold" : "red"} dot>
                {result.verdict === "favorable" ? "Favorable" : result.verdict === "prudence" ? "Prudence" : "Défavorable"}
              </Badge>
              <p className="mt-2 text-sm text-text-secondary">
                {label || "Cet achat"} à {formatCurrency(price)} représente{" "}
                <b className="text-text-primary">{formatCurrency(result.monthlyPayment)}/mois</b> pendant {years} ans.
              </p>
            </div>
          </div>
        </Card>

        {/* Impact on trajectory */}
        <Card>
          <p className="mb-1 text-xs text-text-muted">Impact sur ton patrimoine (k€) · 10 ans</p>
          <MultiArea series={series} height={170} />
        </Card>

        {/* Real numbers */}
        <Card>
          <p className="mb-3 text-sm font-semibold text-text-secondary">Analyse réelle</p>
          <div className="space-y-2.5">
            {[
              { label: "Mensualité (crédit 5 %)", value: formatCurrency(result.monthlyPayment), color: "neutral" },
              { label: "Coût total payé", value: formatCurrency(result.totalCost), color: "neutral" },
              { label: "Coût d'opportunité (investi 10 ans)", value: "+" + formatCurrency(result.opportunityCost), color: "green" },
              { label: "Autonomie financière perdue", value: result.runwayImpactMonths + " mois", color: "red" },
              { label: "Retard sur ta liberté financière", value: (result.freedomDelayYears > 0 ? "+" : "") + result.freedomDelayYears + " ans", color: result.freedomDelayYears > 0 ? "red" : "green" },
            ].map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between border-b border-border-subtle pb-2.5 last:border-0 last:pb-0"
              >
                <span className="text-sm text-text-secondary">{m.label}</span>
                <span className={cn("font-tight text-sm font-bold tabular-nums", m.color === "red" ? "text-red-risk" : m.color === "green" ? "text-green-progress" : "text-text-primary")}>
                  {m.value}
                </span>
              </motion.div>
            ))}
          </div>
        </Card>

        <div className={cn("rounded-2xl border p-4", verdictColor === "green" ? "border-green-progress/20 bg-green-progress/5" : verdictColor === "gold" ? "border-gold/20 bg-gold-subtle" : "border-red-risk/20 bg-red-risk/5")}>
          <p className="text-xs leading-relaxed text-text-secondary">
            <b className="text-text-primary">Le coût réel n'est pas {formatCurrency(price)}.</b> Cette somme investie à {Math.round(profile.expectedReturn * 100)} %/an
            vaudrait <b className="text-green-progress">{formatCurrency(result.opportunityCost)}</b> dans 10 ans. C'est le vrai prix de cet achat.
          </p>
        </div>
      </div>
    </div>
  );
}
