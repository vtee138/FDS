# Cách tạo và tái sử dụng chữ viết tay FDS

> Tài liệu này chỉ dành cho wordmark và các cụm chữ viết tay dạng asset. Quy tắc cho toàn bộ text HTML/CSS trên landing page nằm trong `TYPOGRAPHY.md`; phải đọc cả hai file trước khi triển khai.

## 1. Nguồn phong cách và giới hạn
Dùng reference/approved-design.png và một SVG chữ đã duyệt trong lettering làm tham chiếu. Chữ được gen bằng công cụ tạo ảnh tích hợp, sau đó chuyển đường biên mực xanh sang SVG path. Không khẳng định đây là một font thương mại cụ thể. SVG là hình dạng chữ cố định, không phải bộ font đủ ký tự; muốn đổi câu phải gen hoặc vẽ lại.
Bản SVG không nhúng PNG, không phụ thuộc font, nền trong suốt thật. Chất lượng bám phong cách nhưng không trùng từng nét với mockup.

## 2. Danh sách chữ và xuống dòng
Ký hiệu / bên dưới biểu thị xuống dòng, không in dấu /.

| File | Nội dung | Vị trí |
|---|---|---|
| hero-note.svg | More data / Brighter people / A kinder tomorrow | Bên phải minh họa hero |
| about-note.svg | Good / Data / Brighter / People | Bên cạnh ảnh Về FDS |
| activities-list.svg | Workshops / Talkshows / Hackathons / and more... | Phía trên collage |
| activities-community.svg | A community / of curious minds | Góc dưới trái collage |
| activities-together.svg | Same / Questions / Bigger / Together | Góc phải collage |
| footer-note.svg | Data. / People. / A Brighter / Tomorrow. | Bản xanh để kiểm tra |
| footer-note-white.svg | Data. / People. / A Brighter / Tomorrow. | Footer navy |

Các cụm tiếng Anh được giữ theo thiết kế đã duyệt; đây là nội dung hình ảnh, không phải bằng chứng về hoạt động hay thành tích CLB.

## 3. Prompt gốc dùng cho từng cụm
Đính kèm ảnh thiết kế và một mẫu chữ. Chỉ yêu cầu một cụm mỗi lần:

> Tạo một asset chữ viết tay riêng cho website FDS, dựa theo ghi chú trong ảnh tham chiếu. Nội dung chính xác: [NỘI DUNG]. Xuống dòng: [DANH SÁCH DÒNG]. Nét bút bi mảnh, đều, tự nhiên, nghiêng phải, đường cơ sở hơi hướng lên, các dòng lệch nhẹ có chủ ý. Chữ bay bổng nhưng đọc được khi thu nhỏ. Mực xanh #2457A6, không gradient. Không brush đậm, không thư pháp trang trọng, không font italic serif. Không đốm mực, giấy nhăn, noise, glow hoặc bóng. Một cụm chữ, lề an toàn 8%, không cắt nét lên và xuống. Nền trong suốt thật có alpha; tuyệt đối không vẽ nền caro. Giữ đúng câu, chữ hoa và dấu câu. Không thêm slogan khác.

Nếu kết quả liên tục có caro giả, dùng nhánh ổn định để chuyển SVG:

> Giữ nét chữ xanh, xuất trên nền trắng thuần #FFFFFF, không texture, không caro, không đổ bóng. Sau bước này chữ sẽ được chuyển thành đường vector riêng.

Màu trắng cho footer nên tạo từ SVG xanh bằng cách đổi fill thành #F5F7FB. Không gen lại câu chỉ để đổi màu.

## 4. Chuyển thành SVG
- Tách riêng nét mực xanh theo độ chênh kênh màu (B-R > 35 và B-G > 12 phù hợp với các bản nguồn trong lần này). Đây là tham số theo nguồn, không dùng mù quáng cho màu khác.
- Loại các điểm rời nhỏ không thuộc chữ; giữ dấu chấm, dấu nháy và chấm trên i.
- Trace đường biên nét thành path; giữ các lỗ bên trong o, e, a, P bằng fill-rule="evenodd".
- Crop viewBox theo vùng chữ, chừa lề; không bóp méo tỉ lệ.
- Đặt fill cố định hoặc dùng currentColor khi inline. Xuất bản trắng bằng thay fill.
- Không đổi đuôi PNG thành SVG và không nhúng nguyên ảnh caro vào SVG.
- Không làm mượt mạnh khiến mất dấu chấm hoặc làm bệt các nét giao nhau.

## 5. Kiểm tra bắt buộc
1. Đọc từng từ và đối chiếu bảng nội dung.
2. Render trên cả nền #F5F7FB và #07152F với màu chữ tương ứng.
3. Kiểm tra ở chiều rộng thực tế 100–190px: chữ không bệt, không gãy đáng kể.
4. Không có nền trắng/caro, đốm xám, mép bị cắt hoặc lỗ chữ bị lấp.
5. SVG chỉ chứa vector path, không tham chiếu file tạm hoặc font cài trên máy.
6. Với PNG: RGBA và alpha có vùng 0 mới là điều kiện tối thiểu; vẫn cần xem nền có sạch không.

## 6. Cách dùng
```html
<img src="/fds/lettering/footer-note-white.svg"
     alt="Data. People. A Brighter Tomorrow."
     class="fds-footer-lettering" />
```
Nếu câu chỉ trang trí và đã được đọc ở nơi khác, dùng alt="" và aria-hidden="true". Không dùng một ảnh chữ nhỏ làm heading SEO.

## 7. Các chữ còn lại trên trang
Slogan Insights in our eyes, tên FPTU Data Science Club, heading từng section, menu, CTA, body, metadata, các dòng nhỏ DATA PEOPLE A BRIGHTER TOMORROW và FROM KNOWLEDGE TO REAL-WORLD IMPACT đều là text HTML. Không cần gen ảnh cho các chữ này: giữ responsive, tiếng Việt và khả năng chỉnh sửa.
- Hero và heading: serif tương phản nét thanh/đậm, gần mẫu; CSS kèm gợi ý Georgia làm fallback, không khẳng định đúng font gốc.
- Body và menu: sans-serif, cỡ đọc được.
- Nhãn nhỏ: uppercase, letter-spacing khoảng .12–.18em.
- Trích dẫn: serif italic; chỉ dùng lời thật được cung cấp.

## 8. Báo cáo cho PM sau mỗi lần gen
Nêu câu chữ, file nguồn tham chiếu, prompt thực tế, công cụ đã dùng, kích thước, định dạng, alpha hoặc cấu trúc SVG, ảnh kiểm tra trên hai nền, sai khác còn lại. Không gọi ảnh caro là đã tách nền.
