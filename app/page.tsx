import Categories from "@/components/Categories";
import Featured from "@/components/Featured";
import Hero from "@/components/Hero";
import SellBanner from "@/components/SellBanner";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import Testimonials from "@/components/Testimonials";
import { readContent } from "@/lib/content";
import { brandsOf, modelsOf } from "@/lib/vehicles";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await readContent();

  return (
    <>
      <SiteHeader />
      <main>
        <Hero
          hero={content.hero}
          identite={content.identite}
          brands={brandsOf(content.vehicules)}
          models={modelsOf(content.vehicules)}
        />
        <Featured
          titre={content.sectionVedette.titre}
          lien={content.sectionVedette.lien}
          vehicles={content.vehicules}
        />
        <Categories section={content.sectionCategories} />
        <SellBanner banniere={content.banniere} />
        <Testimonials section={content.sectionAvis} />
      </main>
      <SiteFooter />
    </>
  );
}
