"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils";

const summits = [
  { id: "fin", label: "Financier", icon: "wallet" },
  { id: "pro", label: "Professionnel", icon: "briefcase" },
  { id: "int", label: "Intellectuel", icon: "graduation-cap" },
  { id: "spi", label: "Spirituel", icon: "sparkles" },
  { id: "per", label: "Personnel", icon: "heart-pulse" },
];

const connections = [
  { id: "bank", label: "Compte bancaire", icon: "wallet", gain: 18 },
  { id: "cal", label: "Calendrier", icon: "calendar", gain: 9 },
  { id: "health", label: "Santé & sport", icon: "heart-pulse", gain: 7 },
  { id: "career", label: "LinkedIn", icon: "briefcase", gain: 11 },
];

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [decision, setDecision] = useState("");
  const [selectedSummits, setSelectedSummits] = useState<string[]>(["fin", "pro"]);
  const [connected, setConnected] = useState<string[]>([]);
  const precision = 34 + connected.reduce((a, c) => a + (connections.find((x) => x.id === c)?.gain ?? 0), 0);

  const next = () => setStep((s) => Math.min(s + 1, 3));

  return (
    <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-md flex-col overflow-hidden bg-background">
      {/* Mountain summit backdrop */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-hero-gradient opacity-80" />
        <svg className="absolute bottom-0 w-full" viewBox="0 0 400 300" preserveAspectRatio="none">
          <defs>
            <linearGradient id="mtn" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#18181B" />
              <stop offset="100%" stopColor="#09090B" />
            </linearGradient>
          </defs>
          <path d="M0 300 L120 140 L200 200 L280 90 L400 220 L400 300 Z" fill="url(#mtn)" opacity="0.9" />
          <path d="M0 300 L80 200 L180 240 L260 170 L360 250 L400 230 L400 300 Z" fill="#111113" opacity="0.7" />
        </svg>
        <motion.div
          className="absolute left-1/2 top-[28%] h-2 w-2 -translate-x-1/2 rounded-full bg-gold-light"
          animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.4, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ boxShadow: "0 0 24px 6px rgba(255,215,0,0.6)" }}
        />
      </div>

      {/* Progress dots */}
      <div className="relative z-10 flex items-center justify-center gap-2 pt-6">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              i === step ? "w-6 bg-gold" : i < step ? "w-1.5 bg-gold/50" : "w-1.5 bg-surface-3"
            )}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-1 flex-col px-6">
        <AnimatePresence mode="wait">
          {/* STEP 0 — Welcome */}
          {step === 0 && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-1 flex-col items-center justify-center text-center"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                <Logo size="xl" showText={false} />
              </motion.div>
              <h1 className="mt-6 font-tight text-4xl font-extrabold tracking-tight text-gold-shimmer">
                AlQimmah
              </h1>
              <p className="mt-1 text-xs font-medium uppercase tracking-[0.3em] text-text-muted">
                OS
              </p>
              <p className="mt-6 max-w-xs text-lg font-medium leading-snug text-text-secondary">
                Visualise ton futur.
                <br />
                Décide avec confiance.
              </p>
              <p className="mt-3 max-w-xs text-sm text-text-muted">
                Avant de te dire quoi faire, je vais apprendre qui tu es.
              </p>
            </motion.div>
          )}

          {/* STEP 1 — The decision */}
          {step === 1 && (
            <motion.div
              key="decision"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-1 flex-col justify-center"
            >
              <h2 className="font-tight text-2xl font-bold text-text-primary">
                Quelle décision te tient éveillé en ce moment ?
              </h2>
              <p className="mt-2 text-sm text-text-muted">
                En 90 secondes, je te montre une première projection.
              </p>
              <textarea
                value={decision}
                onChange={(e) => setDecision(e.target.value)}
                placeholder="Ex : Dois-je quitter mon CDI pour lancer mon entreprise ?"
                className="mt-5 h-28 w-full resize-none rounded-2xl border border-border bg-surface-2 p-4 text-sm text-text-primary placeholder:text-text-muted focus:border-gold/40 focus:outline-none focus:ring-1 focus:ring-gold/20"
              />
              <div className="mt-4 flex flex-wrap gap-2">
                {["Quitter mon CDI", "Acheter un bien", "Créer mon entreprise"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setDecision(s + " ?")}
                    className="rounded-full border border-border bg-surface-2 px-3 py-1.5 text-xs text-text-secondary transition-colors hover:border-gold/30 hover:text-gold"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2 — Summits */}
          {step === 2 && (
            <motion.div
              key="summits"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-1 flex-col justify-center"
            >
              <h2 className="font-tight text-2xl font-bold text-text-primary">
                Quels sommets veux-tu atteindre ?
              </h2>
              <p className="mt-2 text-sm text-text-muted">Choisis tes montagnes.</p>
              <div className="mt-5 space-y-2.5">
                {summits.map((s) => {
                  const sel = selectedSummits.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      onClick={() =>
                        setSelectedSummits((prev) =>
                          prev.includes(s.id) ? prev.filter((x) => x !== s.id) : [...prev, s.id]
                        )
                      }
                      className={cn(
                        "flex w-full items-center gap-3 rounded-2xl border p-3.5 transition-all duration-200 active:scale-[0.98]",
                        sel
                          ? "border-gold/40 bg-gold/10 shadow-gold-sm"
                          : "border-border bg-surface-2"
                      )}
                    >
                      <span className={cn("flex h-10 w-10 items-center justify-center rounded-xl", sel ? "bg-gold/15 text-gold" : "bg-surface-3 text-text-muted")}>
                        <Icon name={s.icon} size={20} />
                      </span>
                      <span className={cn("flex-1 text-left text-sm font-medium", sel ? "text-text-primary" : "text-text-secondary")}>
                        Sommet {s.label}
                      </span>
                      {sel && <Icon name="check" size={18} className="text-gold" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 3 — Connect & precision */}
          {step === 3 && (
            <motion.div
              key="connect"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-1 flex-col justify-center"
            >
              <h2 className="font-tight text-2xl font-bold text-text-primary">
                Affine ton jumeau numérique
              </h2>
              <p className="mt-2 text-sm text-text-muted">
                Chaque connexion augmente sa précision.
              </p>

              <div className="mt-5 rounded-2xl border border-gold/20 bg-gold-subtle p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-text-secondary">Précision du jumeau</span>
                  <motion.span
                    key={precision}
                    initial={{ scale: 1.3, color: "#FFD700" }}
                    animate={{ scale: 1, color: "#D4AF37" }}
                    className="font-tight text-xl font-bold"
                  >
                    {precision}%
                  </motion.span>
                </div>
                <ProgressBar value={precision} color="gold" className="mt-2" height={8} />
              </div>

              <div className="mt-4 space-y-2.5">
                {connections.map((c) => {
                  const on = connected.includes(c.id);
                  return (
                    <button
                      key={c.id}
                      onClick={() =>
                        setConnected((prev) => (prev.includes(c.id) ? prev.filter((x) => x !== c.id) : [...prev, c.id]))
                      }
                      className={cn(
                        "flex w-full items-center gap-3 rounded-2xl border p-3 transition-all active:scale-[0.98]",
                        on ? "border-green-progress/30 bg-green-progress/5" : "border-border bg-surface-2"
                      )}
                    >
                      <span className={cn("flex h-9 w-9 items-center justify-center rounded-lg", on ? "bg-green-progress/15 text-green-progress" : "bg-surface-3 text-text-muted")}>
                        <Icon name={c.icon} size={18} />
                      </span>
                      <span className="flex-1 text-left text-sm font-medium text-text-secondary">{c.label}</span>
                      {on ? (
                        <span className="flex items-center gap-1 text-xs font-medium text-green-progress">
                          <Icon name="check" size={14} /> Lié
                        </span>
                      ) : (
                        <span className="text-xs font-medium text-gold">+{c.gain}%</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CTA */}
      <div className="relative z-10 space-y-3 px-6 pb-10 pt-4">
        {step < 3 ? (
          <Button
            size="lg"
            className="w-full"
            onClick={next}
            disabled={step === 1 && decision.trim().length === 0}
            icon={<Icon name="chevron-right" size={18} />}
            iconPosition="right"
          >
            {step === 0 ? "Commencer" : "Continuer"}
          </Button>
        ) : (
          <Button
            size="lg"
            className="w-full"
            onClick={() => router.push("/dashboard")}
            icon={<Icon name="sparkles" size={18} />}
          >
            Révéler mon futur
          </Button>
        )}
        {step === 0 && (
          <button className="w-full text-center text-sm text-text-muted transition-colors hover:text-text-secondary">
            Se connecter
          </button>
        )}
      </div>
    </div>
  );
}
