import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth/session";
import { authRoutes } from "@/lib/auth/config";
import ProfileForm from "@/components/auth/ProfileForm";

export default async function ProfilePage() {
  const user = await getSession();
  if (!user) {
    redirect(`${authRoutes.login}?next=${encodeURIComponent(authRoutes.profile)}`);
  }

  const initial = user.name?.trim()?.charAt(0)?.toUpperCase() ?? "F";

  return (
    <div className="min-h-screen fds-page flex flex-col">
      <main className="flex-1 flex items-start justify-center px-4 sm:px-6 py-16">
        <div className="w-full max-w-[560px] fds-card p-6 sm:p-8 rounded-[4px]">
          <p className="fds-eyebrow mb-2">FDS · Hồ sơ</p>
          <div className="flex items-center gap-4 mb-6">
            <div
              aria-hidden="true"
              className="w-14 h-14 rounded-full bg-[#07152F] text-white flex items-center justify-center text-xl font-semibold font-display flex-shrink-0"
            >
              {initial}
            </div>
            <div>
              <h1 className="font-display text-2xl font-semibold text-[#07152F]">
                {user.name}
              </h1>
              <p className="text-sm text-[#64748B]">{user.email}</p>
              <p className="mt-1 text-xs font-mono uppercase tracking-wider">
                {user.emailVerified ? (
                  <span className="text-emerald-600">Đã xác thực email</span>
                ) : (
                  <span className="text-amber-600">
                    Chưa xác thực email ·{" "}
                    <Link
                      href={authRoutes.verifyEmail}
                      className="underline underline-offset-2"
                    >
                      Xác thực ngay
                    </Link>
                  </span>
                )}
                {user.role ? (
                  <span className="text-[#2457A6]"> · {user.role}</span>
                ) : null}
              </p>
            </div>
          </div>
          <ProfileForm initial={user} />
          <div className="mt-6 pt-4 border-t border-[#E1E8F0]">
            <Link href="/" className="fds-text-link text-xs font-semibold">
              ← Về trang chủ FDS
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
