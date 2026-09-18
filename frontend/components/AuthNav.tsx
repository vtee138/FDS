'use client';

import Link from 'next/link';
import { useAuth } from './AuthProvider';

export function AuthNav() {
  const { user, isLoading, logout } = useAuth();

  if (isLoading) {
    return <span className="navUser">Đang tải...</span>;
  }

  if (!user) {
    return (
      <>
        <Link href="/login">Đăng nhập</Link>
        <Link href="/register" className="navCta">
          Đăng ký
        </Link>
      </>
    );
  }

  return (
    <>
      <span className="navUser" title={user.email}>
        Xin chào, {user.name || user.email}
      </span>
      <button type="button" className="navCta navButton" onClick={logout}>
        Đăng xuất
      </button>
    </>
  );
}
