"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { AreaSpark } from "@/components/charts/Charts";
import { formatCurrency } from "@/lib/utils";
import { useProfile } from "@/lib/profile";
import { useApp } from "@/lib/tracker";
import {
  netWorth, monthlySurplus, runwayMonths, freedomProgress,
  yearsToFreedom, savingsRate, netWorthTrajectory,
} from "@/lib/engine";
import { VersionToggle } from "./VersionToggle";
import { ActivityHeatmap } from "./ActivityHeatmap";
import { TaskTracker } from "./TaskTracker";
import { cn } from "@/lib/utils";

const tools = [
  { href: "/decisions", label: "Décision", icon: "brain", color: "text-blue-ai bg-blue-ai/10" },
  { href: "/simulation", label: "Simuler", icon: "sliders-horizontal", color: "text-gold bg-gold/10" },
  { href: "/vision", label: "Vision", icon: "trending-up", color: "text-green-progress bg-green-progress/10" },
  { href: "/finance", label: "Finances", icon: "wallet", color: "text-gold bg-gold/10" },
];

function StatTile({ label, value, sub, color, trend }: { label: string; value: string; sub?: string; color: string; trend?: "up" | "down" }) {
  return (
    <div className="rounded-xl border border-border bg-surface-2 p-3">
      <div className="flex items-center justify-between">
        <span className="text-2xs uppercase tracking-wide text-text-muted">{label}</span>
        {trend && (
          <Icon name={trend === "up" ? "arrow-up-right" : "arrow-down-right"} size={12}
            className={trend === "up" ? "text-green-progress" : "text-red-risk"} />
        )}
      </div>
      <p className={cn("mt-1 font-tight text-xl font-bold tabular-nums leading-none", color)}>{value}</p>
      {sub && <p className="mt-1 text-2xs text-text-muted">{sub}</p>}
    </div>
  );
}

export function ProDashboard() {
  const { profile, ready } = useProfile();
  const { state, addJournal } = useApp();
  const [note, setNote] = useState("");

  if (!ready) return null;

  const nw = netWorth(profile);
  const surplus = monthlySurplus(profile);
  const runway = runwayMonths(profile);
  const freedom = freedomProgress(profile);
  const ytf = yearsToFreedom(profile);
  const rate = Math.round(savingsRate(profile) * 100);

  const traj = netWorthTrajectory(profile, 10).map((d) => ({ m: d.year, v: d.value }));
  const multiple = nw > 0 ? (traj[traj.length - 1].v * 1000 / nw).toFixed(1) : "—";

  const today = new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
  const doneTasks = state.tasks.filter((t) => t.done).length;

  return (
    <div className="flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-border-subtle bg-background/80 px-4 py-3 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Logo size="sm" showText={false} />
            <div>
              <p className="text-2xs capitalize text-text-muted">{today}</p>
              <h1 className="font-tight text-base font-bold leading-tight">Centre de commande</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <VersionToggle />
            <Link href="/settings" className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-secondary">
              <Icon name="settings" size={16} />
            </Link>
          </div>
        </div>
      </header>

      <div className="space-y-4 px-4 pt-4 pb-4">
        {/* KPI grid */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 gap-2">
          <StatTile label="Patrimoine net" value={formatCurrency(nw)} sub={`×${multiple} en 10 ans`} color="text-gold" trend="up" />
          <StatTile label="Épargne / mois" value={`${surplus >= 0 ? "+" : ""}${formatCurrency(surplus)}`} sub={`Taux ${rate}%`} color={surplus >= 0 ? "text-green-progress" : "text-red-risk"} trend={surplus >= 0 ? "up" : "down"} />
          <StatTile label="Autonomie" value={runway === Infinity ? "∞" : `${Math.floor(runway)} mois`} sub="sans revenu" color="text-blue-ai" />
          <StatTile label="Liberté fin." value={`${freedom}%`} sub={ytf == null ? "à débloquer" : `dans ${ytf} ans`} color="text-green-progress" />
        </motion.div>

        {/* Trajectory panel */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <Card>
            <div className="mb-1 flex items-center justify-between">
              <h3 className="font-tight text-sm font-semibold text-text-primary">Trajectoire patrimoine</h3>
              <Link href="/vision" className="flex items-center gap-0.5 text-2xs text-gold">
                10 ans <Icon name="chevron-right" size={12} />
              </Link>
            </div>
            <AreaSpark data={traj} color="gold-light" height={110} suffix=" k€" showAxis />
          </Card>
        </motion.div>

        {/* Quick tools */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="grid grid-cols-4 gap-2">
            {tools.map((t) => (
              <Link key={t.href} href={t.href}>
                <div className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-surface-2 py-3 transition-all hover:border-gold/30 active:scale-95">
                  <span className={cn("flex h-9 w-9 items-center justify-center rounded-lg", t.color)}>
                    <Icon name={t.icon} size={18} />
                  </span>
                  <span className="text-2xs font-medium text-text-secondary">{t.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Activity tracker */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card><ActivityHeatmap /></Card>
        </motion.div>

        {/* Tasks */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card><TaskTracker /></Card>
        </motion.div>

        {/* Journal */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <Card>
            <div className="mb-2 flex items-center gap-2">
              <Icon name="book-open" size={16} className="text-text-secondary" />
              <h3 className="font-tight text-sm font-semibold text-text-primary">Journal de bord</h3>
            </div>
            <div className="flex items-center gap-2">
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { addJournal(note); setNote(""); } }}
                placeholder="Note rapide, décision, avancée…"
                className="flex-1 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-gold/40 focus:outline-none"
              />
              <button
                onClick={() => { addJournal(note); setNote(""); }}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-gradient text-[#09090B]"
              >
                <Icon name="plus" size={16} strokeWidth={2.5} />
              </button>
            </div>
            {state.journal.length > 0 && (
              <div className="mt-3 space-y-2">
                {state.journal.slice(0, 4).map((j) => (
                  <div key={j.id} className="flex items-start gap-2 border-l-2 border-gold/30 pl-2.5">
                    <div className="flex-1">
                      <p className="text-sm text-text-secondary">{j.text}</p>
                      <p className="text-2xs text-text-muted">
                        {new Date(j.ts).toLocaleString("fr-FR", { hour: "2-digit", minute: "2-digit", day: "numeric", month: "short" })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </motion.div>

        {/* Daily summary */}
        <div className="rounded-2xl border border-gold/20 bg-gold-subtle p-4">
          <div className="flex items-start gap-2.5">
            <Icon name="brain" size={18} className="mt-0.5 flex-shrink-0 text-gold" />
            <p className="text-xs leading-relaxed text-text-secondary">
              <b className="text-text-primary">Résumé du jour :</b> {doneTasks} action{doneTasks > 1 ? "s" : ""} accomplie{doneTasks > 1 ? "s" : ""}.
              {surplus >= 0
                ? ` Tu épargnes ${formatCurrency(surplus)}/mois — chaque mois te rapproche du sommet.`
                : ` Attention : ton budget est déficitaire de ${formatCurrency(-surplus)}/mois.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
