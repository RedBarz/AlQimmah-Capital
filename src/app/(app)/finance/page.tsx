"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { AreaSpark, Donut } from "@/components/charts/Charts";
import { formatCurrency } from "@/lib/utils";
import { useProfile } from "@/lib/profile";
import {
  netWorth, monthlySurplus, savingsRate, runwayMonths,
  fireNumber, freedomProgress, yearsToFreedom, netWorthTrajectory,
} from "@/lib/engine";

export default function Finance() {
  const { profile, ready } = useProfile();
  if (!ready) return null;

  const nw = netWorth(profile);
  const surplus = monthlySurplus(profile);
  const rate = Math.round(savingsRate(profile) * 100);
  const runway = runwayMonths(profile);
  const freedom = freedomProgress(profile);
  const ytf = yearsToFreedom(profile);
  const fire = fireNumber(profile);

  const allocation = [
    { name: "Épargne", value: profile.savings, color: "#10B981" },
    { name: "Placements", value: profile.investments, color: "#3B82F6" },
    { name: "Dettes", value: profile.debts, color: "#EF4444" },
  ].filter((a) => a.value > 0);
  const allocTotal = profile.savings + profile.investments;

  const traj = netWorthTrajectory(profile, 7).map((d) => ({ m: d.year, v: d.value }));

  return (
    <div className="flex flex-col">
      <ScreenHeader
        title="Hub Financier"
        subtitle="Calculé sur tes vrais chiffres"
        action={
          <Link href="/settings" className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-text-secondary">
            <Icon name="settings" size={18} />
          </Link>
        }
      />

      <div className="space-y-4 px-4 pt-3 pb-4">
        {/* Net worth hero */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
          <Card glow="gold" padding="lg">
            <p className="text-xs text-text-muted">Patrimoine net</p>
            <div className="mt-1 flex items-end gap-3">
              <p className="font-tight text-4xl font-extrabold text-text-primary tabular-nums">{formatCurrency(nw)}</p>
              <Badge variant={surplus >= 0 ? "green" : "red"} dot className="mb-1.5">
                {surplus >= 0 ? "+" : ""}{formatCurrency(surplus)}/mois
              </Badge>
            </div>
            <div className="mt-3">
              <AreaSpark data={traj} color={surplus >= 0 ? "green" : "red"} height={70} suffix=" k€" />
            </div>
            <p className="mt-1 text-center text-2xs text-text-muted">Projection patrimoine (k€) · 7 ans</p>
          </Card>
        </motion.div>

        {/* Key real metrics */}
        <div className="grid grid-cols-3 gap-2">
          <Card padding="sm" className="text-center">
            <p className="text-2xs text-text-muted">Taux d'épargne</p>
            <p className="font-tight text-lg font-bold text-gold tabular-nums">{rate}%</p>
          </Card>
          <Card padding="sm" className="text-center">
            <p className="text-2xs text-text-muted">Autonomie</p>
            <p className="font-tight text-lg font-bold text-blue-ai tabular-nums">
              {runway === Infinity ? "∞" : Math.floor(runway)}<span className="text-xs"> mois</span>
            </p>
          </Card>
          <Card padding="sm" className="text-center">
            <p className="text-2xs text-text-muted">Liberté dans</p>
            <p className="font-tight text-lg font-bold text-green-progress tabular-nums">
              {ytf == null ? "—" : ytf}<span className="text-xs"> ans</span>
            </p>
          </Card>
        </div>

        {/* Allocation */}
        {allocation.length > 0 && (
          <Card>
            <p className="mb-2 text-sm font-semibold text-text-secondary">Répartition</p>
            <div className="flex items-center gap-4">
              <div className="w-1/2">
                <Donut data={allocation} height={150} centerValue={formatCurrency(allocTotal)} centerLabel="Actifs" />
              </div>
              <div className="flex-1 space-y-2">
                {allocation.map((a) => (
                  <div key={a.name} className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: a.color }} />
                    <span className="flex-1 text-xs text-text-secondary">{a.name}</span>
                    <span className="text-xs font-semibold text-text-primary tabular-nums">{formatCurrency(a.value)}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* Financial freedom */}
        <Card glow="green">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="target" size={16} className="text-green-progress" />
              <span className="text-sm font-medium text-text-secondary">Liberté financière</span>
            </div>
            <span className="font-tight text-lg font-bold text-green-progress">{freedom}%</span>
          </div>
          <ProgressBar value={freedom} color="green" className="mt-2" height={8} />
          <p className="mt-2 text-xs text-text-muted">
            Objectif (règle des 4 %) : <b className="text-text-primary">{formatCurrency(fire)}</b>
            {ytf != null && <> · atteint dans <b className="text-green-progress">{ytf} ans</b></>}
          </p>
        </Card>

        {surplus < 0 && (
          <div className="rounded-2xl border border-red-risk/30 bg-red-risk/5 p-3.5">
            <div className="flex items-start gap-2.5">
              <Icon name="arrow-down-right" size={18} className="mt-0.5 flex-shrink-0 text-red-risk" />
              <p className="text-xs text-text-secondary">
                Tu dépenses <b className="text-red-risk">{formatCurrency(-surplus)}</b> de plus que tu ne gagnes chaque mois.
                Ton patrimoine décroît — c'est le premier levier à corriger.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
