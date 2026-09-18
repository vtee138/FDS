"use client";

import { useEffect, useState } from "react";
import { Search, X, ArrowRight } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickLinks = [
    { title: "Lĩnh vực hoạt động", desc: "Data Science, AI, Data Engineering, Research", href: "#fields" },
    { title: "Dự án tiêu biểu", desc: "Các chương trình và sản phẩm dữ liệu của CLB", href: "#projects" },
    { title: "Hoạt động & Sự kiện", desc: "Workshop, hackathon, study groups", href: "#activities" },
    { title: "Tuyển thành viên FDS", desc: "4 bước tham gia cộng đồng", href: "#journey" },
    { title: "Về FDS", desc: "Tầm nhìn và giá trị cốt lõi", href: "#about" },
  ];

  const filteredLinks = query.trim()
    ? quickLinks.filter((item) =>
        (item.title + " " + item.desc).toLowerCase().includes(query.toLowerCase())
      )
    : quickLinks;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Hộp thoại tìm kiếm FDS"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[#07152F]/40 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white border border-[#E1E8F0] shadow-2xl rounded-[4px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-3 border-b border-[#E1E8F0] gap-3">
          <Search size={20} className="text-[#64748B]" aria-hidden="true" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm thông tin FDS (lĩnh vực, dự án, sự kiện)..."
            className="w-full text-base text-[#07152F] outline-hidden placeholder:text-[#94A3B8]"
            autoFocus
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-[#64748B] hover:text-[#07152F] rounded-[3px]"
            aria-label="Đóng hộp thoại tìm kiếm"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="p-3 max-h-80 overflow-y-auto">
          <p className="px-3 py-1 text-xs font-semibold tracking-wider text-[#64748B] uppercase">
            Mục điều hướng nhanh
          </p>
          <div className="mt-1 flex flex-col gap-1">
            {filteredLinks.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-[3px] hover:bg-[#F5F7FB] transition group"
              >
                <div>
                  <h4 className="text-sm font-semibold text-[#07152F] group-hover:text-[#2457A6]">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#64748B] mt-0.5">{item.desc}</p>
                </div>
                <ArrowRight size={16} className="text-[#94A3B8] group-hover:text-[#2457A6] transition-transform group-hover:translate-x-1" />
              </a>
            ))}
            {filteredLinks.length === 0 && (
              <p className="p-4 text-sm text-[#64748B] text-center">
                Không tìm thấy kết quả phù hợp với "{query}".
              </p>
            )}
          </div>
        </div>

        <div className="bg-[#F5F7FB] px-4 py-2 text-xs text-[#64748B] border-t border-[#E1E8F0] flex justify-between">
          <span>Nhấn ESC để đóng</span>
          <span>FPTU Data Science Club</span>
        </div>
      </div>
    </div>
  );
}
