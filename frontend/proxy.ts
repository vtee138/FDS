import { NextRequest, NextResponse } from "next/server";
import { authRoutes } from "@/lib/auth/config";

const SESSION_COOKIES = ["access_token", "refresh_token", "fds_session"];

/**
 * Proxy bảo vệ route cần đăng nhập (thay thế middleware.ts deprecated ở Next 16).
 * Chỉ kiểm tra sự tồn tại của cookie phiên (không verify JWT ở edge).
 * Trang đích sẽ verify lại qua `GET /auth/me` và redirect nếu token hết hạn.
 */
export function proxy(req: NextRequest) {
  const hasSession = SESSION_COOKIES.some((name) => req.cookies.has(name));
  if (hasSession) return NextResponse.next();

  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = authRoutes.login;
  loginUrl.searchParams.set(
    "next",
    `${req.nextUrl.pathname}${req.nextUrl.search}`
  );
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/profile/:path*"],
};
