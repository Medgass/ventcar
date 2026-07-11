import ContentEditor from "@/components/admin/ContentEditor";
import { readContent } from "@/lib/content";

export default async function AdminContenu({
  searchParams,
}: {
  searchParams: Promise<{ section?: string }>;
}) {
  const { section } = await searchParams;
  const content = await readContent();
  const { admin, vehicules, ...editable } = content;

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
          Contenu du site
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Textes généraux, grands titres, logo, menu et photos du site. Les
          véhicules se gèrent dans l&apos;onglet « Véhicules ».
        </p>
      </div>

      <div className="mt-6">
        <ContentEditor
          initial={JSON.parse(JSON.stringify(editable))}
          initialSection={section}
        />
      </div>
    </main>
  );
}
