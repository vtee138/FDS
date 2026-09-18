"use client";

import { Suspense, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import AuthCard from "@/components/auth/AuthCard";
import AuthField from "@/components/auth/AuthField";
import PasswordField from "@/components/auth/PasswordField";
import AuthAlert from "@/components/auth/AuthAlert";
import { loginClient, AuthApiError } from "@/lib/auth/client";
import { validateLogin } from "@/lib/auth/schemas";
import { authRoutes } from "@/lib/auth/config";
import { useAuth } from "@/lib/auth/AuthProvider";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refresh } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const registered = searchParams.get("registered") === "1";
  const next = searchParams.get("next") ?? authRoutes.profile;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    const errors = validateLogin({ email, password });
    if (errors) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    setIsLoading(true);
    try {
      await loginClient(email, password);
      await refresh();
      router.push(next);
      router.refresh();
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
      eyebrow="FDS · Đăng nhập"
      title="Chào mừng trở lại"
      description="Đăng nhập để theo dõi hoạt động, sự kiện và hồ sơ thành viên FDS."
      footer={
        <p>
          Chưa có tài khoản?{" "}
          <Link href={authRoutes.register} className="fds-text-link font-semibold">
            Đăng ký ngay
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        {registered ? (
          <AuthAlert
            kind="success"
            message="Đăng ký thành công. Vui lòng đăng nhập."
          />
        ) : null}
        {formError ? <AuthAlert kind="error" message={formError} /> : null}
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
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={fieldErrors.password}
          placeholder="••••••••"
        />
        <div className="flex justify-end">
          <Link
            href={authRoutes.forgotPassword}
            className="fds-text-link text-xs font-semibold"
          >
            Quên mật khẩu?
          </Link>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full inline-flex items-center justify-center bg-[#07152F] text-white text-sm font-medium px-5 py-3 rounded-[3px] hover:bg-[#1E293B] transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? "Đang đăng nhập…" : "Đăng nhập"}
        </button>
      </form>
    </AuthCard>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
