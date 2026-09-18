# FDS Background Pattern System

> Nguồn bố cục: `reference/approved-design.png`.  
> Các pattern trong thư mục `frontend/public/fds/decorations` được dựng bằng SVG để giữ nét ở mọi kích thước.

## 1. Pattern nào đặt ở đâu

| Section | Asset | Vị trí | Kích thước desktop | Opacity |
|---|---|---|---:|---:|
| Hero | `hero-technical-frame.svg` | Bao quanh vùng minh họa bàn tay, nằm phía sau ảnh | 600–760px | 0.55–0.75 |
| Hero | `hero-hex-rings.svg` | Góc trên phải, có thể bị crop một phần | 180–260px | 0.45–0.65 |
| Hero | `technical-corner-lines.svg` | Sau nhãn nhỏ ở rìa phải/trái | 160–240px | 0.35–0.55 |
| About | `about-edge-hex.svg` | Mép trái section, crop khoảng 35–55% | 130–170px | 0.72–0.82 |
| About | `about-note-connector.svg` | Sau ghi chú viết tay và ảnh | 180–280px | 0.5–0.7 |
| About | `note-paper.svg` | Nền cho note metadata nhỏ, text overlay bằng HTML | 150–230px | 0.8–1 |
| Fields | `fields-heading-hex.svg` | Góc phải phía trên, gần annotation | 230–340px | 0.45–0.65 |
| Activities | `editorial-blueprint-loops.svg` + tối đa một `micro-node-line.svg` | Blueprint lớn phía sau collage; đường nhỏ nối ghi chú khi còn khoảng trống | 520–720px | 0.28–0.36 |
| Projects | `technical-corner-lines.svg` | Rìa card preview, dùng tối đa một cụm | 140–220px | 0.25–0.45 |
| Achievements | `achievements-hex-cluster.svg` | Góc trên phải section | 210–290px | 0.68–0.78 |
| Community | `community-hex-chain.svg` | Mép phải, chạy dọc xuống section | 230–360px | 0.4–0.6 |
| Journey | `journey-corner-hex.svg` | Mép phải, nối thị giác với timeline | 280–400px | 0.68–0.78 |
| Footer | `backgrounds/footer-wash.svg` | Cover toàn footer | cover | 1 |

## 1A. Một nền giấy gốc, hai họ overlay

Website không dùng nền trắng phẳng và cũng không thay ảnh nền theo từng section. Toàn bộ phần sáng dùng một texture xuyên suốt:

```css
.fds-page {
  background-color: #F2F6FB;
  background-image: url('/fds/backgrounds/paper-newspaper-v3.webp');
  background-repeat: repeat;
  background-size: 627px 627px;
}
```

File v3 đã được xử lý để tile liền mép. Section/card/component nằm phía trên và mặc định transparent.

### Overlay A — Geometry

- Cụm hex/technical line đúng theo bảng section.
- Opacity desktop tăng khoảng **10% so với Round 3**, tức khoảng `0.55–0.68` thay vì `0.45–0.58`.
- Dùng cho Hero, Fields, Achievements và Journey.

### Overlay B — Blueprint loops

- Dùng `decorations/editorial-blueprint-loops.svg`, opacity `0.12–0.18`; crop ở rìa, không chạy qua chữ.
- Có thể thêm radial wash xanh opacity tối đa `0.055` nhưng không thêm ảnh texture khác.
- Dùng cho About, Activities, Projects và Community.

Hai họ này chỉ là overlay trang trí trên cùng một tờ giấy; tuyệt đối không tạo stripe xanh/trắng giữa các section.

### Watermark chữ viết tay trong container

- Tái sử dụng lettering SVG phù hợp với section.
- Opacity `0.035–0.07`, `mix-blend-mode: multiply`, kích thước 110–220px.
- Đặt ở góc hoặc crop 25–45%; chỉ nhận ra khi nhìn kỹ.
- Mỗi section tối đa 1–2 watermark, không đóng dấu mọi card giống nhau.
- Footer: một `footer-note-white.svg` cỡ lớn opacity `0.025–0.045` làm chữ ký chìm và một bản rõ opacity `0.72–0.88` ở cột phải.

Các asset cũ `hex-network.svg`, `hex-corner-left.svg`, `about-edge-hex.svg`, `fields-hex-cluster.svg`, `journey-hex-route.svg` và `hero-frame.svg` được giữ để tương thích, nhưng khi bám `approved-design.png` hãy ưu tiên các biến thể chính xác ở bảng trên.

## 2. Các đường cần dựng bằng CSS

Những đường sau là thành phần layout, không phải ảnh nền:

- Border dưới navbar.
- Đường phân cách ngang giữa các section.
- Vạch dọc bên trái `01. VỀ FDS`, `02. LĨNH VỰC HOẠT ĐỘ`, v.v.
- Đường timeline nối bốn bước tuyển thành viên.
- Underline của text link.
- Viền khung ảnh và đường chia cột.
- Đường phân cách phía trên copyright footer.

Không lấy screenshot của các đường này làm ảnh. Dựng bằng border hoặc pseudo-element để responsive chính xác.

```css
.fds-section-label {
  position: relative;
  padding-left: 0.9rem;
}

.fds-section-label::before {
  content: "";
  position: absolute;
  inset: 0 auto 0 0;
  width: 1px;
  background: #9fbbe1;
}

.fds-section + .fds-section {
  border-top: 1px solid rgba(16, 42, 92, 0.08);
}
```

## 3. Cách đặt SVG

```tsx
<Image
  src="/fds/decorations/fields-heading-hex.svg"
  alt=""
  aria-hidden="true"
  width={360}
  height={250}
  className="pointer-events-none absolute right-0 top-0 opacity-55"
/>
```

- Section chứa pattern phải có `position: relative` và `overflow: hidden` khi cần crop.
- Pattern dùng `pointer-events: none`, `user-select: none` và `aria-hidden="true"`.
- Pattern nằm sau content bằng `z-index`; không được phủ chữ hoặc vùng click.
- Không dùng cùng một pattern ba lần trong một section.
- Không dùng cùng một họ pattern cho tất cả section; phải luân phiên Overlay A/Overlay B trên cùng nền giấy.
- Không xoay ngẫu nhiên; các cụm đã có hướng tương ứng với reference.

## 4. Mobile

- Hero giữ frame nhưng giảm opacity; có thể ẩn `hero-hex-rings.svg` ở dưới 480px nếu làm chật minh họa.
- About chỉ giữ một phần `about-edge-hex.svg` hoặc ẩn nếu va nội dung.
- Fields và Achievements giảm pattern xuống 120–180px.
- Journey đặt `journey-hex-route.svg` sau timeline với opacity 0.2–0.35 hoặc ẩn ở 320px.
- Không để pattern tạo horizontal overflow; parent phải quản lý crop.

## 5. Kiểm tra

- So ảnh desktop với reference: pattern đúng section, đúng rìa và đúng mật độ.
- Không có pattern nổi hơn heading hoặc ảnh chính; tuy nhiên pattern phải nhận ra được ngay ở zoom 100% và vẫn còn thấy trong screenshot full-page 1440px. Nếu chỉ thấy khi nheo mắt hoặc crop/phóng to thì coi là chưa đạt.
- Không có đường hex chạy qua body text.
- Không tạo thanh cuộn ngang ở 320px.
- Tất cả SVG load 200 và không có nền trắng.
- Texture giấy vẫn là lớp riêng, không nhúng vào từng pattern.
