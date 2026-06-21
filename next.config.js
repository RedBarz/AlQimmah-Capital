/** @type {import('next').NextConfig} */

// basePath permet de servir l'app depuis un sous-chemin (ex. GitHub Pages : /alqimmah-capital).
// Sur Vercel / local, NEXT_PUBLIC_BASE_PATH est vide → l'app est servie à la racine.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

module.exports = nextConfig;
