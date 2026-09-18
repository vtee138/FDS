/**
 * Cấu hình auth frontend.
 * - Trình duyệt luôn gọi qua proxy same-origin `/api/auth` để cookie HttpOnly
 *   được forward ổn định (tránh vấn đề CORS cookie localhost:3000 -> :4000).
 * - Server Components gọi thẳng backend qua BACKEND_INTERNAL_URL.
 */

export const AUTH_PROXY_PREFIX = "/api/auth";

export function getPublicApiBase(): string {
  return process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
}

export function getBackendBase(): string {
  return (
    process.env.BACKEND_INTERNAL_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    "http://localhost:4000"
  ).replace(/\/$/, "");
}

export const authRoutes = {
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  verifyEmail: "/verify-email",
  profile: "/profile",
} as const;
