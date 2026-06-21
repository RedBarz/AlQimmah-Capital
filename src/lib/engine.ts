// AlQimmah OS — Moteur de calcul financier RÉEL.
// Aucune donnée inventée : tout est calculé à partir du profil saisi par l'utilisateur.
// Hypothèses standard et défendables (règle des 4 %, intérêts composés).

export interface Profile {
  age: number;
  monthlyIncome: number;   // revenu net mensuel (€)
  monthlyExpenses: number; // dépenses mensuelles (€)
  savings: number;         // épargne liquide (€)
  investments: number;     // placements (€)
  debts: number;           // dettes totales (€)
  expectedReturn: number;  // rendement annuel attendu des placements (ex. 0.07 = 7 %)
}

export const defaultProfile: Profile = {
  age: 30,
  monthlyIncome: 3200,
  monthlyExpenses: 2100,
  savings: 12000,
  investments: 9000,
  debts: 4000,
  expectedReturn: 0.07,
};

// --- Indicateurs de base -------------------------------------------------

export function netWorth(p: Profile): number {
  return p.savings + p.investments - p.debts;
}

export function monthlySurplus(p: Profile): number {
  return p.monthlyIncome - p.monthlyExpenses;
}

export function savingsRate(p: Profile): number {
  if (p.monthlyIncome <= 0) return 0;
  return monthlySurplus(p) / p.monthlyIncome; // 0..1
}

// Autonomie financière : combien de mois tu tiens sans aucun revenu.
export function runwayMonths(p: Profile): number {
  if (p.monthlyExpenses <= 0) return Infinity;
  return p.savings / p.monthlyExpenses;
}

// Nombre "liberté financière" (règle des 4 %) : capital qui couvre tes dépenses à vie.
export function fireNumber(p: Profile): number {
  return p.monthlyExpenses * 12 * 25;
}

// --- Projection de patrimoine -------------------------------------------

// Valeur future d'un capital + versements mensuels, sur n années, au taux annuel r.
export function futureValue(principal: number, monthlyContribution: number, years: number, r: number): number {
  const monthlyRate = r / 12;
  const n = Math.round(years * 12);
  let value = principal;
  for (let i = 0; i < n; i++) {
    value = value * (1 + monthlyRate) + monthlyContribution;
  }
  return Math.round(value);
}

// Trajectoire patrimoine année par année (pour les graphiques).
export function netWorthTrajectory(p: Profile, years = 10): { year: string; value: number }[] {
  const start = new Date().getFullYear();
  const surplus = Math.max(monthlySurplus(p), 0);
  const out: { year: string; value: number }[] = [];
  for (let y = 0; y <= years; y++) {
    // les placements + le surplus mensuel capitalisent ; l'épargne liquide est ajoutée telle quelle
    const invested = futureValue(p.investments, surplus, y, p.expectedReturn);
    const value = Math.round((invested + p.savings - p.debts) / 1000); // en k€
    out.push({ year: String(start + y), value });
  }
  return out;
}

// Années avant d'atteindre la liberté financière (capital >= fireNumber).
export function yearsToFreedom(p: Profile): number | null {
  const target = fireNumber(p);
  const surplus = Math.max(monthlySurplus(p), 0);
  if (surplus <= 0 && p.investments < target) return null; // jamais à ce rythme
  let value = p.investments + p.savings;
  let months = 0;
  const monthlyRate = p.expectedReturn / 12;
  while (value < target && months < 12 * 80) {
    value = value * (1 + monthlyRate) + surplus;
    months++;
  }
  if (months >= 12 * 80) return null;
  return Math.round((months / 12) * 10) / 10;
}

// Progression vers la liberté financière (0..100).
export function freedomProgress(p: Profile): number {
  const target = fireNumber(p);
  if (target <= 0) return 0;
  const current = p.investments + p.savings;
  return Math.min(Math.round((current / target) * 100), 100);
}

// --- Décisions ----------------------------------------------------------

export interface PurchaseDecision {
  price: number;
  financingYears: number;
  rate?: number; // taux du crédit (ex. 0.05)
}

export interface PurchaseResult {
  monthlyPayment: number;
  totalCost: number;
  opportunityCost: number; // ce que cette somme rapporterait investie sur 10 ans
  runwayImpactMonths: number; // mois d'autonomie perdus si payé cash
  freedomDelayYears: number; // retard sur la liberté financière
  verdict: "favorable" | "prudence" | "défavorable";
  score: number; // 0..100
}

export function evaluatePurchase(p: Profile, d: PurchaseDecision): PurchaseResult {
  const rate = d.rate ?? 0.05;
  const n = Math.max(d.financingYears * 12, 1);
  const monthlyRate = rate / 12;
  // mensualité d'un crédit amortissable
  const monthlyPayment =
    monthlyRate > 0
      ? Math.round((d.price * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n)))
      : Math.round(d.price / n);
  const totalCost = monthlyPayment * n;
  // coût d'opportunité : le prix investi à expectedReturn sur 10 ans
  const opportunityCost = futureValue(d.price, 0, 10, p.expectedReturn);
  const runwayImpactMonths = p.monthlyExpenses > 0 ? Math.round(d.price / p.monthlyExpenses) : 0;

  // retard sur la liberté : on compare l'objectif avec / sans ce capital
  const base = yearsToFreedom(p);
  const after = yearsToFreedom({ ...p, savings: Math.max(p.savings - d.price, 0) });
  const freedomDelayYears = base != null && after != null ? Math.round((after - base) * 10) / 10 : 0;

  // score : pénalise un coût élevé vs revenu et un gros retard de liberté
  const burden = monthlyPayment / Math.max(p.monthlyIncome, 1); // part du revenu
  let score = 100;
  score -= Math.min(burden * 180, 60); // jusqu'à -60 si la mensualité bouffe le revenu
  score -= Math.min(freedomDelayYears * 6, 30);
  score = Math.max(Math.round(score), 0);

  const verdict = score >= 65 ? "favorable" : score >= 45 ? "prudence" : "défavorable";
  return { monthlyPayment, totalCost, opportunityCost, runwayImpactMonths, freedomDelayYears, verdict, score };
}

export interface QuitJobResult {
  runwayMonths: number;
  monthlyGap: number; // déficit mensuel sans le salaire (si side income = 0)
  coveredMonths: number;
  recommendation: string;
  score: number;
  risk: "Faible" | "Modéré" | "Élevé";
}

// Évalue "puis-je quitter mon emploi ?" avec un revenu de remplacement optionnel.
export function evaluateQuit(p: Profile, sideIncome = 0): QuitJobResult {
  const gap = Math.max(p.monthlyExpenses - sideIncome, 0);
  const covered = gap > 0 ? Math.floor(p.savings / gap) : Infinity;
  let score = 0;
  if (covered === Infinity) score = 95;
  else score = Math.min(Math.round((covered / 12) * 100), 95); // 12 mois de coussin = ~100
  const risk = score >= 65 ? "Faible" : score >= 40 ? "Modéré" : "Élevé";
  const recommendation =
    covered === Infinity
      ? "Ton revenu alternatif couvre déjà tes dépenses. Tu peux partir."
      : covered >= 12
      ? "Tu as plus de 12 mois d'autonomie. Le saut est raisonnable."
      : covered >= 6
      ? `Tu tiens ${covered} mois sans revenu. Vise 12 mois ou un revenu d'appoint avant de partir.`
      : `Seulement ${covered} mois d'autonomie. Trop risqué : renforce ton épargne ou tes revenus d'abord.`;
  return {
    runwayMonths: runwayMonths(p),
    monthlyGap: gap,
    coveredMonths: covered === Infinity ? 999 : covered,
    recommendation,
    score,
    risk,
  };
}
