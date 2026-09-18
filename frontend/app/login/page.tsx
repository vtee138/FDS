'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/components/AuthProvider';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await login(email.trim(), password);
      router.push('/');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đăng nhập thất bại');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="authWrap">
      <form className="authCard" onSubmit={handleSubmit}>
        <span className="eyebrowDark">FDS Members</span>
        <h1>Đăng nhập</h1>
        <p className="authSub">Chào mừng trở lại CLB Data Science.</p>

        {error && (
          <p className="authError" role="alert">
            {error}
          </p>
        )}

        <label className="authField">
          <span>Email</span>
          <input
            type="email"
            required
            autoComplete="email"
            placeholder="ban@fpt.edu.vn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="authField">
          <span>Mật khẩu</span>
          <input
            type="password"
            required
            minLength={6}
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button className="primary authSubmit" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>

        <p className="authSwitch">
          Chưa có tài khoản? <Link href="/register">Đăng ký ngay</Link>
        </p>
      </form>
    </main>
  );
}
