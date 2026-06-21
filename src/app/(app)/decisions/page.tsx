"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ScoreRing } from "@/components/ui/ScoreRing";
import { cn, formatCurrency } from "@/lib/utils";
import { useProfile } from "@/lib/profile";
import { evaluateQuit, runwayMonths } from "@/lib/engine";

export default function Decisions() {
  const { profile, ready } = useProfile();
  const [sideIncome, setSideIncome] = useState(0);

  const result = useMemo(() => (ready ? evaluateQuit(profile, sideIncome) : null), [profile, sideIncome, ready]);
  if (!ready || !result) return null;

  const scoreColor = result.score >= 65 ? "green" : result.score >= 40 ? "gold" : "red";
  const runway = runwayMonths(profile);

  return (
    <div className="flex flex-col">
      <ScreenHeader title="Décisions" subtitle="Réponses calculées sur ta vie" icon="brain" />

      <div className="space-y-4 px-4 pt-3 pb-4">
        <Card glow="blue" className="text-center">
          <Icon name="brain" size={22} className="mx-auto text-blue-ai" />
          <p className="mt-2 font-tight text-lg font-bold text-text-primary">« Puis-je quitter mon emploi ? »</p>
          <p className="text-xs text-text-muted">Calculé sur ton épargne et tes dépenses réelles</p>
        </Card>

        {/* Side income input */}
        <Card>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium text-text-secondary">Revenu de remplacement</label>
            <span className="text-sm font-bold text-gold tabular-nums">{formatCurrency(sideIncome)}/mois</span>
          </div>
          <input type="range" min={0} max={Math.max(profile.monthlyExpenses, 4000)} step={50} value={sideIncome} onChange={(e) => setSideIncome(Number(e.target.value))} className="w-full accent-[#D4AF37]" />
          <p className="mt-1.5 text-2xs text-text-muted">
            Activité, freelance, side-business… Mets ce que tu penses pouvoir gagner sans ton emploi actuel.
          </p>
        </Card>

        {/* Result */}
        <Card padding="lg">
          <div className="flex items-center gap-5">
            <ScoreRing value={result.score} size={110} strokeWidth={7} color={scoreColor} label="Faisabilité" />
            <div className="flex-1 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-muted">Risque</span>
                <Badge variant={result.risk === "Faible" ? "green" : result.risk === "Modéré" ? "gold" : "red"} dot>{result.risk}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-muted">Autonomie totale</span>
                <span className="text-sm font-bold text-blue-ai tabular-nums">
                  {runway === Infinity ? "∞" : Math.floor(runway)} mois
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-muted">Tenue sans emploi</span>
                <span className="text-sm font-bold text-text-primary tabular-nums">
                  {result.coveredMonths >= 999 ? "Illimitée" : `${result.coveredMonths} mois`}
                </span>
              </div>
            </div>
          </div>

          <div className={cn("mt-4 rounded-xl border p-3", scoreColor === "green" ? "border-green-progress/20 bg-green-progress/5" : scoreColor === "gold" ? "border-gold/20 bg-gold-subtle" : "border-red-risk/20 bg-red-risk/5")}>
            <p className="text-sm leading-relaxed text-text-secondary">{result.recommendation}</p>
          </div>
        </Card>

        {/* How it's computed — transparency */}
        <Card>
          <p className="mb-2 text-sm font-semibold text-text-secondary">Comment c'est calculé</p>
          <div className="space-y-1.5 text-xs text-text-secondary">
            <div className="flex justify-between"><span>Épargne disponible</span><span className="tabular-nums">{formatCurrency(profile.savings)}</span></div>
            <div className="flex justify-between"><span>Dépenses mensuelles</span><span className="tabular-nums">{formatCurrency(profile.monthlyExpenses)}</span></div>
            <div className="flex justify-between"><span>Déficit mensuel sans emploi</span><span className="tabular-nums text-red-risk">{formatCurrency(result.monthlyGap)}</span></div>
            <div className="flex justify-between border-t border-border-subtle pt-1.5 font-semibold"><span className="text-text-primary">= Mois d'autonomie</span><span className="tabular-nums text-text-primary">{result.coveredMonths >= 999 ? "∞" : result.coveredMonths}</span></div>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-2">
          <Link href="/simulation">
            <Button variant="blue" size="lg" className="w-full" icon={<Icon name="sliders-horizontal" size={18} />}>Simuler un achat</Button>
          </Link>
          <Link href="/futures">
            <Button variant="gold" size="lg" className="w-full" icon={<Icon name="git-branch" size={18} />}>Futurs Toi</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
