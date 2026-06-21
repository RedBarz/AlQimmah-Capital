"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { MultiArea } from "@/components/charts/Charts";
import { cn, formatCurrency } from "@/lib/utils";

export default function Simulation() {
  const [price, setPrice] = useState(65000);
  const [years, setYears] = useState(5);

  // live computed metrics
  const computed = useMemo(() => {
    const monthly = Math.round((price * 1.09) / (years * 12) + 220); // loan + insurance approx
    const residual = Math.round(price * 0.5 * Math.pow(0.85, years - 1));
    const investedGrowth = Math.round(price * Math.pow(1.08, 10)); // opportunity cost @8%/10y
    const patrimonyImpact = -(investedGrowth - residual);
    return { monthly, residual, investedGrowth, patrimonyImpact };
  }, [price, years]);

  // trajectory bands react to price
  const factor = price / 65000;
  const present = [28, 41, 58, 79, 104, 133, 198, 312];
  const withPurchase = present.map((v, i) => Math.round(v - (computed.investedGrowth / 1000) * (i / 7) * factor * 0.6));
  const years_axis = ["2026", "2027", "2028", "2029", "2030", "2031", "2033", "2036"];
  const series = [
    { name: "Sans achat", data: present.map((v, i) => ({ year: years_axis[i], value: v })), color: "gold-light" as const },
    { name: "Avec achat", data: withPurchase.map((v, i) => ({ year: years_axis[i], value: Math.max(v, 5) })), color: "red" as const },
  ];

  return (
    <div className="flex flex-col">
      <ScreenHeader title="Simuler une décision" back subtitle="Acheter cette BMW Série 6" />

      <div className="space-y-4 px-4 pt-3 pb-4">
        {/* Object */}
        <Card padding="none" className="overflow-hidden">
          <div className="relative h-36 bg-gradient-to-br from-surface-3 to-surface flex items-center justify-center">
            <div className="absolute inset-0 bg-glow-blue opacity-30" />
            <Icon name="rocket" size={48} className="text-text-muted opacity-40" />
            <Badge variant="gold" className="absolute left-3 top-3">Achat · Automobile</Badge>
          </div>
          <div className="flex items-center justify-between p-4">
            <div>
              <p className="font-tight text-base font-bold text-text-primary">BMW Série 6</p>
              <p className="text-xs text-text-muted">Prix simulé</p>
            </div>
            <p className="font-tight text-xl font-bold text-gold tabular-nums">{formatCurrency(price)}</p>
          </div>
        </Card>

        {/* Sliders */}
        <Card>
          <div className="space-y-5">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-text-secondary">Prix</label>
                <span className="text-sm font-bold text-gold tabular-nums">{formatCurrency(price)}</span>
              </div>
              <input
                type="range" min={25000} max={120000} step={2500}
                value={price} onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full accent-[#D4AF37]"
              />
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-text-secondary">Durée de financement</label>
                <span className="text-sm font-bold text-gold tabular-nums">{years} ans</span>
              </div>
              <input
                type="range" min={2} max={8} step={1}
                value={years} onChange={(e) => setYears(Number(e.target.value))}
                className="w-full accent-[#D4AF37]"
              />
            </div>
          </div>
        </Card>

        {/* Live impact on trajectory */}
        <Card>
          <p className="mb-1 text-xs text-text-muted">Impact sur ton patrimoine (k€) · 10 ans</p>
          <MultiArea series={series} height={170} />
        </Card>

        {/* Analyse complète */}
        <Card>
          <p className="mb-3 text-sm font-semibold text-text-secondary">Analyse complète</p>
          <div className="space-y-2.5">
            {[
              { label: "Valeur résiduelle estimée", value: formatCurrency(computed.residual), color: "neutral" },
              { label: "Coût mensuel total", value: formatCurrency(computed.monthly) + " /mois", color: "red" },
              { label: "Impact patrimoine (10 ans)", value: formatCurrency(computed.patrimonyImpact), color: "red" },
              { label: "Coût d'opportunité investi", value: "+" + formatCurrency(computed.investedGrowth), color: "green" },
            ].map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between border-b border-border-subtle pb-2.5 last:border-0 last:pb-0"
              >
                <span className="text-sm text-text-secondary">{m.label}</span>
                <span className={cn(
                  "font-tight text-sm font-bold tabular-nums",
                  m.color === "red" ? "text-red-risk" : m.color === "green" ? "text-green-progress" : "text-text-primary"
                )}>
                  {m.value}
                </span>
              </motion.div>
            ))}
          </div>
        </Card>

        <div className="rounded-2xl border border-red-risk/20 bg-red-risk/5 p-4">
          <div className="flex items-center gap-2">
            <Icon name="x" size={16} className="text-red-risk" />
            <p className="text-sm font-semibold text-red-risk">Verdict : reporter cet achat</p>
          </div>
          <p className="mt-1 text-xs text-text-secondary">
            Ce capital investi à 8 %/an vaudrait <b className="text-green-progress">{formatCurrency(computed.investedGrowth)}</b> dans 10 ans.
            Il retarde aussi le lancement de ton entreprise de ~6 mois.
          </p>
        </div>

        <Button size="lg" className="w-full" icon={<Icon name="check" size={18} />}>
          Enregistrer la simulation
        </Button>
      </div>
    </div>
  );
}
