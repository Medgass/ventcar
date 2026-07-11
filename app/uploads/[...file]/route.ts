import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
};

// Sert les images téléversées via l'admin : `next start` ne sert pas les
// fichiers ajoutés dans public/ après le build, donc on lit le disque ici.
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ file: string[] }> }
) {
  const { file } = await params;
  const name = file.join("/");
  if (!name || name.includes("..")) {
    return new NextResponse("Not found", { status: 404 });
  }
  const abs = path.join(process.cwd(), "public", "uploads", name);
  try {
    const buf = await fs.readFile(abs);
    const ext = path.extname(abs).toLowerCase();
    return new NextResponse(new Uint8Array(buf), {
      headers: {
        "Content-Type": MIME[ext] ?? "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
