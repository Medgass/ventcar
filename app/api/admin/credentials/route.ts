import { NextResponse } from "next/server";
import { adminToken, readContent, sha256, writeContent } from "@/lib/content";
import { ADMIN_COOKIE, isAdmin } from "@/lib/adminAuth";

export async function PUT(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const content = await readContent();
  if (typeof body.email === "string" && body.email.trim()) {
    content.admin.email = body.email.trim().toLowerCase();
  }
  if (typeof body.adresse === "string") {
    content.admin.adresse = body.adresse.trim();
  }
  if (typeof body.nouveauMotDePasse === "string" && body.nouveauMotDePasse) {
    if (body.nouveauMotDePasse.length < 6) {
      return NextResponse.json(
        { error: "Le mot de passe doit contenir au moins 6 caractères." },
        { status: 400 }
      );
    }
    content.admin.motDePasseHash = sha256(body.nouveauMotDePasse);
  }
  await writeContent(content);

  // Réémet un cookie valide pour les nouveaux identifiants
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, adminToken(content.admin), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
