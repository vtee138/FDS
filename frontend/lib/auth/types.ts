export interface AuthUser {
  id: string | number;
  name: string;
  email: string;
  avatarUrl?: string | null;
  role?: string;
  emailVerified?: boolean;
  createdAt?: string;
}

export interface FieldErrors {
  [field: string]: string;
}

export class AuthApiError extends Error {
  status: number;
  fieldErrors?: FieldErrors;

  constructor(message: string, status: number, fieldErrors?: FieldErrors) {
    super(message);
    this.name = "AuthApiError";
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface ResetPasswordInput {
  token: string;
  newPassword: string;
}
