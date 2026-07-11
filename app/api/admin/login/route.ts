import { NextResponse } from "next/server";
import { adminToken, readContent, sha256 } from "@/lib/content";
import { ADMIN_COOKIE } from "@/lib/adminAuth";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  const content = await readContent();
  const ok =
    email === content.admin.email.toLowerCase() &&
    sha256(password) === content.admin.motDePasseHash;

  if (!ok) {
    return NextResponse.json(
      { error: "Email ou mot de passe incorrect." },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, adminToken(content.admin), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
