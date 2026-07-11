import ParametresForm from "@/components/admin/ParametresForm";
import { readContent } from "@/lib/content";

export default async function AdminParametres() {
  const content = await readContent();

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
          Paramètres
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Identifiants de connexion et informations du compte administrateur.
        </p>
      </div>

      <ParametresForm
        initialEmail={content.admin.email}
        initialAdresse={content.admin.adresse}
      />
    </main>
  );
}
