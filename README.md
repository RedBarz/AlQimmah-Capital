# AlQimmah OS — Application mobile

> **Visualise ton futur. Décide avec confiance.**
> Le système d'exploitation de votre potentiel.

Application mobile-first (PWA) construite avec **Next.js 14 · TypeScript · Tailwind · Framer Motion · Recharts**, fidèle à la direction artistique premium (Apple / Tesla / Linear / Stripe / Palantir) et à la palette de marque.

## Démarrer

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # export statique dans /out
```

## Les 10 écrans

| # | Écran | Route |
|---|---|---|
| 1 | **Onboarding** (quête d'ascension, 4 paliers) | `/` |
| 2 | **Dashboard Intelligence** (score, action du jour, accès rapides) | `/dashboard` |
| 3 | **Digital Twin** (Présent / Futur A / Futur B · 9 domaines) | `/digital-twin` |
| 4 | **Simulation de décision** (curseurs live, analyse d'achat) | `/simulation` |
| 5 | **Moteur IA — Le Conseil** (score décision, recommandation) | `/decisions` |
| 6 | **Objectifs / Sommets** | `/objectives` |
| 7 | **Plan d'action** (timeline) | `/action-plan` |
| 8 | **Calendrier intelligent** (priorisé par l'IA) | `/calendar` |
| 9 | **Hub Financier** (patrimoine, allocation, dérive) | `/finance` |
| 10 | **Vision 10 ans** (courbe d'ascension, jalons) | `/vision` |

## Design system

- **Palette :** fond `#09090B`, or `#D4AF37`/`#FFD700`, IA `#3B82F6`, progression `#10B981`, risque `#EF4444`.
- **Typo :** Inter Tight (titres) · Inter (textes).
- **Composants :** `Logo`, `ScoreRing`, `Card`, `Button`, `Badge`, `ProgressBar`, `SegmentedTabs`, `Icon`, charts (`AreaSpark`, `MultiArea`, `Donut`, `VisionChart`).
- **Mouvement :** Framer Motion — révélations héro, chiffres qui interpolent, glow IA.

## Structure

```
src/
  app/
    page.tsx              # Onboarding (écran 1)
    (app)/                # Shell mobile + tab bar
      layout.tsx
      dashboard/ digital-twin/ decisions/ simulation/
      objectives/ action-plan/ calendar/ finance/ vision/
  components/
    ui/        # Logo, ScoreRing, Card, Button, Badge, ProgressBar, Tabs, Icon
    layout/    # TabBar, ScreenHeader
    charts/    # Recharts wrappers
  lib/         # data.ts (jumeau de démo), utils.ts
```

## Document stratégique

Le master document complet (15 parties : vision, marché, produit, moat, MVP, roadmap licorne, architecture…) est dans [`docs/ALQIMMAH_OS_MASTER.md`](docs/ALQIMMAH_OS_MASTER.md).
