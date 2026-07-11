import { NextResponse } from "next/server";
import { readContent, writeContent } from "@/lib/content";
import { isAdmin } from "@/lib/adminAuth";
import { sanitizeVehicle, slugify } from "@/lib/vehicles";

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }
  const data = sanitizeVehicle(body);
  if (!data) {
    return NextResponse.json(
      { error: "Le nom du véhicule est obligatoire." },
      { status: 400 }
    );
  }

  const content = await readContent();
  let id = slugify(data.name);
  let suffix = 2;
  while (content.vehicules.some((v) => v.id === id)) {
    id = `${slugify(data.name)}-${suffix++}`;
  }

  content.vehicules.unshift({ id, ...data });
  await writeContent(content);
  return NextResponse.json({ ok: true, id });
}
