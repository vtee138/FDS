# Antigravity Round 3 — Visual match theo approved-design

Đây là lượt chỉnh visual fidelity cuối trên code hiện tại. Không rollback nội dung đã xác minh ở Round 2. Không dựng lại repository. Không tự tạo art direction, card hoặc component không có trong reference.

## 1. Nguồn chuẩn và asset mới

Nguồn chuẩn duy nhất về bố cục:

```text
frontend\asset\landingpage\FDS_Assets\reference\approved-design.png
```

Merge lại toàn bộ asset mới nhất:

```text
frontend\asset\landingpage\FDS_Assets\frontend\public\fds\*
→ frontend\public\fds\
```

Đọc trước khi sửa:

```text
FDS_Assets\ASSET_GAP_AUDIT.md
FDS_Assets\ASSET_MAP.md
FDS_Assets\PATTERN_SYSTEM.md
FDS_Assets\TYPOGRAPHY.md
FDS_Assets\CONTENT_BRIEF.md
```

Các asset mới phải được dùng đúng section:

```text
/fds/decorations/note-paper.svg
/fds/decorations/fields-heading-hex.svg
/fds/decorations/section-left-hex-fragment.svg
/fds/decorations/community-hex-chain.svg
/fds/decorations/journey-corner-hex.svg
```

Không tiếp tục dùng `fields-hex-cluster.svg` hoặc `journey-hex-route.svg` nếu biến thể mới đã thay thế đúng hơn.

## 2. Chênh lệch đo được

Ảnh triển khai hiện tại được gửi review có kích thước `640 × 2048`, tỷ lệ chiều cao/chiều rộng `3.20`.

Reference đã duyệt có kích thước `787 × 1999`, tỷ lệ `2.54`.

Khi chuẩn hóa theo cùng chiều rộng, bản hiện tại dài và loãng hơn reference khoảng 26%. Đồng thời Hero title, logo navbar và minh họa bàn tay nhỏ hơn đáng kể so với tỷ lệ reference.

Không được sửa bằng cách scale toàn trang hoặc CSS `zoom`. Phải sửa container, typography, grid, padding và kích thước component thật.

Mục tiêu tại screenshot desktop 1440px:

- Full-page aspect ratio nên tiến gần reference; chiều cao dự kiến khoảng `3600–3950px`, cho phép chênh do copy thật khác mockup.
- Không chấp nhận trang tiếp tục dài khoảng `4500–4700px` chỉ vì padding, mô tả dài hoặc card xếp dọc không cần thiết.
- Container nội dung thực tế phải rộng `1220–1280px` tại viewport 1440px.
- Agent phải đo bằng `getBoundingClientRect()`, không chỉ đọc tên class Tailwind.

## 3. Hero phải được dựng lại theo geometry của reference

### 3.1 Desktop 1440px

```text
Hero content width: 1220–1280px
Hero content height: 580–650px, không tính navbar
Grid: 47–49% text / 51–53% visual
Grid gap: 24–48px
H1 visual width: 540–620px
H1 font size: 94–108px
H1 line height: 0.90–0.94
Hero illustration visible width: 500–590px
Hero illustration visible height: 540–640px
```

Hai dòng H1:

```text
Insights
in our eyes
```

Chỉ dòng hai italic. Không để H1 thành ba dòng tại desktop 1440px.

Text column và visual column không được overlap. Sau render, đo rectangle của:

```text
[data-hero-copy]
[data-hero-visual]
```

Hai rectangle không được giao nhau. Khoảng cách mép gần nhất tối thiểu 20px.

### 3.2 Minh họa

`hand-network.png` phải:

- Nền trong suốt.
- Không background rectangle.
- Không blend mode.
- Không opacity trên wrapper.
- Không bị crop mất quả cầu hoặc lòng bàn tay.
- Neo về bên phải và gần đáy Hero.
- Có tỷ lệ thị giác tương đương reference, không còn là một hình nhỏ giữa khoảng trống.

Nhãn `FPTU / Data Science / Club`, `PEOPLE / DATA / IDEAS / IMPACT` và `hero-note.svg` là các layer riêng. Chúng không được che đường nét quan trọng của bàn tay/quả cầu và không được đè lên Hero copy.

### 3.3 Không drag, không select

Hero image bắt buộc:

```tsx
<Image
  ...
  draggable={false}
  aria-hidden="true"
  className="fds-decorative ..."
/>
```

Thêm class dùng chung:

```css
.fds-decorative {
  pointer-events: none;
  user-select: none;
  -webkit-user-select: none;
  -webkit-user-drag: none;
}
```

Áp dụng cho mọi pattern, tape, lettering, connector và ảnh minh họa không tương tác. Không để người dùng kéo ghost image hoặc bôi xanh các decoration.

Với wrapper trang trí, dùng thêm:

```tsx
aria-hidden="true"
```

Không áp `pointer-events: none` cho link, button hoặc ảnh nằm trong link tương tác.

## 4. Navbar

Reference có navbar lớn hơn bản hiện tại.

Tại 1440px:

```text
Navbar height: 72–84px
Wordmark width: 118–132px
Content width: cùng container 1220–1280px
```

Không để logo chỉ rộng khoảng 70–90px. Menu và CTA không được quá nhỏ khi chụp full page.

## 5. About

Giữ copy thật và timeline, nhưng geometry phải giống reference:

- Text bên trái khoảng 52–56%.
- Media composition bên phải khoảng 44–48%.
- Heading lớn, tối đa hai dòng ở desktop.
- Ba trụ cột nằm cùng một hàng.
- Timeline nếu giữ lại phải rất gọn, không làm section cao hơn reference quá nhiều.

Không dùng navy profile card.

Khi chưa có ảnh thật, media placeholder phải giữ đúng kích thước ảnh reference, nhưng dùng:

- `note-paper.svg` cho note metadata nhỏ.
- Tape và lettering là layer riêng.
- `section-left-hex-fragment.svg` ở mép trái.

Placeholder không được chỉ là một card chữ nhỏ giữa khoảng trống lớn.

## 6. Fields

Dùng `fields-heading-hex.svg` ở phía phải heading, kèm text HTML:

```text
FROM KNOWLEDGE
TO REAL-WORLD IMPACT
```

Không nhúng text vào ảnh.

Bốn card phải nằm một hàng desktop, chiều cao đồng đều, gần sát mật độ reference. Không tăng padding card khiến toàn section cao không cần thiết.

## 7. Activities

Cấu trúc bắt buộc:

- Copy và danh sách hoạt động bên trái.
- Collage ba media frame bên phải trong cùng một grid.
- Ba frame xếp chồng, rotation nhẹ và có tape/lettering độc lập.

Không dùng một box danh sách SaaS. Không biến ba placeholder thành ba card thẳng hàng cứng nhắc.

Nếu bốn raster visual trong `ASSET_GAP_AUDIT.md` chưa có, giữ neutral frame đúng geometry và báo thiếu asset. Không tự phát minh card thay thế.

## 8. Section 04

Giữ nội dung đã xác minh:

- FDS Summer Challenge 2025.
- FDS Bootcamp 2026.
- FDS Prom 2026 — PawnRise.

Nhưng bố cục cần gần reference:

- Một panel trực quan lớn bên trái khoảng 60–64%.
- Một panel editorial chi tiết bên phải khoảng 36–40%.
- Không trải ba sáng kiến thành một chuỗi dài làm tăng chiều cao section.
- Có thể chuyển initiative bằng tab/selector accessible hoặc hiển thị initiative đầu tiên và danh sách chọn nhỏ.
- Không tạo dashboard metric giả.

## 9. Achievements, Community và Journey

### Achievements

Dùng một hàng ba cột như reference:

1. `03 thành viên` — đại diện sinh viên tốt nghiệp xuất sắc.
2. `05 thành viên` — nhận học bổng NITORI.
3. Một ghi chú định tính về học thuật/thực hành, không thêm số liệu giả.

Không dùng hai card lớn giữa section rồi để hai bên trống.

### Community

Ba ban phải nằm cùng một hàng desktop và có mật độ gần ba story card trong reference. Dùng `community-hex-chain.svg` ở rìa phải nếu không va chữ.

### Journey

Dùng `journey-corner-hex.svg`. Timeline chiếm gần toàn chiều rộng container như reference. Bốn mốc phân bố đều; CTA nằm dưới bên trái, không làm timeline lệch.

## 10. Typography

Giữ Playfair Display và Inter đã tải thành công, nhưng phải sửa scale theo reference.

Không chỉ báo `document.fonts.check() = true`; phải báo computed size của:

- Navbar wordmark bounding box.
- H1.
- About heading.
- Section heading.
- Body.

Hero H1 ở 1440px không được tiếp tục ở khoảng 89px nếu nó vẫn nhỏ rõ rệt so với reference. Mục tiêu 94–108px, sau đó chọn giá trị bằng screenshot comparison.

Section heading desktop nên nằm trong khoảng 46–62px tùy section. Body 16–18px. Không thu toàn trang bằng font nhỏ để cố nhét nội dung.

## 11. Density

Loại bỏ các nguyên nhân làm trang dài:

- Section padding quá 104px mà không có lý do.
- Copy lặp lại.
- Card description dài hơn 3–4 dòng.
- Timeline lịch sử chiếm nhiều hàng.
- Placeholder có min-height quá lớn.
- Margin dùng để đẩy decoration.

Section thông thường dùng padding desktop 64–88px. Hero và Activities có thể cao hơn vì composition, nhưng không dùng `min-height: 100vh`.

## 12. Visual verification bắt buộc

Chụp lại đúng viewport:

```text
Desktop: 1440 × full page, deviceScaleFactor 1
Mobile: 375 × full page, deviceScaleFactor 1
```

Trong report, ghi:

```text
window.innerWidth
document.documentElement.scrollWidth
document.documentElement.scrollHeight
devicePixelRatio
```

Tạo thêm bốn crop để review ở kích thước đọc được:

```text
evidence/compare/hero-current.png
evidence/compare/about-current.png
evidence/compare/activities-current.png
evidence/compare/footer-current.png
```

Đặt screenshot mới và `approved-design.png` cạnh nhau trong walkthrough. Không downscale screenshot đến mức che giấu sai lệch.

## 13. Kiểm tra interaction

Dùng Puppeteer kiểm tra:

- Hero image có attribute `draggable="false"`.
- Mọi `.fds-decorative` có `user-select: none`, `pointer-events: none` và `-webkit-user-drag: none`.
- Không có decoration tạo selection highlight khi drag chuột.
- Hero copy và Hero visual không overlap ở 1440, 1024 và 768px.
- Không có horizontal overflow ở 1440, 1024, 768, 375 và 320px.

## 14. Không được làm

- Không CSS zoom toàn trang.
- Không transform scale toàn layout.
- Không screenshot section làm background.
- Không tự tạo navy profile card, SaaS card hoặc dashboard metric.
- Không dùng report cũ làm bằng chứng cho code mới.
- Không tuyên bố “khớp reference” nếu chưa đưa số đo và screenshot mới.
- Không hoàn tác content corrections ở Round 2.

## 15. Báo cáo đầu ra

Cập nhật `frontend/ANTIGRAVITY_IMPLEMENTATION_REPORT.md` với:

1. Asset mới đã merge và asset nào được dùng ở section nào.
2. Số đo trước/sau của navbar, H1, Hero illustration và container.
3. Kết quả overlap rectangle.
4. Full-page height trước/sau.
5. Danh sách section đã giảm padding/height.
6. Cách chống drag/select decoration.
7. Các raster visual còn thiếu.
8. Screenshot desktop/mobile và bốn crop review.
9. TypeScript/build/console/asset/overflow test.
10. `git diff --stat`.
11. `git status --short`.
12. Sai lệch còn lại so với reference, nếu có.

Hoàn thành lượt sửa trên code hiện tại và trả report cùng ảnh. Không dừng ở bước viết plan.
