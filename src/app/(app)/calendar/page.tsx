"use client";

import { motion } from "framer-motion";
import { calendarEvents, nextAction } from "@/lib/data";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

const dotColor = {
  gold: "bg-gold",
  blue: "bg-blue-ai",
  green: "bg-green-progress",
  red: "bg-red-risk",
};

const days = [
  { d: "L", n: 16 }, { d: "M", n: 17 }, { d: "M", n: 18 },
  { d: "J", n: 19 }, { d: "V", n: 20 }, { d: "S", n: 21, active: true }, { d: "D", n: 22 },
];

export default function Calendar() {
  return (
    <div className="flex flex-col">
      <ScreenHeader title="Calendrier intelligent" subtitle="Priorisé par l'IA" back />

      <div className="space-y-4 px-4 pt-3 pb-4">
        {/* Week strip */}
        <div className="flex justify-between">
          {days.map((day) => (
            <button
              key={day.n}
              className={cn(
                "flex flex-col items-center gap-1 rounded-xl px-2.5 py-2 transition-all",
                day.active ? "bg-gold-gradient text-[#09090B] shadow-gold-sm" : "text-text-secondary"
              )}
            >
              <span className="text-2xs font-medium">{day.d}</span>
              <span className="font-tight text-sm font-bold">{day.n}</span>
            </button>
          ))}
        </div>

        {/* Next action with countdown */}
        <Card glow="blue">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-ai/10 text-blue-ai">
              <Icon name="zap" size={22} />
            </span>
            <div className="flex-1">
              <p className="text-xs text-text-muted">Prochaine action prioritaire</p>
              <p className="font-tight text-base font-bold text-text-primary">{nextAction.title}</p>
            </div>
            <div className="text-right">
              <p className="font-tight text-lg font-bold text-blue-ai tabular-nums">{nextAction.countdown}</p>
              <p className="text-2xs text-text-muted">restant</p>
            </div>
          </div>
        </Card>

        {/* Day timeline */}
        <div>
          <h2 className="mb-2 font-tight text-sm font-semibold text-text-secondary">Aujourd'hui · Samedi 21</h2>
          <div className="relative space-y-2">
            {calendarEvents.map((e, i) => (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Card padding="sm" className="flex items-center gap-3" hover>
                  <div className="w-12 flex-shrink-0 text-center">
                    <p className="font-tight text-sm font-bold text-text-primary tabular-nums">{e.time}</p>
                    <p className="text-2xs text-text-muted">{e.duration}</p>
                  </div>
                  <div className={cn("h-10 w-1 rounded-full", dotColor[e.color])} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">{e.title}</p>
                    <Badge variant={e.color === "gold" ? "gold" : e.color === "blue" ? "blue" : "green"} size="sm" className="mt-1">
                      {e.domain}
                    </Badge>
                  </div>
                  <Icon name="chevron-right" size={16} className="text-text-muted" />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* AI optimization note */}
        <div className="rounded-2xl border border-blue-ai/20 bg-blue-ai/5 p-3.5">
          <div className="flex items-start gap-2.5">
            <Icon name="brain" size={18} className="mt-0.5 flex-shrink-0 text-blue-ai" />
            <p className="text-xs text-text-secondary">
              L'IA a déplacé ta <b className="text-text-primary">séance de sport</b> à 7h : ton énergie est maximale le matin,
              ce qui améliore ta concentration sur l'<b className="text-text-primary">appel prospects</b> de 9h30.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
