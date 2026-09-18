"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import AuthCard from "@/components/auth/AuthCard";
import AuthField from "@/components/auth/AuthField";
import AuthAlert from "@/components/auth/AuthAlert";
import { forgotPasswordClient, AuthApiError } from "@/lib/auth/client";
import { validateEmail } from "@/lib/auth/schemas";
import { authRoutes } from "@/lib/auth/config";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [fieldError, setFieldError] = useState<string | undefined>();
  const [formError, setFormError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    const err = validateEmail(email);
    if (err) {
      setFieldError(err);
      return;
    }
    setFieldError(undefined);
    setIsLoading(true);
    try {
      await forgotPasswordClient(email);
      setDone(true);
    } catch (error) {
      if (error instanceof AuthApiError) setFormError(error.message);
      else setFormError("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthCard
      eyebrow="FDS · Khôi phục"
      title="Quên mật khẩu"
      description="Nhập email đã đăng ký, chúng tôi sẽ gửi link đặt lại mật khẩu."
      footer={
        <p>
          Nhớ mật khẩu?{" "}
          <Link href={authRoutes.login} className="fds-text-link font-semibold">
            Đăng nhập
          </Link>
        </p>
      }
    >
      {done ? (
        <AuthAlert
          kind="success"
          message={`Nếu email ${email.trim()} tồn tại trong hệ thống, bạn sẽ nhận được hướng dẫn đặt lại mật khẩu. Vui lòng kiểm tra hộp thư.`}
        />
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          {formError ? <AuthAlert kind="error" message={formError} /> : null}
          <AuthField
            label="Email"
            id="email"
            type="email"
            autoComplete="email"
            placeholder="ban@fpt.edu.vn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={fieldError}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full inline-flex items-center justify-center bg-[#07152F] text-white text-sm font-medium px-5 py-3 rounded-[3px] hover:bg-[#1E293B] transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? "Đang gửi…" : "Gửi link khôi phục"}
          </button>
        </form>
      )}
    </AuthCard>
  );
}
