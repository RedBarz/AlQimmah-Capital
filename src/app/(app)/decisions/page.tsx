"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { decisions } from "@/lib/data";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ScoreRing } from "@/components/ui/ScoreRing";
import { cn } from "@/lib/utils";

export default function Decisions() {
  const [activeId, setActiveId] = useState(decisions[0].id);
  const [query, setQuery] = useState("");
  const active = decisions.find((d) => d.id === activeId)!;
  const scoreColor = active.score >= 65 ? "green" : active.score >= 45 ? "gold" : "red";

  return (
    <div className="flex flex-col">
      <ScreenHeader title="Décisions" subtitle="Le moteur stratégique IA" icon="brain" />

      <div className="space-y-4 px-4 pt-3 pb-4">
        {/* Ask box */}
        <Card glow="blue" className="flex items-center gap-2">
          <Icon name="brain" size={20} className="text-blue-ai" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pose une décision de vie…"
            className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
          />
          <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-gradient text-white">
            <Icon name="arrow-up-right" size={16} />
          </button>
        </Card>

        {/* Decision chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
          {decisions.map((d) => (
            <button
              key={d.id}
              onClick={() => setActiveId(d.id)}
              className={cn(
                "flex-shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                d.id === activeId
                  ? "border-gold/40 bg-gold/10 text-gold"
                  : "border-border bg-surface-2 text-text-secondary"
              )}
            >
              {d.question}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="space-y-4"
          >
            {/* Score card */}
            <Card padding="lg">
              <p className="font-tight text-base font-semibold text-text-primary">{active.question}</p>
              <div className="mt-4 flex items-center gap-5">
                <ScoreRing value={active.score} size={110} strokeWidth={7} color={scoreColor} label="Score décision" />
                <div className="flex-1 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-muted">Impact financier</span>
                    <span className={cn("flex items-center gap-1 text-sm font-bold", active.impact >= 0 ? "text-green-progress" : "text-red-risk")}>
                      <Icon name={active.impact >= 0 ? "arrow-up-right" : "arrow-down-right"} size={14} />
                      {active.impact >= 0 ? "+" : ""}{active.impact}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-muted">Niveau de risque</span>
                    <Badge variant={active.riskColor === "red" ? "red" : "gold"} dot>{active.risk}</Badge>
                  </div>
                  <div className="rounded-lg border border-gold/20 bg-gold-subtle px-3 py-2">
                    <p className="text-2xs text-text-muted">Recommandation</p>
                    <p className="font-tight text-sm font-bold text-gold">{active.recommendation}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Reasons */}
            <Card>
              <p className="mb-3 text-sm font-semibold text-text-secondary">Analyse du Conseil IA</p>
              <div className="space-y-2.5">
                {active.reasons.map((r, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="flex items-start gap-2.5"
                  >
                    <span className={cn(
                      "mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full",
                      r.ok ? "bg-green-progress/15 text-green-progress" : "bg-red-risk/15 text-red-risk"
                    )}>
                      <Icon name={r.ok ? "check" : "x"} size={12} strokeWidth={2.5} />
                    </span>
                    <span className="text-sm text-text-secondary">{r.text}</span>
                  </motion.div>
                ))}
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-2">
              <Link href="/simulation">
                <Button variant="blue" size="lg" className="w-full" icon={<Icon name="sliders-horizontal" size={18} />}>
                  Simuler
                </Button>
              </Link>
              <Link href="/futures">
                <Button variant="gold" size="lg" className="w-full" icon={<Icon name="git-branch" size={18} />}>
                  Futurs Toi
                </Button>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
