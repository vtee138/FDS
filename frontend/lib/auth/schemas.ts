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

export const MAJORS = [
  "Kỹ thuật Phần mềm",
  "Trí tuệ Nhân tạo",
  "An toàn Thông tin",
  "Thiết kế Đồ họa",
  "Truyền thông Đa phương tiện",
  "Digital Marketing",
  "Kinh doanh Quốc tế",
  "Ngôn ngữ Anh",
  "Ngôn ngữ Nhật",
  "Ngôn ngữ Hàn",
  "Ngành khác",
] as const;

const STUDENT_ID_RE = /^[A-Z]{2}\d{6}$/;

export function normalizeStudentId(studentId: string): string {
  return studentId.trim().toUpperCase();
}

export function validateStudentId(studentId: string): string | null {
  const normalized = normalizeStudentId(studentId);
  if (!normalized) return "Vui lòng nhập mã số sinh viên.";
  if (!STUDENT_ID_RE.test(normalized))
    return "MSSV gồm 2 chữ cái + 6 chữ số, ví dụ SE123456.";
  return null;
}

export function validateMajor(major: string): string | null {
  if (!major) return "Vui lòng chọn chuyên ngành.";
  if (!(MAJORS as readonly string[]).includes(major))
    return "Chuyên ngành chưa hợp lệ.";
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
  studentId: string;
  major: string;
  password: string;
  confirmPassword: string;
}): FieldErrors | null {
  const errors: FieldErrors = {};
  const nameErr = validateName(input.name);
  if (nameErr) errors.name = nameErr;
  const emailErr = validateEmail(input.email);
  if (emailErr) errors.email = emailErr;
  const studentIdErr = validateStudentId(input.studentId);
  if (studentIdErr) errors.studentId = studentIdErr;
  const majorErr = validateMajor(input.major);
  if (majorErr) errors.major = majorErr;
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
