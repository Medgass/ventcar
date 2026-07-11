import { cookies } from "next/headers";
import { adminToken, readContent } from "./content";

export const ADMIN_COOKIE = "av_admin";

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE)?.value;
  if (!token) return false;
  const content = await readContent();
  return token === adminToken(content.admin);
}
