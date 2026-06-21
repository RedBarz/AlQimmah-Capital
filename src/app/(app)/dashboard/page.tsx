"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { user, priorityActions, moreScreens, nextAction } from "@/lib/data";
import { ScoreRing } from "@/components/ui/ScoreRing";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { ProgressBar } from "@/components/ui/ProgressBar";

const fadeUp = (i: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.06, duration: 0.4 },
});

export default function Dashboard() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 pt-5 pb-3">
        <div className="flex items-center gap-3">
          <Logo size="sm" showText={false} />
          <div>
            <p className="text-xs text-text-muted">{user.greeting}</p>
            <h1 className="font-tight text-lg font-bold leading-tight">{user.name}</h1>
          </div>
        </div>
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border text-text-secondary">
          <Icon name="bell" size={18} />
          <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-gold badge-live" />
        </button>
      </header>

      <div className="space-y-4 px-4 pb-4">
        {/* Main score ring */}
        <motion.div {...fadeUp(0)}>
          <Card glow="gold" padding="lg" className="flex flex-col items-center">
            <span className="mb-1 text-xs font-medium uppercase tracking-wide text-text-muted">
              Objectif principal
            </span>
            <ScoreRing value={user.mainGoalProgress} size={150} strokeWidth={8} color="gold" label="Progression" />
            <div className="mt-3 text-center">
              <p className="font-tight text-base font-semibold text-text-primary">{user.mainGoal}</p>
              <p className="text-xs text-text-muted">{user.mainGoalSub}</p>
            </div>
          </Card>
        </motion.div>

        {/* Next action / Action du jour */}
        <motion.div {...fadeUp(1)}>
          <Link href="/calendar">
            <Card glow="blue" className="flex items-center gap-3" hover>
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-ai/10 text-blue-ai">
                <Icon name="zap" size={22} />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-text-muted">Prochaine action prioritaire</p>
                <p className="font-tight text-sm font-semibold text-text-primary truncate">
                  {nextAction.title}
                </p>
              </div>
              <div className="text-right">
                <p className="font-tight text-sm font-bold text-blue-ai tabular-nums">{nextAction.countdown}</p>
                <p className="text-2xs text-text-muted">restant</p>
              </div>
            </Card>
          </Link>
        </motion.div>

        {/* Priority actions */}
        <motion.div {...fadeUp(2)}>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-tight text-sm font-semibold text-text-secondary">Actions du jour</h2>
            <Link href="/action-plan" className="text-xs text-gold">Voir tout</Link>
          </div>
          <div className="space-y-2">
            {priorityActions.map((a) => (
              <Card key={a.id} padding="sm" className="flex items-center gap-3" hover>
                <button className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border border-border">
                  {a.progress === 100 && <Icon name="check" size={14} className="text-green-progress" />}
                </button>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${a.progress === 100 ? "text-text-muted line-through" : "text-text-primary"}`}>
                    {a.label}
                  </p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <ProgressBar value={a.progress} color={a.color as any} height={4} className="flex-1" />
                    <span className="text-2xs text-text-muted">{a.domain}</span>
                  </div>
                </div>
                <Badge variant={a.priority === "Élevé" ? "gold" : a.priority === "Moyen" ? "green" : "neutral"} size="sm">
                  {a.priority}
                </Badge>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Quick access to more screens */}
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
