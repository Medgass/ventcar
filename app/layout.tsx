import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { FavoritesProvider } from "@/components/FavoritesProvider";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Auto Vente — Trouvez la voiture de vos rêves",
  description:
    "Des véhicules sélectionnés avec soin, au meilleur prix pour vous. Achat et vente de voitures en Tunisie.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={poppins.variable}>
      <body className="font-sans bg-white text-slate-900">
        <FavoritesProvider>{children}</FavoritesProvider>
      </body>
    </html>
  );
}
