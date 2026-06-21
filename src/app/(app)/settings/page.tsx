"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { useProfile } from "@/lib/profile";
import { Profile } from "@/lib/engine";

const rows: { key: keyof Profile; label: string; suffix: string; step: number }[] = [
  { key: "age", label: "Âge", suffix: "ans", step: 1 },
  { key: "monthlyIncome", label: "Revenu net mensuel", suffix: "€", step: 50 },
  { key: "monthlyExpenses", label: "Dépenses mensuelles", suffix: "€", step: 50 },
  { key: "savings", label: "Épargne disponible", suffix: "€", step: 500 },
  { key: "investments", label: "Placements", suffix: "€", step: 500 },
  { key: "debts", label: "Dettes totales", suffix: "€", step: 500 },
];

export default function Settings() {
  const router = useRouter();
  const { profile, setProfile, ready } = useProfile();
  const [draft, setDraft] = useState<Profile>(profile);
  const [saved, setSaved] = useState(false);

  if (!ready) return null;

  const save = () => {
    setProfile(draft);
    setSaved(true);
    setTimeout(() => router.push("/dashboard"), 600);
  };

  return (
    <div className="flex flex-col">
      <ScreenHeader title="Mes chiffres" subtitle="Modifie ta situation réelle" back />

      <div className="space-y-4 px-4 pt-3 pb-4">
        <Card>
          <div className="space-y-4">
            {rows.map((r) => (
              <div key={r.key}>
                <label className="mb-1.5 block text-xs font-medium text-text-secondary">{r.label}</label>
                <div className="flex items-center gap-2 rounded-xl border border-border bg-surface-2 px-3 py-2.5 focus-within:border-gold/40">
                  <input
                    type="number"
                    step={r.step}
                    value={draft[r.key]}
                    onChange={(e) => setDraft({ ...draft, [r.key]: Number(e.target.value) || 0 })}
                    className="flex-1 bg-transparent text-base font-semibold text-text-primary tabular-nums focus:outline-none"
                  />
                  <span className="text-sm text-text-muted">{r.suffix}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-text-secondary">
            Rendement annuel attendu (placements)
          </label>
          <Card>
            <div className="flex items-center justify-between">
              <span className="font-tight text-xl font-bold text-gold tabular-nums">
                {Math.round(draft.expectedReturn * 100)}%
              </span>
              <span className="text-xs text-text-muted">par an</span>
            </div>
            <input
              type="range" min={0} max={15} step={1}
              value={Math.round(draft.expectedReturn * 100)}
              onChange={(e) => setDraft({ ...draft, expectedReturn: Number(e.target.value) / 100 })}
              className="mt-2 w-full accent-[#D4AF37]"
            />
            <p className="mt-1 text-2xs text-text-muted">
              Hypothèse de croissance. 7 % = moyenne historique d'un portefeuille actions long terme.
            </p>
          </Card>
        </div>

        <Button size="lg" className="w-full" onClick={save} icon={<Icon name={saved ? "check" : "check"} size={18} />}>
          {saved ? "Enregistré" : "Enregistrer mes chiffres"}
        </Button>

        <div className="rounded-2xl border border-border bg-surface-2 p-3.5">
          <div className="flex items-start gap-2.5">
            <Icon name="lock" size={16} className="mt-0.5 flex-shrink-0 text-text-muted" />
            <p className="text-2xs text-text-muted">
              Tes chiffres sont stockés uniquement sur cet appareil (stockage local du navigateur).
              Rien n'est envoyé sur un serveur.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
