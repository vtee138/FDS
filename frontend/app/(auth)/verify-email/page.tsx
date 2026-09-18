"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AuthCard from "@/components/auth/AuthCard";
import AuthAlert from "@/components/auth/AuthAlert";
import { verifyEmailClient, AuthApiError } from "@/lib/auth/client";
import { authRoutes } from "@/lib/auth/config";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Thiếu token xác thực. Vui lòng mở lại link từ email.");
      return;
    }
    let cancelled = false;
    setStatus("loading");
    verifyEmailClient(token)
      .then(() => {
        if (!cancelled) {
          setStatus("done");
          setMessage("Xác thực email thành công. Tài khoản của bạn đã được kích hoạt.");
        }
      })
      .catch((err) => {
        if (cancelled) return;
        setStatus("error");
        setMessage(
          err instanceof AuthApiError
            ? err.message
            : "Xác thực thất bại. Link có thể đã hết hạn."
        );
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <AuthCard
      eyebrow="FDS · Xác thực"
      title="Xác thực email"
      description="Chúng tôi đang kiểm tra link xác thực của bạn."
      footer={
        <p>
          <Link href={authRoutes.login} className="fds-text-link font-semibold">
            Về trang đăng nhập
          </Link>
        </p>
      }
    >
      {status === "loading" || status === "idle" ? (
        <AuthAlert kind="info" message="Đang xác thực, vui lòng chờ…" />
      ) : status === "done" ? (
        <AuthAlert kind="success" message={message ?? "Xác thực thành công."} />
      ) : (
        <AuthAlert kind="error" message={message ?? "Xác thực thất bại."} />
      )}
    </AuthCard>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <VerifyEmailContent />
    </Suspense>
  );
}
