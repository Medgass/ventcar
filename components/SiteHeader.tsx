import { readContent } from "@/lib/content";
import Header from "./Header";

export default async function SiteHeader() {
  const content = await readContent();
  return (
    <Header
      identite={content.identite}
      menu={content.menu}
      boutonAnnonce={content.hero.boutonAnnonce}
    />
  );
}
