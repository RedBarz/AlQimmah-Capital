// AlQimmah OS — données de démonstration (jumeau numérique de "Redouane")

export const user = {
  name: "Redouane",
  greeting: "Bonjour",
  twinPrecision: 71,
  mainGoalProgress: 87,
  mainGoal: "Créer mon entreprise",
  mainGoalSub: "E-commerce spécialisé",
};

export type Domain = {
  id: string;
  label: string;
  icon: string; // lucide name
  value: string;
  delta: number; // % vs trajectoire
  color: "gold" | "blue" | "green" | "red";
  score: number; // 0-100
};

export const domains: Domain[] = [
  { id: "career", label: "Carrière", icon: "briefcase", value: "Senior", delta: 12, color: "blue", score: 74 },
  { id: "finance", label: "Finances", icon: "wallet", value: "4 320 €", delta: 8, color: "green", score: 68 },
  { id: "business", label: "Business", icon: "rocket", value: "Lancement", delta: 24, color: "gold", score: 41 },
  { id: "realestate", label: "Immobilier", icon: "home", value: "230 k€", delta: 5, color: "green", score: 52 },
  { id: "health", label: "Santé", icon: "heart-pulse", value: "88 / 100", delta: 3, color: "green", score: 88 },
  { id: "sport", label: "Sport", icon: "dumbbell", value: "4×/sem", delta: 6, color: "green", score: 70 },
  { id: "learning", label: "Apprentissage", icon: "graduation-cap", value: "12 h", delta: 18, color: "blue", score: 64 },
  { id: "relations", label: "Relations", icon: "users", value: "Stable", delta: 2, color: "gold", score: 76 },
  { id: "spirituality", label: "Spiritualité", icon: "sparkles", value: "Quotidien", delta: 9, color: "gold", score: 81 },
];

// Trajectoire patrimoine (Présent / Futur A / Futur B) sur 10 ans
export const trajectory = {
  present: [
    { year: "2026", value: 28 },
    { year: "2027", value: 41 },
    { year: "2028", value: 58 },
    { year: "2029", value: 79 },
    { year: "2030", value: 104 },
    { year: "2031", value: 133 },
    { year: "2033", value: 198 },
    { year: "2036", value: 312 },
  ],
  futureA: [
    { year: "2026", value: 28 },
    { year: "2027", value: 36 },
    { year: "2028", value: 67 },
    { year: "2029", value: 112 },
    { year: "2030", value: 178 },
    { year: "2031", value: 264 },
    { year: "2033", value: 470 },
    { year: "2036", value: 890 },
  ],
  futureB: [
    { year: "2026", value: 28 },
    { year: "2027", value: 44 },
    { year: "2028", value: 61 },
    { year: "2029", value: 82 },
    { year: "2030", value: 108 },
    { year: "2031", value: 139 },
    { year: "2033", value: 205 },
    { year: "2036", value: 298 },
  ],
};

export const monthlyRevenue = [
  { m: "Jan", v: 3200 },
  { m: "Fév", v: 3350 },
  { m: "Mar", v: 3280 },
  { m: "Avr", v: 3600 },
  { m: "Mai", v: 3900 },
  { m: "Juin", v: 4100 },
  { m: "Juil", v: 4320 },
];

export const priorityActions = [
  { id: 1, label: "Contacter 5 prospects", domain: "Business", progress: 60, priority: "Élevé", color: "gold" },
  { id: 2, label: "Séance de sport", domain: "Santé", progress: 100, priority: "Moyen", color: "green" },
  { id: 3, label: "Formation marketing", domain: "Apprentissage", progress: 35, priority: "Élevé", color: "blue" },
  { id: 4, label: "Lecture 30 min", domain: "Apprentissage", progress: 0, priority: "Faible", color: "blue" },
];

// Décisions analysées par le moteur IA
export const decisions = [
  {
    id: "quit-job",
    question: "Dois-je quitter mon CDI ?",
    score: 71,
    impact: 42,
    risk: "Modéré",
    riskColor: "amber" as const,
    recommendation: "Attendre 4 mois",
    reasons: [
      { ok: true, text: "Revenu side-business en croissance (+24 %/mois)" },
      { ok: true, text: "Épargne de sécurité : 8 mois couverts" },
      { ok: false, text: "Marché incertain ce trimestre" },
      { ok: false, text: "Pipeline clients pas encore récurrent" },
    ],
  },
  {
    id: "buy-bmw",
    question: "Dois-je acheter cette BMW ?",
    score: 34,
    impact: -18,
    risk: "Élevé",
    riskColor: "red" as const,
    recommendation: "Reporter",
    reasons: [
      { ok: false, text: "Coût d'opportunité : -187 240 € à 10 ans" },
      { ok: false, text: "Mensualité = 14 % du revenu net" },
      { ok: true, text: "Valeur résiduelle correcte à 4 ans" },
      { ok: false, text: "Retarde le lancement de l'entreprise" },
    ],
  },
  {
    id: "start-company",
    question: "Dois-je créer une entreprise ?",
    score: 78,
    impact: 64,
    risk: "Modéré",
    riskColor: "amber" as const,
    recommendation: "Lancer en parallèle",
    reasons: [
      { ok: true, text: "Compétences alignées avec le marché" },
      { ok: true, text: "Demande validée sur 3 segments" },
      { ok: true, text: "Capital de départ disponible" },
      { ok: false, text: "Temps hebdo limité à court terme" },
    ],
  },
];

// Simulation d'achat (écran 4)
export const bmwSimulation = {
  title: "Acheter cette BMW Série 6",
  price: 65000,
  metrics: [
    { label: "Valeur résiduelle (4 ans)", value: "32 500 €", color: "neutral" as const },
    { label: "Impact patrimoine (10 ans)", value: "-187 240 €", color: "red" as const },
    { label: "Coût mensuel total", value: "1 180 €", color: "red" as const },
    { label: "Coût d'opportunité investi", value: "+187 240 €", color: "green" as const },
  ],
};

// Objectifs / Sommets (écran 6)
export const goals = [
  { id: 1, label: "Créer mon entreprise", domain: "Business", icon: "rocket", progress: 41, eta: "8 mois", color: "gold" as const },
  { id: 2, label: "Liberté financière", domain: "Finances", icon: "wallet", progress: 68, eta: "6 ans", color: "green" as const },
  { id: 3, label: "Acheter un bien", domain: "Immobilier", icon: "home", progress: 52, eta: "2 ans", color: "blue" as const },
  { id: 4, label: "Maîtriser le marketing", domain: "Apprentissage", icon: "graduation-cap", progress: 64, eta: "5 mois", color: "blue" as const },
  { id: 5, label: "Équilibre & sérénité", domain: "Spiritualité", icon: "sparkles", progress: 81, eta: "Continu", color: "gold" as const },
];

// Plan d'action (écran 7)
export const actionPlan = [
  { id: 1, when: "Aujourd'hui", title: "Appeler 5 prospects", goal: "Business", impact: "+3 % CA projeté", duration: "1 h", done: false, current: true },
  { id: 2, when: "Cette semaine", title: "Finaliser la page de vente", goal: "Business", impact: "+8 % conversion", duration: "4 h", done: false, current: false },
  { id: 3, when: "Cette semaine", title: "Module marketing 3/8", goal: "Apprentissage", impact: "+1 compétence clé", duration: "2 h", done: false, current: false },
  { id: 4, when: "Ce mois", title: "Ouvrir un compte pro", goal: "Business", impact: "Structure légale", duration: "30 min", done: false, current: false },
  { id: 5, when: "Ce trimestre", title: "Atteindre 2 000 € de CA", goal: "Finances", impact: "Seuil de viabilité", duration: "—", done: false, current: false },
];

// Calendrier intelligent (écran 8)
export const calendarEvents = [
  { id: 1, time: "07:00", title: "Sport — Haut du corps", domain: "Santé", color: "green" as const, duration: "1 h" },
  { id: 2, time: "09:30", title: "Appel 5 prospects", domain: "Business", color: "gold" as const, duration: "1 h" },
  { id: 3, time: "14:00", title: "Formation marketing", domain: "Apprentissage", color: "blue" as const, duration: "2 h" },
  { id: 4, time: "18:00", title: "Analyse pipeline", domain: "Business", color: "gold" as const, duration: "45 min" },
  { id: 5, time: "21:30", title: "Lecture — 30 min", domain: "Apprentissage", color: "blue" as const, duration: "30 min" },
];

export const nextAction = {
  title: "Appel 5 prospects",
  countdown: "01:24:30",
  domain: "Business",
};

// Hub financier (écran 9)
export const finance = {
  netWorth: 28450,
  change: 12.4,
  allocation: [
    { name: "Épargne", value: 12000, color: "#10B981" },
    { name: "Investissements", value: 9400, color: "#3B82F6" },
    { name: "Liquidités", value: 4200, color: "#D4AF37" },
    { name: "Crypto", value: 2850, color: "#FFD700" },
  ],
  evolution: [
    { m: "Jan", v: 19200 },
    { m: "Fév", v: 21000 },
    { m: "Mar", v: 22400 },
    { m: "Avr", v: 24100 },
    { m: "Mai", v: 25600 },
    { m: "Juin", v: 27100 },
    { m: "Juil", v: 28450 },
  ],
  freedomProgress: 68,
};

// Vision 10 ans (écran 10)
export const visionMilestones = [
  { year: "2026", label: "Aujourd'hui", value: 28, type: "start" as const },
  { year: "2028", label: "Entreprise rentable", value: 67, type: "milestone" as const },
  { year: "2030", label: "Premier bien immo", value: 178, type: "milestone" as const },
  { year: "2033", label: "Liberté financière", value: 470, type: "milestone" as const },
  { year: "2036", label: "Sommet", value: 890, type: "summit" as const },
];

export const navItems = [
  { href: "/dashboard", label: "Accueil", icon: "home" },
  { href: "/digital-twin", label: "Jumeau", icon: "git-branch" },
  { href: "/decisions", label: "Décisions", icon: "brain" },
  { href: "/objectives", label: "Objectifs", icon: "target" },
  { href: "/finance", label: "Finances", icon: "wallet" },
];

export const moreScreens = [
  { href: "/simulation", label: "Simulation", icon: "sliders-horizontal", desc: "Simuler une décision" },
  { href: "/action-plan", label: "Plan d'action", icon: "list-checks", desc: "Tes prochaines étapes" },
  { href: "/calendar", label: "Calendrier", icon: "calendar", desc: "Agenda intelligent" },
  { href: "/vision", label: "Vision 10 ans", icon: "trending-up", desc: "Ton ascension" },
];
