"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthCard from "@/components/auth/AuthCard";
import AuthField from "@/components/auth/AuthField";
import PasswordField from "@/components/auth/PasswordField";
import AuthAlert from "@/components/auth/AuthAlert";
import { registerClient, AuthApiError } from "@/lib/auth/client";
import { MAJORS, validateRegister } from "@/lib/auth/schemas";
import { authRoutes } from "@/lib/auth/config";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [major, setMajor] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    const errors = validateRegister({
      name,
      email,
      studentId,
      major,
      password,
      confirmPassword,
    });
    if (errors) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    setIsLoading(true);
    try {
      await registerClient({ name, email, studentId, major, password });
      router.push(`${authRoutes.login}?registered=1`);
    } catch (err) {
      if (err instanceof AuthApiError) {
        if (err.fieldErrors) setFieldErrors(err.fieldErrors);
        setFormError(err.message);
      } else {
        setFormError("Có lỗi xảy ra. Vui lòng thử lại.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthCard
      eyebrow="FDS · Đăng ký"
      title="Gia nhập FDS"
      description="Tạo tài khoản để tham gia cộng đồng Data Science tại Đại học FPT."
      footer={
        <p>
          Đã có tài khoản?{" "}
          <Link href={authRoutes.login} className="fds-text-link font-semibold">
            Đăng nhập
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        {formError ? <AuthAlert kind="error" message={formError} /> : null}
        <AuthField
          label="Họ tên"
          id="name"
          type="text"
          autoComplete="name"
          placeholder="Nguyễn Văn A"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={fieldErrors.name}
        />
        <AuthField
          label="Email"
          id="email"
          type="email"
          autoComplete="email"
          placeholder="ban@fpt.edu.vn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={fieldErrors.email}
        />
        <AuthField
          label="Mã số sinh viên"
          id="studentId"
          type="text"
          autoComplete="off"
          placeholder="SE123456"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value.toUpperCase())}
          error={fieldErrors.studentId}
          hint="2 chữ cái + 6 chữ số, ví dụ SE123456."
          maxLength={8}
        />
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="major"
            className="text-xs font-semibold tracking-wide text-[#07152F] uppercase font-mono"
          >
            Chuyên ngành
          </label>
          <select
            id="major"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            aria-invalid={Boolean(fieldErrors.major)}
            aria-describedby={fieldErrors.major ? "major-error" : undefined}
            className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-[3px] outline-none transition ${
              major ? "text-[#07152F]" : "text-[#94A3B8]"
            } ${
              fieldErrors.major
                ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                : "border-[#E1E8F0] focus:border-[#2457A6] focus:ring-2 focus:ring-[#2457A6]/15"
            }`}
          >
            <option value="" disabled>
              -- Chọn chuyên ngành --
            </option>
            {MAJORS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          {fieldErrors.major ? (
            <p id="major-error" role="alert" className="text-xs text-red-600">
              {fieldErrors.major}
            </p>
          ) : null}
        </div>
        <PasswordField
          label="Mật khẩu"
          id="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={fieldErrors.password}
          placeholder="Tối thiểu 8 ký tự"
          hint="Mật khẩu tối thiểu 8 ký tự."
        />
        <PasswordField
          label="Nhập lại mật khẩu"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={fieldErrors.confirmPassword}
          placeholder="Nhập lại mật khẩu"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full inline-flex items-center justify-center bg-[#07152F] text-white text-sm font-medium px-5 py-3 rounded-[3px] hover:bg-[#1E293B] transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? "Đang tạo tài khoản…" : "Đăng ký"}
        </button>
      </form>
    </AuthCard>
  );
}
