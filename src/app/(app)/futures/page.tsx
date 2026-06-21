"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { futureSelves } from "@/lib/data";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils";

const colorClasses = {
  blue: { text: "text-blue-ai", bg: "bg-blue-ai/10", ring: "ring-blue-ai/40", glow: "shadow-blue-md", grad: "from-blue-ai/30", dot: "bg-blue-ai" },
  gold: { text: "text-gold", bg: "bg-gold/10", ring: "ring-gold/40", glow: "shadow-gold-md", grad: "from-gold/30", dot: "bg-gold" },
  green: { text: "text-green-progress", bg: "bg-green-progress/10", ring: "ring-green-progress/40", glow: "shadow-green-sm", grad: "from-green-progress/30", dot: "bg-green-progress" },
};

export default function Futures() {
  const [selectedId, setSelectedId] = useState(futureSelves[2].id);
  const selected = futureSelves.find((s) => s.id === selectedId)!;
  const c = colorClasses[selected.color];

  return (
    <div className="flex flex-col">
      <ScreenHeader
        title="Le Conseil des Futurs Toi"
        subtitle="Trois versions de toi débattent"
        back
        action={<Badge variant="gold" dot className="badge-live">IA</Badge>}
      />

      <div className="space-y-5 px-4 pt-3 pb-4">
        {/* The decision in debate */}
        <Card glow="blue" className="text-center">
          <p className="text-xs text-text-muted">Décision en débat</p>
          <p className="mt-1 font-tight text-lg font-bold text-text-primary">
            « Dois-je quitter mon CDI&nbsp;? »
          </p>
        </Card>

        {/* Three orbs */}
        <div className="grid grid-cols-3 gap-3">
          {futureSelves.map((self, i) => {
            const cc = colorClasses[self.color];
            const active = self.id === selectedId;
            return (
              <motion.button
                key={self.id}
                onClick={() => setSelectedId(self.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="relative">
                  {/* halo */}
                  <div
                    className={cn(
                      "absolute inset-0 rounded-full blur-xl transition-opacity duration-500",
                      cc.bg,
                      active ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <motion.div
                    animate={active ? { y: [0, -6, 0] } : {}}
                    transition={{ duration: 3, repeat: Infinity }}
                    className={cn(
                      "relative flex h-16 w-16 items-center justify-center rounded-full ring-2 transition-all duration-300",
                      cc.bg,
                      active ? cn(cc.ring, cc.glow, "scale-110") : "ring-border opacity-60"
                    )}
                  >
                    <Icon name={self.icon} size={26} className={cc.text} />
                  </motion.div>
                </div>
                <span
                  className={cn(
                    "text-2xs font-semibold leading-tight transition-colors",
                    active ? cc.text : "text-text-muted"
                  )}
                >
                  {self.name}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Selected self detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            className="space-y-4"
          >
            <Card glow={selected.color} padding="lg" className={cn("bg-gradient-to-b to-transparent", c.grad)}>
              <div className="flex items-start justify-between">
                <div>
                  <Badge variant={selected.color === "gold" ? "gold" : selected.color === "blue" ? "blue" : "green"} dot>
                    {selected.stance}
                  </Badge>
                  <p className="mt-2 font-tight text-xl font-bold text-text-primary leading-snug">
                    {selected.headline}
                  </p>
                </div>
              </div>

              {/* Projected outcome */}
              <div className="mt-4 flex items-center gap-4 rounded-xl border border-border bg-surface/60 p-3">
                <div className="flex-1">
                  <p className="text-2xs text-text-muted">Patrimoine projeté {selected.age}</p>
                  <p className={cn("font-tight text-2xl font-extrabold", c.text)}>{selected.netWorth}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xs text-text-muted">Probabilité</p>
                  <p className="font-tight text-lg font-bold text-text-primary">{selected.probability}%</p>
                </div>
              </div>

              {/* Argument — "voix" du futur toi */}
              <div className="mt-4 flex gap-2.5">
                <span className={cn("mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full", c.bg)}>
                  <Icon name={selected.icon} size={13} className={c.text} />
                </span>
                <p className="text-sm italic leading-relaxed text-text-secondary">
                  « {selected.argument} »
                </p>
              </div>
            </Card>

            {/* Traits comparison */}
            <Card>
              <p className="mb-3 text-sm font-semibold text-text-secondary">Profil de ce futur</p>
              <div className="space-y-3">
                {selected.traits.map((t) => (
                  <div key={t.label}>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-xs text-text-secondary">{t.label}</span>
                      <span className={cn("text-xs font-bold tabular-nums", c.text)}>{t.value}%</span>
                    </div>
                    <ProgressBar value={t.value} color={selected.color} height={5} />
                  </div>
                ))}
              </div>
            </Card>

            <Button
              variant={selected.color === "gold" ? "gold" : "blue"}
              size="lg"
              className="w-full"
              icon={<Icon name="sparkles" size={18} />}
            >
              Devenir ce Toi
            </Button>
          </motion.div>
        </AnimatePresence>

        {/* Council verdict */}
        <div className="rounded-2xl border border-gold/20 bg-gold-subtle p-4">
          <div className="flex items-start gap-2.5">
            <Icon name="brain" size={18} className="mt-0.5 flex-shrink-0 text-gold" />
            <p className="text-xs leading-relaxed text-text-secondary">
              <b className="text-text-primary">Verdict du Conseil :</b> tes trois futurs s'accordent sur un point —
              ne quitte pas dans l'urgence. <b className="text-gold">Toi-Discipliné</b> offre le meilleur
              équilibre risque/récompense : pars dans 4 mois, en position de force.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
