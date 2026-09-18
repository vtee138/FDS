import type { FieldErrors } from "./types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string): string | null {
  if (!email.trim()) return "Vui lòng nhập email.";
  if (!EMAIL_RE.test(email.trim())) return "Email chưa đúng định dạng.";
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return "Vui lòng nhập mật khẩu.";
  if (password.length < 8) return "Mật khẩu tối thiểu 8 ký tự.";
  return null;
}

export function validateName(name: string): string | null {
  if (!name.trim()) return "Vui lòng nhập họ tên.";
  if (name.trim().length < 2) return "Họ tên tối thiểu 2 ký tự.";
  return null;
}

export function validateLogin(input: {
  email: string;
  password: string;
}): FieldErrors | null {
  const errors: FieldErrors = {};
  const emailErr = validateEmail(input.email);
  if (emailErr) errors.email = emailErr;
  if (!input.password) errors.password = "Vui lòng nhập mật khẩu.";
  return Object.keys(errors).length > 0 ? errors : null;
}

export function validateRegister(input: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}): FieldErrors | null {
  const errors: FieldErrors = {};
  const nameErr = validateName(input.name);
  if (nameErr) errors.name = nameErr;
  const emailErr = validateEmail(input.email);
  if (emailErr) errors.email = emailErr;
  const pwErr = validatePassword(input.password);
  if (pwErr) errors.password = pwErr;
  if (input.confirmPassword !== input.password)
    errors.confirmPassword = "Mật khẩu nhập lại chưa khớp.";
  return Object.keys(errors).length > 0 ? errors : null;
}

export function validateResetPassword(input: {
  newPassword: string;
  confirmPassword: string;
}): FieldErrors | null {
  const errors: FieldErrors = {};
  const pwErr = validatePassword(input.newPassword);
  if (pwErr) errors.newPassword = pwErr;
  if (input.confirmPassword !== input.newPassword)
    errors.confirmPassword = "Mật khẩu nhập lại chưa khớp.";
  return Object.keys(errors).length > 0 ? errors : null;
}
