"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import SearchModal from "./SearchModal";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

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
  };

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

        {/* Right Actions: Search & CTA */}
        <div className="hidden md:flex items-center gap-4">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="p-2 text-[#07152F] hover:text-[#2457A6] hover:bg-[#E1E8F0]/40 rounded-[3px] transition cursor-pointer"
            aria-label="Tìm kiếm nội dung"
          >
            <Search size={18} aria-hidden="true" />
          </button>

          <a
            href="#journey"
            className="inline-flex items-center gap-1.5 bg-[#07152F] text-white text-sm font-medium px-5 py-2.5 rounded-[3px] hover:bg-[#1E293B] active:bg-[#07152F] transition-all shadow-xs"
          >
            Tham gia FDS →
          </a>
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
            <div className="pt-3 border-t border-[#E1E8F0] mt-2">
              <a
                href="#journey"
                onClick={handleLinkClick}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#07152F] text-white text-sm font-medium py-3 rounded-[3px] hover:bg-[#1E293B] transition"
              >
                Tham gia FDS →
              </a>
            </div>
          </nav>
        </div>
      )}

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
