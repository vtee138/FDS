# FDS visual asset gap audit

Tài liệu này phân biệt ba loại thành phần trong `approved-design.png`: asset hình ảnh cần có file riêng, decoration có thể tái sử dụng, và text/layout phải dựng bằng HTML/CSS.

## 1. Asset đã có và dùng trực tiếp

| Khu vực | Asset |
|---|---|
| Logo | `brand/fds-wordmark.svg`, `brand/fds-wordmark-white.svg` |
| Hero | `hero/hand-network.png`, `lettering/hero-note.svg`, `decorations/hero-technical-frame.svg`, `decorations/hero-hex-rings.svg` |
| About | `lettering/about-note.svg`, `decorations/about-note-connector.svg`, `decorations/tape-blue.svg`, `decorations/tape-neutral.svg` |
| Activities | Ba lettering SVG, tape và connector |
| Footer | `backgrounds/footer-wash.svg`, white wordmark và white lettering |

## 2. Decoration bổ sung sau audit

| Asset | Mục đích |
|---|---|
| `decorations/note-paper.svg` | Nền giấy nghiêng cho note nhỏ; text phải overlay bằng HTML |
| `decorations/fields-heading-hex.svg` | Cụm hai hex và trục dọc đúng biến thể header Fields |
| `decorations/section-left-hex-fragment.svg` | Mảnh hex bị cắt ở mép trái section |
| `decorations/community-hex-chain.svg` | Chuỗi hex đi xuống ở mép phải Community/Achievements |
| `decorations/journey-corner-hex.svg` | Cụm hex góc phải của Journey |

## 3. Thành phần không phải ảnh

Các phần sau phải là HTML/CSS để giữ accessibility và responsive:

- `FROM KNOWLEDGE TO REAL-WORLD IMPACT`.
- `A student-led community at FPT University`.
- Eyebrow và số thứ tự section.
- Timeline 01–04, đường ngang desktop và đường dọc mobile.
- Divider dọc cạnh heading.
- `PEOPLE / DATA / IDEAS / IMPACT` và `FPTU / Data Science / Club`.

Không rasterize những text này vào PNG hoặc SVG outline.

## 4. Raster visual còn thiếu

Bộ hiện tại chưa có bản chất lượng production của:

1. Ảnh ba sinh viên dùng trong About.
2. Ảnh workshop dùng trong Activities.
3. Ảnh tập thể cầm banner FDS.
4. Ảnh talk/presentation dùng trong Activities.

Đây là lý do agent đã thay bằng card tự chế. Không được dùng card tự chế làm phương án thay thế.

Hai phương án hợp lệ:

- Bổ sung ảnh thật của CLB và crop theo tỷ lệ reference — ưu tiên.
- Tạm dùng visual do AI tạo/tách từ bản thiết kế đã duyệt, nhưng mỗi ảnh phải là file riêng, không chứa chữ, tape, frame hoặc pattern. Ghi rõ đây là ảnh minh họa cho đến khi được thay bằng ảnh thật.

## 5. Quy tắc dựng layer

Thứ tự layer chuẩn:

1. Paper texture.
2. Hex/technical pattern.
3. Ảnh hoặc neutral media frame.
4. Polaroid border/tape.
5. Handwritten SVG.
6. HTML metadata và accessible label.

Không dùng crop nguyên section và không đặt text quan trọng bên trong raster image.
