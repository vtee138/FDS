import Image from "next/image";
import Navbar from "../components/Navbar";
import ProjectShowcase from "../components/ProjectShowcase";
import {
  Facebook,
  Instagram,
  ExternalLink,
  Calendar,
  MapPin,
  Mail,
  Phone,
  BookOpen,
  Users,
  Heart,
  Award,
  Sparkles,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen fds-page selection:bg-[#2457A6] selection:text-white flex flex-col">
      {/* 1. Header & Navigation */}
      <Navbar />

      {/* 00 — Hero (#home) */}
      <main className="flex-1">
        {/* 00 — Hero Section (#home) */}
        <section
          id="home"
          className="fds-section fds-section--paper fds-hero relative pb-2 sm:pb-3 px-4 sm:px-6 overflow-hidden border-b border-[#E1E8F0]/60"
        >
          {/* z-0: Top-right hex rings decoration per PATTERN_SYSTEM.md (opacity: 0.52) */}
          <div
            className="absolute top-2 right-0 lg:right-6 pointer-events-none opacity-[0.52] z-0"
            aria-hidden="true"
          >
            <Image
              src="/fds/decorations/hero-hex-rings.svg"
              alt=""
              width={260}
              height={240}
              className="w-44 sm:w-56 h-auto fds-decorative"
              draggable={false}
            />
          </div>

          {/* z-0: Technical corner lines at top-right (opacity: 0.45) */}
          <div
            className="hidden sm:block absolute top-8 right-4 pointer-events-none opacity-45 z-0"
            aria-hidden="true"
          >
            <Image
              src="/fds/decorations/technical-corner-lines.svg"
              alt=""
              width={160}
              height={160}
              className="w-28 h-auto fds-decorative"
              draggable={false}
            />
          </div>

          {/* Hero container: 1220–1280px, height 580–650px without navbar */}
          <div className="max-w-[1240px] mx-auto min-h-[540px] lg:min-h-[570px] relative z-10 flex flex-col justify-end">
            <div className="grid lg:grid-cols-[12fr_13fr] items-end gap-8 lg:gap-10 w-full">
              {/* Left Column: Hero Text (~48% width, ~540–610px max-width) */}
              <div
                data-hero-copy
                className="relative z-10 w-full max-w-[640px] flex flex-col items-start pb-2 lg:pb-6 lg:-translate-y-4"
              >
                {/* Main Heading: Insights in our eyes per TYPOGRAPHY.md */}
                <h1 className="fds-hero-title mb-2.5">
                  <span>Insights</span>
                  <em>in our eyes</em>
                </h1>

                {/* Club Full Name */}
                <p className="text-xl sm:text-2xl font-display font-semibold text-[#07152F] mb-2 tracking-[-0.018em]">
                  FPTU Data Science Club
                </p>

                {/* Description from CONTENT_BRIEF.md */}
                <p className="fds-body mb-5 max-w-[640px] text-[15px] leading-[1.65] text-[#415777] lg:text-[16px]">
                  FPTU Data Science Club (FDS) là câu lạc bộ Khoa học Dữ liệu đầu
                  tiên tại Đại học FPT Hà Nội. Chính thức lên sóng từ ngày 1/11/2020,
                  CLB mong muốn tổ chức các lớp đào tạo, chia sẻ kiến thức, thúc đẩy
                  sinh viên tham gia các cuộc thi liên quan đến DS-AI và tạo không
                  gian kết nối, mái nhà chung cho những ai đam mê khoa học dữ liệu tại
                  Đại học FPT nói riêng và cộng đồng sinh viên Hà Nội nói chung.
                </p>

                {/* CTA Group */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                  <a
                    href="#about"
                    className="inline-flex items-center gap-2 bg-[#07152F] text-white text-sm font-medium px-6 py-2.5 rounded-[3px] hover:bg-[#1E293B] active:bg-[#07152F] transition shadow-xs cursor-pointer"
                  >
                    Khám phá FDS
                    <Image
                      src="/fds/icons/arrow-right.svg"
                      alt=""
                      aria-hidden="true"
                      width={14}
                      height={14}
                      className="brightness-0 invert fds-decorative"
                      draggable={false}
                    />
                  </a>
                  <a
                    href="#about"
                    className="fds-text-link inline-flex items-center gap-1.5 text-sm font-semibold cursor-pointer"
                  >
                    Về chúng tôi →
                  </a>
                </div>
              </div>

              {/* Right Column: Hand illustration & Technical Wireframe (~52% width, ~520–590px visual) */}
              <div
                data-hero-visual
                className="relative w-full h-full min-h-[500px] lg:min-h-[550px] flex items-end justify-center lg:justify-end"
              >
                {/* z-1: Technical frame behind hand illustration (opacity: 0.62 per Round 4 spec) */}
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]"
                  aria-hidden="true"
                >
                  <Image
                    src="/fds/decorations/hero-technical-frame.svg"
                    alt=""
                    width={640}
                    height={640}
                    className="w-full max-w-[560px] h-auto opacity-[0.62] fds-decorative"
                    draggable={false}
                  />
                </div>

                {/* z-3: Small technical label floating at top-left of visual column */}
                <div
                  className="absolute top-2 left-2 sm:left-4 text-[10.5px] font-mono font-medium text-[#64748B] leading-snug tracking-[0.08em] uppercase select-none pointer-events-none z-[3]"
                  aria-hidden="true"
                >
                  <span className="block">FPTU</span>
                  <span className="block">Data Science</span>
                  <span className="block">Club</span>
                </div>

                {/* z-3: Vertical label at far right edge */}
                <div
                  data-hero-impact-label
                  className="hidden xl:flex flex-col items-start gap-1.5 absolute right-[-16px] top-6 border-l border-[#CBD5E1]/60 pl-2.5 text-[10px] font-mono tracking-[0.20em] text-[#64748B] uppercase select-none pointer-events-none z-[3]"
                  aria-hidden="true"
                >
                  <span>PEOPLE</span>
                  <span>DATA</span>
                  <span>IDEAS</span>
                  <span>IMPACT</span>
                </div>

                {/* z-2: Hand illustration sitting directly on paper, touching bottom */}
                <div
                  data-hero-hand
                  className="relative w-full max-w-[530px] z-[2] flex justify-center lg:justify-start lg:pr-14 lg:-ml-6 items-end"
                >
                  <Image
                    src="/fds/hero/hand-network.png"
                    alt=""
                    width={640}
                    height={647}
                    priority
                    draggable={false}
                    aria-hidden="true"
                    className="fds-decorative w-full h-auto object-contain max-h-[530px] object-bottom select-none"
                  />
                </div>

                {/* z-4: Handwritten Note SVG at bottom right of illustration, clearly legible */}
                <div
                  data-hero-note
                  className="absolute right-0 sm:right-2 bottom-4 sm:bottom-6 pointer-events-none rotate-[-6deg] z-[4]"
                  aria-hidden="true"
                >
                  <Image
                    src="/fds/lettering/hero-note.svg"
                    alt=""
                    width={190}
                    height={90}
                    className="w-38 sm:w-44 h-auto fds-decorative select-none"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 01 — Về FDS (#about) */}
        <section
          id="about"
          className="fds-section fds-section--panel relative py-7 sm:py-7.5 px-4 sm:px-6 border-t border-[#E1E8F0]/80 overflow-hidden"
        >
          {/* Panel SVG Pattern: about-edge-hex.svg per Round 4.3 */}
          <Image
            src="/fds/decorations/about-edge-hex.svg"
            alt=""
            width={160}
            height={220}
            aria-hidden="true"
            draggable={false}
            className="fds-panel-pattern -left-10 sm:-left-12 top-[22%] w-[140px] sm:w-[160px] h-auto fds-decorative select-none"
          />

          <div className="fds-section-content max-w-[1240px] mx-auto grid lg:grid-cols-[27fr_23fr] gap-8 lg:gap-10 items-center">
            {/* Left Content (~54%) */}
            <div className="w-full">
              <div className="fds-eyebrow mb-2">01. VỀ FDS</div>

              <h2 className="fds-section-title mb-2.5 text-balance">
                Tri thức hôm nay vì một ngày mai tốt đẹp hơn
              </h2>

              <p className="fds-body max-w-xl mb-3.5 leading-relaxed">
                FPTU Data Science Club là câu lạc bộ khoa học dữ liệu đầu tiên
                tại Đại học FPT cơ sở Hà Nội. FDS kết nối những sinh viên quan
                tâm đến Data Science, Big Data và AI để cùng học hỏi, thực hành
                và tạo ra giá trị cho cộng đồng.
              </p>

              {/* Verified Timeline 2018 - 2020 per CONTENT_BRIEF.md with subtle watermark */}
              <div className="p-2.5 sm:p-3 fds-card mb-3 relative overflow-hidden">
                {/* Subtle handwriting watermark chìm (opacity: 0.05, mix-blend-multiply) */}
                <div
                  className="absolute -right-2 -bottom-2 pointer-events-none opacity-[0.05] mix-blend-multiply z-0"
                  aria-hidden="true"
                >
                  <Image
                    src="/fds/lettering/about-note.svg"
                    alt=""
                    width={130}
                    height={90}
                    className="w-28 h-auto fds-decorative"
                    draggable={false}
                  />
                </div>

                <div className="relative z-10">
                  <p className="text-[10.5px] font-mono font-semibold uppercase tracking-[0.12em] text-[#2457A6] mb-1">
                    Hành trình phát triển
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <div className="border-l-2 border-[#2457A6]/40 pl-2">
                      <span className="font-bold text-[#07152F] font-mono">2018</span>
                      <p className="text-[#64748B] text-[11px] mt-0.5">
                        Tiền thân là CLB Xe tự hành.
                      </p>
                    </div>
                    <div className="border-l-2 border-[#2457A6]/40 pl-2">
                      <span className="font-bold text-[#07152F] font-mono">Đầu 2020</span>
                      <p className="text-[#64748B] text-[11px] mt-0.5">
                        FPT Innovation Club.
                      </p>
                    </div>
                    <div className="border-l-2 border-[#2457A6] pl-2">
                      <span className="font-bold text-[#2457A6] font-mono">01/11/2020</span>
                      <p className="text-[#475569] text-[11px] mt-0.5">
                        Công bố tên FPTU Data Science Club.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3 Pillars in Editorial Style with Vertical Dividers */}
              <div className="grid grid-cols-3 gap-3 pt-2.5 border-t border-[#E1E8F0]">
                <div className="border-l-2 border-[#2457A6] pl-2.5">
                  <h3 className="text-sm sm:text-base font-semibold font-display text-[#07152F] mb-0.5">
                    Học hỏi
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#64748B] leading-snug">
                    Không ngừng mở rộng tri thức
                  </p>
                </div>

                <div className="border-l-2 border-[#2457A6] pl-2.5">
                  <h3 className="text-sm sm:text-base font-semibold font-display text-[#07152F] mb-0.5">
                    Kết nối
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#64748B] leading-snug">
                    Đa góc nhìn cùng phát triển
                  </p>
                </div>

                <div className="border-l-2 border-[#2457A6] pl-2.5">
                  <h3 className="text-sm sm:text-base font-semibold font-display text-[#07152F] mb-0.5">
                    Ứng dụng
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#64748B] leading-snug">
                    Kiến tạo giải pháp thực tiễn
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side: Polaroid Photo Frame with tape & connector per approved-design.png (~46%) */}
            <div className="w-full relative flex items-center justify-center lg:justify-end pt-4 lg:pt-0">
              {/* Connector line behind photo frame and metadata note (opacity: 0.55) */}
              <div
                className="hidden sm:block absolute -top-4 right-8 pointer-events-none opacity-55 z-0"
                aria-hidden="true"
              >
                <Image
                  src="/fds/decorations/about-note-connector.svg"
                  alt=""
                  width={220}
                  height={160}
                  className="w-44 sm:w-52 h-auto fds-decorative"
                  draggable={false}
                />
              </div>

              {/* Polaroid Frame Container */}
              <div className="relative inline-block pr-10 sm:pr-20 z-10">
                {/* Blue tape at top edge of polaroid */}
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 pointer-events-none w-28 sm:w-34 rotate-[-1.5deg]"
                  aria-hidden="true"
                >
                  <Image
                    src="/fds/decorations/tape-blue.svg"
                    alt=""
                    width={140}
                    height={42}
                    className="w-full h-auto drop-shadow-xs fds-decorative select-none"
                    draggable={false}
                  />
                </div>

                {/* 1. Media frame */}
                <div
                  data-about-media
                  className="fds-photo-frame rotate-[-2deg] w-[270px] sm:w-[310px] bg-white p-3 pb-7 sm:p-3 sm:pb-8 shadow-md border border-[#E1E8F0] rounded-[2px]"
                  aria-label="Khung ảnh sinh viên FDS"
                >
                  <figure className="relative aspect-[4/3] w-full overflow-hidden rounded-[2px] bg-[#EDF2F7]">
                    <Image
                      src="/fds/club-images/about-members.webp"
                      alt="Các thành viên FDS thảo luận và nghiên cứu dữ liệu cùng nhau"
                      fill
                      sizes="(max-width: 640px) 270px, 310px"
                      className="object-cover object-[center_35%] fds-decorative select-none pointer-events-none"
                      draggable={false}
                      priority
                    />
                    <figcaption className="sr-only">
                      Các thành viên FDS thảo luận và nghiên cứu dữ liệu cùng nhau
                    </figcaption>
                  </figure>
                </div>

                {/* 2. about-note.svg (Handwriting at top-right of image frame, opacity: 0.85) */}
                <div
                  data-about-handwriting
                  className="absolute -right-3 sm:-right-8 -top-3 sm:-top-5 pointer-events-none rotate-[4deg] opacity-85 z-20"
                  aria-hidden="true"
                >
                  <Image
                    src="/fds/lettering/about-note.svg"
                    alt=""
                    width={130}
                    height={100}
                    className="w-24 sm:w-28 h-auto fds-decorative select-none"
                    draggable={false}
                  />
                </div>

                {/* 3. note-paper.svg (Blank paper note positioned lower down on right, opacity: 0.88) */}
                <div
                  data-about-paper-note
                  className="absolute -right-4 sm:-right-10 bottom-2 sm:bottom-4 pointer-events-none z-20 w-36 sm:w-44 h-14 sm:h-16 flex items-center justify-center p-2 text-center"
                  aria-hidden="true"
                >
                  <Image
                    src="/fds/decorations/note-paper.svg"
                    alt=""
                    width={180}
                    height={100}
                    className="absolute inset-0 w-full h-full object-contain opacity-[0.88] fds-decorative select-none"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 02 — Lĩnh vực hoạt động (#fields) */}
        <section
          id="fields"
          className="fds-section fds-section--paper relative py-7 sm:py-7.5 px-4 sm:px-6 border-t border-[#E1E8F0]/80 overflow-hidden"
        >
          <div className="max-w-[1240px] mx-auto relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
              <div>
                <div className="fds-eyebrow mb-2">02. LĨNH VỰC HOẠT ĐỘNG</div>
                <h2 className="fds-section-title mb-2 text-balance">
                  Bốn hướng thực hành, một mục tiêu chung
                </h2>
                <p className="fds-body max-w-2xl mt-1.5">
                  Từ nền tảng học thuật đến ứng dụng thực tiễn, FDS tập trung
                  phát triển năng lực cho sinh viên trong 4 lĩnh vực cốt lõi.
                </p>
              </div>

              {/* Right side decoration: fields-heading-hex.svg + HTML text per requirement (opacity: 0.52 per Round 4) */}
              <div className="hidden md:flex items-center gap-3 flex-shrink-0" aria-hidden="true">
                <div className="text-right text-[10px] font-mono font-semibold tracking-[0.14em] text-[#2457A6] uppercase leading-tight">
                  <span>FROM KNOWLEDGE</span>
                  <br />
                  <span className="text-[#64748B]">TO REAL-WORLD IMPACT</span>
                </div>
                <Image
                  src="/fds/decorations/fields-heading-hex.svg"
                  alt=""
                  width={140}
                  height={90}
                  className="w-24 sm:w-28 h-auto opacity-[0.52] fds-decorative"
                  draggable={false}
                />
              </div>
            </div>

            {/* 4 Verified Editorial Cards with subtle radial glow */}
            <div className="relative">
              <div className="fds-fields-glow" aria-hidden="true" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
                {/* 1. Data Science with subtle handwriting watermark */}
                <div className="fds-card p-4 rounded-[4px] flex flex-col justify-between hover:border-[#2457A6]/50 transition group overflow-hidden relative">
                  {/* Subtle watermark chìm (opacity: 0.05, mix-blend-multiply) */}
                  <div
                    className="absolute -right-3 -bottom-3 pointer-events-none opacity-[0.05] mix-blend-multiply z-0"
                    aria-hidden="true"
                  >
                    <Image
                      src="/fds/lettering/hero-note.svg"
                      alt=""
                      width={140}
                      height={70}
                      className="w-28 h-auto fds-decorative"
                      draggable={false}
                    />
                  </div>

                  <div className="relative z-10">
                    <div className="w-9 h-9 flex items-center justify-center mb-2.5">
                      <Image
                        src="/fds/icons/data-science.svg"
                        alt=""
                        width={36}
                        height={36}
                        className="w-7.5 h-7.5 fds-decorative"
                        draggable={false}
                      />
                    </div>
                    <h3 className="fds-card-title mb-1 group-hover:text-[#2457A6] transition">
                      Data Science
                    </h3>
                    <p className="fds-body text-xs sm:text-[13px] leading-relaxed mb-3">
                      Khám phá dữ liệu, xây dựng mô hình và chuyển thông tin thành
                      insight có giá trị.
                    </p>
                  </div>
                  <div className="relative z-10">
                    <a
                      href="#projects"
                      className="fds-text-link inline-flex items-center gap-1 text-xs font-semibold"
                    >
                      Tìm hiểu thêm →
                    </a>
                  </div>
                </div>

                {/* 2. Big Data */}
                <div className="fds-card p-4 rounded-[4px] flex flex-col justify-between hover:border-[#2457A6]/50 transition group relative">
                  <div>
                    <div className="w-9 h-9 flex items-center justify-center mb-2.5">
                      <Image
                        src="/fds/icons/data-engineering.svg"
                        alt=""
                        width={36}
                        height={36}
                        className="w-7.5 h-7.5 fds-decorative"
                        draggable={false}
                      />
                    </div>
                    <h3 className="fds-card-title mb-1 group-hover:text-[#2457A6] transition">
                      Big Data
                    </h3>
                    <p className="fds-body text-xs sm:text-[13px] leading-relaxed mb-3">
                      Tiếp cận cách tổ chức, xử lý và khai thác dữ liệu ở quy mô lớn
                      cho các bài toán thực tế.
                    </p>
                  </div>
                  <div>
                    <a
                      href="#projects"
                      className="fds-text-link inline-flex items-center gap-1 text-xs font-semibold"
                    >
                      Tìm hiểu thêm →
                    </a>
                  </div>
                </div>

                {/* 3. Artificial Intelligence */}
                <div className="fds-card p-4 rounded-[4px] flex flex-col justify-between hover:border-[#2457A6]/50 transition group relative">
                  <div>
                    <div className="w-9 h-9 flex items-center justify-center mb-2.5">
                      <Image
                        src="/fds/icons/ai-network.svg"
                        alt=""
                        width={36}
                        height={36}
                        className="w-7.5 h-7.5 fds-decorative"
                        draggable={false}
                      />
                    </div>
                    <h3 className="fds-card-title mb-1 group-hover:text-[#2457A6] transition">
                      Artificial Intelligence
                    </h3>
                    <p className="fds-body text-xs sm:text-[13px] leading-relaxed mb-3">
                      Học và ứng dụng các phương pháp Machine Learning, Deep Learning
                      vào bài toán thực tế.
                    </p>
                  </div>
                  <div>
                    <a
                      href="#projects"
                      className="fds-text-link inline-flex items-center gap-1 text-xs font-semibold"
                    >
                      Tìm hiểu thêm →
                    </a>
                  </div>
                </div>

                {/* 4. Học tập & Thực hành */}
                <div className="fds-card p-4 rounded-[4px] flex flex-col justify-between hover:border-[#2457A6]/50 transition group relative">
                  <div>
                    <div className="w-9 h-9 flex items-center justify-center mb-2.5">
                      <Image
                        src="/fds/icons/academic.svg"
                        alt=""
                        width={36}
                        height={36}
                        className="w-7.5 h-7.5 fds-decorative"
                        draggable={false}
                      />
                    </div>
                    <h3 className="fds-card-title mb-1 group-hover:text-[#2457A6] transition">
                      Học tập & Thực hành
                    </h3>
                    <p className="fds-body text-xs sm:text-[13px] leading-relaxed mb-3">
                      Phát triển năng lực qua training, workshop chuyên sâu, cuộc thi
                      và dự án cộng đồng.
                    </p>
                  </div>
                  <div>
                    <a
                      href="#projects"
                      className="fds-text-link inline-flex items-center gap-1 text-xs font-semibold"
                    >
                      Tìm hiểu thêm →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Section 03: Hoạt động nổi bật (#activities) */}
        <section
          id="activities"
          className="fds-section fds-section--panel relative py-8 sm:py-8.5 px-4 sm:px-6 border-t border-[#E1E8F0]/80 overflow-hidden"
        >
          {/* Panel SVG Pattern: editorial-blueprint-loops.svg per Round 4.3 */}
          <Image
            src="/fds/decorations/editorial-blueprint-loops.svg"
            alt=""
            width={660}
            height={460}
            aria-hidden="true"
            draggable={false}
            className="fds-panel-pattern -right-28 sm:-right-36 -bottom-20 sm:-bottom-28 w-[540px] sm:w-[660px] h-auto fds-decorative select-none"
          />

          {/* Micro node line pattern connecting lettering to collage */}
          <Image
            src="/fds/decorations/micro-node-line.svg"
            alt=""
            width={160}
            height={80}
            aria-hidden="true"
            draggable={false}
            className="fds-panel-pattern top-1/3 left-1/2 -translate-x-1/2 w-36 h-auto opacity-45 fds-decorative select-none hidden sm:block"
          />

          <div className="fds-section-content max-w-[1240px] mx-auto grid lg:grid-cols-[11fr_14fr] gap-8 lg:gap-10 items-center">
            {/* Left Content: Editorial intro & activities without SaaS card box */}
            <div className="w-full flex flex-col justify-center">
              <div className="fds-eyebrow mb-1.5">03. HOẠT ĐỘNG NỔI BẬT</div>

              <h2 className="fds-section-title leading-tight mb-2 text-balance">
                Học hỏi. Kết nối. Trải nghiệm.
              </h2>

              <p className="fds-body leading-relaxed mb-3">
                FDS tổ chức các sân chơi dữ liệu học thuật, chuỗi đào tạo cộng
                đồng và hoạt động gắn kết thường niên, tạo môi trường để sinh viên
                phát triển toàn diện.
              </p>

              <div className="mb-3">
                <a
                  href="#projects"
                  className="fds-text-link inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold"
                >
                  Xem tất cả hoạt động →
                </a>
              </div>

              {/* Editorial Activities List - Clean typography without white box card */}
              <div className="pt-2.5 border-t border-[#E1E8F0]/80 space-y-2">
                <div className="border-l-2 border-[#2457A6] pl-3 py-0.5">
                  <h3 className="font-semibold text-[#07152F] text-xs sm:text-sm">
                    FDS Summer Challenge
                  </h3>
                  <p className="fds-body text-[11px] sm:text-xs text-[#64748B] mt-0.5">
                    Cuộc thi dữ liệu thường niên trên Kaggle với thử thách Weather Prediction.
                  </p>
                </div>

                <div className="border-l-2 border-[#2457A6] pl-3 py-0.5">
                  <h3 className="font-semibold text-[#07152F] text-xs sm:text-sm">
                    FDS Bootcamp 2026
                  </h3>
                  <p className="fds-body text-[11px] sm:text-xs text-[#64748B] mt-0.5">
                    10 buổi phổ cập Scratch & kỹ năng số cho trẻ em tại phường Hoàn Kiếm.
                  </p>
                </div>

                <div className="border-l-2 border-[#2457A6] pl-3 py-0.5">
                  <h3 className="font-semibold text-[#07152F] text-xs sm:text-sm">
                    FDS Prom 2026 — PawnRise
                  </h3>
                  <p className="fds-body text-[11px] sm:text-xs text-[#64748B] mt-0.5">
                    Dạ tiệc thường niên kết nối các thế hệ thành viên và cựu thành viên FDS.
                  </p>
                </div>

                <div className="border-l-2 border-[#2457A6]/50 pl-3 py-0.5">
                  <h3 className="font-semibold text-[#07152F] text-xs sm:text-sm">
                    Workshop & Training nội bộ
                  </h3>
                  <p className="fds-body text-[11px] sm:text-xs text-[#64748B] mt-0.5">
                    Sinh hoạt chuyên môn, cập nhật kiến thức Machine Learning & AI định kỳ.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side: 3 Overlapping Photo Frames Collage with tape and handwriting per approved-design.png */}
            <div
              data-activities-collage
              className="w-full relative min-h-[390px] sm:min-h-[430px] max-w-[540px] mx-auto lg:ml-auto lg:mr-0 pt-4 pb-4 select-none"
            >
              {/* Top Handwriting: Workshops, Talkshows, Hackathons and more... (Above collage in the gap) */}
              <div
                data-activities-list-note
                className="absolute -top-10 sm:-top-12 left-[53%] sm:left-[55%] -translate-x-1/2 pointer-events-none rotate-[-3deg] z-30"
                aria-hidden="true"
              >
                <Image
                  src="/fds/lettering/activities-list.svg"
                  alt=""
                  width={150}
                  height={150}
                  className="w-24 sm:w-28 h-auto fds-decorative select-none"
                  draggable={false}
                />
              </div>

              {/* Frame 1: Top-Left Workshop (Landscape) */}
              <div
                data-activity-frame
                className="fds-photo-frame rotate-[-2.5deg] absolute top-6 sm:top-8 left-0 sm:left-1 w-[205px] sm:w-[235px] bg-white p-2 pb-5 sm:p-2 sm:pb-6 shadow-md border border-[#E1E8F0] rounded-[2px] z-10"
                aria-label="Ảnh hoạt động FDS Workshop"
              >
                {/* Neutral tape at top edge per Round 4 requirement (1 tape per frame) */}
                <div
                  className="absolute -top-3 left-4 z-30 pointer-events-none w-18 sm:w-22 rotate-[1.5deg]"
                  aria-hidden="true"
                >
                  <Image
                    src="/fds/decorations/tape-neutral.svg"
                    alt=""
                    width={110}
                    height={35}
                    className="w-full h-auto drop-shadow-xs fds-decorative select-none"
                    draggable={false}
                  />
                </div>
                <figure
                  data-activity-frame-content
                  className="relative aspect-[16/10] w-full overflow-hidden rounded-[2px] bg-[#EDF2F7]"
                >
                  <Image
                    src="/fds/club-images/activity-workshop.webp"
                    alt="Thành viên FDS hướng dẫn kỹ thuật trong một buổi workshop chuyên môn"
                    fill
                    sizes="(max-width: 640px) 205px, 235px"
                    className="object-cover object-[center_25%] fds-decorative select-none pointer-events-none"
                    draggable={false}
                  />
                  <figcaption className="sr-only">
                    Thành viên FDS hướng dẫn kỹ thuật trong một buổi workshop chuyên môn
                  </figcaption>
                </figure>
              </div>

              {/* Frame 2: Top-Right Talk/Presentation (Discussion) */}
              <div
                data-activity-frame
                className="fds-photo-frame rotate-[2.5deg] absolute top-8 sm:top-10 right-1 sm:right-3 w-[150px] sm:w-[175px] bg-white p-2 pb-5 sm:p-2 sm:pb-6 shadow-md border border-[#E1E8F0] rounded-[2px] z-10"
                aria-label="Ảnh hoạt động thuyết trình và thảo luận FDS"
              >
                {/* Blue tape at top edge */}
                <div
                  className="absolute -top-3 right-4 z-30 pointer-events-none w-18 sm:w-22"
                  aria-hidden="true"
                >
                  <Image
                    src="/fds/decorations/tape-blue.svg"
                    alt=""
                    width={110}
                    height={35}
                    className="w-full h-auto drop-shadow-xs fds-decorative select-none"
                    draggable={false}
                  />
                </div>
                <figure
                  data-activity-frame-content
                  className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px] bg-[#EDF2F7]"
                >
                  <Image
                    src="/fds/club-images/activity-presentation.webp"
                    alt="Các thành viên FDS trao đổi và thảo luận tại sự kiện câu lạc bộ"
                    fill
                    sizes="(max-width: 640px) 150px, 175px"
                    className="object-cover object-[55%_35%] fds-decorative select-none pointer-events-none"
                    draggable={false}
                  />
                  <figcaption className="sr-only">
                    Các thành viên FDS trao đổi và thảo luận tại sự kiện câu lạc bộ
                  </figcaption>
                </figure>
              </div>

              {/* Frame 3: Center-Bottom Group Photo (Wide Landscape, Foreground) */}
              <div
                data-activity-frame
                className="fds-photo-frame rotate-[-1deg] absolute bottom-2 sm:bottom-3 left-[12%] sm:left-[15%] w-[260px] sm:w-[305px] bg-white p-2 pb-5 sm:p-2 sm:pb-6 shadow-xl border border-[#E1E8F0] rounded-[2px] z-20"
                aria-label="Ảnh tập thể thành viên FDS tại sự kiện Prom"
              >
                {/* Neutral tape at top edge */}
                <div
                  className="absolute -top-3 left-4 z-30 pointer-events-none w-18 sm:w-22"
                  aria-hidden="true"
                >
                  <Image
                    src="/fds/decorations/tape-neutral.svg"
                    alt=""
                    width={110}
                    height={35}
                    className="w-full h-auto drop-shadow-xs fds-decorative select-none"
                    draggable={false}
                  />
                </div>
                <figure
                  data-activity-frame-content
                  className="relative aspect-[16/9] w-full overflow-hidden rounded-[2px] bg-[#EDF2F7]"
                >
                  <Image
                    src="/fds/club-images/club-prom-stage.webp"
                    alt="Tập thể thành viên CLB FDS chụp ảnh kỷ niệm tại sự kiện Prom"
                    fill
                    sizes="(max-width: 640px) 260px, 305px"
                    className="object-cover object-center fds-decorative select-none pointer-events-none"
                    draggable={false}
                  />
                  <figcaption className="sr-only">
                    Tập thể thành viên CLB FDS chụp ảnh kỷ niệm tại sự kiện Prom
                  </figcaption>
                </figure>
              </div>

              {/* Bottom-Left Lettering: A community of curious minds */}
              <div
                data-activities-community-note
                className="absolute -bottom-3 sm:-bottom-5 -left-2 sm:-left-5 pointer-events-none rotate-[-4deg] z-30"
                aria-hidden="true"
              >
                <Image
                  src="/fds/lettering/activities-community.svg"
                  alt=""
                  width={150}
                  height={65}
                  className="w-22 sm:w-26 h-auto fds-decorative select-none"
                  draggable={false}
                />
              </div>

              {/* Bottom-Right Lettering: Same Questions Bigger Together */}
              <div
                data-activities-together-note
                className="absolute bottom-6 sm:bottom-8 -right-4 sm:-right-8 pointer-events-none rotate-[4deg] z-30"
                aria-hidden="true"
              >
                <Image
                  src="/fds/lettering/activities-together.svg"
                  alt=""
                  width={140}
                  height={75}
                  className="w-18 sm:w-22 h-auto fds-decorative select-none"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 04 — Sáng kiến & hoạt động tiêu biểu (#projects) */}
        <section
          id="projects"
          className="fds-section fds-section--paper relative py-7 sm:py-7.5 px-4 sm:px-6 border-t border-[#E1E8F0]/80 overflow-hidden"
        >
          <div className="max-w-[1240px] mx-auto relative z-10">
            <div className="mb-4">
              <div className="fds-eyebrow mb-1.5">
                04. SÁNG KIẾN & HOẠT ĐỘNG TIÊU BIỂU
              </div>
              <h2 className="fds-section-title mb-2 text-balance">
                Sáng kiến & hoạt động tiêu biểu
              </h2>
              <p className="fds-body max-w-2xl mt-1">
                Các sáng kiến học thuật và chương trình thực tiễn do FDS tổ chức
                hoặc đồng hành thực hiện.
              </p>
            </div>

            {/* Showcase Component without Synthetic Metrics */}
            <ProjectShowcase />
          </div>
        </section>

        {/* 05 — Những dấu ấn của FDS (#achievements) */}
        <section
          id="achievements"
          className="fds-section fds-section--panel relative py-7 sm:py-7 px-4 sm:px-6 border-t border-[#E1E8F0]/80 overflow-hidden"
        >
          {/* Panel SVG Pattern: achievements-hex-cluster.svg per Round 4.3 */}
          <Image
            src="/fds/decorations/achievements-hex-cluster.svg"
            alt=""
            width={260}
            height={220}
            aria-hidden="true"
            draggable={false}
            className="fds-panel-pattern -right-10 sm:-right-14 top-4 sm:top-6 w-[220px] sm:w-[260px] h-auto fds-decorative select-none"
          />

          <div className="fds-section-content max-w-[1240px] mx-auto">
            <div className="mb-4">
              <div className="fds-eyebrow mb-1.5">
                05. NHỮNG DẤU ẤN CỦA FDS
              </div>
              <h2 className="fds-section-title mb-2 text-balance">
                Những dấu ấn của FDS
              </h2>
              <p className="fds-body max-w-2xl mt-1">
                Ghi nhận thành tích và nỗ lực của các thành viên trong hành trình
                học thuật và nghiên cứu.
              </p>
            </div>

            {/* 3-Column Row Matching Reference Structure with fds-card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 pt-1">
              {/* 01. 03 Thành viên tốt nghiệp xuất sắc */}
              <div className="fds-card p-3.5 sm:p-4 rounded-[4px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono font-semibold text-[#2457A6] uppercase tracking-wider">
                      HỌC THUẬT & TỐT NGHIỆP
                    </span>
                    <Image
                      src="/fds/icons/academic.svg"
                      alt=""
                      aria-hidden="true"
                      width={26}
                      height={26}
                      className="w-5 h-5 fds-decorative"
                      draggable={false}
                    />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold font-display text-[#07152F] mb-1">
                    03 thành viên
                  </div>
                  <h3 className="text-xs sm:text-sm font-semibold text-[#2457A6] mb-1">
                    Là đại diện sinh viên tốt nghiệp xuất sắc
                  </h3>
                  <p className="fds-body text-xs leading-relaxed">
                    Được vinh danh tại lễ tốt nghiệp Đại học FPT với thành tích học
                    tập và đồ án dẫn đầu.
                  </p>
                </div>
                <div className="pt-2 mt-2 border-t border-[#E1E8F0] text-[10px] text-[#64748B]">
                  Thành tích cá nhân của thành viên CLB
                </div>
              </div>

              {/* 02. 05 Thành viên nhận học bổng NITORI with subtle watermark */}
              <div className="fds-card p-3.5 sm:p-4 rounded-[4px] flex flex-col justify-between overflow-hidden relative">
                {/* Subtle watermark chìm (opacity: 0.05, mix-blend-multiply) */}
                <div
                  className="absolute -right-3 -bottom-3 pointer-events-none opacity-[0.05] mix-blend-multiply z-0"
                  aria-hidden="true"
                >
                  <Image
                    src="/fds/lettering/about-note.svg"
                    alt=""
                    width={120}
                    height={70}
                    className="w-24 h-auto fds-decorative"
                    draggable={false}
                  />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono font-semibold text-[#2457A6] uppercase tracking-wider">
                      HỌC BỔNG NITORI
                    </span>
                    <Image
                      src="/fds/icons/project.svg"
                      alt=""
                      aria-hidden="true"
                      width={26}
                      height={26}
                      className="w-5 h-5 fds-decorative"
                      draggable={false}
                    />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold font-display text-[#07152F] mb-1">
                    05 thành viên
                  </div>
                  <h3 className="text-xs sm:text-sm font-semibold text-[#2457A6] mb-1">
                    Nhận học bổng NITORI
                  </h3>
                  <p className="fds-body text-xs leading-relaxed">
                    Học bổng từ Quỹ Nitori International Scholarship Foundation trao cho sinh viên xuất sắc có tiềm năng đóng góp cho xã hội.
                  </p>
                </div>
                <div className="pt-2 mt-2 border-t border-[#E1E8F0] text-[10px] text-[#64748B] relative z-10">
                  Thành tích cá nhân của thành viên CLB
                </div>
              </div>

              {/* 03. Qualitative note on academic practice & Kaggle in same row */}
              <div className="fds-card !bg-[#EFF6FF]/70 !border-[#2457A6]/25 p-3.5 sm:p-4 rounded-[4px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono font-semibold text-[#2457A6] uppercase tracking-wider">
                      THỰC HÀNH & HỌC THUẬT
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#2457A6]" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-display text-[#07152F] mb-1">
                    Thực hành
                  </div>
                  <h3 className="text-xs sm:text-sm font-semibold text-[#2457A6] mb-1">
                    Nghiên cứu & Thử thách Kaggle
                  </h3>
                  <p className="fds-body text-xs leading-relaxed">
                    Bên cạnh thành tích cá nhân, các thành viên FDS tích cực tham gia các thử thách dữ liệu trên Kaggle và hoạt động chia sẻ học thuật định kỳ.
                  </p>
                </div>
                <div className="pt-2 mt-2 border-t border-[#2457A6]/20">
                  <a
                    href="#activities"
                    className="fds-text-link inline-flex items-center gap-1 text-xs font-semibold"
                  >
                    Xem các hoạt động tiêu biểu →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 06 — Những người tạo nên FDS (#community) */}
        <section
          id="community"
          className="fds-section fds-section--paper relative py-7 sm:py-7 px-4 sm:px-6 border-t border-[#E1E8F0]/80 overflow-hidden"
        >
          {/* Community Hex Chain Pattern at Right per PATTERN_SYSTEM.md (opacity: 0.48 per Round 4) */}
          <div
            className="absolute top-4 right-0 pointer-events-none opacity-[0.48] z-0"
            aria-hidden="true"
          >
            <Image
              src="/fds/decorations/community-hex-chain.svg"
              alt=""
              width={160}
              height={320}
              className="w-28 sm:w-36 h-auto fds-decorative"
              draggable={false}
            />
          </div>

          <div className="max-w-[1240px] mx-auto relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 gap-4">
              <div>
                <div className="fds-eyebrow mb-1.5">06. NHỮNG NGƯỜI TẠO NÊN FDS</div>
                <h2 className="fds-section-title mb-2 text-balance">
                  Những người tạo nên FDS
                </h2>
                <p className="fds-body max-w-2xl mt-1">
                  Ba ban chuyên trách phối hợp chặt chẽ để vận hành hoạt động học
                  thuật, truyền thông và văn hoá CLB.
                </p>
              </div>

              <a
                href="#journey"
                className="fds-text-link"
              >
                Quy trình tham gia →
              </a>
            </div>

            {/* 3 Department Cards per CONTENT_BRIEF.md with fds-card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              {/* Ban Chuyên môn */}
              <div className="fds-card p-3.5 sm:p-4 rounded-[4px] flex flex-col justify-between hover:border-[#2457A6]/50 transition">
                <div>
                  <div className="w-8 h-8 rounded-[3px] bg-[#EFF6FF] border border-[#2457A6]/20 flex items-center justify-center text-[#2457A6] mb-2">
                    <BookOpen size={15} />
                  </div>
                  <h3 className="fds-card-title mb-1">
                    Ban Chuyên môn
                  </h3>
                  <p className="fds-body text-xs sm:text-sm leading-relaxed mb-2.5">
                    Nghiên cứu kiến thức, xây dựng tài liệu học tập, tổ chức
                    workshop kỹ thuật, training nội bộ và cố vấn chuyên môn cho các
                    đội thi.
                  </p>
                </div>
                <div className="pt-2 border-t border-[#E1E8F0]/80 text-[10px] font-mono font-medium text-[#2457A6]">
                  Data Science · Big Data · AI
                </div>
              </div>

              {/* Ban Truyền thông – Đối ngoại with subtle watermark */}
              <div className="fds-card p-3.5 sm:p-4 rounded-[4px] flex flex-col justify-between hover:border-[#2457A6]/50 transition overflow-hidden relative">
                {/* Subtle watermark chìm (opacity: 0.05, mix-blend-multiply) */}
                <div
                  className="absolute -right-3 -bottom-3 pointer-events-none opacity-[0.05] mix-blend-multiply z-0"
                  aria-hidden="true"
                >
                  <Image
                    src="/fds/lettering/activities-community.svg"
                    alt=""
                    width={130}
                    height={70}
                    className="w-26 h-auto fds-decorative"
                    draggable={false}
                  />
                </div>

                <div className="relative z-10">
                  <div className="w-8 h-8 rounded-[3px] bg-[#EFF6FF] border border-[#2457A6]/20 flex items-center justify-center text-[#2457A6] mb-2">
                    <Users size={15} />
                  </div>
                  <h3 className="fds-card-title mb-1">
                    Ban Truyền thông – Đối ngoại
                  </h3>
                  <p className="fds-body text-xs sm:text-sm leading-relaxed mb-2.5">
                    Quản lý các kênh thông tin chính thức, lan tỏa hình ảnh CLB,
                    kết nối doanh nghiệp, nhà tài trợ và các đối tác đồng hành.
                  </p>
                </div>
                <div className="pt-2 border-t border-[#E1E8F0]/80 text-[10px] font-mono font-medium text-[#2457A6] relative z-10">
                  Truyền thông · Kết nối đối tác
                </div>
              </div>

              {/* Ban Văn hoá */}
              <div className="fds-card p-3.5 sm:p-4 rounded-[4px] flex flex-col justify-between hover:border-[#2457A6]/50 transition">
                <div>
                  <div className="w-8 h-8 rounded-[3px] bg-[#EFF6FF] border border-[#2457A6]/20 flex items-center justify-center text-[#2457A6] mb-2">
                    <Heart size={15} />
                  </div>
                  <h3 className="fds-card-title mb-1">
                    Ban Văn hoá
                  </h3>
                  <p className="fds-body text-xs sm:text-sm leading-relaxed mb-2.5">
                    Gắn kết các thế hệ thành viên, tổ chức FDS Prom, Club Fair và
                    các hoạt động nội bộ xây dựng tinh thần đồng đội vững chắc.
                  </p>
                </div>
                <div className="pt-2 border-t border-[#E1E8F0]/80 text-[10px] font-mono font-medium text-[#2457A6]">
                  Gắn kết nội bộ · Tinh thần FDS
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 07 — Bắt đầu hành trình cùng FDS (#journey) */}
        <section
          id="journey"
          className="fds-section fds-section--panel relative py-7 sm:py-7 px-4 sm:px-6 border-t border-[#E1E8F0]/80 overflow-hidden"
        >
          {/* Panel SVG Pattern: journey-corner-hex.svg per Round 4.3 */}
          <Image
            src="/fds/decorations/journey-corner-hex.svg"
            alt=""
            width={350}
            height={320}
            aria-hidden="true"
            draggable={false}
            className="fds-panel-pattern -right-20 sm:-right-28 top-1/2 -translate-y-1/2 w-[290px] sm:w-[350px] h-auto fds-decorative select-none"
          />

          <div className="fds-section-content max-w-[1240px] mx-auto">
            <div className="mb-4">
              <div className="fds-eyebrow mb-1.5">
                07. BẮT ĐẦU HÀNH TRÌNH CÙNG FDS
              </div>
              <h2 className="fds-section-title mb-2 text-balance">
                Bắt đầu hành trình cùng FDS
              </h2>
              <p className="fds-body max-w-2xl mt-1">
                Chỉ với 4 bước trong đợt tuyển thành viên thường niên, bạn đã có
                thể trở thành một phần của đại gia đình FDS.
              </p>
            </div>

            {/* 4 Steps Timeline: Horizontal on desktop with CSS line, Vertical on mobile */}
            <div className="relative">
              {/* Horizontal connecting line on desktop */}
              <div
                className="hidden md:block absolute top-4 left-10 right-10 h-[2px] bg-[#2457A6]/25 -z-0"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 relative z-10">
                {/* Step 01 */}
                <div className="flex md:flex-col items-start gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#2457A6] text-white flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-xs ring-4 ring-[#F5F7FB]">
                    01
                  </div>
                  <div>
                    <h3 className="fds-journey-title text-sm sm:text-base mb-0.5">
                      Tìm hiểu
                    </h3>
                    <p className="fds-body text-[11px] sm:text-xs leading-relaxed">
                      Khám phá định hướng, văn hoá CLB và lựa chọn ban phù hợp.
                    </p>
                  </div>
                </div>

                {/* Step 02 */}
                <div className="flex md:flex-col items-start gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#2457A6] text-white flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-xs ring-4 ring-[#F5F7FB]">
                    02
                  </div>
                  <div>
                    <h3 className="fds-journey-title text-sm sm:text-base mb-0.5">
                      Ứng tuyển
                    </h3>
                    <p className="fds-body text-[11px] sm:text-xs leading-relaxed">
                      Điền đơn ứng tuyển trực tuyến khi đợt tuyển sinh mở đơn.
                    </p>
                  </div>
                </div>

                {/* Step 03: Phỏng vấn */}
                <div className="flex md:flex-col items-start gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#2457A6] text-white flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-xs ring-4 ring-[#F5F7FB]">
                    03
                  </div>
                  <div>
                    <h3 className="fds-journey-title text-sm sm:text-base mb-0.5">
                      Phỏng vấn
                    </h3>
                    <p className="fds-body text-[11px] sm:text-xs leading-relaxed">
                      Tham gia buổi phỏng vấn trực tiếp để chia sẻ mục tiêu và đam mê.
                    </p>
                  </div>
                </div>

                {/* Step 04 */}
                <div className="flex md:flex-col items-start gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#2457A6] text-white flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-xs ring-4 ring-[#F5F7FB]">
                    04
                  </div>
                  <div>
                    <h3 className="fds-journey-title text-sm sm:text-base mb-0.5">
                      Đồng hành
                    </h3>
                    <p className="fds-body text-[11px] sm:text-xs leading-relaxed">
                      Trở thành thành viên chính thức, cùng học tập và kiến tạo giá
                      trị.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action button & Notification Note per CONTENT_BRIEF.md */}
            <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row sm:items-center gap-4">
              <a
                href="https://www.facebook.com/dsclub.fu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#07152F] text-white text-xs sm:text-sm font-medium px-5 py-2.5 rounded-[3px] hover:bg-[#1E293B] active:bg-[#07152F] transition shadow-xs w-fit cursor-pointer"
              >
                Theo dõi đợt tuyển tiếp theo
                <ExternalLink size={13} />
              </a>

              <p className="fds-body text-[11px] sm:text-xs text-[#64748B]">
                Tuyển thành viên thường niên mở vào khoảng cuối tháng 12 – đầu
                tháng 1. Đợt Gen 8 đã khép lại; theo dõi fanpage để cập nhật đợt
                tuyển mới nhất.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* 08 — Footer (#footer) */}
      <footer
        id="footer"
        className="fds-footer relative pt-5 pb-3.5 sm:pt-6 sm:pb-4 px-4 sm:px-6 overflow-hidden"
      >
        {/* Large subtle background watermark per Round 4 spec (opacity: 0.035, size 420px) */}
        <div
          className="absolute -bottom-10 -right-10 pointer-events-none opacity-[0.035] select-none z-0"
          aria-hidden="true"
        >
          <Image
            src="/fds/lettering/footer-note-white.svg"
            alt=""
            width={420}
            height={330}
            className="w-[380px] sm:w-[440px] h-auto fds-decorative"
            draggable={false}
          />
        </div>

        <div className="max-w-[1240px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pb-4 border-b border-[#2457A6]/25">
            {/* Column 1: Logo & Official Identity */}
            <div className="md:col-span-4">
              <div className="mb-2">
                <Image
                  src="/fds/brand/fds-wordmark-authentic-white.png"
                  alt="FDS - FPTU Data Science Club"
                  width={156}
                  height={85}
                  className="w-[156px] h-auto object-contain fds-decorative select-none"
                  draggable={false}
                />
              </div>
              <p className="fds-footer-copy max-w-sm mb-1">
                Câu lạc bộ Khoa học Dữ liệu đầu tiên tại Trường Đại học FPT cơ sở
                Hà Nội.
              </p>
              <p className="fds-footer-copy max-w-sm">
                Định hướng Data Science, Big Data và Artificial Intelligence.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="md:col-span-3">
              <h4 className="fds-footer-heading mb-1.5">
                Liên kết nhanh
              </h4>
              <ul className="space-y-1 fds-footer-copy">
                <li>
                  <a href="#home" className="hover:text-white transition">
                    Trang chủ
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-white transition">
                    Về FDS
                  </a>
                </li>
                <li>
                  <a href="#fields" className="hover:text-white transition">
                    Lĩnh vực hoạt động
                  </a>
                </li>
                <li>
                  <a href="#activities" className="hover:text-white transition">
                    Hoạt động nổi bật
                  </a>
                </li>
                <li>
                  <a href="#projects" className="hover:text-white transition">
                    Sáng kiến & hoạt động tiêu biểu
                  </a>
                </li>
                <li>
                  <a href="#achievements" className="hover:text-white transition">
                    Những dấu ấn của FDS
                  </a>
                </li>
                <li>
                  <a href="#community" className="hover:text-white transition">
                    Những người tạo nên FDS
                  </a>
                </li>
                <li>
                  <a href="#journey" className="hover:text-white transition">
                    Bắt đầu hành trình cùng FDS
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Verified Channels from CONTENT_BRIEF.md */}
            <div className="md:col-span-3">
              <h4 className="fds-footer-heading mb-1.5">
                Kênh thông tin chính thức
              </h4>
              <div className="flex items-center gap-2 mb-2">
                <a
                  href="https://www.facebook.com/dsclub.fu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-[3px] bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition cursor-pointer"
                  aria-label="Facebook FPTU Data Science Club"
                >
                  <Facebook size={14} />
                </a>
                <a
                  href="https://www.instagram.com/dsclub.fptu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-[3px] bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition cursor-pointer"
                  aria-label="Instagram FDS"
                >
                  <Instagram size={14} />
                </a>
                <a
                  href="https://www.tiktok.com/@fptudatascienceclub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-[3px] bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition text-xs font-bold cursor-pointer"
                  aria-label="TikTok FDS"
                >
                  TT
                </a>
                <a
                  href="https://www.kaggle.com/competitions/fds-summer-challenge-2025-weather-prediction"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-[3px] bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition text-xs font-bold cursor-pointer"
                  aria-label="Kaggle FDS"
                >
                  KG
                </a>
              </div>

              {/* Direct Contacts */}
              <div className="space-y-0.5 fds-footer-copy">
                <p className="flex items-center gap-1.5">
                  <Mail size={12} className="text-[#60A5FA]" />
                  <a
                    href="mailto:dsclub.fu@gmail.com"
                    className="hover:text-white transition"
                  >
                    dsclub.fu@gmail.com
                  </a>
                </p>
                <p className="flex items-center gap-1.5">
                  <Phone size={12} className="text-[#60A5FA]" />
                  <a href="tel:+84782111003" className="hover:text-white transition">
                    0782 111 003
                  </a>
                </p>
              </div>
            </div>

            {/* Far Right: Handwritten Footer Note SVG (opacity: 0.85 per Round 4 spec) */}
            <div className="md:col-span-2 flex items-start justify-start md:justify-end">
              <div
                className="pointer-events-none rotate-[5deg] opacity-[0.85]"
                aria-hidden="true"
              >
                <Image
                  src="/fds/lettering/footer-note-white.svg"
                  alt=""
                  width={140}
                  height={110}
                  className="w-24 sm:w-28 h-auto fds-decorative select-none"
                  draggable={false}
                />
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Mission */}
          <div className="pt-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-[#64748B]">
            <p>© 2026 FPTU Data Science Club. All rights reserved.</p>
            <p className="font-display italic text-[#94A3B8]">
              Made by students, for a brighter tomorrow.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}



