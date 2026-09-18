# FDS Landing Page — Round 4 Visual Refinement

Bạn đang tiếp tục trên codebase hiện tại. Không dựng lại website từ đầu và không thay đổi nội dung đã được xác minh. Mục tiêu của vòng này là kéo visual về sát `reference/approved-design.png`, tập trung vào logo, typography, texture/pattern, editorial media treatment và footer.

## 0. Tài liệu bắt buộc phải đọc trước khi code

1. `TYPOGRAPHY.md` — mới, là nguồn chuẩn duy nhất cho font và type scale.
2. `PATTERN_SYSTEM.md` — mới, có nền giấy báo toàn trang, hai họ overlay và quy tắc watermark.
3. `ASSET_MAP.md` — đường dẫn asset và kích thước logo.
4. `CONTENT_BRIEF.md` — không sửa copy trái với dữ liệu đã xác minh.
5. `reference/approved-design.png` — chuẩn visual cuối cùng.

Không được triển khai trước khi đọc đủ năm mục.

## 1. Logo — thay ngay trong cùng vòng này

Navbar:

```text
/fds/brand/fds-wordmark-authentic-navy.png
```

Footer:

```text
/fds/brand/fds-wordmark-authentic-white.png
```

Quy tắc:

- Asset 1188×648, tỷ lệ 11:6, crop sát, nền trong suốt.
- Navbar desktop 152–156px; mobile 136–140px; `height:auto`.
- Footer 148–168px.
- Xóa mọi `h-10`, `h-12`, `max-h-*`, opacity, blur, brightness hoặc filter đang làm logo bé/mờ.
- `draggable={false}`, `user-select:none`, `object-fit:contain`.
- Không dùng lại hai SVG wordmark legacy.

## 2. Typography — không được “gần giống”

- Playfair Display: toàn bộ display serif.
- Be Vietnam Pro: body/UI/footer.
- IBM Plex Mono: eyebrow, số section, nhãn kỹ thuật nhỏ.
- Handwriting: chỉ dùng SVG trong `/fds/lettering/`.
- Dùng `next/font/google` theo đúng `TYPOGRAPHY.md`.
- Hero phải là `Insights` normal + `in our eyes` italic thật của Playfair Display; không skew.
- Không để trình duyệt fallback sang Times New Roman, Georgia hoặc Arial ở runtime.

## 3. Một nền giấy báo toàn trang, component đè lên

Giữ container desktop khoảng 1180–1220px. Không tăng width viewport/container để chữa cảm giác trống.

- Đặt `/fds/backgrounds/paper-newspaper-v3.webp` ở root `.fds-page`, repeat 627×627 CSS px.
- Đây là nền giấy duy nhất xuyên suốt tất cả section sáng. Không gán texture giấy khác cho từng section.
- Section/card/component để transparent hoặc dùng nền trắng bán trong suốt rất nhẹ rồi đè lên giấy.
- Trên nền giấy, luân phiên hai họ **overlay**: cụm hex/technical lines và `/fds/decorations/editorial-blueprint-loops.svg`.
- Pattern geometry hiện tại tăng độ hiện diện khoảng 10% so với bản đang chạy.
- Texture, pattern và component phải là ba lớp tách biệt; không nhúng toàn bộ thành screenshot nền.
- Chỉ dùng wash xanh radial cực nhẹ ở một số section; không tạo stripe trắng–xanh rõ ràng.

## 4. Chữ ký/watermark chìm trong container

Phần tinh tế còn thiếu là các nét handwriting cực mờ nằm phía sau card/container.

- Dùng lettering SVG phù hợp section, opacity 0.035–0.07.
- `mix-blend-mode:multiply` trên nền sáng.
- Kích thước 110–220px, crop một phần ở góc.
- Không phủ lên đoạn body dài hoặc vùng click.
- Không đặt giống hệt trong mọi card; mỗi section chỉ 1–2 watermark.
- Mục tiêu: nhìn lướt gần như không thấy, nhìn kỹ mới nhận ra và cảm nhận được chiều sâu.

## 5. Ảnh và băng dính

- Các ảnh editorial/polaroid phải có `tape-blue.svg` hoặc `tape-neutral.svg`.
- Mỗi khung 1 miếng tape, riêng collage tối đa 2–3 miếng; không dán mọi góc.
- Tape nằm trên viền ảnh, có rotate tự nhiên 1–4 độ, không che mặt người hoặc caption.
- Khung ảnh dùng nền giấy, viền 1px, shadow rất nhẹ; không dùng card SaaS bo tròn lớn.
- Nếu ảnh chưa có, giữ media frame trung tính nhưng vẫn phải có tape và caption đúng; không tự bịa ảnh hoặc UI.

## 6. Footer

Footer của reference là chuẩn:

- Navy `#07152F`, có wash xanh rất nhẹ.
- Dùng logo authentic trắng, không mờ.
- Giữ bố cục logo/copy trái, liên kết giữa, social/contact, lettering phải.
- Bản lettering rõ ở bên phải: opacity 0.72–0.88.
- Thêm một bản `footer-note-white.svg` lớn hơn nằm sau nội dung làm chữ ký chìm, opacity 0.025–0.045, crop ở cạnh phải/dưới.
- Có đường divider xanh mảnh phía trên copyright.
- Không có banner CTA trước footer.

## 7. Mật độ thị giác

- Không làm website ngang hơn.
- Giảm khoảng trắng bằng chi tiết nền, watermark, caption, tape và bố cục grid chặt; không nhồi thêm text giả.
- Section padding desktop 64–80px; mobile 48–64px.
- Card gap desktop 16–24px.
- Border 1px, radius 2–4px, shadow rất nhẹ.
- Pattern/lettering chỉ bổ trợ; heading và ảnh thật vẫn là ưu tiên thị giác.

## 8. Quy tắc không được vi phạm

- Không fake metrics, testimonial, nhân sự hoặc dự án.
- Không sử dụng mockup crop đã bị loại.
- Không tự phát minh section mới.
- Không thay đổi slogan/copy đã khóa.
- Không dùng pill button, glassmorphism, glow, gradient SaaS hoặc card bo tròn lớn.
- Không báo hoàn thành chỉ vì build pass.

## 9. Quy trình thực hiện

1. Audit computed styles và asset path hiện tại.
2. Đồng bộ asset mới vào `frontend/public/fds`.
3. Sửa font loading và type tokens trước.
4. Sửa logo navbar/footer.
5. Áp nền giấy toàn trang rồi triển khai hai họ overlay/pattern secondary.
6. Thêm watermark/tape có kiểm soát.
7. Chốt footer.
8. Chụp ảnh, so với reference, chỉnh tối thiểu một vòng visual QA.

## 10. Verification bắt buộc

- `npx tsc --noEmit`.
- `npm run build`.
- Screenshot full-page desktop 1440px và mobile 375px.
- Screenshot crop riêng Navbar, Hero, một section card, Activities collage và Footer.
- Kiểm tra 320/375/768/1024/1440 không overflow ngang.
- Kiểm tra Network: toàn bộ font và `/fds/*` asset HTTP 200/304.
- Kiểm tra console/hydration: 0 lỗi.

## 11. Báo cáo bàn giao bắt buộc

Trả lại một báo cáo Markdown gồm:

1. File đã sửa/tạo và lý do.
2. Mapping section → họ nền A/B → pattern → opacity thực tế.
3. Mapping ảnh → loại tape → vị trí.
4. Bảng logo: intrinsic size, rendered width desktop/mobile, computed opacity/filter.
5. Bảng computed typography cho 7 phần tử theo `TYPOGRAPHY.md`.
6. Bảng visual delta: reference yêu cầu gì, trước sai gì, đã sửa thế nào.
7. Kết quả build/typecheck/overflow/console/asset HTTP.
8. Link screenshot evidence.
9. Hạng mục nào chưa thể match và nguyên nhân; không được tự tuyên bố pixel-perfect.
