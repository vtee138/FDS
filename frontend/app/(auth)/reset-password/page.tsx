"use client";

import { Suspense, useState, type FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AuthCard from "@/components/auth/AuthCard";
import PasswordField from "@/components/auth/PasswordField";
import AuthAlert from "@/components/auth/AuthAlert";
import { resetPasswordClient, AuthApiError } from "@/lib/auth/client";
import { validateResetPassword } from "@/lib/auth/schemas";
import { authRoutes } from "@/lib/auth/config";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (!token) {
      setFormError("Link đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.");
      return;
    }
    const errors = validateResetPassword({ newPassword, confirmPassword });
    if (errors) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    setIsLoading(true);
    try {
      await resetPasswordClient(token, newPassword);
      setDone(true);
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
      eyebrow="FDS · Đặt lại"
      title="Mật khẩu mới"
      description="Chọn mật khẩu mới cho tài khoản của bạn."
      footer={
        <p>
          Xong?{" "}
          <Link href={authRoutes.login} className="fds-text-link font-semibold">
            Đăng nhập ngay
          </Link>
        </p>
      }
    >
      {done ? (
        <AuthAlert
          kind="success"
          message="Đặt lại mật khẩu thành công. Bạn có thể đăng nhập bằng mật khẩu mới."
        />
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          {!token ? (
            <AuthAlert
              kind="error"
              message="Thiếu token trong link. Vui lòng mở lại link từ email."
            />
          ) : null}
          {formError ? <AuthAlert kind="error" message={formError} /> : null}
          <PasswordField
            label="Mật khẩu mới"
            id="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            error={fieldErrors.newPassword}
            placeholder="Tối thiểu 8 ký tự"
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
            disabled={isLoading || !token}
            className="w-full inline-flex items-center justify-center bg-[#07152F] text-white text-sm font-medium px-5 py-3 rounded-[3px] hover:bg-[#1E293B] transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? "Đang lưu…" : "Đặt lại mật khẩu"}
          </button>
        </form>
      )}
    </AuthCard>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}
