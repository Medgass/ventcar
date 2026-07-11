import { NextResponse } from "next/server";
import { readContent, writeContent } from "@/lib/content";
import { isAdmin } from "@/lib/adminAuth";
import { sanitizeVehicle } from "@/lib/vehicles";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const { id } = await params;
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
  const index = content.vehicules.findIndex((v) => v.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Véhicule introuvable" }, { status: 404 });
  }

  content.vehicules[index] = { id, ...data };
  await writeContent(content);
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const { id } = await params;
  const content = await readContent();
  const before = content.vehicules.length;
  content.vehicules = content.vehicules.filter((v) => v.id !== id);
  if (content.vehicules.length === before) {
    return NextResponse.json({ error: "Véhicule introuvable" }, { status: 404 });
  }
  await writeContent(content);
  return NextResponse.json({ ok: true });
}
