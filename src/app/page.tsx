"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { useProfile } from "@/lib/profile";
import { netWorth, runwayMonths, freedomProgress } from "@/lib/engine";
import { cn, formatCurrency } from "@/lib/utils";

type Field = {
  key: "age" | "monthlyIncome" | "monthlyExpenses" | "savings" | "investments" | "debts";
  label: string;
  hint: string;
  icon: string;
  min: number;
  max: number;
  step: number;
  suffix?: string;
};

const fields: Field[] = [
  { key: "age", label: "Ton âge", hint: "Pour calibrer ton horizon", icon: "user", min: 16, max: 75, step: 1, suffix: "ans" },
  { key: "monthlyIncome", label: "Revenu net mensuel", hint: "Ce que tu touches chaque mois", icon: "wallet", min: 0, max: 15000, step: 100, suffix: "€" },
  { key: "monthlyExpenses", label: "Dépenses mensuelles", hint: "Loyer, courses, factures…", icon: "shopping-bag", min: 0, max: 12000, step: 100, suffix: "€" },
  { key: "savings", label: "Épargne disponible", hint: "Cash mobilisable rapidement", icon: "wallet", min: 0, max: 200000, step: 500, suffix: "€" },
  { key: "investments", label: "Placements", hint: "Bourse, PEA, crypto, etc.", icon: "trending-up", min: 0, max: 500000, step: 500, suffix: "€" },
  { key: "debts", label: "Dettes totales", hint: "Crédits, prêts en cours", icon: "arrow-down-right", min: 0, max: 300000, step: 500, suffix: "€" },
];

export default function Onboarding() {
  const router = useRouter();
  const { profile, setProfile, setOnboarded } = useProfile();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState(profile);

  const totalSteps = 2 + fields.length; // welcome + fields + reveal
  const fieldIndex = step - 1;
  const isWelcome = step === 0;
  const isFields = step >= 1 && step <= fields.length;
  const isReveal = step === fields.length + 1;

  const next = () => setStep((s) => Math.min(s + 1, totalSteps - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const finish = () => {
    setProfile(draft);
    setOnboarded(true);
    router.push("/dashboard");
  };

  const nw = netWorth(draft);
  const runway = runwayMonths(draft);
  const freedom = freedomProgress(draft);

  return (
    <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-md flex-col overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 z-0 bg-hero-gradient opacity-80" />

      {/* Progress */}
      <div className="relative z-10 flex items-center gap-1.5 px-6 pt-6">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-all duration-500",
              i === step ? "bg-gold" : i < step ? "bg-gold/50" : "bg-surface-3"
            )}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-1 flex-col px-6">
        <AnimatePresence mode="wait">
          {isWelcome && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-1 flex-col items-center justify-center text-center"
            >
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity }}>
                <Logo size="xl" showText={false} />
              </motion.div>
              <h1 className="mt-6 font-tight text-4xl font-extrabold tracking-tight text-gold-shimmer">AlQimmah</h1>
              <p className="mt-1 text-xs font-medium uppercase tracking-[0.3em] text-text-muted">OS</p>
              <p className="mt-6 max-w-xs text-lg font-medium leading-snug text-text-secondary">
                Visualise ton futur.
                <br />
                Décide avec confiance.
              </p>
              <p className="mt-3 max-w-xs text-sm text-text-muted">
                6 chiffres sur ta situation réelle, et je te montre ta trajectoire. Tes données restent sur ton appareil.
              </p>
            </motion.div>
          )}

          {isFields && (
            <motion.div
              key={`field-${fieldIndex}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="flex flex-1 flex-col justify-center"
            >
              {(() => {
                const f = fields[fieldIndex];
                const value = draft[f.key];
                return (
                  <div>
                    <div className="mb-6 flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-gold">
                        <Icon name={f.icon} size={22} />
                      </span>
                      <div>
                        <p className="text-2xs uppercase tracking-wide text-text-muted">
                          Étape {fieldIndex + 1} / {fields.length}
                        </p>
                        <h2 className="font-tight text-xl font-bold text-text-primary">{f.label}</h2>
                      </div>
                    </div>

                    <div className="text-center">
                      <span className="font-tight text-5xl font-extrabold text-gold-shimmer tabular-nums">
                        {f.key === "age" ? value : value.toLocaleString("fr-FR")}
                      </span>
                      <span className="ml-1 text-2xl font-bold text-text-muted">{f.suffix}</span>
                    </div>

                    <input
                      type="range"
                      min={f.min}
                      max={f.max}
                      step={f.step}
                      value={value}
                      onChange={(e) => setDraft({ ...draft, [f.key]: Number(e.target.value) })}
                      className="mt-6 w-full accent-[#D4AF37]"
                    />

                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs text-text-muted">Ajuste précisément :</span>
                      <input
                        type="number"
                        value={value}
                        onChange={(e) => setDraft({ ...draft, [f.key]: Number(e.target.value) || 0 })}
                        className="flex-1 rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm text-text-primary tabular-nums focus:border-gold/40 focus:outline-none"
                      />
                    </div>

                    <p className="mt-3 text-center text-xs text-text-muted">{f.hint}</p>
                  </div>
                );
              })()}
            </motion.div>
          )}

          {isReveal && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-1 flex-col justify-center"
            >
              <h2 className="text-center font-tight text-2xl font-bold text-text-primary">Voici ta réalité, calculée.</h2>
              <p className="mt-1 text-center text-sm text-text-muted">À partir de tes vrais chiffres.</p>

              <div className="mt-6 space-y-3">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="rounded-2xl border border-gold/20 bg-gold-subtle p-4 text-center"
                >
                  <p className="text-xs text-text-muted">Patrimoine net</p>
                  <p className="font-tight text-3xl font-extrabold text-gold-shimmer tabular-nums">{formatCurrency(nw)}</p>
                </motion.div>
                <div className="grid grid-cols-2 gap-3">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="rounded-2xl border border-border bg-surface-2 p-4 text-center"
                  >
                    <p className="text-xs text-text-muted">Autonomie</p>
                    <p className="font-tight text-2xl font-bold text-blue-ai tabular-nums">
                      {runway === Infinity ? "∞" : Math.floor(runway)} <span className="text-sm">mois</span>
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-2xl border border-border bg-surface-2 p-4 text-center"
                  >
                    <p className="text-xs text-text-muted">Liberté financière</p>
                    <p className="font-tight text-2xl font-bold text-green-progress tabular-nums">{freedom}%</p>
                  </motion.div>
                </div>
              </div>
              <p className="mt-5 text-center text-xs text-text-muted">
                Tout l'OS calcule désormais à partir de ces chiffres. Tu pourras les modifier à tout moment.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CTA */}
      <div className="relative z-10 flex items-center gap-3 px-6 pb-10 pt-4">
        {!isWelcome && (
          <Button variant="outline" size="lg" onClick={back} className="flex-shrink-0">
            <Icon name="chevron-left" size={18} />
          </Button>
        )}
        {!isReveal ? (
          <Button size="lg" className="flex-1" onClick={next} icon={<Icon name="chevron-right" size={18} />} iconPosition="right">
            {isWelcome ? "Commencer" : "Continuer"}
          </Button>
        ) : (
          <Button size="lg" className="flex-1" onClick={finish} icon={<Icon name="sparkles" size={18} />}>
            Entrer dans AlQimmah
          </Button>
        )}
      </div>
    </div>
  );
}
