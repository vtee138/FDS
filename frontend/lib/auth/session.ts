import { cookies } from "next/headers";
import { getBackendBase } from "./config";
import type { AuthUser } from "./types";

/**
 * Đọc session phía Server Component bằng cách forward cookie
 * tới backend `GET /auth/me`. Trả về null khi chưa đăng nhập.
 */
export async function getSession(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  if (!cookieHeader) return null;

  try {
    const res = await fetch(`${getBackendBase()}/auth/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Cookie: cookieHeader,
      },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data && typeof data === "object" && "user" in data) {
      return (data as { user: AuthUser }).user;
    }
    return data as AuthUser;
  } catch {
    return null;
  }
}
