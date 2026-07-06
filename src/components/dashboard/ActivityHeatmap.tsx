"use client";

import { useApp, lastNDays, todayISO, currentStreak } from "@/lib/tracker";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

const levelColor = [
  "bg-surface-3",
  "bg-gold/25",
  "bg-gold/45",
  "bg-gold/70",
  "bg-gold",
];

const dayLabels = ["L", "M", "M", "J", "V", "S", "D"];

export function ActivityHeatmap() {
  const { state, logActivity } = useApp();
  const days = lastNDays(35); // 5 semaines
  const today = todayISO();
  const streak = currentStreak(state.activity);
  const activeDays = days.filter((d) => (state.activity[d] ?? 0) > 0).length;

  const cycle = (date: string) => {
    const cur = state.activity[date] ?? 0;
    logActivity(date, (cur + 1) % 5);
  };

  // organiser en colonnes (semaines) de 7
  const weeks: string[][] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="flame" size={16} className="text-gold" />
          <h3 className="font-tight text-sm font-semibold text-text-primary">Suivi d'activité</h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-xs">
            <Icon name="flame" size={13} className="text-gold" />
            <b className="text-gold tabular-nums">{streak}</b>
            <span className="text-text-muted">jours</span>
          </span>
          <span className="text-2xs text-text-muted tabular-nums">{activeDays}/35 actifs</span>
        </div>
      </div>

      <div className="flex gap-1.5">
        {/* labels jours */}
        <div className="flex flex-col justify-between py-0.5">
          {dayLabels.map((d, i) => (
            <span key={i} className="h-4 text-[9px] leading-4 text-text-muted">{d}</span>
          ))}
        </div>
        {/* grille */}
        <div className="flex flex-1 gap-1.5">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-1 flex-col gap-1.5">
              {week.map((date) => {
                const level = state.activity[date] ?? 0;
                const isToday = date === today;
                return (
                  <button
                    key={date}
                    onClick={() => cycle(date)}
                    title={`${date} · niveau ${level}`}
                    className={cn(
                      "h-4 w-full rounded-[3px] transition-all active:scale-90",
                      levelColor[level],
                      isToday && "ring-1 ring-gold ring-offset-1 ring-offset-surface-2"
                    )}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-2xs text-text-muted">Touche une case pour enregistrer ton effort du jour</p>
        <div className="flex items-center gap-1">
          <span className="text-2xs text-text-muted">Moins</span>
          {levelColor.map((c, i) => (
            <span key={i} className={cn("h-2.5 w-2.5 rounded-[2px]", c)} />
          ))}
          <span className="text-2xs text-text-muted">Plus</span>
        </div>
      </div>
    </div>
  );
}
