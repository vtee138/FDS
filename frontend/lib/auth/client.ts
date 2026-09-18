"use client";

import { AUTH_PROXY_PREFIX } from "./config";
import { AuthApiError, type AuthUser } from "./types";

async function parseError(res: Response): Promise<never> {
  let message = "Có lỗi xảy ra. Vui lòng thử lại.";
  let fieldErrors: Record<string, string> | undefined;
  let status = res.status;

  try {
    const data = await res.json();
    if (typeof data?.message === "string" && data.message) message = data.message;
    else if (Array.isArray(data?.message)) message = data.message.join(", ");
    if (data?.errors && typeof data.errors === "object") fieldErrors = data.errors;
    if (typeof data?.statusCode === "number") status = data.statusCode;
  } catch {
    if (res.status === 502)
      message = "Không kết nối được máy chủ. Vui lòng thử lại sau.";
    else if (res.status === 401) message = "Email hoặc mật khẩu chưa đúng.";
  }

  if (res.status === 401 && message === "Có lỗi xảy ra. Vui lòng thử lại.")
    message = "Email hoặc mật khẩu chưa đúng.";

  throw new AuthApiError(message, status, fieldErrors);
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${AUTH_PROXY_PREFIX}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) await parseError(res);
  if (res.status === 204) return undefined as T;
  const text = await res.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

function unwrapUser(data: unknown): AuthUser {
  if (data && typeof data === "object" && "user" in (data as Record<string, unknown>)) {
    return (data as { user: AuthUser }).user;
  }
  return data as AuthUser;
}

export async function loginClient(email: string, password: string): Promise<AuthUser> {
  const data = await apiFetch<unknown>("/login", {
    method: "POST",
    body: JSON.stringify({ email: email.trim(), password }),
  });
  return unwrapUser(data);
}

export async function registerClient(input: {
  name: string;
  email: string;
  studentId: string;
  major: string;
  password: string;
}): Promise<AuthUser> {
  const data = await apiFetch<unknown>("/register", {
    method: "POST",
    body: JSON.stringify({
      name: input.name.trim(),
      email: input.email.trim(),
      studentId: input.studentId.trim().toUpperCase(),
      major: input.major,
      password: input.password,
    }),
  });
  return unwrapUser(data);
}

export async function logoutClient(): Promise<void> {
  await apiFetch<void>("/logout", { method: "POST" });
}

export async function getMeClient(): Promise<AuthUser | null> {
  try {
    const data = await apiFetch<unknown>("/me", { method: "GET" });
    return unwrapUser(data);
  } catch (err) {
    if (err instanceof AuthApiError && err.status === 401) return null;
    throw err;
  }
}

export async function forgotPasswordClient(email: string): Promise<void> {
  await apiFetch<void>("/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email: email.trim() }),
  });
}

export async function resetPasswordClient(
  token: string,
  newPassword: string
): Promise<void> {
  await apiFetch<void>("/reset-password", {
    method: "POST",
    body: JSON.stringify({ token, newPassword }),
  });
}

export async function verifyEmailClient(token: string): Promise<void> {
  await apiFetch<void>("/verify-email", {
    method: "POST",
    body: JSON.stringify({ token }),
  });
}

export async function updateMeClient(input: { name: string }): Promise<AuthUser> {
  const data = await apiFetch<unknown>("/me", {
    method: "PATCH",
    body: JSON.stringify({ name: input.name.trim() }),
  });
  return unwrapUser(data);
}

export { AuthApiError };
