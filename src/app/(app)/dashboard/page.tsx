"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { moreScreens } from "@/lib/data";
import { ScoreRing } from "@/components/ui/ScoreRing";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { formatCurrency } from "@/lib/utils";
import { useProfile } from "@/lib/profile";
import {
  netWorth, monthlySurplus, runwayMonths, freedomProgress, yearsToFreedom,
} from "@/lib/engine";

const fadeUp = (i: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.06, duration: 0.4 },
});

export default function Dashboard() {
  const { profile, ready } = useProfile();
  if (!ready) return null;

  const nw = netWorth(profile);
  const surplus = monthlySurplus(profile);
  const runway = runwayMonths(profile);
  const freedom = freedomProgress(profile);
  const ytf = yearsToFreedom(profile);

  return (
    <div className="flex flex-col">
      <header className="flex items-center justify-between px-4 pt-5 pb-3">
        <div className="flex items-center gap-3">
          <Logo size="sm" showText={false} />
          <div>
            <p className="text-xs text-text-muted">Bonjour</p>
            <h1 className="font-tight text-lg font-bold leading-tight">Ton sommet</h1>
          </div>
        </div>
        <Link href="/settings" className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-text-secondary">
          <Icon name="settings" size={18} />
        </Link>
      </header>

      <div className="space-y-4 px-4 pb-4">
        {/* Freedom ring (real) */}
        <motion.div {...fadeUp(0)}>
          <Card glow="gold" padding="lg" className="flex flex-col items-center">
            <span className="mb-1 text-xs font-medium uppercase tracking-wide text-text-muted">Liberté financière</span>
            <ScoreRing value={freedom} size={150} strokeWidth={8} color="gold" label="atteint" />
            <div className="mt-3 text-center">
              <p className="font-tight text-base font-semibold text-text-primary">
                {ytf == null ? "Trajectoire à débloquer" : `Sommet dans ${ytf} ans`}
              </p>
              <p className="text-xs text-text-muted">Au rythme actuel de ton épargne</p>
            </div>
          </Card>
        </motion.div>

        {/* Real key numbers */}
        <motion.div {...fadeUp(1)}>
          <div className="grid grid-cols-3 gap-2">
            <Card padding="sm" className="text-center">
              <p className="text-2xs text-text-muted">Patrimoine</p>
              <p className="font-tight text-base font-bold text-gold tabular-nums">{formatCurrency(nw)}</p>
            </Card>
            <Card padding="sm" className="text-center">
              <p className="text-2xs text-text-muted">Épargne/mois</p>
              <p className={`font-tight text-base font-bold tabular-nums ${surplus >= 0 ? "text-green-progress" : "text-red-risk"}`}>
                {surplus >= 0 ? "+" : ""}{formatCurrency(surplus)}
              </p>
            </Card>
            <Card padding="sm" className="text-center">
              <p className="text-2xs text-text-muted">Autonomie</p>
              <p className="font-tight text-base font-bold text-blue-ai tabular-nums">
                {runway === Infinity ? "∞" : Math.floor(runway)}<span className="text-xs"> m</span>
              </p>
            </Card>
          </div>
        </motion.div>

        {/* Primary CTA — real decision */}
        <motion.div {...fadeUp(2)}>
          <Link href="/decisions">
            <Card glow="blue" className="flex items-center gap-3" hover>
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-ai/10 text-blue-ai">
                <Icon name="brain" size={22} />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-text-muted">Une décision en tête ?</p>
                <p className="font-tight text-sm font-semibold text-text-primary">Lance le moteur de décision</p>
              </div>
              <Icon name="chevron-right" size={18} className="text-text-muted" />
            </Card>
          </Link>
        </motion.div>

        {/* Explore */}
        <motion.div {...fadeUp(3)}>
          <h2 className="mb-2 font-tight text-sm font-semibold text-text-secondary">Explorer</h2>
          <div className="grid grid-cols-2 gap-2">
            {moreScreens.map((s) => (
              <Link key={s.href} href={s.href}>
                <Card padding="sm" className="flex h-full flex-col gap-2" glow={s.badge ? "gold" : "none"} hover>
                  <div className="flex items-start justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-3 text-gold">
                      <Icon name={s.icon} size={18} />
                    </span>
                    {s.badge && <Badge variant="gold" size="sm" className="badge-live">{s.badge}</Badge>}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{s.label}</p>
                    <p className="text-2xs text-text-muted">{s.desc}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
