import { NextResponse } from "next/server";
import { readContent, writeContent, type SiteContent } from "@/lib/content";
import { isAdmin } from "@/lib/adminAuth";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const content = await readContent();
  const { admin, ...editable } = content;
  return NextResponse.json(editable);
}

export async function PUT(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Contenu invalide" }, { status: 400 });
  }
  const current = await readContent();
  // Le bloc admin (identifiants) ne passe jamais par cette route
  delete (body as Record<string, unknown>).admin;
  const next = { ...current, ...body, admin: current.admin } as SiteContent;
  await writeContent(next);
  return NextResponse.json({ ok: true });
}
