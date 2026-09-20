"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, ChevronRight } from "lucide-react";
import { login, register, getAccessToken, getStoredUser, clearAuth } from "../../lib/auth";

type Mode = "login" | "register" | "forgot";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Feedback
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Auto-redirect if already logged in, or clear auth if coming from logout
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const urlMode = params.get("mode");
    if (urlMode === "register" || urlMode === "login" || urlMode === "forgot") {
      setMode(urlMode as Mode);
    }

    // If redirected from admin logout, clear frontend tokens first
    if (params.get("logout") === "true") {
      clearAuth();
      window.history.replaceState(null, "", "/auth");
      return;
    }

    // Handle Google OAuth callback — tokens come as query params
    const accessToken = params.get("accessToken");
    const userParam = params.get("user");
    if (accessToken && userParam) {
      try {
        const userData = JSON.parse(userParam);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(userData));
        // Clean up URL
        window.history.replaceState(null, "", "/auth");
        // Redirect based on role
        if (userData.role === "ADMIN") {
          window.location.href = `http://localhost:5173/#token=${accessToken}`;
        } else {
          router.replace("/");
        }
        return;
      } catch {
        // Invalid user param, ignore
      }
    }

    const token = getAccessToken();
    const user = getStoredUser();
    if (token && user) {
      if (user.role === "ADMIN") {
        window.location.href = `http://localhost:5173/#token=${token}&refresh=${localStorage.getItem("refreshToken") ?? ""}`;
      } else {
        router.replace("/");
      }
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (mode === "register" && password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    setIsLoading(true);
    try {
      if (mode === "login") {
        const res = await login(email, password);
        if (res.user.role === "ADMIN") {
          window.location.href = `http://localhost:5173/#token=${res.accessToken}`;
        } else {
          router.push("/");
        }
      } else if (mode === "register") {
        const res = await register(name, email, password);
        if (res.user.role === "ADMIN") {
          window.location.href = `http://localhost:5173/#token=${res.accessToken}`;
        } else {
          router.push("/");
        }
      } else {
        // forgot password — chưa có API
        setSuccess("Nếu email tồn tại, bạn sẽ nhận được liên kết đặt lại mật khẩu.");
        setIsLoading(false);
        return;
      }
    } catch (err: any) {
      setError(err.message || "Đã có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg-overlay" aria-hidden="true" />

      <div className="auth-deco auth-deco--top-right" aria-hidden="true">
        <Image src="/fds/decorations/hero-hex-rings.svg" alt="" width={240} height={210} className="fds-decorative select-none" draggable={false} />
      </div>
      <div className="auth-deco auth-deco--bottom-left" aria-hidden="true">
        <Image src="/fds/decorations/fields-hex-cluster.svg" alt="" width={180} height={180} className="fds-decorative select-none" draggable={false} />
      </div>
      <div className="auth-deco auth-deco--bottom-right" aria-hidden="true">
        <Image src="/fds/decorations/technical-corner-lines.svg" alt="" width={160} height={160} className="fds-decorative select-none" draggable={false} />
      </div>
      <div className="auth-deco auth-deco--mid-left" aria-hidden="true">
        <Image src="/fds/decorations/micro-node-line.svg" alt="" width={130} height={24} className="fds-decorative select-none" draggable={false} />
      </div>

      <div className="auth-layout">
        {/* LEFT BRAND PANEL */}
        <aside className="auth-brand-panel" aria-hidden="true">
          <div className="auth-brand-inner">
            <div className="auth-brand-deco">
              <Image src="/fds/decorations/hex-network.svg" alt="" width={200} height={200} className="fds-decorative select-none w-full h-auto" draggable={false} />
            </div>
            <Link href="/" className="auth-wordmark-link" tabIndex={-1}>
              <Image src="/fds/brand/fds-wordmark-authentic-navy.png" alt="FDS" width={154} height={84} priority className="auth-wordmark fds-decorative select-none" draggable={false} />
            </Link>
            <p className="fds-eyebrow mt-6 mb-3">FPTU Data Science Club</p>
            <h2 className="auth-brand-headline">Insights <em>in our eyes</em></h2>
            <p className="auth-brand-body">Cộng đồng sinh viên đam mê Khoa học Dữ liệu tại Đại học FPT. Cùng học hỏi, nghiên cứu và kiến tạo giá trị thực tiễn.</p>
            <div className="auth-pillars">
              {[
                { label: "Học hỏi", sub: "Không ngừng mở rộng tri thức" },
                { label: "Kết nối", sub: "Đa góc nhìn, cùng phát triển" },
                { label: "Ứng dụng", sub: "Kiến tạo giải pháp thực tiễn" },
              ].map((p) => (
                <div key={p.label} className="auth-pillar">
                  <span className="auth-pillar-label">{p.label}</span>
                  <span className="auth-pillar-sub">{p.sub}</span>
                </div>
              ))}
            </div>
            <div className="auth-brand-footer">
              <span className="auth-meta">Est. 01/11/2020</span>
              <span className="auth-meta">· Hà Nội, Việt Nam</span>
            </div>
          </div>
        </aside>

        {/* RIGHT FORM PANEL */}
        <main className="auth-form-panel">
          <Link href="/" className="auth-mobile-wordmark">
            <Image src="/fds/brand/fds-wordmark-authentic-navy.png" alt="FDS" width={130} height={71} className="fds-decorative select-none" draggable={false} />
          </Link>

          <div className="auth-card" role="main">
            <div className="fds-section-tag mb-4">
              {mode === "login" ? "ĐĂNG NHẬP" : mode === "register" ? "ĐĂNG KÝ" : "KHÔI PHỤC"}
            </div>

            <h1 className="auth-card-title">
              {mode === "login" && (<>Chào mừng<br /><em>trở lại!</em></>)}
              {mode === "register" && (<>Tham gia<br /><em>FDS ngay</em></>)}
              {mode === "forgot" && (<>Khôi phục<br /><em>tài khoản</em></>)}
            </h1>

            <p className="auth-card-desc">
              {mode === "login" && "Đăng nhập để tiếp tục hành trình khoa học dữ liệu của bạn."}
              {mode === "register" && "Tạo tài khoản để khám phá cộng đồng FDS và bắt đầu học hỏi."}
              {mode === "forgot" && "Nhập email để nhận liên kết đặt lại mật khẩu."}
            </p>

            <div className="auth-divider" aria-hidden="true" />

            <form onSubmit={handleSubmit} noValidate>
              {error && <div className="auth-alert auth-alert--error">{error}</div>}
              {success && <div className="auth-alert auth-alert--success">{success}</div>}
              {mode === "register" && (
                <div className="auth-field-group">
                  <label htmlFor="auth-fullname" className="auth-label">Họ và tên</label>
                  <div className="auth-input-wrap">
                    <User size={15} className="auth-input-icon" aria-hidden="true" />
                    <input id="auth-fullname" type="text" autoComplete="name" placeholder="Nguyễn Văn A" className="auth-input" required value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                </div>
              )}

              <div className="auth-field-group">
                <label htmlFor="auth-email" className="auth-label">Địa chỉ email</label>
                <div className="auth-input-wrap">
                  <Mail size={15} className="auth-input-icon" aria-hidden="true" />
                  <input id="auth-email" type="email" autoComplete="email" placeholder="ten@fpt.edu.vn" className="auth-input" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>

              {mode !== "forgot" && (
                <div className="auth-field-group">
                  <div className="auth-label-row">
                    <label htmlFor="auth-password" className="auth-label">Mật khẩu</label>
                    {mode === "login" && (
                      <button type="button" onClick={() => setMode("forgot")} className="auth-forgot-btn">Quên mật khẩu?</button>
                    )}
                  </div>
                  <div className="auth-input-wrap">
                    <Lock size={15} className="auth-input-icon" aria-hidden="true" />
                    <input id="auth-password" type={showPassword ? "text" : "password"} autoComplete={mode === "login" ? "current-password" : "new-password"} placeholder={mode === "login" ? "••••••••" : "Tối thiểu 6 ký tự"} className="auth-input auth-input--has-right" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="button" onClick={() => setShowPassword((v) => !v)} className="auth-eye-btn" aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}>
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
              )}

              {mode === "register" && (
                <div className="auth-field-group">
                  <label htmlFor="auth-confirm" className="auth-label">Xác nhận mật khẩu</label>
                  <div className="auth-input-wrap">
                    <Lock size={15} className="auth-input-icon" aria-hidden="true" />
                    <input id="auth-confirm" type={showConfirmPassword ? "text" : "password"} autoComplete="new-password" placeholder="Nhập lại mật khẩu" className="auth-input auth-input--has-right" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <button type="button" onClick={() => setShowConfirmPassword((v) => !v)} className="auth-eye-btn" aria-label={showConfirmPassword ? "Ẩn" : "Hiện"}>
                      {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
              )}

              {mode === "register" && (
                <div className="auth-terms">
                  <input id="auth-terms" type="checkbox" className="auth-checkbox" required />
                  <label htmlFor="auth-terms" className="auth-terms-label">
                    Tôi đồng ý với{" "}<a href="#" className="fds-text-link text-xs">Điều khoản sử dụng</a>{" "}và{" "}<a href="#" className="fds-text-link text-xs">Chính sách bảo mật</a>.
                  </label>
                </div>
              )}

              <button id="auth-submit-btn" type="submit" className="auth-submit" disabled={isLoading} aria-busy={isLoading}>
                {isLoading ? (
                  <span className="auth-spinner" aria-label="Đang xử lý..." />
                ) : (
                  <>
                    {mode === "login" && "Đăng nhập"}
                    {mode === "register" && "Tạo tài khoản"}
                    {mode === "forgot" && "Gửi liên kết đặt lại"}
                    <ArrowRight size={16} aria-hidden="true" />
                  </>
                )}
              </button>

              {mode !== "forgot" && (
                <>
                  <div className="auth-or">
                    <span className="auth-or-line" aria-hidden="true" />
                    <span className="auth-or-text">hoặc</span>
                    <span className="auth-or-line" aria-hidden="true" />
                  </div>
                  <button id="auth-google-btn" type="button" className="auth-oauth-btn" onClick={() => { window.location.href = 'http://localhost:4000/auth/google'; }}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                      <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
                      <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                    </svg>
                    Tiếp tục với Google
                  </button>
                </>
              )}
            </form>

            <div className="auth-switch">
              {mode === "login" && (<><span className="auth-switch-text">Chưa có tài khoản?</span><button type="button" onClick={() => setMode("register")} className="auth-switch-btn">Đăng ký ngay <ChevronRight size={13} aria-hidden="true" /></button></>)}
              {mode === "register" && (<><span className="auth-switch-text">Đã có tài khoản?</span><button type="button" onClick={() => setMode("login")} className="auth-switch-btn">Đăng nhập <ChevronRight size={13} aria-hidden="true" /></button></>)}
              {mode === "forgot" && (<><span className="auth-switch-text">Nhớ lại rồi?</span><button type="button" onClick={() => setMode("login")} className="auth-switch-btn">Quay lại đăng nhập <ChevronRight size={13} aria-hidden="true" /></button></>)}
            </div>
          </div>

          <Link href="/" className="auth-back-home">← Quay lại trang chủ</Link>
        </main>
      </div>

      <style>{`
        .auth-page {
          min-height: 100vh;
          position: relative;
          isolation: isolate;
          background-color: #eef3f8;
          background-image: url("/fds/backgrounds/paper-newspaper-v3.webp");
          background-repeat: repeat;
          background-position: top left;
          background-size: 520px 520px;
          display: flex;
          align-items: stretch;
          overflow: hidden;
        }
        .auth-bg-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(239,246,255,0.55) 0%, rgba(238,243,248,0.30) 50%, rgba(224,235,250,0.45) 100%);
          pointer-events: none;
          z-index: 0;
        }
        .auth-deco { position: fixed; pointer-events: none; z-index: 0; }
        .auth-deco--top-right { top: -20px; right: -20px; opacity: 0.52; }
        .auth-deco--bottom-left { bottom: -30px; left: -30px; opacity: 0.44; }
        .auth-deco--bottom-right { bottom: 0; right: 0; opacity: 0.36; }
        .auth-deco--mid-left { top: 45%; left: 0; opacity: 0.58; transform: rotate(90deg); }
        .auth-layout {
          position: relative;
          z-index: 1;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr;
          min-height: 100vh;
        }
        @media (min-width: 1024px) {
          .auth-layout { grid-template-columns: 44fr 56fr; }
        }
        .auth-brand-panel {
          display: none;
          position: relative;
          background: rgba(7,21,47,0.96);
          background-image: url("/fds/backgrounds/paper-newspaper-v3.webp");
          background-repeat: repeat;
          background-size: 420px 420px;
          overflow: hidden;
        }
        @media (min-width: 1024px) {
          .auth-brand-panel { display: flex; flex-direction: column; justify-content: center; }
        }
        .auth-brand-panel::before {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(7,21,47,0.90);
          z-index: 0;
        }
        .auth-brand-inner {
          position: relative;
          z-index: 1;
          padding: 56px 52px;
          display: flex;
          flex-direction: column;
        }
        .auth-brand-deco {
          position: absolute;
          top: -40px; right: -60px;
          width: 260px;
          opacity: 0.14;
          pointer-events: none;
          filter: invert(1);
        }
        .auth-wordmark-link { display: inline-block; width: fit-content; }
        .auth-wordmark { width: 148px; height: auto; filter: brightness(0) invert(1); object-fit: contain; }
        .auth-brand-headline {
          font-family: var(--font-display);
          font-size: clamp(2.6rem, 3.8vw, 3.6rem);
          font-weight: 600;
          line-height: 1.04;
          letter-spacing: -0.038em;
          color: #F5F7FB;
          margin-bottom: 18px;
        }
        .auth-brand-headline em {
          font-weight: 500;
          font-style: italic;
          color: rgba(245,247,251,0.72);
          display: block;
        }
        .auth-brand-body {
          font-family: var(--font-sans);
          font-size: 0.9375rem;
          line-height: 1.68;
          color: rgba(245,247,251,0.62);
          max-width: 38ch;
          margin-bottom: 36px;
        }
        .auth-pillars { display: flex; flex-direction: column; gap: 14px; margin-bottom: 48px; }
        .auth-pillar {
          display: flex; flex-direction: column; gap: 2px;
          padding-left: 14px;
          border-left: 2px solid rgba(36,87,166,0.72);
        }
        .auth-pillar-label { font-family: var(--font-display); font-size: 0.9375rem; font-weight: 600; color: #F5F7FB; letter-spacing: -0.01em; }
        .auth-pillar-sub { font-family: var(--font-sans); font-size: 0.75rem; color: rgba(245,247,251,0.50); line-height: 1.45; }
        .auth-brand-footer {
          display: flex; gap: 6px; align-items: center;
          margin-top: auto; padding-top: 32px;
          border-top: 1px solid rgba(245,247,251,0.1);
        }
        .auth-meta { font-family: var(--font-mono); font-size: 10px; font-weight: 500; letter-spacing: 0.10em; text-transform: uppercase; color: rgba(245,247,251,0.38); }
        .auth-brand-inner .fds-eyebrow { color: rgba(36,87,166,0.85); }

        .auth-form-panel {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; padding: 40px 20px; min-height: 100vh; gap: 20px;
        }
        @media (min-width: 640px) { .auth-form-panel { padding: 56px 32px; } }

        .auth-mobile-wordmark { display: block; }
        @media (min-width: 1024px) { .auth-mobile-wordmark { display: none; } }

        .auth-card {
          width: 100%; max-width: 440px;
          background: rgba(255,255,255,0.82);
          border: 1px solid rgba(7,21,47,0.08);
          border-radius: 4px;
          box-shadow: 0 2px 8px rgba(25,57,99,0.05), 0 12px 40px rgba(25,57,99,0.07), inset 0 1px 0 rgba(255,255,255,0.9);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 36px 32px 32px;
          position: relative; overflow: hidden;
        }
        .auth-card::before {
          content: ""; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent 0%, #2457A6 30%, #1769d2 70%, transparent 100%);
        }
        .auth-card-title {
          font-family: var(--font-display);
          font-size: clamp(1.9rem, 3vw, 2.4rem);
          font-weight: 600; line-height: 1.06;
          letter-spacing: -0.032em; color: #07152F;
          margin-bottom: 10px; margin-top: 8px;
        }
        .auth-card-title em { font-weight: 500; font-style: italic; color: #2457A6; }
        .auth-card-desc { font-family: var(--font-sans); font-size: 0.875rem; line-height: 1.6; color: #415777; margin-bottom: 0; }
        .auth-divider { height: 1px; background: rgba(7,21,47,0.08); margin: 22px 0; }

        .auth-alert {
          padding: 10px 14px; border-radius: 4px; font-family: var(--font-sans);
          font-size: 0.8125rem; line-height: 1.5; margin-bottom: 16px;
        }
        .auth-alert--error {
          background: rgba(220,38,38,0.08); border: 1px solid rgba(220,38,38,0.20); color: #b91c1c;
        }
        .auth-alert--success {
          background: rgba(22,163,74,0.08); border: 1px solid rgba(22,163,74,0.20); color: #15803d;
        }


        .auth-field-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
        .auth-label-row { display: flex; align-items: center; justify-content: space-between; }
        .auth-label { font-family: var(--font-sans); font-size: 0.8125rem; font-weight: 600; color: #07152F; letter-spacing: 0.01em; cursor: pointer; }
        .auth-input-wrap { position: relative; display: flex; align-items: center; }
        .auth-input-icon { position: absolute; left: 12px; color: #64748B; pointer-events: none; flex-shrink: 0; }
        .auth-input {
          width: 100%; height: 42px; padding: 0 12px 0 36px;
          background: rgba(255,255,255,0.72);
          border: 1px solid rgba(7,21,47,0.14); border-radius: 3px;
          font-family: var(--font-sans); font-size: 0.9rem; color: #07152F;
          outline: none;
          transition: border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
          caret-color: #2457A6;
        }
        .auth-input::placeholder { color: #94A3B8; }
        .auth-input:focus {
          border-color: rgba(36,87,166,0.6);
          box-shadow: 0 0 0 3px rgba(36,87,166,0.10);
          background: rgba(255,255,255,0.95);
        }
        .auth-input--has-right { padding-right: 40px; }
        .auth-eye-btn {
          position: absolute; right: 10px; color: #64748B;
          background: none; border: none; cursor: pointer; padding: 4px;
          display: flex; align-items: center; border-radius: 3px; transition: color 0.15s;
        }
        .auth-eye-btn:hover { color: #2457A6; }
        .auth-forgot-btn {
          font-family: var(--font-sans); font-size: 0.75rem; font-weight: 600;
          color: #2457A6; background: none; border: none; cursor: pointer; padding: 0;
          text-decoration: underline; text-underline-offset: 3px; transition: color 0.15s;
        }
        .auth-forgot-btn:hover { color: #1769d2; }

        .auth-terms { display: flex; align-items: flex-start; gap: 8px; margin-bottom: 18px; }
        .auth-checkbox { width: 15px; height: 15px; margin-top: 2px; accent-color: #2457A6; cursor: pointer; flex-shrink: 0; border-radius: 2px; }
        .auth-terms-label { font-family: var(--font-sans); font-size: 0.8125rem; line-height: 1.5; color: #415777; cursor: pointer; }

        .auth-submit {
          width: 100%; height: 44px;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          background: #07152F; color: #F5F7FB;
          font-family: var(--font-sans); font-size: 0.9rem; font-weight: 600;
          border: none; border-radius: 3px; cursor: pointer;
          transition: background 0.18s ease, transform 0.12s ease, box-shadow 0.18s ease;
          box-shadow: 0 2px 8px rgba(7,21,47,0.18);
          letter-spacing: 0.01em; margin-bottom: 18px;
        }
        .auth-submit:hover:not(:disabled) { background: #1E293B; box-shadow: 0 4px 16px rgba(7,21,47,0.22); }
        .auth-submit:active:not(:disabled) { background: #07152F; transform: translateY(1px); }
        .auth-submit:disabled { opacity: 0.72; cursor: not-allowed; }

        .auth-spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(245,247,251,0.25);
          border-top-color: #F5F7FB; border-radius: 50%;
          animation: auth-spin 0.7s linear infinite;
        }
        @keyframes auth-spin { to { transform: rotate(360deg); } }

        .auth-or { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
        .auth-or-line { flex: 1; height: 1px; background: rgba(7,21,47,0.10); }
        .auth-or-text { font-family: var(--font-sans); font-size: 0.75rem; color: #94A3B8; white-space: nowrap; font-weight: 500; }

        .auth-oauth-btn {
          width: 100%; height: 42px;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          background: rgba(255,255,255,0.84);
          border: 1px solid rgba(7,21,47,0.14); border-radius: 3px;
          font-family: var(--font-sans); font-size: 0.875rem; font-weight: 500; color: #07152F;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s, box-shadow 0.15s;
          box-shadow: 0 1px 4px rgba(7,21,47,0.06);
        }
        .auth-oauth-btn:hover { background: rgba(255,255,255,0.97); border-color: rgba(7,21,47,0.22); box-shadow: 0 2px 10px rgba(7,21,47,0.10); }

        .auth-switch { display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 22px; }
        .auth-switch-text { font-family: var(--font-sans); font-size: 0.8125rem; color: #64748B; }
        .auth-switch-btn {
          display: inline-flex; align-items: center; gap: 2px;
          font-family: var(--font-sans); font-size: 0.8125rem; font-weight: 700; color: #2457A6;
          background: none; border: none; cursor: pointer; padding: 0;
          text-decoration: underline; text-underline-offset: 3px; transition: color 0.15s;
        }
        .auth-switch-btn:hover { color: #1769d2; }

        .auth-back-home {
          font-family: var(--font-sans); font-size: 0.8125rem; font-weight: 500;
          color: #64748B; text-decoration: none; transition: color 0.15s;
        }
        .auth-back-home:hover { color: #2457A6; }
      `}</style>
    </div>
  );
}
