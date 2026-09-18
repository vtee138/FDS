"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthCard from "@/components/auth/AuthCard";
import AuthField from "@/components/auth/AuthField";
import PasswordField from "@/components/auth/PasswordField";
import AuthAlert from "@/components/auth/AuthAlert";
import { registerClient, AuthApiError } from "@/lib/auth/client";
import { validateRegister } from "@/lib/auth/schemas";
import { authRoutes } from "@/lib/auth/config";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    const errors = validateRegister({ name, email, password, confirmPassword });
    if (errors) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    setIsLoading(true);
    try {
      await registerClient({ name, email, password });
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
