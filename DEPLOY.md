# Déployer AlQimmah OS

Deux chemins. Choisis-en un — les deux donnent une URL cliquable depuis ton téléphone.

---

## Option A — GitHub Pages (URL automatique, sans aucun compte) ✅ recommandé pour une preview

Tout est déjà configuré (`.github/workflows/deploy.yml`). **Une seule action manuelle, à faire une fois :**

1. Sur GitHub : **Settings** → **Pages**.
2. Sous **Build and deployment** → **Source**, choisis **GitHub Actions**.
3. C'est tout. À chaque push sur la branche, le site se reconstruit et se publie.

**Ton URL sera :**
```
https://redbarz.github.io/alqimmah-capital/
```

> Le workflow se déclenche déjà à chaque push sur `claude/alqimmah-os-design-oke3dy`.
> Tu peux aussi le lancer à la main : onglet **Actions** → *Deploy AlQimmah OS to GitHub Pages* → **Run workflow**.
> Suis l'avancement dans l'onglet **Actions** ; quand le job est vert, l'URL est live.

---

## Option B — Vercel (le plus rapide si tu as / crées un compte)

1. Va sur [vercel.com/new](https://vercel.com/new) et connecte ton GitHub.
2. **Import** le repo `redbarz/alqimmah-capital`.
3. Sélectionne la branche `claude/alqimmah-os-design-oke3dy`.
4. Vercel détecte Next.js automatiquement (config dans `vercel.json`). Clique **Deploy**.

Vercel te donne une URL en ~1 min + une **preview à chaque push**. Pas besoin de `basePath` (l'app est servie à la racine).

---

## Tester en local avant de déployer

```bash
npm install
npm run dev      # http://localhost:3000
```

## Note technique

`next.config.js` lit `NEXT_PUBLIC_BASE_PATH` :
- **vide** (Vercel / local) → app servie à la racine `/`.
- **`/alqimmah-capital`** (injecté par le workflow GitHub Pages) → app servie sous le sous-chemin.

Aucun changement de code nécessaire entre les deux plateformes.
