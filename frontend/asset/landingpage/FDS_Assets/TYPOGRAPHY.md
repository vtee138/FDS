# FDS Typography Specification — bản duyệt

> Nguồn đối chiếu duy nhất: `reference/approved-design.png`.  
> Mục tiêu: khôi phục cảm giác editorial–academic của bản duyệt; không để agent tự chọn font, tự kéo nghiêng chữ hoặc dùng một font cho toàn trang.

## 1. Bốn hệ chữ bắt buộc

| Hệ | Font/asset | Vai trò |
|---|---|---|
| Editorial display | **Playfair Display** | Hero, tiêu đề section, tiêu đề card và các bước hành trình |
| Functional sans | **Be Vietnam Pro** | Body, menu, nút, link, mô tả, footer; hỗ trợ dấu tiếng Việt tốt |
| Technical label | **IBM Plex Mono** | Eyebrow, section number, nhãn dữ liệu nhỏ, annotation kỹ thuật |
| Hand lettering | SVG trong `/fds/lettering/` | Các câu viết tay trang trí; không phải nội dung SEO và không dựng bằng font cursive |

Logo dùng PNG authentic trong `/fds/brand/`; tuyệt đối không gõ `FDS` bằng font.

## 2. Cài bằng `next/font/google`

```tsx
import {
  Playfair_Display,
  Be_Vietnam_Pro,
  IBM_Plex_Mono,
} from "next/font/google";

export const displayFont = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const sansFont = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const monoFont = IBM_Plex_Mono({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});
```

Gắn cả ba variable vào `<body>`. Không import font trùng lần nữa bằng `@import`.

## 3. Token gốc

```css
:root {
  --font-display: "Playfair Display", Georgia, serif;
  --font-sans: "Be Vietnam Pro", Arial, sans-serif;
  --font-mono: "IBM Plex Mono", monospace;

  --ink: #07152f;
  --ink-soft: #415777;
  --ink-muted: #65758d;
  --blue: #2457a6;
  --blue-bright: #1769d2;
  --paper: #f5f8fc;
}

html {
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}
```

`font-synthesis: none` là bắt buộc để trình duyệt không tự làm italic giả hoặc bold giả.

## 4. Type scale đã khóa

| Token | Desktop | Mobile | Font | Weight/style | Line-height | Tracking |
|---|---:|---:|---|---|---:|---:|
| Hero eyebrow | 11–12px | 10–11px | Mono | 500, uppercase | 1.25 | `0.16em` |
| Hero title | 82–104px | 52–64px | Display | 600 normal + 500 italic | `0.90–0.94` | `-0.045em` |
| Club name | 25–30px | 21–24px | Display | 600 | 1.12 | `-0.018em` |
| Section eyebrow | 11px | 10px | Mono | 600, uppercase | 1.25 | `0.13em` |
| Section title | 42–58px | 32–42px | Display | 600 | `1.02–1.08` | `-0.032em` |
| Compact section title | 34–44px | 29–36px | Display | 600 | 1.08 | `-0.026em` |
| Card title | 19–23px | 18–21px | Display | 600 | 1.18 | `-0.015em` |
| Body lead | 16–18px | 15–16px | Sans | 400 | `1.55–1.65` | `0` |
| Body/card text | 14–16px | 14–15px | Sans | 400 | `1.55–1.65` | `0` |
| Nav/link/button | 13–15px | 14–15px | Sans | 500–600 | 1.25 | `0` |
| Metadata | 10–12px | 10–11px | Mono | 500 | 1.4 | `0.06–0.1em` |
| Footer text | 12–14px | 12–14px | Sans | 400–600 | 1.55 | `0` |

Không giảm body dưới 14px để cố nhồi bố cục. Mật độ của bản duyệt đến từ grid, khoảng cách và chi tiết nền, không phải chữ siêu nhỏ.

## 5. Hero — cách dựng chính xác

```tsx
<h1 className="fds-hero-title">
  <span>Insights</span>
  <em>in our eyes</em>
</h1>
```

```css
.fds-hero-title {
  font-family: var(--font-display);
  font-size: clamp(3.5rem, 6.3vw, 6.5rem);
  font-weight: 600;
  line-height: .92;
  letter-spacing: -.045em;
  color: var(--ink);
}

.fds-hero-title span,
.fds-hero-title em { display: block; }

.fds-hero-title em {
  font-weight: 500;
  font-style: italic;
}
```

Không dùng `transform: skew`, không dùng ảnh cho hero title và không thay `em` bằng font viết tay.

## 6. Mapping theo component

| Thành phần | Class đề xuất | Quy tắc |
|---|---|---|
| Navbar | `.fds-nav-link` | Sans 13–14px/600; active có underline mảnh, không pill |
| CTA | `.fds-button` | Sans 14px/600; radius 2–4px; không chữ serif |
| Section number | `.fds-eyebrow` | Mono uppercase; xanh; letter-spacing rộng |
| Heading lớn | `.fds-section-title` | Display 600; không italic trừ hero |
| Card lĩnh vực | `.fds-card-title` | Display 600, 19–22px |
| Nội dung | `.fds-body` | Sans 400; màu `--ink-soft`; line-height tối thiểu 1.55 |
| Link chữ | `.fds-text-link` | Sans 600; underline mảnh và arrow riêng |
| Nhãn dự án | `.fds-meta` | Mono 500/600; uppercase; 10–11px |
| Journey step | `.fds-journey-title` | Display 600; 20–24px |
| Footer heading | `.fds-footer-heading` | Sans 600; trắng; 13–14px |
| Footer link/meta | `.fds-footer-copy` | Sans 400; xanh xám sáng; 12–14px |

## 7. Handwriting và watermark

Các file dưới đây là asset, không phải webfont:

```text
/fds/lettering/hero-note.svg
/fds/lettering/about-note.svg
/fds/lettering/activities-list.svg
/fds/lettering/activities-community.svg
/fds/lettering/activities-together.svg
/fds/lettering/footer-note-white.svg
/fds/lettering/footer-note.svg
```

- Lettering chính cạnh ảnh: opacity `0.78–0.92`, kích thước `120–190px`.
- Lettering dùng làm watermark trong card/container: opacity chỉ `0.035–0.07`, `mix-blend-mode: multiply`, được crop một phần.
- Không lặp cùng một câu viết tay trong mọi card. Mỗi section tối đa 1–2 watermark.
- Footer có thể đặt thêm một bản `footer-note-white.svg` thật lớn phía sau nội dung với opacity `0.025–0.045`; bản rõ ở cột phải vẫn giữ opacity `0.72–0.88`.

## 8. Quy tắc xuống dòng

- Heading không giới hạn bằng width quá hẹp chỉ để ép giống screenshot.
- Desktop: section title ưu tiên 1–2 dòng; hero title đúng 2 dòng.
- Mobile: dùng `text-wrap: balance` cho heading, nhưng không chèn `<br>` tùy tiện ngoài hero.
- Không để orphan một từ ở dòng cuối nếu điều chỉnh `max-width` có thể giải quyết.

## 9. Cấm

- Không dùng Times New Roman, Arial hoặc font hệ thống làm font chính khi font Google đã tải được.
- Không dùng một font sans cho toàn trang.
- Không dùng Cormorant, Poppins, Montserrat hoặc cursive ngẫu nhiên để “gần giống”.
- Không fake italic bằng skew.
- Không rasterize nội dung thật thành ảnh.
- Không dùng chữ viết tay làm body hoặc navigation.
- Không giảm opacity của text chính để tạo cảm giác tinh tế; chỉ watermark/pattern được mờ.

## 10. Nghiệm thu typography

Agent phải báo cáo bảng computed style từ trình duyệt cho tối thiểu:

1. Hero `Insights`.
2. Hero `in our eyes`.
3. Một section title.
4. Một card title.
5. Một body paragraph.
6. Một eyebrow.
7. Một footer link.

Mỗi dòng báo cáo: `font-family`, `font-size`, `font-weight`, `font-style`, `line-height`, `letter-spacing`. Nếu font thực tế fallback sang Georgia/Arial thì coi là chưa đạt.
