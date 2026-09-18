"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Award,
  Users,
  Calendar,
  MapPin,
  CheckCircle2,
} from "lucide-react";

export type Initiative = {
  id: number;
  title: string;
  category: string;
  badge: string;
  tagline: string;
  description: string;
  platform: string;
  timeframe: string;
  audience: string;
  partner?: string;
  verifiedFact: string;
  linkUrl?: string;
  linkLabel?: string;
};

const verifiedInitiatives: Initiative[] = [
  {
    id: 1,
    title: "FDS Summer Challenge 2025",
    category: "Cuộc thi Kaggle",
    badge: "KAGGLE COMPETITION",
    tagline: "Weather Prediction Challenge",
    description:
      "Thử sức với bài toán dữ liệu thực tế qua cuộc thi thường niên trên Kaggle, nơi người học trong và ngoài Việt Nam cùng tham gia giải quyết thử thách và tối ưu mô hình học máy.",
    platform: "Kaggle Platform",
    timeframe: "Thường niên (Mùa 2024 & 2025)",
    audience: "Sinh viên & thí sinh quốc tế",
    partner: "Cộng đồng Kaggle & FPTU",
    verifiedFact:
      "Năm 2024 tổ chức Data Challenge; năm 2025 thử thách dự báo thời tiết với sự tham gia của thí sinh quốc tế.",
    linkUrl:
      "https://www.kaggle.com/competitions/fds-summer-challenge-2025-weather-prediction",
    linkLabel: "Xem cuộc thi trên Kaggle",
  },
  {
    id: 2,
    title: "FDS Bootcamp 2026",
    category: "Dự án cộng đồng",
    badge: "COMMUNITY BOOTCAMP",
    tagline: "Phổ cập kỹ năng số & lập trình Scratch",
    description:
      "Đưa công nghệ đến gần cộng đồng qua chuỗi 10 buổi học Scratch và kỹ năng số dành cho trẻ em từ 8 đến 12 tuổi tại phường Hoàn Kiếm, khơi gợi tư duy logic và niềm yêu thích khoa học máy tính.",
    platform: "Trực tiếp tại cơ sở",
    timeframe: "10 buổi (19/06 – 19/07/2026)",
    audience: "Học sinh 8 – 12 tuổi",
    partner: "Đoàn Thanh niên phường Hoàn Kiếm",
    verifiedFact:
      "Chương trình được Vietnam.vn và cổng thông tin chính thức của Trường Đại học FPT đưa tin.",
    linkUrl: "https://daihoc.fpt.edu.vn",
    linkLabel: "Thông tin trên cổng FPTU",
  },
  {
    id: 3,
    title: "FDS Prom 2026 — PawnRise",
    category: "Văn hoá & Cộng đồng",
    badge: "ANNUAL COMMUNITY EVENT",
    tagline: "Gắn kết các thế hệ thành viên FDS",
    description:
      "Dạ tiệc và hoạt động gắn kết thường niên của cộng đồng FDS, nơi các thế hệ thành viên gặp gỡ, chia sẻ trải nghiệm học tập, nghiên cứu và duy trì văn hoá kết nối bền chặt.",
    platform: "Sự kiện nội bộ thường niên",
    timeframe: "Thường niên (Năm 2026: PawnRise)",
    audience: "Các thế hệ thành viên & cựu thành viên",
    partner: "Ban Văn hoá FDS",
    verifiedFact:
      "Hoạt động thường niên mang tính biểu trưng văn hoá của CLB với chủ đề năm 2026 là PawnRise.",
    linkUrl: "#activities",
    linkLabel: "Xem hoạt động CLB",
  },
];

export default function ProjectShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = verifiedInitiatives[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev > 0 ? prev - 1 : verifiedInitiatives.length - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev < verifiedInitiatives.length - 1 ? prev + 1 : 0
    );
  };

  return (
    <div className="grid lg:grid-cols-[31fr_19fr] gap-6 lg:gap-8 items-stretch">
      {/* Left Column: Structured Editorial Verification Card (~62%) */}
      <div className="w-full fds-card rounded-[4px] relative overflow-hidden flex flex-col justify-between">
        {/* Subtle technical corner line decoration per PATTERN_SYSTEM.md (opacity: 0.35) */}
        <div
          className="absolute -top-3 -right-3 pointer-events-none opacity-35 z-0"
          aria-hidden="true"
        >
          <Image
            src="/fds/decorations/technical-corner-lines.svg"
            alt=""
            width={120}
            height={120}
            className="w-20 h-auto fds-decorative"
            draggable={false}
          />
        </div>

        {/* Subtle handwriting watermark chìm (mix-blend-mode: multiply, opacity: 0.045) */}
        <div
          className="absolute -bottom-4 -right-4 pointer-events-none opacity-[0.045] mix-blend-multiply z-0"
          aria-hidden="true"
        >
          <Image
            src="/fds/lettering/activities-together.svg"
            alt=""
            width={160}
            height={90}
            className="w-36 h-auto fds-decorative"
            draggable={false}
          />
        </div>

        {/* Card Header */}
        <div className="px-4 py-2 border-b border-[#E1E8F0] flex items-center justify-between relative z-10 bg-[#F8FAFC]/70">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2457A6]" />
            <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.12em] text-[#2457A6]">
              {current.badge}
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#64748B] font-medium">
            Thông tin xác thực từ CLB
          </span>
        </div>

        {/* Card Body: Structured Key Facts */}
        <div className="p-3.5 sm:p-4 relative z-10 space-y-2.5">
          <div>
            <span className="text-[10.5px] font-mono font-medium text-[#2457A6] tracking-wide uppercase">
              {current.category}
            </span>
            <h4 className="text-base sm:text-lg font-semibold font-display text-[#07152F] mt-0.5 mb-0.5">
              {current.title}
            </h4>
            <p className="text-xs font-normal text-[#415777] italic font-display">
              {current.tagline}
            </p>
          </div>

          {/* Structured metadata grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
            <div className="p-1.5 sm:p-2 bg-[#F8FAFC] border border-[#E1E8F0]/80 rounded-[3px]">
              <div className="flex items-center gap-1.5 text-[10px] text-[#64748B] mb-0.5">
                <Calendar size={11} className="text-[#2457A6]" />
                <span className="font-semibold text-[#07152F]">Thời gian</span>
              </div>
              <p className="text-[11px] text-[#475569]">{current.timeframe}</p>
            </div>

            <div className="p-1.5 sm:p-2 bg-[#F8FAFC] border border-[#E1E8F0]/80 rounded-[3px]">
              <div className="flex items-center gap-1.5 text-[10px] text-[#64748B] mb-0.5">
                <MapPin size={11} className="text-[#2457A6]" />
                <span className="font-semibold text-[#07152F]">Nền tảng / Địa điểm</span>
              </div>
              <p className="text-[11px] text-[#475569]">{current.platform}</p>
            </div>

            <div className="p-1.5 sm:p-2 bg-[#F8FAFC] border border-[#E1E8F0]/80 rounded-[3px]">
              <div className="flex items-center gap-1.5 text-[10px] text-[#64748B] mb-0.5">
                <Users size={11} className="text-[#2457A6]" />
                <span className="font-semibold text-[#07152F]">Đối tượng</span>
              </div>
              <p className="text-[11px] text-[#475569]">{current.audience}</p>
            </div>

            <div className="p-1.5 sm:p-2 bg-[#F8FAFC] border border-[#E1E8F0]/80 rounded-[3px]">
              <div className="flex items-center gap-1.5 text-[10px] text-[#64748B] mb-0.5">
                <Award size={11} className="text-[#2457A6]" />
                <span className="font-semibold text-[#07152F]">Đồng hành / Cố vấn</span>
              </div>
              <p className="text-[11px] text-[#475569]">{current.partner}</p>
            </div>
          </div>

          {/* Verified highlight callout */}
          <div className="p-2 bg-[#EFF6FF] border border-[#2457A6]/20 rounded-[3px] flex items-start gap-2">
            <CheckCircle2
              size={13}
              className="text-[#2457A6] flex-shrink-0 mt-0.5"
            />
            <p className="text-[10px] sm:text-[11px] text-[#07152F] leading-snug">
              <strong className="font-semibold text-[#2457A6]">Ghi nhận:</strong>{" "}
              {current.verifiedFact}
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Initiative Details & Navigation (~38%) */}
      <div className="w-full flex flex-col justify-between">
        <div>
          {/* Quick Initiative Selectors & Eyebrow */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[10px] font-bold text-[#2457A6] uppercase tracking-[0.14em]">
              SÁNG KIẾN 0{currentIndex + 1} / 0{verifiedInitiatives.length}
            </span>
            <div className="flex items-center gap-1">
              {verifiedInitiatives.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`px-2 py-0.5 text-[10px] font-semibold rounded-[3px] transition cursor-pointer ${
                    currentIndex === idx
                      ? "bg-[#07152F] text-white shadow-xs"
                      : "bg-white border border-[#E1E8F0] text-[#64748B] hover:text-[#07152F]"
                  }`}
                  aria-label={`Xem sáng kiến ${idx + 1}`}
                >
                  0{idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold font-serif text-[#07152F] tracking-tight leading-tight mb-1.5">
            {current.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-[#475569] leading-relaxed mb-2.5">
            {current.description}
          </p>

          {/* Note on data status */}
          <div className="p-2 fds-card rounded-[3px] mb-2.5">
            <p className="text-[10px] text-[#64748B] leading-relaxed">
              <strong className="text-[#07152F]">Lưu ý nội dung:</strong> Dữ liệu
              dự án phần mềm đang được cập nhật chính thức từ ban
              quản trị FDS. Các sáng kiến cộng đồng được ghi nhận qua hoạt
              động thực tế.
            </p>
          </div>
        </div>

        {/* Bottom Bar: Action link + Pagination Controls */}
        <div className="flex items-center justify-between pt-2.5 border-t border-[#E1E8F0]">
          {current.linkUrl && (
            <a
              href={current.linkUrl}
              target={current.linkUrl.startsWith("http") ? "_blank" : undefined}
              rel={
                current.linkUrl.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2457A6] hover:underline underline-offset-4 transition"
            >
              {current.linkLabel ?? "Xem chi tiết"}
              <ExternalLink size={12} />
            </a>
          )}

          {/* Arrows */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePrev}
              className="p-1.5 rounded-[3px] border border-[#E1E8F0] text-[#07152F] hover:bg-white hover:border-[#2457A6] transition cursor-pointer"
              aria-label="Sáng kiến trước"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="p-1.5 rounded-[3px] border border-[#E1E8F0] text-[#07152F] hover:bg-white hover:border-[#2457A6] transition cursor-pointer"
              aria-label="Sáng kiến tiếp theo"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
