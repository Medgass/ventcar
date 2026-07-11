import type { Metadata } from "next";
import FavorisList from "@/components/FavorisList";
import PageHeader from "@/components/PageHeader";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { readContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mes favoris — Auto Vente",
};

export default async function FavorisPage() {
  const content = await readContent();

  return (
    <>
      <SiteHeader />
      <main>
        <PageHeader
          title="Mes"
          highlight="favoris"
          subtitle="Retrouvez ici tous les véhicules que vous avez mis de côté."
        />
        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
          <FavorisList vehicles={content.vehicules} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
