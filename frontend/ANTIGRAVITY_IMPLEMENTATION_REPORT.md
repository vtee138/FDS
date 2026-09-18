# FDS Landing Page — Báo Cáo Nghiệm Thu Round 4 Visual Refinement

> **Phiên bản**: Antigravity Round 4 — Visual Refinement  
> **Nguồn đối chiếu**: `reference/approved-design.png`, `TYPOGRAPHY.md`, `PATTERN_SYSTEM.md`, `CONTENT_BRIEF.md`, `ASSET_MAP.md`  
> **Trạng thái**: Hoàn tất 100% — Đã đồng bộ asset, thay thế logo authentic PNG, thiết lập typography Google Fonts chuẩn xác không fallback, triển khai hai họ nền Nền A / Nền B đan xen, gắn tape và watermark chìm tinh tế, footer chuẩn hóa, kiểm tra tự động 0 lỗi console/network/overflow.

---

## 1. File Đã Sửa / Tạo Và Lý Do

| File | Hành động | Lý do thay đổi |
|---|---|---|
| `app/layout.tsx` | Sửa | Cài đặt chính xác 3 hệ phông từ `next/font/google` (`Playfair_Display`, `Be_Vietnam_Pro`, `IBM_Plex_Mono`) theo `TYPOGRAPHY.md`; gán biến CSS `--font-display`, `--font-sans`, `--font-mono` vào thẻ `<html>` và `<body>`; loại bỏ triệt để font Geist cũ. |
| `app/globals.css` | Sửa | Khắc phục lỗi vòng lặp biến tự tham chiếu `:root`; định nghĩa `@theme` cho Tailwind v4; thiết lập `font-synthesis: none` chống faux-italic/faux-bold; định nghĩa hai họ nền `.fds-bg-a` và `.fds-bg-b`; bổ sung toàn bộ class typography utility (`.fds-hero-title`, `.fds-eyebrow`, `.fds-section-title`, `.fds-card-title`, `.fds-body`, `.fds-journey-title`, `.fds-footer-heading`, `.fds-footer-copy`, `.fds-watermark`). |
| `components/Navbar.tsx` | Sửa | Cập nhật wordmark authentic navy (`/fds/brand/fds-wordmark-authentic-navy.png`); khóa rendered width: `154px` (desktop), `138px` (mobile); `height: auto`, `draggable={false}`, `select-none`, `object-contain`; loại bỏ filter/opacity mờ. |
| `components/ProjectShowcase.tsx` | Sửa | Thêm watermark chìm `/fds/lettering/activities-together.svg` (opacity 0.045, `mix-blend-mode: multiply`); chuẩn hóa typography font-mono cho badge và font-display cho tiêu đề/tagline; duy trì decoration `technical-corner-lines.svg` (opacity 0.35). |
| `app/page.tsx` | Sửa | Cập nhật toàn bộ 9 section theo luân phiên Nền A / Nền B; áp dụng typography classes chuẩn hóa; thêm watermark chìm tại các card; bổ sung overlay `editorial-blueprint-loops.svg` cho các section Nền B; thêm tape Frame 1 tại Activities collage; chuẩn hóa Footer với logo authentic trắng (156px) và watermark lớn (opacity 0.035). |
| `verify-round4.js` | Tạo | Kịch bản tự động hóa Node.js + Puppeteer (Edge) kiểm tra computed typography cho 7 phần tử, kích thước logo, mapping nền/pattern/tape, đo overflow 6 viewports, bắt lỗi console & network và chụp toàn bộ 7 screenshot evidence. |
| `evidence/round4/*` | Tạo | Thư mục chứa 7 file ảnh screenshot bằng chứng và file `round4-verification-results.json` ghi lại toàn bộ số liệu đo trực tiếp từ trình duyệt. |

---

## 2. Mapping Section → Họ Nền A/B → Pattern → Opacity Thực Tế

| Section | ID | Họ Nền | Pattern & Họa tiết trang trí | Kích thước desktop | Opacity thực tế | Mix Blend Mode |
|---|---|---|---|---:|---:|---|
| **00. Hero** | `#home` | **Nền A** (Base `#F6F8FC` + `paper-light.png` 0.32) | `hero-hex-rings.svg`<br>`technical-corner-lines.svg`<br>`hero-technical-frame.svg`<br>`hero-note.svg` (lettering) | 224×182px<br>112×82px<br>560×531px<br>187×133px | 0.52<br>0.45<br>0.62<br>1.00 (note) | normal<br>normal<br>normal<br>normal |
| **01. Về FDS** | `#about` | **Nền B** (Base `#F1F6FC` + `paper-editorial-v2.png` 0.38 + wash) | `editorial-blueprint-loops.svg`<br>`section-left-hex-fragment.svg`<br>`about-note-connector.svg`<br>`about-note.svg` (lettering rõ)<br>`about-note.svg` (watermark chìm)<br>`note-paper.svg` | 240×140px<br>128×145px<br>208×132px<br>120×129px<br>112×72px<br>176×64px | 0.14<br>0.55<br>0.55<br>0.85<br>0.05<br>0.88 | normal<br>normal<br>normal<br>normal<br>**multiply**<br>normal |
| **02. Lĩnh vực** | `#fields` | **Nền A** (Base `#F6F8FC` + `paper-light.png` 0.32) | `fields-heading-hex.svg`<br>`hero-note.svg` (watermark Card 1) | 112×74px<br>112×73px | 0.52<br>0.05 | normal<br>**multiply** |
| **03. Hoạt động** | `#activities` | **Nền B** (Base `#F1F6FC` + `paper-editorial-v2.png` 0.38 + wash) | `editorial-blueprint-loops.svg`<br>`micro-node-line.svg`<br>`activities-list.svg`<br>`activities-community.svg`<br>`activities-together.svg` | 240×140px<br>144×16px<br>118×119px<br>107×52px<br>95×106px | 0.14<br>0.55<br>1.00<br>1.00<br>1.00 | normal<br>normal<br>normal<br>normal<br>normal |
| **04. Sáng kiến** | `#projects` | **Nền B** (Base `#F1F6FC` + `paper-editorial-v2.png` 0.38 + wash) | `editorial-blueprint-loops.svg`<br>`technical-corner-lines.svg`<br>`activities-together.svg` (watermark Card) | 240×140px<br>80×59px<br>144×164px | 0.14<br>0.35<br>0.045 | normal<br>normal<br>**multiply** |
| **05. Dấu ấn** | `#achievements` | **Nền A** (Base `#F6F8FC` + `paper-light.png` 0.32) | `achievements-hex-cluster.svg`<br>`about-note.svg` (watermark Card 2) | 224×190px<br>96×104px | 0.52<br>0.05 | normal<br>**multiply** |
| **06. Cộng đồng** | `#community` | **Nền B** (Base `#F1F6FC` + `paper-editorial-v2.png` 0.38 + wash) | `editorial-blueprint-loops.svg`<br>`community-hex-chain.svg`<br>`activities-community.svg` (watermark Card 2) | 240×140px<br>144×288px<br>104×56px | 0.14<br>0.48<br>0.05 | normal<br>normal<br>**multiply** |
| **07. Hành trình** | `#journey` | **Nền A** (Base `#F6F8FC` + `paper-light.png` 0.32) | `journey-corner-hex.svg` | 240×223px | 0.55 | normal |
| **08. Footer** | `#footer` | **Footer Wash** (`#07152F` + `footer-wash.svg`) | `footer-note-white.svg` (watermark chìm lớn)<br>`footer-note-white.svg` (lettering rõ) | 440×346px<br>119×97px | 0.035<br>0.85 | normal<br>normal |

---

## 3. Mapping Ảnh → Loại Tape → Vị Trí

| Section / Khung ảnh | File ảnh nguồn | Loại Tape sử dụng | Vị trí Tape trên khung | Góc xoay Tape | Quy tắc kiểm tra |
|---|---|---|---|---:|---|
| **About (Polaroid frame)** | `/fds/photos/provisional/about-community.png` | `tape-blue.svg` | Mép trên khung ảnh (giữa viền) | -1.5° | Đúng 1 tape/khung, không che mặt người hay caption |
| **Activities — Frame 1 (Workshop)** | `/fds/photos/provisional/activity-workshop.png` | `tape-neutral.svg` | Mép trên bên trái khung ảnh | +1.5° | Đã bổ sung tape neutral, đảm bảo mỗi frame có đúng 1 tape |
| **Activities — Frame 2 (Talk/Presentation)** | `/fds/photos/provisional/activity-talk.png` | `tape-blue.svg` | Mép trên bên phải khung ảnh | 0° (tự nhiên) | 1 tape xanh, đan xen hài hòa với 2 tape neutral |
| **Activities — Frame 3 (Group photo)** | `/fds/photos/provisional/activity-group.png` | `tape-neutral.svg` | Mép trên bên trái khung ảnh | 0° (tự nhiên) | 1 tape neutral, lớp tiền cảnh collage |
| **Tổng số Tape trong Activities** | 3 ảnh collage | 2 neutral + 1 blue | Phân bố 1 tape/khung | Tự nhiên | Đạt chuẩn (đúng 3 tapes cho 3 khung, không dán mọi góc) |

---

## 4. Bảng Logo: Intrinsic Size, Rendered Width Desktop/Mobile, Computed Opacity/Filter

| Vị trí đặt logo | File Asset | Intrinsic Size | Rendered Desktop (1440px) | Rendered Mobile (375px) | Computed Opacity | Computed Filter | Object Fit / User Select | Đánh giá |
|---|---|---:|---:|---:|---:|---|---|---|
| **Navbar** | `/fds/brand/fds-wordmark-authentic-navy.png` | 1188×648 (11:6) | **154px × 84px** | **138px × 75px** | `1` | `none` | `contain` / `none` | **ĐẠT CHUẨN** (Desktop chuẩn 152–156px; Mobile chuẩn 136–140px, sắc nét) |
| **Footer** | `/fds/brand/fds-wordmark-authentic-white.png` | 1188×648 (11:6) | **156px × 85px** | **156px × 85px** | `1` | `none` | `contain` / `none` | **ĐẠT CHUẨN** (Nằm trong dải 148–168px, trắng tinh khiết, không mờ) |

---

## 5. Bảng Computed Typography Cho 7 Phần Tử Theo `TYPOGRAPHY.md`

*(Trích xuất tự động qua Puppeteer / Edge trên viewport 1440px)*

| STT | Phần tử đối chiếu | Nội dung trích mẫu | Computed `font-family` | Computed `font-size` | Computed `font-weight` | Computed `font-style` | Computed `line-height` | Computed `letter-spacing` | Kết luận |
|---|---|---|---|---:|---:|---|---:|---:|---|
| 1 | **Hero `Insights`** | `"Insights"` | `"Playfair Display", "Playfair Display Fallback"` | 90.72px | 600 | normal | 83.46px (0.92) | -4.08px (-0.045em) | **ĐẠT (Không fallback)** |
| 2 | **Hero `in our eyes`** | `"in our eyes"` | `"Playfair Display", "Playfair Display Fallback"` | 90.72px | 500 | **italic** | 83.46px (0.92) | -4.08px (-0.045em) | **ĐẠT (Italic xịn, không skew)** |
| 3 | **Section Title** | `"Tri thức hôm nay vì một ngày mai..."` | `"Playfair Display", "Playfair Display Fallback"` | 54.72px | 600 | normal | 58.00px (1.06) | -1.75px (-0.032em) | **ĐẠT (Không fallback)** |
| 4 | **Card Title** | `"Data Science"` | `"Playfair Display", "Playfair Display Fallback"` | 20.16px | 600 | normal | 23.79px (1.18) | -0.30px (-0.015em) | **ĐẠT (Dải 19–23px chuẩn)** |
| 5 | **Body Paragraph** | `"FPTU Data Science Club là câu lạc..."` | `"Be Vietnam Pro", "Be Vietnam Pro Fallback"` | 15.00px | 400 | normal | 24.30px (1.62) | normal | **ĐẠT (Dải 14–16px chuẩn)** |
| 6 | **Section Eyebrow** | `"01. VỀ FDS"` | `"IBM Plex Mono", "IBM Plex Mono Fallback"` | 11.00px | 700 | normal | 13.20px (1.20) | 1.54px (+0.14em) | **ĐẠT (Mono uppercase chuẩn)** |
| 7 | **Footer Link** | `"Trang chủ"` | `"Be Vietnam Pro", "Be Vietnam Pro Fallback"` | 12.00px | 400 | normal | 18.60px (1.55) | normal | **ĐẠT (Dải 12–14px chuẩn)** |

---

## 6. Bảng Visual Delta: Reference Yêu Cầu Gì, Trước Sai Gì, Đã Sửa Thế Nào

| Hạng mục | Bản duyệt `approved-design.png` yêu cầu | Hiện trạng trước Round 4 | Đã xử lý và chuẩn hóa trong Round 4 |
|---|---|---|---|
| **Logo Brand** | Logo wordmark 3D authentic, sắc nét, tỷ lệ 11:6 | Dùng SVG legacy wordmark hoặc ảnh bị ép chiều cao `h-10`/`h-12` làm logo bé và mờ | Chuyển sang `/fds/brand/fds-wordmark-authentic-navy.png` (Navbar: 154px desktop, 138px mobile) và `/fds/brand/fds-wordmark-authentic-white.png` (Footer: 156px), xóa bỏ mọi filter/opacity/h-10 hạn chế. |
| **Typography Hero Title** | `Insights` serif thẳng + `in our eyes` italic thật của Playfair Display | Dùng font hệ thống hoặc biến skew giả lập, thiếu phông Playfair Display xịn | Cài đặt `Playfair_Display` Google Fonts với subset vietnamese; áp dụng `.fds-hero-title span` (normal 600) + `.fds-hero-title em` (italic 500), line-height 0.92, letter-spacing -0.045em. |
| **Typography Hệ thống** | 3 họ font chuyên biệt: Playfair Display (Display serif), Be Vietnam Pro (Sans body/UI), IBM Plex Mono (Technical/eyebrow) | Trình duyệt fallback sang `-apple-system`/Arial/Georgia do biến CSS `:root` tự tham chiếu | Gỡ bỏ triệt để xung đột biến `:root`, cấu hình `@theme` Tailwind v4 kết nối trực tiếp với Next.js font variables; cả 7 phần tử chuẩn hóa 100% không còn fallback. |
| **Hệ Nền Trang** | Hai họ nền đan xen: Nền A (clean paper + geometry) và Nền B (editorial blue wash + blueprint loops) | Dùng chung một nền texture cho toàn trang | Triển khai `.fds-bg-a` cho Hero, Fields, Achievements, Journey; triển khai `.fds-bg-b` cho About, Activities, Projects, Community; bổ sung overlay `editorial-blueprint-loops.svg` (opacity 0.14). |
| **Mật độ Họa tiết** | Pattern geometry rõ nét, có chiều sâu kỹ thuật | Họa tiết mờ nhạt (0.35–0.40), chìm mất dưới texture nền | Tăng độ hiện diện pattern khoảng 10–15%: `hero-hex-rings` (0.52), `hero-technical-frame` (0.62), `fields-heading-hex` (0.52), `achievements-hex-cluster` (0.52), `community-hex-chain` (0.48), `journey-corner-hex` (0.55). |
| **Watermark Chữ ký chìm** | Chữ ký viết tay siêu mờ phía sau card/container tăng chiều sâu | Chưa có watermark chìm trong container | Thêm lettering watermark chìm (opacity 0.045–0.05, `mix-blend-mode: multiply`, crop ở góc) tại About milestone card, Fields Card 1, ProjectShowcase card, Achievements Card 2, Community Card 2. |
| **Băng dính (Tape)** | Mỗi ảnh có đúng 1 miếng tape; collage có tối đa 2–3 miếng; Frame 1 workshop có tape | Frame 1 workshop bị thiếu tape (chỉ có 2 tape trên 3 ảnh) | Đã gắn `tape-neutral.svg` vào mép trên Frame 1 (Workshop). Hoàn thiện đúng 3 tape cho 3 ảnh collage (2 neutral + 1 blue) và 1 tape blue cho About. |
| **Footer** | Nền navy wash, logo trắng không mờ, có chữ ký chìm lớn phía sau | Chỉ có chữ ký nhỏ góc phải, logo wordmark legacy | Gắn logo authentic trắng 156px; thêm chữ ký chìm lớn `footer-note-white.svg` (kích thước 420px, opacity 0.035) phía sau; chữ ký bên phải rõ nét (opacity 0.85); divider có ánh xanh mảnh. |
| **Độ rộng Container** | Giữ nguyên tỷ lệ 1180–1220px, không kéo dãn layout ngang | Nguy cơ bị kéo dãn fluid width | Khóa cứng `max-w-[1240px]` (content ~1192px), lấp đầy khoảng trắng bằng độ sâu texture, watermark và nhịp độ typography thay vì nới rộng viewport. |

---

## 7. Kết Quả Kiểm Tra Tự Động (Verification Results)

| Bài kiểm tra | Lệnh / Phương thức | Kết quả thực tế | Trạng thái |
|---|---|---|:---:|
| **TypeScript Typecheck** | `npx tsc --noEmit` | `Exit code 0` — Không có bất kỳ lỗi type nào | **PASS** |
| **Next.js Production Build** | `npm run build` | `Exit code 0` — Compiled successfully in 1684ms; static prerendered 4/4 routes | **PASS** |
| **Console Errors** | Puppeteer `page.on('console', msg.type() === 'error')` | `0 console errors`, `0 hydration errors` | **PASS** |
| **Network Asset HTTP** | Puppeteer response interceptor (54 assets) | `0 failed requests (404/500)`; toàn bộ font và `/fds/*` HTTP 200/304 | **PASS** |
| **Horizontal Overflow 320px** | `scrollWidth <= clientWidth` | `scrollWidth = 320px`, `clientWidth = 320px` (overflow = 0px) | **PASS** |
| **Horizontal Overflow 375px** | `scrollWidth <= clientWidth` | `scrollWidth = 375px`, `clientWidth = 375px` (overflow = 0px) | **PASS** |
| **Horizontal Overflow 768px** | `scrollWidth <= clientWidth` | `scrollWidth = 768px`, `clientWidth = 768px` (overflow = 0px) | **PASS** |
| **Horizontal Overflow 1024px** | `scrollWidth <= clientWidth` | `scrollWidth = 1024px`, `clientWidth = 1024px` (overflow = 0px) | **PASS** |
| **Horizontal Overflow 1440px** | `scrollWidth <= clientWidth` | `scrollWidth = 1440px`, `clientWidth = 1440px` (overflow = 0px) | **PASS** |
| **Horizontal Overflow 1920px** | `scrollWidth <= clientWidth` | `scrollWidth = 1920px`, `clientWidth = 1920px` (overflow = 0px) | **PASS** |

---

## 8. Danh Mục Screenshot Evidence Đã Xuất Bản

Toàn bộ file đã được tạo tại `frontend/evidence/round4/` và sao chép vào Artifacts Directory:

1. **Full-page Desktop 1440px**:  
   [evidence/round4/fullpage-desktop-1440.png](file:///c:/Users/Administrator/Documents/Codespace/FDS/frontend/evidence/round4/fullpage-desktop-1440.png)
2. **Full-page Mobile 375px**:  
   [evidence/round4/fullpage-mobile-375.png](file:///c:/Users/Administrator/Documents/Codespace/FDS/frontend/evidence/round4/fullpage-mobile-375.png)
3. **Navbar Crop**:  
   [evidence/round4/navbar-crop.png](file:///c:/Users/Administrator/Documents/Codespace/FDS/frontend/evidence/round4/navbar-crop.png)
4. **Hero Crop**:  
   [evidence/round4/hero-crop.png](file:///c:/Users/Administrator/Documents/Codespace/FDS/frontend/evidence/round4/hero-crop.png)
5. **Card Section Crop (Fields)**:  
   [evidence/round4/card-section-crop.png](file:///c:/Users/Administrator/Documents/Codespace/FDS/frontend/evidence/round4/card-section-crop.png)
6. **Activities Collage Crop**:  
   [evidence/round4/activities-collage-crop.png](file:///c:/Users/Administrator/Documents/Codespace/FDS/frontend/evidence/round4/activities-collage-crop.png)
7. **Footer Crop**:  
   [evidence/round4/footer-crop.png](file:///c:/Users/Administrator/Documents/Codespace/FDS/frontend/evidence/round4/footer-crop.png)
8. **Paper Texture Zoom 100% Crop (Bằng chứng nếp giấy)**:  
   [evidence/round4/paper-texture-zoom-100.png](file:///c:/Users/Administrator/Documents/Codespace/FDS/frontend/evidence/round4/paper-texture-zoom-100.png)
9. **JSON Số liệu Đo trực tiếp từ Browser**:  
   [evidence/round4/round4-verification-results.json](file:///c:/Users/Administrator/Documents/Codespace/FDS/frontend/evidence/round4/round4-verification-results.json)

---

## 9. Hạng Mục Chưa Thể Match Tuyệt Đối 100% & Nguyên Nhân Kỹ Thuật

*(Tuân thủ quy định: không tự tuyên bố pixel-perfect vô căn cứ)*

1. **Bản chất Rendering của Font Chữ Web (Subpixel Font Rasterization)**:
   - Trong `approved-design.png`, một số heading được export từ file thiết kế Figma/Photoshop ở dạng bitmap raster tĩnh. Khi render trực tiếp bằng web engine (Chromium Blink trên Edge/Windows với DirectWrite font hinting), độ dày nét (stroke weight) và khử răng cưa của phông chữ Google Fonts (`Playfair Display` và `Be Vietnam Pro`) sẽ có sự chênh lệch vi mô ~0.5px so với rasterized design của macOS/Figma. Đây là đặc tính kỹ thuật bình thường của web typography.
2. **Ảnh Chụp Hoạt Động CLB (Provisional Photos)**:
   - Hiện tại dự án đang dùng 4 ảnh provisional được trích xuất sạch từ mockups có sẵn để phục vụ phát triển giao diện. Khi CLB cung cấp ảnh chụp thực tế có độ phân giải gốc cao hơn từ máy ảnh sự kiện, các khung ảnh polaroid này sẽ đạt độ trong trẻo và chân thực tối đa theo đúng mục tiêu của layout.
3. **Tính Responsive của Vector Pattern Chạy Dọc Mép**:
   - Các họa tiết viền như `section-left-hex-fragment.svg` và `community-hex-chain.svg` được neo theo mép viewport (`absolute left-0 / right-0`) trong khi nội dung chính được neo theo `max-w-[1240px] mx-auto`. Do đó, khoảng cách tương đối giữa họa tiết viền và mép card sẽ thay đổi nhẹ nhàng và co giãn theo kích thước màn hình thực tế của người dùng (từ 1280px đến 1920px).

---

## 10. Báo Cáo Background Hotfix — Áp Dụng Paper Texture Và Xóa Nền Che

### A. Kiểm tra Asset và HTTP Status
- Asset: `frontend/public/fds/backgrounds/paper-newspaper-v3.webp` (200,804 bytes).
- HTTP Status: `http://localhost:3000/fds/backgrounds/paper-newspaper-v3.webp` trả về **`200 OK`**, `Content-Type: image/webp`.

### B. Rule CSS Thực Sự Được Next.js Load Tại `frontend/app/globals.css`
```css
body {
  background-color: #eef3f8;
}

.fds-page {
  min-height: 100vh;
  color: #07152f;
  position: relative;
  isolation: isolate;

  background-color: #eef3f8;
  background-image: url("/fds/backgrounds/paper-newspaper-v3.webp");
  background-repeat: repeat;
  background-position: top left;
  background-size: 520px 520px;
}

/* Nền A / Light Section — Trong suốt để lộ texture */
.fds-bg-a,
.fds-light-section {
  position: relative;
  background: transparent;
  border-top: 1px solid rgba(27, 73, 132, 0.07);
}

/* Nền B / Light Section with wash — Wash mờ <= 0.18 */
.fds-bg-b,
.fds-light-section--wash {
  position: relative;
  background:
    linear-gradient(
      180deg,
      rgba(221, 235, 249, 0.13),
      rgba(255, 255, 255, 0.04)
    );
  border-top: 1px solid rgba(27, 73, 132, 0.07);
}

/* Card System bán trong suốt */
.fds-card {
  position: relative;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(7, 21, 47, 0.07);
  box-shadow: 0 10px 30px rgba(35, 73, 121, 0.035);
  border-radius: 4px;
}
```

### C. Bảng Runtime getComputedStyle Thực Tế Trên `.fds-page`
| Thuộc tính | Giá trị Computed Style thực tế | Đánh giá |
|---|---|:---:|
| `backgroundImage` | `url("http://localhost:3000/fds/backgrounds/paper-newspaper-v3.webp")` | **ĐẠT (Chứa chính xác file webp)** |
| `backgroundSize` | `520px 520px` | **ĐẠT** |
| `backgroundColor` | `rgb(238, 243, 248)` (`#eef3f8`) | **ĐẠT** |
| `backgroundRepeat` | `repeat` | **ĐẠT** |

### D. Phân Loại Kết Quả Tìm Kiếm Background (`rg`)
1. **Root Page (`.fds-page`)**: Đã gán `background-image: url("/fds/backgrounds/paper-newspaper-v3.webp")`, `background-color: #eef3f8`.
2. **Section Wrappers (`#home`, `#about`, `#fields`, `#activities`, `#projects`, `#achievements`, `#community`, `#journey`)**: Toàn bộ đã chuyển sang `background: transparent` hoặc wash bán trong suốt `<= 0.13`, `backgroundColor` trả về `rgba(0, 0, 0, 0)` trong DOM. Xóa bỏ hoàn toàn các pseudo-element `::before` phủ màu đặc.
3. **Card Containers (`.fds-card`)**: Giữ nền trắng bán trong suốt `rgba(255, 255, 255, 0.72)` để nổi bật nội dung mà không triệt tiêu texture giấy.
4. **Dark Section (`#footer`)**: Giữ màu nền navy `#07152f` và wash footer riêng theo thiết kế.

### E. Nghiệm Thu Texture Bằng Mắt Thường
- Bằng chứng crop 100% zoom tại `frontend/evidence/round4/paper-texture-zoom-100.png` thể hiện rõ nếp nhăn và thớ giấy newspaper.
- Thử nghiệm trên cả card và hero cho thấy texture trải đều, tự nhiên, không che khuất chữ.

---

## 11. Báo Cáo Nghiệm Thu Round 4.2 — Navbar Overlay & Alternating Paper Panels

### A. Tóm tắt Thay đổi Kỹ thuật
1. **Navbar Overlay**:
   - `header.fds-navbar` chuyển sang `position: absolute; top: 0; left: 0; right: 0; z-index: 50; background: transparent;`.
   - `.fds-navbar-inner`: `width: min(100% - 32px, 1200px); min-height: 82px; margin-inline: auto;`.
   - `.fds-hero`: `padding-top: 112px` (desktop), `padding-top: 96px` (mobile `<= 640px`).
   - `body`: `margin: 0`.
   - Không còn spacer, không có wrapper phía trước, texture giấy hiển thị xuyên qua navbar từ pixel đầu tiên (y = 0).
2. **Alternating Paper Panels**:
   - Xóa bỏ class `.fds-bg-a` và `.fds-bg-b` cũ.
   - Thay thế bằng **Paper Raw** (`.fds-section--paper` - `background: transparent`) và **Paper Panel** (`.fds-section--panel` - `background: rgba(255, 255, 255, 0.44)`).
   - `.fds-card`: `background: rgba(255, 255, 255, 0.74); border: 1px solid rgba(7, 21, 47, 0.07); border-radius: 3px; box-shadow: 0 10px 28px rgba(25, 57, 99, 0.035);`.
   - `.fds-section--panel .fds-card`: `background: rgba(255, 255, 255, 0.62)`.

### B. Bảng Số Liệu Runtime Bắt Buộc (Mục 7)
Trích xuất tự động qua Puppeteer / Edge:

| Thuộc tính | Giá trị đo được | Yêu cầu | Đánh giá |
|---|---|---|:---:|
| `navbarPosition` | `'absolute'` | `absolute` tại đầu trang | **ĐẠT** |
| `navbarTop` | `'0px'` | `0px` | **ĐẠT** |
| `navbarBackground` | `'rgba(0, 0, 0, 0)'` | `rgba(0, 0, 0, 0)` | **ĐẠT** |
| `heroBackground` | `'rgba(0, 0, 0, 0)'` | `rgba(0, 0, 0, 0)` (Paper Raw) | **ĐẠT** |
| `aboutBackground` | `'rgba(255, 255, 255, 0.44)'` | Alpha panel ~0.44 | **ĐẠT** |
| `fieldsBackground` | `'rgba(0, 0, 0, 0)'` | `rgba(0, 0, 0, 0)` (Paper Raw) | **ĐẠT** |
| `navbarRectTop` | `0` | `0` (không có khoảng trống trên) | **ĐẠT** |
| `heroRectTop` | `0` | `0` (không bị đẩy layout) | **ĐẠT** |

### C. Mapping Section Chi Tiết
| Section | ID | Kiểu Nền | Class CSS |
|---|---|---|---|
| **00. Hero** | `#home` | Paper Raw | `.fds-section--paper .fds-hero` |
| **01. Về FDS** | `#about` | Paper Panel | `.fds-section--panel` |
| **02. Lĩnh vực** | `#fields` | Paper Raw | `.fds-section--paper` |
| **03. Hoạt động** | `#activities` | Paper Panel | `.fds-section--panel` |
| **04. Sáng kiến** | `#projects` | Paper Raw | `.fds-section--paper` |
| **05. Dấu ấn** | `#achievements` | Paper Panel | `.fds-section--panel` |
| **06. Cộng đồng** | `#community` | Paper Raw | `.fds-section--paper` |
| **07. Hành trình** | `#journey` | Paper Panel | `.fds-section--panel` |
| **08. Footer** | `#footer` | Navy riêng | `.fds-footer` |

### D. Danh Mục Screenshot Evidence Bổ Sung Cho Round 4.2
1. **Top Viewport 1440×900 (Navbar Overlay)**:  
   [evidence/round4/navbar-hero-top-1440.png](file:///c:/Users/Administrator/Documents/Codespace/FDS/frontend/evidence/round4/navbar-hero-top-1440.png)
2. **Giao Giữa Hero (Paper Raw) & About (Paper Panel)**:  
   [evidence/round4/hero-about-transition-crop.png](file:///c:/Users/Administrator/Documents/Codespace/FDS/frontend/evidence/round4/hero-about-transition-crop.png)
3. **Giao Giữa About (Paper Panel) & Fields (Paper Raw)**:  
   [evidence/round4/about-fields-transition-crop.png](file:///c:/Users/Administrator/Documents/Codespace/FDS/frontend/evidence/round4/about-fields-transition-crop.png)
4. **Mobile 375px Overlay Viewport**:  
   [evidence/round4/mobile-375-overlay.png](file:///c:/Users/Administrator/Documents/Codespace/FDS/frontend/evidence/round4/mobile-375-overlay.png)

---

## 12. Báo Cáo Nghiệm Thu Round 4.3 — Opaque Overlay Navbar & Panel SVG Depth

### A. Tóm Tắt Kỹ Thuật Đã Triển Khai
1. **Navbar Opaque Overlay**:
   - `header.fds-navbar` áp dụng `background-color: #f7f9fc; background-image: none; inset: 0 0 auto 0; z-index: 50;`.
   - Navbar là một thanh trắng lạnh đặc, không còn trong suốt và không nhìn xuyên qua texture giấy.
   - Khi scroll, `fds-navbar.is-scrolled` giữ nguyên `#f7f9fc` và tăng bóng đổ `box-shadow: 0 5px 22px rgba(20, 48, 88, 0.07);`.
2. **Mỗi Paper Panel Có SVG Pattern Riêng**:
   - `.fds-section--panel` bổ sung `isolation: isolate; overflow: hidden;`.
   - Mỗi panel có `.fds-panel-pattern` riêng: `z-index: 0; pointer-events: none; aria-hidden="true";`.
   - Toàn bộ nội dung chữ và thẻ card được bao bọc trong `.fds-section-content` (`z-index: 1; position: relative;`).
3. **Paper Raw Giữ Thoáng**:
   - Loại bỏ `editorial-blueprint-loops.svg` khỏi các section Paper Raw (`#projects`, `#community`) để nhường không gian cho texture giấy thuần.

### B. Bảng Số Liệu Runtime Bắt Buộc (Mục 8)
Trích xuất tự động qua Puppeteer / Edge:

| Thuộc tính | Giá trị đo được | Yêu cầu Round 4.3 | Đánh giá |
|---|---|---|:---:|
| `position` | `'absolute'` | `absolute` | **ĐẠT** |
| `top` | `'0px'` | `0px` | **ĐẠT** |
| `backgroundColor` | `'rgb(247, 249, 252)'` | `rgb(247, 249, 252)` (`#f7f9fc`) | **ĐẠT (Nền đặc)** |
| `backgroundImage` | `'none'` | `none` (không lặp giấy) | **ĐẠT** |
| `zIndex` | `'50'` | `50` | **ĐẠT** |

### C. Bảng Thống Kê Pattern Theo Từng Panel
| Panel Section | SVG Asset Áp Dụng | Kích Thước | Vị Trí Bố Cục | Opacity Desktop / Mobile |
|---|---|---:|---|---:|
| **01 — About** (`#about`) | `/fds/decorations/about-edge-hex.svg` | 160×320px | Bám mép trái, crop ~40%, top 22% | 0.60 / 0.35 |
| **03 — Activities** (`#activities`) | `/fds/decorations/editorial-blueprint-loops.svg`<br>`/fds/decorations/micro-node-line.svg` | 660×385px<br>144×16px | Giữa sang mép phải dưới<br>Nối lettering với collage | 0.16 / 0.10<br>0.45 / hidden |
| **05 — Achievements** (`#achievements`) | `/fds/decorations/achievements-hex-cluster.svg` | 260×220px | Góc trên bên phải (top-right) | 0.55 / 0.32 |
| **07 — Journey** (`#journey`) | `/fds/decorations/journey-corner-hex.svg` | 350×320px | Mép phải, căn giữa trục dọc | 0.52 / 0.28 |

### D. Danh Mục Screenshot Evidence Bổ Sung Cho Round 4.3
1. **Navbar + Hero ở 1440×900 (Navbar nền đặc `#f7f9fc`)**:  
   [evidence/round4/navbar-hero-top-1440.png](file:///c:/Users/Administrator/Documents/Codespace/FDS/frontend/evidence/round4/navbar-hero-top-1440.png)
2. **About Panel (Edge hex mép trái)**:  
   [evidence/round4/about-panel-1440.png](file:///c:/Users/Administrator/Documents/Codespace/FDS/frontend/evidence/round4/about-panel-1440.png)
3. **Activities Panel (Blueprint loops phía sau collage)**:  
   [evidence/round4/activities-panel-1440.png](file:///c:/Users/Administrator/Documents/Codespace/FDS/frontend/evidence/round4/activities-panel-1440.png)
4. **Achievements Panel (Hex cluster góc phải)**:  
   [evidence/round4/achievements-panel-1440.png](file:///c:/Users/Administrator/Documents/Codespace/FDS/frontend/evidence/round4/achievements-panel-1440.png)
5. **Journey Panel (Route/corner hex hỗ trợ timeline)**:  
   [evidence/round4/journey-panel-1440.png](file:///c:/Users/Administrator/Documents/Codespace/FDS/frontend/evidence/round4/journey-panel-1440.png)
6. **Mobile 375px (Navbar đặc & pattern co tỉ lệ)**:  
   [evidence/round4/mobile-375-overlay.png](file:///c:/Users/Administrator/Documents/Codespace/FDS/frontend/evidence/round4/mobile-375-overlay.png)

---

## 13. Pattern Visibility Hotfix (Nghiệm Thu Độ Hiện Diện Họa Tiết Panel)

### A. Tóm Tắt Xử Lý
1. **Đồng bộ asset SVG mới**: Copy đè toàn bộ SVG mới vào `frontend/public/fds/decorations/` (bao gồm `about-edge-hex.svg`, `editorial-blueprint-loops.svg`, `achievements-hex-cluster.svg`, `journey-corner-hex.svg`, `micro-node-line.svg`).
2. **Xóa bỏ opacity chung quá thấp**: Gỡ bỏ hoàn toàn `.fds-panel-pattern { opacity: 0.15; }`.
3. **Cấu hình opacity riêng theo từng section**:
   - `#about .fds-panel-pattern`: **0.78** (desktop) / **0.48** (mobile max-width: 640px)
   - `#activities .fds-panel-pattern`: **0.34** (desktop) / **0.22** (mobile max-width: 640px)
   - `#achievements .fds-panel-pattern`: **0.74** (desktop) / **0.46** (mobile max-width: 640px)
   - `#journey .fds-panel-pattern`: **0.74** (desktop) / **0.46** (mobile max-width: 640px)
4. **Loại bỏ inline Tailwind opacity**: Xóa các class `opacity-[...]` inline trên các thẻ pattern trong `app/page.tsx` để CSS ID selector trong `globals.css` làm chủ hoàn toàn computed opacity.

### B. Bảng Computed Opacity Đo Trực Tiếp (Puppeteer Runtime)

| Section ID | Tên Section | SVG Pattern Asset | Desktop Computed Opacity (1440px) | Mobile Computed Opacity (375px) | Parent Opacity | Section Opacity | Z-Index Layering | Đánh Giá |
|---|---|---|:---:|:---:|:---:|:---:|:---:|:---:|
| `#about` | 01. Về FDS | `/fds/decorations/about-edge-hex.svg` | **0.78** (chuẩn 0.78) | **0.48** (chuẩn 0.48) | 1.0 (Không có opacity) | 1.0 (Chỉ dùng rgba bg) | Pattern z:0 / Nội dung z:1 | **ĐẠT** |
| `#activities` | 03. Hoạt động | `/fds/decorations/editorial-blueprint-loops.svg`<br>`/fds/decorations/micro-node-line.svg` | **0.34** (chuẩn 0.34)<br>**0.34** (chuẩn 0.34) | **0.22** (chuẩn 0.22)<br>**0.22** (chuẩn 0.22) | 1.0 (Không có opacity) | 1.0 (Chỉ dùng rgba bg) | Pattern z:0 / Nội dung z:1 | **ĐẠT** |
| `#achievements` | 05. Dấu ấn | `/fds/decorations/achievements-hex-cluster.svg` | **0.74** (chuẩn 0.74) | **0.46** (chuẩn 0.46) | 1.0 (Không có opacity) | 1.0 (Chỉ dùng rgba bg) | Pattern z:0 / Nội dung z:1 | **ĐẠT** |
| `#journey` | 07. Hành trình | `/fds/decorations/journey-corner-hex.svg` | **0.74** (chuẩn 0.74) | **0.46** (chuẩn 0.46) | 1.0 (Không có opacity) | 1.0 (Chỉ dùng rgba bg) | Pattern z:0 / Nội dung z:1 | **ĐẠT** |

### C. 6 Điểm Bắt Buộc Kiểm Tra
1. **Parent của pattern không có opacity**: Xác minh `window.getComputedStyle(parent).opacity === "1"` trên mọi panel.
2. **`.fds-section--panel` không dùng opacity trên toàn section**: Section sử dụng màu nền bán trong suốt `rgba(255, 255, 255, 0.44)` chứ không dùng thuộc tính `opacity` lên toàn bộ cây DOM.
3. **Không có pseudo-element trắng nằm trên SVG**: Cả `::before` và `::after` của section/panel đều không có overlay trắng che phủ.
4. **SVG ở z-index 0, content ở z-index 1**: `.fds-panel-pattern` được gắn `z-index: 0; pointer-events: none;`, `.fds-section-content` được gắn `z-index: 1; position: relative;`.
5. **Pattern nhìn rõ ở zoom 100% và nhận diện rõ trong full-page screenshot 1440px**: Đã kiểm tra trực quan trên cả crop từng panel lẫn ảnh chụp full-page 1440px toàn trang.
6. **Không chỉ nhìn thấy trong crop phóng to**: Ngay ở toàn cảnh trang (full-page overview), cả 4 cụm họa tiết đều hiển thị rõ ràng, tạo nhịp điệu đồ họa cho trang web.

---

## 14. Hero Copy & Alignment Hotfix

### A. Nội Dung & Căn Chỉnh Đã Xử Lý
1. **Cập nhật nội dung mô tả Hero**: Thay thế đoạn văn cũ bằng mô tả hoàn chỉnh về FPTU Data Science Club (FDS), lịch sử thành lập từ 1/11/2020 và sứ mệnh kết nối sinh viên.
2. **Mở rộng chiều ngang**: Nâng từ `max-w-lg` thành `max-w-[640px]`, loại bỏ các thẻ `<br>` ngắt dòng thủ công để chữ xuống dòng tự nhiên theo responsive.
3. **Cân chỉnh vị trí khối Hero Copy**: Áp dụng `className="relative z-10 w-full max-w-[640px] flex flex-col items-start pb-2 lg:pb-6 lg:-translate-y-4"` lên thẻ wrapper `data-hero-copy`.
   - **Desktop (>=1024px)**: `translate: 0px -16px;` (dịch lên 16px), cân bằng trọng tâm thị giác với illustration bàn tay bên phải.
   - **Mobile (<1024px)**: `translate: none;` (translateY = 0px), không bị đẩy sát navbar.

### B. Kết Quả Đo Đạc Nghiệm Thu Runtime
| Viewport | Thuộc Tính Translate | Khoảng Cách Dưới Navbar | CTA Cách Đáy Viewport | Chiều Cao Khối Copy vs Khối Tay | Overflow | Đánh Giá |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| **1440px (Desktop)** | `0px -16px` | 134px (an toàn tuyệt đối) | CTA đáy ở y=642px (nằm trọn trong 900px) | Copy: 447px / Tay: 479px (cân đối) | 0px | **ĐẠT** |
| **1024px (Laptop)** | `0px -16px` | 158px (an toàn tuyệt đối) | CTA đáy ở y=642px (nằm trọn trong 900px) | Copy: 423px / Tay: 435px (cân đối) | 0px | **ĐẠT** |
| **375px (Mobile)** | `none` (0px) | 19px (đúng chuẩn mobile) | CTA nằm ngay sau paragraph | Xếp dọc tự nhiên, tay ở dưới CTA | 0px | **ĐẠT** |

---

## 15. Tích Hợp Ảnh Thật CLB (Real Club Image Integration)

### A. Danh Sách 8 Ảnh Nguồn Trong `CLubimage`
| Ảnh Nguồn | Kích Thước Gốc | Tỷ Lệ | Nội Dung Thực Tế | Tên Chuyển Đổi WebP | Section Sử Dụng |
|---|---:|:---:|---|---|---|
| `616129342_1863972417770456_7662387902116550847_n.jpg` | 2048×1365 | 3:2 | 4 thành viên ngồi học tập, nghiên cứu quanh bàn có laptop dán sticker idea | `about-members.webp` (126 KB) | **01 — About** (Polaroid) |
| `727814682_1992532908247739_1034052717505110688_n.jpg` | 2048×1536 | 4:3 | 2 mentor hướng dẫn kỹ thuật trên máy tính cho học viên tại lớp đào tạo | `activity-workshop.webp` (293 KB) | **03 — Activities (Frame 1)** |
| `724073055_1986550552179308_3448087752151029248_n.jpg` | 2048×1365 | 3:2 | 2 thành viên ngồi đàm đạo, trao đổi chuyên môn chăm chú tại hội trường | `activity-presentation.webp` (158 KB) | **03 — Activities (Frame 2)** |
| `615889443_1863970721103959_8416265136728213517_n.jpg` | 2048×1365 | 3:2 | Tập thể thành viên giơ ngón tay cái cùng banner CLB FPTU Data Science Club | `activity-community.webp` (233 KB) | Đã lưu trữ trong thư viện |
| `543423632_1755306711970361_2391498475170826006_n.jpg` | 2048×1365 | 3:2 | 2 thành viên mặc áo đồng phục CLB in slogan "Insights in our eyes" | `club-shirt-slogan.webp` (144 KB) | Đã chuẩn hóa vào thư viện |
| `618066395_1864633574371007_5377117746939391068_n.jpg` | 2048×1152 | 16:9 | Bàn booth triển lãm FDS tại Club Fair với khung ảnh kỷ niệm | `club-fair-booth.webp` (204 KB) | Đã chuẩn hóa vào thư viện |
| `722754977_1988975965270100_299189141934935235_n.jpg` | 2896×1448 | 2:1 | Tập thể thành viên mặc trang phục dạ tiệc prom đeo dải băng CLB trên sân khấu | `club-prom-stage.webp` (306 KB) | **03 — Activities (Frame 3)** |
| `723209120_1986596945508002_8861043823971792034_n.jpg` | 2048×1152 | 16:9 | Toàn thể hội trường Prom tạo dáng biểu tượng bàn tay CLB | `club-prom-gathering.webp` (213 KB) | Đã chuẩn hóa vào thư viện |

### B. Bảng Cấu Hình Crop, Object Position & Alt Text
| Section | File Render | Kích Thước Render | Aspect Ratio Frame | `object-position` | Alt Text Chuẩn Hóa |
|---|---|---|:---:|:---:|---|
| **About (Polaroid)** | `/fds/club-images/about-members.webp` | 299×229px | 4:3 | `center 35%` | `"Các thành viên FDS thảo luận và nghiên cứu dữ liệu cùng nhau"` |
| **Activities Frame 1** | `/fds/club-images/activity-workshop.webp` | 223×145px | 16:10 | `center 25%` | `"Thành viên FDS hướng dẫn kỹ thuật trong một buổi workshop chuyên môn"` |
| **Activities Frame 2** | `/fds/club-images/activity-presentation.webp` | 165×203px | 4:5 | `55% 35%` | `"Các thành viên FDS trao đổi và thảo luận tại sự kiện câu lạc bộ"` |
| **Activities Frame 3** | `/fds/club-images/club-prom-stage.webp` | 290×166px | 16:9 | `object-center` | `"Tập thể thành viên CLB FDS chụp ảnh kỷ niệm tại sự kiện Prom"` |

### C. Kết Quả Kiểm Thử Kỹ Thuật
- **TypeScript**: `npx tsc --noEmit` -> `0 errors`.
- **Next.js Production Build**: `npm run build` -> `Compiled successfully in 398ms` (4/4 static pages).
- **HTTP Status**: 8/8 ảnh `/fds/club-images/*` trả mã `HTTP 200 OK` (`image/webp`).
- **Mock/Placeholder**: Xóa sạch 100% reference tới `/fds/photos/provisional/*`.
- **Tỷ lệ khung hình**: `object-fit: cover` không làm méo tỷ lệ (naturalWidth / naturalHeight bảo toàn).
- **Horizontal Overflow**: 0px tràn ngang tại 320px, 375px, 768px, 1024px và 1440px.





