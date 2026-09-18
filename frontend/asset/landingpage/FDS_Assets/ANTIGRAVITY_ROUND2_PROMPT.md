# Prompt vòng 2 cho Antigravity — FDS landing page

Bạn đang thực hiện vòng chỉnh sửa thứ hai cho landing page FDS. Trang đã chạy và đã có cấu trúc cơ bản; nhiệm vụ lần này là audit và sửa bản hiện tại cho sát `approved-design.png`, dùng nội dung thật và bộ asset mới nhất. Không dựng lại repository từ đầu.

## 1. Đường dẫn

```text
Repository: C:\Users\Administrator\Documents\Codespace\FDS
Frontend: C:\Users\Administrator\Documents\Codespace\FDS\frontend
Design pack: C:\Users\Administrator\Documents\Codespace\FDS\frontend\asset\landingpage\FDS_Assets
```

Trước khi sửa, bảo đảm `FDS_Assets` là bản mới nhất và merge lại:

```text
FDS_Assets\frontend\public\fds
→ frontend\public\fds
```

Không lồng sai thư mục. Không xóa asset đang được khu vực khác của ứng dụng sử dụng.

## 2. Đọc đầy đủ nguồn mới

Đọc theo thứ tự:

```text
FDS_Assets\reference\approved-design.png
FDS_Assets\CONTENT_BRIEF.md
FDS_Assets\TYPOGRAPHY.md
FDS_Assets\PATTERN_SYSTEM.md
FDS_Assets\ASSET_MAP.md
FDS_Assets\HUONG_DAN_AGENT.md
FDS_Assets\CACH_GEN_CHU.md
FDS_Assets\manifest.json
```

Thứ tự ưu tiên khi có xung đột:

1. Nội dung và trạng thái xác minh: `CONTENT_BRIEF.md`.
2. Bố cục và art direction: `approved-design.png`.
3. Typography: `TYPOGRAPHY.md`.
4. Pattern: `PATTERN_SYSTEM.md`.
5. Mapping asset: `ASSET_MAP.md`.
6. Code hiện tại.

## 3. Audit trạng thái trước khi sửa

Chạy và đọc:

```text
git status --short
git diff
package.json
postcss.config.js
tailwind.config.js
app/page.tsx
app/globals.css
app/components hoặc component landing page hiện tại
```

Không dùng `git reset --hard`. Giữ các thay đổi hợp lệ, nhưng có thể viết lại component do Claude/Antigravity tạo nếu chúng cản trở việc bám reference.

Xác minh Tailwind đang build thật. Chỉ giữ `puppeteer-core` và script screenshot trong dependency nếu chúng là công cụ kiểm thử có chủ đích trong repository; nếu chỉ cài tạm, ghi rõ và dọn hợp lý.

## 4. Những vấn đề đã thấy trong screenshot hiện tại

### 4.1 Mật độ bố cục

Trang hiện tại dài và loãng hơn reference: nhiều khoảng trắng lớn giữa Hero–About, Fields–Activities và trong Activities.

Sửa bằng cách:

- Dùng container desktop khoảng 1120–1240px tại viewport 1440px.
- Section thông thường dùng vertical padding khoảng 72–104px tùy nội dung.
- Không dùng `min-height: 100vh` cho mọi section.
- Không đặt margin/padding vài trăm pixel chỉ để đẩy collage.
- Collage và text phải cùng chia sẻ một section grid, không trôi thành hai vùng tách biệt.
- Giữ khoảng trắng editorial nhưng mỗi khoảng phải có mục đích thị giác.
- So tỷ lệ toàn trang với `approved-design.png`; không cần khớp chiều cao tuyệt đối nhưng phải gần mật độ của reference.

### 4.2 Ảnh crop từ mockup

Trong lượt trước đã tạo nhiều file bằng cách crop trực tiếp `approved-design.png`, gồm hoặc có thể gồm:

```text
about-ref-crop.png
about-text-crop.png
about-students.png
activities-ref-crop.png
activity-workshop.png
activity-group.png
activity-talk.png
project-ref-crop.png
community-ref-crop.png
journey-ref-crop.png
footer-ref-crop.png
achievements-ref-crop.png
fields-ref-crop.png
hero-full-ref-crop.png
```

Các file này chỉ là crop từ ảnh mockup có người AI, chữ giả hoặc UI giả. Không được dùng làm content production.

- Gỡ mọi import/reference tới các crop này.
- Xóa chúng khỏi `frontend/public/fds` hoặc chuyển ra ngoài public nếu cần giữ làm debug.
- Giữ nguyên `reference/approved-design.png` làm tài liệu so sánh.
- Tìm ảnh thật có sẵn trong repository và xác minh nguồn trước khi dùng.
- Nếu thiếu ảnh thật, giữ layout bằng khung media trung tính hoặc ẩn nội dung chưa có; không cắt người từ mockup.

### 4.3 Nội dung giả/cũ

Gỡ hoặc sửa các nội dung không có nguồn, có thể đang tồn tại trong code:

- `FDS Data Day` nếu chỉ là fallback do Claude tạo.
- `AI Mini Hackathon` nếu không có nguồn thật trong repository.
- `FDS Portal`, `Telegram Data Bootstrap`, `Data Bootcamp` cùng các metric dashboard nếu do agent tự tạo.
- Quote/testimonial, tên hoặc chức vụ không có nguồn.
- Số thành viên, số dự án, số sự kiện và đối tác không được xác minh.
- CTA đăng ký tuyển thành viên Gen 8 vì đợt này đã kết thúc.

Không đổi placeholder AI thành một placeholder AI khác.

## 5. Nội dung phải cập nhật từ CONTENT_BRIEF.md

### Hero

```text
Insights in our eyes
FPTU Data Science Club
Cộng đồng sinh viên yêu dữ liệu tại Đại học FPT.
Cùng học hỏi, nghiên cứu và tạo ra giá trị thực tiễn.
```

### About

Dùng thông tin:

- Câu lạc bộ khoa học dữ liệu đầu tiên tại Đại học FPT cơ sở Hà Nội.
- Định hướng Data Science, Big Data và AI.
- Có thể thêm timeline gọn:
  - 2018: tiền thân là CLB Xe tự hành.
  - Đầu 2020: FPT Innovation Club.
  - 01/11/2020: công bố tên FPTU Data Science Club.

Không gọi 01/11/2020 là ngày thành lập pháp lý.

### Lĩnh vực

Thay bốn mục hiện tại bằng:

```text
Data Science
Big Data
Artificial Intelligence
Học tập & Thực hành
```

Không tiếp tục khẳng định `Data Engineering` hoặc `Research` là định hướng chính thức khi brief không xác nhận.

Có thể tái sử dụng icon gần nghĩa nhưng alt và heading phải đúng nội dung. Nếu dùng icon database cho Big Data thì cập nhật tên file không bắt buộc, nhưng mapping phải được ghi trong báo cáo.

### Hoạt động nổi bật

Dùng hoạt động thật:

```text
FDS Summer Challenge
FDS Bootcamp 2026
FDS Prom 2026 — PawnRise
Workshop, talkshow và training nội bộ
```

Nếu có ảnh thật trong repo, dùng ảnh thật. Nếu chưa có, dùng layout dạng editorial text và media placeholder trung tính; không dùng crop người từ mockup.

### Dự án/Sáng kiến

Hiện chưa có dữ liệu dự án sản phẩm thật. Không hiển thị dashboard AI giả.

Chọn một trong hai cách, ưu tiên cách phù hợp dữ liệu hiện có:

1. Giữ section `Dự án tiêu biểu` nhưng hiển thị trạng thái nội dung đang được cập nhật, với bố cục hoàn chỉnh và không có metric giả.
2. Đổi thành `Sáng kiến tiêu biểu`, trình bày `FDS Summer Challenge 2025` và `FDS Bootcamp 2026` bằng dữ kiện thật, phân biệt rõ đây là cuộc thi/chương trình cộng đồng chứ không phải sản phẩm phần mềm.

Không dùng `EduInsight`, `FDS Portal` hoặc dashboard trong mockup như dự án thật.

### Dấu ấn

Hiển thị đúng:

```text
03 thành viên
Đại diện sinh viên tốt nghiệp xuất sắc

05 thành viên
Nhận học bổng NITORI
```

Diễn đạt đây là thành tích của thành viên. Không biến thành giải thưởng trực tiếp của CLB.

### Cộng đồng

Không dùng testimonial giả. Khi chưa có quote thật, thay ba quote card bằng cơ cấu ba ban:

```text
Ban Chuyên môn
Ban Truyền thông – Đối ngoại
Ban Văn hoá
```

Có thể giữ heading `Những người tạo nên FDS`, nhưng nội dung mô tả cách ba ban cùng vận hành CLB. Không publish tên Ban chủ nhiệm do thông tin Chủ nhiệm Gen 8 đang mâu thuẫn.

### Hành trình

```text
01 — Tìm hiểu
02 — Ứng tuyển
03 — Phỏng vấn
04 — Đồng hành
```

CTA:

```text
Theo dõi đợt tuyển tiếp theo
```

Link CTA tới Facebook hoặc Instagram chính thức. Không dùng form Gen 8 đã đóng.

### Footer

Dùng kênh thật trong `CONTENT_BRIEF.md`:

- Facebook.
- Instagram.
- TikTok.
- Email.
- Điện thoại.
- Kaggle.

Không tự đoán URL YouTube hoàn chỉnh.

## 6. Bố cục và style cần sửa

### Navbar

- Wordmark hiện hơi nhỏ; dùng 110–130px desktop như `TYPOGRAPHY.md`.
- Menu và CTA phải đọc được ở 1440px.
- CTA bo 2–4px, không pill.
- Kiểm tra anchor trỏ đúng section.
- Có menu mobile accessible.

### Hero

- Giữ bố cục hai cột.
- Phóng minh họa bàn tay/quả cầu gần tỷ lệ reference; không để nó thành icon nhỏ giữa khoảng trắng.
- Không bọc minh họa trong card, không glow.
- `hero-note.svg` đặt sát minh họa một lần.
- Dùng pattern mới theo mục 7.
- CTA chính bo 2–4px; CTA phụ là text link.

### About

- Heading và nội dung bên trái, media thật bên phải.
- Ba giá trị Học hỏi/Kết nối/Ứng dụng nằm cùng hàng ở desktop.
- Không dùng crop người từ mockup.
- Chữ viết tay và connector phải là lớp riêng.

### Fields

- Card hiện tại quá giống SaaS và quá tách rời. Giảm shadow, giảm radius, dùng border mảnh và bố cục editorial.
- Giữ bốn cột desktop nhưng cập nhật nội dung thật.

### Activities

- Thu gọn section; text và collage phải nằm trong cùng grid.
- Không để hàng trăm pixel trống phía trên hoặc dưới collage.
- Dùng ảnh thật hoặc media placeholder trung tính.
- Giữ ba SVG chữ viết tay, băng dính và độ nghiêng nhẹ.

### Dấu ấn, Community, Journey

- Giữ nền sáng và border mảnh.
- Dùng dữ liệu thật ở mục 5.
- Journey desktop nằm ngang, mobile nằm dọc.
- Không dùng nút `Đăng ký` cho đợt cũ.

### Footer

- Footer hiện đúng hướng; giữ nền navy và wordmark trắng.
- Tăng kích thước typography nếu đang quá nhỏ.
- Dùng social link thật.
- Giữ `footer-note-white.svg` bên phải.
- Không thêm banner CTA trước footer.

## 7. Áp dụng bộ pattern mới

Merge asset rồi dùng đúng:

```text
Hero:
/fds/decorations/hero-technical-frame.svg
/fds/decorations/hero-hex-rings.svg
/fds/decorations/technical-corner-lines.svg

About:
/fds/decorations/about-edge-hex.svg
/fds/decorations/about-note-connector.svg

Fields:
/fds/decorations/fields-hex-cluster.svg

Activities:
/fds/decorations/micro-node-line.svg
/fds/decorations/note-connector.svg

Achievements:
/fds/decorations/achievements-hex-cluster.svg

Journey:
/fds/decorations/journey-hex-route.svg
```

Đọc opacity, kích thước và mobile rule trong `PATTERN_SYSTEM.md`.

Không dùng một `hex-network.svg` lặp lại ở mọi section. Pattern phải `pointer-events: none`, `aria-hidden="true"`, nằm sau nội dung và không tạo overflow.

Các đường sau dựng bằng CSS:

- Border navbar.
- Divider section.
- Vạch dọc cạnh section index.
- Underline link.
- Timeline.
- Viền ảnh.
- Divider footer.

## 8. Typography

Áp dụng toàn bộ role trong `TYPOGRAPHY.md`.

- Slogan và section heading: serif editorial.
- Body/menu/CTA: sans-serif.
- Wordmark dùng SVG, không gõ FDS bằng font.
- Chữ viết tay dùng SVG tương ứng.
- Không dùng chữ viết tay trong button hoặc body.
- Không để tất cả text quá nhỏ như screenshot hiện tại.
- Đảm bảo fallback font không phá layout.

## 9. Kiểm thử và so sánh

Sau khi sửa:

1. Chạy build.
2. Chạy lint/type-check nếu có script.
3. Kiểm tra console.
4. Kiểm tra tất cả asset `/fds/...` trả 200.
5. Kiểm tra anchor và mobile menu.
6. Kiểm tra horizontal overflow tại 1440, 1024, 768, 375 và 320px.
7. Chụp desktop full-page 1440px và mobile full-page 375px.
8. Đặt screenshot cạnh `approved-design.png` và tự sửa các lệch lớn về mật độ, tỷ lệ Hero, typography, section spacing và pattern.

Không kết thúc ngay sau khi build pass; phải review bằng screenshot.

## 10. Dọn các artifact tạm

- Các crop debug từ reference không được nằm trong bundle production hoặc được import vào page.
- Screenshot test đặt trong thư mục evidence/report phù hợp, không trộn với asset production.
- Không commit file crop chỉ để agent quan sát.
- Không xóa ảnh thật hoặc asset người dùng cung cấp.

## 11. Báo cáo bắt buộc

Cập nhật:

```text
frontend\ANTIGRAVITY_IMPLEMENTATION_REPORT.md
```

Báo cáo phải có:

- Những thay đổi vòng hai.
- Danh sách crop mockup đã gỡ khỏi production.
- Mapping nội dung từ `CONTENT_BRIEF.md`.
- Mapping pattern theo section.
- Nội dung/ảnh thật còn thiếu.
- Files changed.
- Build, lint, type-check, console và overflow.
- Screenshot desktop/mobile mới.
- Sai khác còn lại so với reference và lý do.
- Dependency nào được thêm/giữ/gỡ.

Không báo hoàn tất nếu còn dùng ảnh người crop từ mockup, dữ liệu giả, taxonomy cũ, CTA Gen 8 hoặc screenshot chưa được review.
