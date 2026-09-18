export type AuthUser = {
  id: number | string;
  name: string;
  email: string;
  mssv?: string;
  major?: string;
};

export type AuthResponse = {
  user: AuthUser;
  accessToken: string;
};

type RawAuthResponse =
  | { user: AuthUser; accessToken: string; access_token?: never }
  | { user: AuthUser; access_token: string; accessToken?: never }
  | { accessToken: string; access_token?: never; [key: string]: unknown }
  | { access_token: string; accessToken?: never; [key: string]: unknown };

const TOKEN_KEY = 'fds_access_token';

export function getApiUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
}

export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function storeToken(token: string): void {
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearStoredToken(): void {
  window.localStorage.removeItem(TOKEN_KEY);
}

function normalizeAuthResponse(raw: RawAuthResponse): AuthResponse {
  const token =
    'accessToken' in raw && typeof raw.accessToken === 'string'
      ? raw.accessToken
      : 'access_token' in raw && typeof raw.access_token === 'string'
        ? raw.access_token
        : '';

  const maybeUser = (raw as { user?: AuthUser }).user;
  const user: AuthUser =
    maybeUser && typeof maybeUser === 'object'
      ? maybeUser
      : {
          id: (raw as { id?: number | string }).id ?? 'me',
          name: (raw as { name?: string }).name ?? '',
          email: (raw as { email?: string }).email ?? '',
        };

  return { user, accessToken: token };
}

async function parseError(response: Response): Promise<string> {
  try {
    const data = await response.json();
    if (typeof data?.message === 'string') return data.message;
    if (Array.isArray(data?.message)) return data.message.join(', ');
    return `Yêu cầu thất bại (${response.status})`;
  } catch {
    return `Yêu cầu thất bại (${response.status})`;
  }
}

export async function loginRequest(email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${getApiUrl()}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) throw new Error(await parseError(response));
  return normalizeAuthResponse(await response.json());
}

export async function registerRequest(
  name: string,
  email: string,
  password: string,
  mssv?: string,
  major?: string,
): Promise<AuthResponse> {
  const response = await fetch(`${getApiUrl()}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, mssv, major }),
  });

  if (!response.ok) throw new Error(await parseError(response));
  return normalizeAuthResponse(await response.json());
}

export async function meRequest(token: string): Promise<AuthUser> {
  const response = await fetch(`${getApiUrl()}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });

  if (!response.ok) throw new Error(await parseError(response));
  const data = await response.json();
  // Backend có thể trả về user trực tiếp hoặc bọc trong { user }
  if (data && typeof data === 'object' && 'user' in data) {
    return (data as { user: AuthUser }).user;
  }
  return data as AuthUser;
}
