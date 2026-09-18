"use client";

import { useState, type FormEvent } from "react";
import AuthField from "@/components/auth/AuthField";
import AuthAlert from "@/components/auth/AuthAlert";
import { updateMeClient, AuthApiError } from "@/lib/auth/client";
import { validateName } from "@/lib/auth/schemas";
import type { AuthUser } from "@/lib/auth/types";
import { useAuth } from "@/lib/auth/AuthProvider";
import { useRouter } from "next/navigation";

export default function ProfileForm({ initial }: { initial: AuthUser }) {
  const { refresh } = useAuth();
  const router = useRouter();
  const [name, setName] = useState(initial.name ?? "");
  const [fieldError, setFieldError] = useState<string | undefined>();
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    setSuccess(null);
    const err = validateName(name);
    if (err) {
      setFieldError(err);
      return;
    }
    setFieldError(undefined);
    setIsLoading(true);
    try {
      await updateMeClient({ name });
      await refresh();
      setSuccess("Cập nhật hồ sơ thành công.");
      router.refresh();
    } catch (error) {
      if (error instanceof AuthApiError) setFormError(error.message);
      else setFormError("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      {formError ? <AuthAlert kind="error" message={formError} /> : null}
      {success ? <AuthAlert kind="success" message={success} /> : null}
      <AuthField
        label="Họ tên"
        id="profile-name"
        type="text"
        autoComplete="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={fieldError}
      />
      <AuthField
        label="Email"
        id="profile-email"
        type="email"
        value={initial.email}
        disabled
        hint="Email dùng để đăng nhập, không thể thay đổi."
      />
      <button
        type="submit"
        disabled={isLoading}
        className="w-full sm:w-auto inline-flex items-center justify-center bg-[#07152F] text-white text-sm font-medium px-5 py-2.5 rounded-[3px] hover:bg-[#1E293B] transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoading ? "Đang lưu…" : "Lưu thay đổi"}
      </button>
    </form>
  );
}
