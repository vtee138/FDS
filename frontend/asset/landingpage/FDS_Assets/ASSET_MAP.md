# Bản đồ asset — bản bổ sung

> Pattern nền chi tiết theo từng section nằm trong `PATTERN_SYSTEM.md`. Phải đọc file đó thay vì chỉ dùng một `hex-network.svg` chung cho toàn trang.

Toàn bộ đường dẫn dưới đây tính từ frontend/public/fds. Gói này chứa cả asset cũ và mới.

| Vị trí | File | Cách đặt |
|---|---|---|
| Navbar | brand/fds-wordmark-authentic-navy.png | **Ưu tiên**; bản crop sát, alpha cứng, nền trong suốt. Desktop `148–156px`, mobile `124–136px`, chiều cao tự động; không đặt opacity/filter |
| Footer | brand/fds-wordmark-authentic-white.png | **Ưu tiên**; bản trắng crop sát, nền trong suốt. Desktop `148–168px`, mobile `132–148px`; không đặt opacity/filter |
| Logo legacy | brand/fds-wordmark.svg, brand/fds-wordmark-white.svg | Bản tái dựng cũ; giữ tương thích nhưng không ưu tiên khi đã có bản authentic |
| Hero | hero/hand-network.png | contain, không crop |
| Hero | lettering/hero-note.svg | 120–180px, sát minh họa |
| Hero | decorations/hero-frame.svg | absolute phía sau, không cản tương tác |
| Nền giấy báo toàn trang | backgrounds/paper-newspaper-v3.webp | **Nền chính bắt buộc** cho toàn bộ phần sáng; repeat ở 627×627 CSS px, component/section đặt trong suốt phía trên |
| Texture legacy | backgrounds/paper-light.png, backgrounds/paper-editorial-v2.png | Chỉ giữ để tương thích; không xếp chồng lên nền v3 khi bám bản duyệt mới |
| Pattern nền loại B | decorations/editorial-blueprint-loops.svg | đường cong blueprint/nodes khác với họ hex; đặt ở rìa section, opacity .12–.18 |
| Các góc section | decorations/hex-network.svg | width 180–320px, opacity .4–.65 |
| Góc trái | decorations/hex-corner-left.svg | bám rìa, được cắt nhẹ như mẫu |
| Chú thích bên ảnh | decorations/note-connector.svg | đường nối mảnh |
| Nền note nhỏ | decorations/note-paper.svg | chỉ là nền giấy; text đặt bằng HTML |
| Mép trái section | decorations/section-left-hex-fragment.svg | bám rìa, crop một phần |
| Về FDS | lettering/about-note.svg | cạnh khung ảnh |
| Khung ảnh | decorations/tape-blue.svg, tape-neutral.svg | xoay nhẹ bằng CSS |
| Hoạt động | lettering/activities-list.svg | phía trên ảnh |
| Hoạt động | lettering/activities-community.svg | góc dưới trái |
| Hoạt động | lettering/activities-together.svg | góc phải |
| Header Fields | decorations/fields-heading-hex.svg | cụm hai hex bên phải heading |
| Community | decorations/community-hex-chain.svg | chuỗi hex chạy xuống mép phải |
| Journey | decorations/journey-corner-hex.svg | cụm hex góc phải, sau timeline |
| Footer | lettering/footer-note-white.svg | bên phải, 130–190px |
| Nền footer | backgrounds/footer-wash.svg | cover; không núi, không banner CTA |
| Chuyên môn/thành tích | icons/*.svg | như gói trước |

## Trạng thái và nguồn
- Hai file `fds-wordmark-authentic-*.png` được tách alpha trực tiếp từ ảnh logo CLB do người dùng cung cấp, giữ nguyên hình học FDS và dòng `FPTU DATA SCIENCE CLUB`. Asset đã được crop sát và làm alpha nhị phân ở độ phân giải 1188×648 để tránh viền mờ do nền/grid cũ. Dùng bản navy trên nền sáng và bản trắng ở footer. Render bằng `width/height` đúng tỷ lệ 11:6, `object-fit: contain`, không `opacity`, không `filter`, không bọc trong khung có nền. Các SVG cũ chỉ là bản tái dựng và không còn là lựa chọn ưu tiên.
- Chữ viết tay là các bản gen riêng, đã trace thành vector. File footer trắng được đổi fill từ cùng path xanh.
- Họa tiết hình học là SVG dựng bằng code theo bố cục; texture giấy do AI tạo, không phải crop nguyên pixel từ screenshot.
- `paper-newspaper-v3.webp` là texture giấy báo/editorial nền gốc: trắng lạnh pha xanh, có thớ giấy và print-grain rất nhẹ, không chứa pattern, chữ hoặc component. File đã xử lý để tile liền mép.
- Chỉ dùng một nền giấy xuyên suốt phần sáng. Các section luân phiên **overlay** geometry hoặc blueprint loops, không luân phiên ảnh nền giấy và không tăng chiều rộng container để chữa cảm giác trống.
- Các lettering SVG có thể được tái sử dụng có kiểm soát làm watermark trong container ở opacity .035–.07. Footer được phép có thêm một bản `footer-note-white.svg` lớn opacity .025–.045 làm chữ ký chìm.
- Gói chưa chứa bốn raster visual chất lượng production cho About và Activities. Ưu tiên ảnh thật; nếu dùng hình tách/tái tạo từ bản gen thì phải ghi rõ là ảnh minh họa và giữ mỗi ảnh thành file độc lập.
- Ảnh reference dùng để đối chiếu bố cục; không lấy tên người, số liệu, testimonial hoặc dự án trong ảnh làm dữ kiện.
- Danh sách đầy đủ phần còn thiếu và ranh giới HTML/CSS nằm trong `ASSET_GAP_AUDIT.md`.
