import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AlQimmah OS — Visualise ton futur",
  description:
    "Le système d'exploitation de votre potentiel. Modélise ton futur, décide avec confiance.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#09090B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-background text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
