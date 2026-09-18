# Bộ asset FDS — giao diện sáng đã duyệt

## Phạm vi
Đây là gói để chép vào repository, chưa phải thay đổi trên repository của người dùng. Chép thư mục frontend/public/fds vào frontend/public/fds của dự án. Xem reference/approved-design.png để dựng giao diện. Các SVG là bản dựng vector theo phong cách tham chiếu, không phải cắt nguyên pixel từ ảnh. Hero là ảnh AI tái dựng riêng, có thể khác một số nét so với mockup.

## Ánh xạ section
| Section | Asset / cách dựng |
|---|---|
| Navbar | Dùng wordmark FDS gốc trong repo, chữ tên CLB dưới logo như mẫu; không dùng logo AI |
| Hero | /fds/hero/hand-network.png; slogan Insights in our eyes; tên FPTU Data Science Club; text HTML |
| Về FDS | Ảnh thật từ CLB, khung ảnh và xoay bằng CSS; tape-blue.svg; chữ viết tay dùng font được phép sử dụng |
| Lĩnh vực | data-science.svg, ai-network.svg, data-engineering.svg, research.svg |
| Hoạt động | Ảnh thật, CSS rotate và overlap; tape-blue.svg; ghi chú dạng text |
| Dự án | Screenshot dự án thật; không dùng EduInsight trong mockup như dự án xác thực |
| Dấu ấn | academic.svg, project.svg, community.svg; nền sáng |
| Cộng đồng | Ảnh thật và lời chia sẻ đã được cung cấp; thiếu thì để placeholder rõ ràng |
| Hành trình | Số bước, đường kẻ, nút bằng HTML/CSS; hex-network.svg ở góc |
| Footer | Navy; logo gốc; link dạng text; chữ viết tay Data. People. A Brighter Tomorrow. |

## Yêu cầu triển khai
- Đọc source trước khi sửa, tái sử dụng stack và component sẵn có.
- Light mode là mặc định. Quyết định này mới hơn color.md dark-first trước đó. Nền #F5F7FB, chữ #07152F, accent #2457A6, footer #07152F. Không áp dụng nền tối toàn trang từ tài liệu cũ.
- Bố cục, serif, khoảng thở và collage theo ảnh đã duyệt. Nút navy phẳng, bo 2–4px; CTA phụ là text link. Không glow, không núi, không banner Ready to be part.
- Hero PNG dùng object-fit: contain, không crop. Họa tiết trang trí aria-hidden, pointer-events none.
- SVG độc lập có nền trong suốt. Các icon đồng bộ stroke; khi cần đổi màu hãy inline SVG và dùng currentColor.
- Chữ giao diện là HTML, không cắt ảnh cả section để thay giao diện.
- Chữ viết tay footer đã có lettering/footer-note-white.svg. Dùng bản này; xem CACH_GEN_CHU.md nếu cần tạo câu mới.
- Chú thích viết tay hero/about/activities có SVG tương ứng trong lettering. Text giao diện thường xuyên thay đổi vẫn dựng HTML.
- Khung ảnh nghiêng, băng dính và lục giác được tiết chế; trên mobile xếp lại theo luồng đọc, không tràn ngang.
- Logo chính thức, ảnh thành viên, ảnh hoạt động và screenshot dự án là đầu vào còn cần lấy từ repo hoặc người dùng. Không biến ảnh AI và số liệu trong reference thành dữ kiện thật.
- Chưa deploy nếu không có yêu cầu. Chụp desktop/mobile để so với reference.

## Báo cáo bắt buộc gửi lại PM
Liệt kê file sửa; asset sử dụng theo section; ảnh desktop/mobile; kết quả build/lint; sai khác so với reference và lý do; nội dung thật còn thiếu; hạng mục chưa hoàn thành. Không báo hoàn tất nếu còn lỗi build hoặc thiếu section mà chưa giải thích.

## Bổ sung mới nhất
Đọc CONTENT_BRIEF.md, ASSET_MAP.md, PATTERN_SYSTEM.md, CACH_GEN_CHU.md và TYPOGRAPHY.md trước khi triển khai. CONTENT_BRIEF.md là nguồn nội dung công khai do chủ dự án cung cấp và thay thế các placeholder AI trong mockup. PATTERN_SYSTEM.md ánh xạ đầy đủ các cụm hex, đường kỹ thuật và đường CSS theo từng section. TYPOGRAPHY.md là nguồn quy tắc cho toàn bộ text HTML/CSS; CACH_GEN_CHU.md chỉ quản lý wordmark và chữ viết tay dạng asset. Có logo tái dựng ở brand, chữ vector ở lettering và nền ở backgrounds. CSS trong asset-usage.css là ví dụ, cần import vào app. Logo cần đối chiếu bản chính thức; không tự gọi là logo gốc.

## Prompt chỉnh sửa vòng hai

Nếu đã có bản Antigravity/Claude dựng nhưng còn lệch reference, dùng `ANTIGRAVITY_ROUND2_PROMPT.md`. Prompt này xử lý dữ liệu thật, gỡ crop mockup, thu mật độ bố cục và áp hệ pattern mới.

Nếu Round 2 đã đúng nội dung nhưng vẫn lệch mạnh về tỷ lệ, typography, layer hoặc interaction, dùng `ANTIGRAVITY_ROUND3_VISUAL_MATCH_PROMPT.md`. Prompt này yêu cầu merge asset bổ sung, đo geometry thật, chống drag/select decoration và so sánh screenshot với reference.
