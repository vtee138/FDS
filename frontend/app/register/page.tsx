'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/components/AuthProvider';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mssv, setMssv] = useState('');
  const [major, setMajor] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError('Mật khẩu nhập lại không khớp');
      return;
    }

    setIsSubmitting(true);
    try {
      await register(name.trim(), email.trim(), password, mssv.trim(), major.trim());
      router.push('/');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đăng ký thất bại');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="authWrap">
      <form className="authCard" onSubmit={handleSubmit}>
        <span className="eyebrowDark">Join FDS</span>
        <h1>Đăng ký</h1>
        <p className="authSub">Tạo tài khoản để tham gia hoạt động CLB.</p>

        {error && (
          <p className="authError" role="alert">
            {error}
          </p>
        )}

        <label className="authField">
          <span>Họ tên</span>
          <input
            type="text"
            required
            minLength={2}
            autoComplete="name"
            placeholder="Nguyễn Văn A"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

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
          <span>MSSV</span>
          <input
            type="text"
            required
            autoComplete="username"
            placeholder="SE180000"
            value={mssv}
            onChange={(e) => setMssv(e.target.value)}
          />
        </label>

        <label className="authField">
          <span>Chuyên ngành</span>
          <input
            type="text"
            required
            placeholder="Software Engineering"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
          />
        </label>

        <label className="authField">
          <span>Mật khẩu (tối thiểu 6 ký tự)</span>
          <input
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <label className="authField">
          <span>Nhập lại mật khẩu</span>
          <input
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
            placeholder="••••••••"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </label>

        <button className="primary authSubmit" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Đang tạo tài khoản...' : 'Đăng ký'}
        </button>

        <p className="authSwitch">
          Đã có tài khoản? <Link href="/login">Đăng nhập</Link>
        </p>
      </form>
    </main>
  );
}
