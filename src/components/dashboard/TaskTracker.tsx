"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useApp } from "@/lib/tracker";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const domains = ["Business", "Finances", "Santé", "Apprentissage", "Perso"];

export function TaskTracker() {
  const { state, addTask, toggleTask, removeTask } = useApp();
  const [title, setTitle] = useState("");
  const [domain, setDomain] = useState("Business");
  const [adding, setAdding] = useState(false);

  const done = state.tasks.filter((t) => t.done).length;
  const total = state.tasks.length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  const submit = () => {
    if (!title.trim()) return;
    addTask(title, domain);
    setTitle("");
    setAdding(false);
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="list-checks" size={16} className="text-blue-ai" />
          <h3 className="font-tight text-sm font-semibold text-text-primary">Focus du jour</h3>
        </div>
        <span className="text-2xs text-text-muted tabular-nums">{done}/{total} · {pct}%</span>
      </div>

      {/* mini progress */}
      <div className="mb-3 h-1 w-full overflow-hidden rounded-full bg-surface-3">
        <div className="h-full rounded-full bg-blue-gradient transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>

      <div className="space-y-1.5">
        <AnimatePresence initial={false}>
          {state.tasks.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="group flex items-center gap-2.5 rounded-lg border border-border-subtle bg-surface px-2.5 py-2"
            >
              <button
                onClick={() => toggleTask(t.id)}
                className={cn(
                  "flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border transition-colors",
                  t.done ? "border-green-progress bg-green-progress/15" : "border-border"
                )}
              >
                {t.done && <Icon name="check" size={12} className="text-green-progress" strokeWidth={2.5} />}
              </button>
              <span className={cn("flex-1 text-sm", t.done ? "text-text-muted line-through" : "text-text-primary")}>
                {t.title}
              </span>
              <Badge variant="neutral" size="sm">{t.domain}</Badge>
              <button
                onClick={() => removeTask(t.id)}
                className="text-text-muted opacity-0 transition-opacity hover:text-red-risk group-hover:opacity-100"
              >
                <Icon name="x" size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* add */}
      {adding ? (
        <div className="mt-2 space-y-2 rounded-lg border border-gold/20 bg-surface p-2.5">
          <input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Nouvelle action…"
            className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
          />
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {domains.map((d) => (
              <button
                key={d}
                onClick={() => setDomain(d)}
                className={cn(
                  "flex-shrink-0 rounded-full border px-2 py-0.5 text-2xs transition-colors",
                  domain === d ? "border-gold/40 bg-gold/10 text-gold" : "border-border text-text-muted"
                )}
              >
                {d}
              </button>
            ))}
            <button onClick={submit} className="ml-auto flex-shrink-0 rounded-md bg-gold-gradient px-3 py-1 text-2xs font-semibold text-[#09090B]">
              Ajouter
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-border py-2 text-xs text-text-muted transition-colors hover:border-gold/30 hover:text-gold"
        >
          <Icon name="plus" size={14} /> Ajouter une action
        </button>
      )}
    </div>
  );
}
