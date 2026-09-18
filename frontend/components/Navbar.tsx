"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Menu, X, User, LogOut } from "lucide-react";
import SearchModal from "./SearchModal";
import { useAuth } from "@/lib/auth/AuthProvider";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = [
        "home",
        "about",
        "fields",
        "activities",
        "projects",
        "achievements",
        "community",
        "journey",
      ];

      for (const sectionId of [...sections].reverse()) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Trang chủ", href: "#home", id: "home" },
    { label: "Về FDS", href: "#about", id: "about" },
    { label: "Hoạt động", href: "#activities", id: "activities" },
    { label: "Sáng kiến", href: "#projects", id: "projects" },
    { label: "Cộng đồng", href: "#community", id: "community" },
    { label: "Tuyển thành viên", href: "#journey", id: "journey" },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
    setUserMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    setUserMenuOpen(false);
    setIsOpen(false);
    router.push("/");
  };

  const userInitial =
    user?.name?.trim()?.charAt(0)?.toUpperCase() ?? "F";

  return (
    <header
      className={`fds-navbar transition-all duration-200 ${
        scrolled ? "is-scrolled" : ""
      }`}
    >
      <div className="fds-navbar-inner">
        {/* Brand Logo */}
        <Link href="#home" className="flex items-center gap-2 flex-shrink-0" aria-label="FDS - Về đầu trang">
          <Image
            src="/fds/brand/fds-wordmark-authentic-navy.png"
            alt="FDS - FPTU Data Science Club"
            width={154}
            height={84}
            priority
            draggable={false}
            className="w-[138px] md:w-[154px] h-auto object-contain select-none fds-decorative"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Điều hướng chính">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`text-sm font-medium transition-colors relative py-1 ${
                  isActive
                    ? "text-[#2457A6] font-semibold"
                    : "text-[#07152F] hover:text-[#2457A6]"
                }`}
              >
                {link.label}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2457A6] rounded-xs"
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Actions: Search & Auth CTA */}
        <div className="hidden md:flex items-center gap-4">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="p-2 text-[#07152F] hover:text-[#2457A6] hover:bg-[#E1E8F0]/40 rounded-[3px] transition cursor-pointer"
            aria-label="Tìm kiếm nội dung"
          >
            <Search size={18} aria-hidden="true" />
          </button>

          {isLoading ? (
            <span className="w-24 h-10 rounded-[3px] bg-[#E1E8F0]/50 animate-pulse" aria-hidden="true" />
          ) : user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserMenuOpen((v) => !v)}
                aria-expanded={userMenuOpen}
                aria-haspopup="menu"
                aria-label={`Tài khoản ${user.name}`}
                className="w-10 h-10 rounded-full bg-[#07152F] text-white flex items-center justify-center text-sm font-semibold font-display hover:bg-[#1E293B] transition"
              >
                {userInitial}
              </button>
              {userMenuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-56 bg-white border border-[#E1E8F0] rounded-[4px] shadow-lg py-2 z-50"
                >
                  <p className="px-4 py-2 text-xs text-[#64748B] truncate border-b border-[#E1E8F0]">
                    {user.email}
                  </p>
                  <Link
                    href="/profile"
                    onClick={handleLinkClick}
                    role="menuitem"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#07152F] hover:bg-[#F5F7FB] transition"
                  >
                    <User size={15} aria-hidden="true" /> Hồ sơ của tôi
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    role="menuitem"
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
                  >
                    <LogOut size={15} aria-hidden="true" /> Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-[#07152F] hover:text-[#2457A6] transition"
              >
                Đăng nhập
              </Link>
              <a
                href="#journey"
                className="inline-flex items-center gap-1.5 bg-[#07152F] text-white text-sm font-medium px-5 py-2.5 rounded-[3px] hover:bg-[#1E293B] active:bg-[#07152F] transition-all shadow-xs"
              >
                Tham gia FDS →
              </a>
            </>
          )}
        </div>

        {/* Mobile Hamburger & Search Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="p-2 text-[#07152F] hover:text-[#2457A6] rounded-[3px]"
            aria-label="Tìm kiếm nội dung"
          >
            <Search size={19} aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-[#07152F] hover:text-[#2457A6] focus:outline-hidden focus:ring-2 focus:ring-[#2457A6] rounded-[3px]"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Đóng menu điều hướng" : "Mở menu điều hướng"}
          >
            {isOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Menu Dropdown */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-b border-[#E1E8F0] bg-[#F5F7FB] px-6 py-5 shadow-lg transition-all"
        >
          <nav className="flex flex-col gap-3" aria-label="Điều hướng trên điện thoại">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`py-2 px-3 text-base font-medium rounded-[3px] transition ${
                    isActive
                      ? "text-[#2457A6] bg-[#EFF6FF] font-semibold"
                      : "text-[#07152F] hover:bg-[#E1E8F0]/50"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <div className="pt-3 border-t border-[#E1E8F0] mt-2 flex flex-col gap-2">
              {user ? (
                <>
                  <Link
                    href="/profile"
                    onClick={handleLinkClick}
                    className="w-full inline-flex items-center justify-center gap-2 border border-[#E1E8F0] text-[#07152F] text-sm font-medium py-3 rounded-[3px] hover:bg-white transition"
                  >
                    <User size={15} aria-hidden="true" /> Hồ sơ của tôi
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full inline-flex items-center justify-center gap-2 text-red-600 text-sm font-medium py-3 rounded-[3px] hover:bg-red-50 transition"
                  >
                    <LogOut size={15} aria-hidden="true" /> Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={handleLinkClick}
                    className="w-full inline-flex items-center justify-center gap-2 border border-[#E1E8F0] text-[#07152F] text-sm font-medium py-3 rounded-[3px] hover:bg-white transition"
                  >
                    Đăng nhập
                  </Link>
                  <a
                    href="#journey"
                    onClick={handleLinkClick}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#07152F] text-white text-sm font-medium py-3 rounded-[3px] hover:bg-[#1E293B] transition"
                  >
                    Tham gia FDS →
                  </a>
                </>
              )}
            </div>
          </nav>
        </div>
      )}

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
