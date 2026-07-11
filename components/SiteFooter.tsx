import { readContent } from "@/lib/content";
import Footer from "./Footer";

export default async function SiteFooter() {
  const content = await readContent();
  return (
    <Footer
      identite={content.identite}
      footer={content.footer}
      contact={content.contact}
    />
  );
}
