import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Administration — Auto Vente",
  description: "Espace d'administration Auto Vente.",
};

export default function AdminRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
