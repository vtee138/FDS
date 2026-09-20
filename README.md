# FDS Product Suite

Bộ sản phẩm website cho FPTU Data Science Club (FDS): public website, admin dashboard và API.

## Chạy bằng Docker

```bash
docker compose up --build
```

- Frontend: http://localhost:3000
- Admin: http://localhost:5173
- Backend API: http://localhost:4000
- PostgreSQL: localhost:5433

Backend tự chờ PostgreSQL healthy, chạy Prisma migration, seed dữ liệu mẫu và kết nối qua:

```txt
postgresql://fds:fds_password@postgres:5432/fds_db?schema=public
```

## Chạy dev cục bộ

```bash
npm run db:up
npm --prefix backend install
$env:DATABASE_URL="postgresql://fds:fds_password@localhost:5433/fds_db?schema=public"
npm --prefix backend run prisma:migrate
npm --prefix backend run start:dev

npm --prefix frontend install
npm --prefix frontend run dev

npm --prefix admin install
npm --prefix admin run dev
```

## Cấu hình Google OAuth

Để tính năng "Đăng nhập bằng Google" hoạt động, bạn cần cung cấp thông tin Client ID và Client Secret từ Google Cloud:

1. Truy cập [Google Cloud Console](https://console.cloud.google.com/).
2. Tạo dự án mới hoặc chọn dự án hiện có.
3. Chuyển đến mục **APIs & Services > Credentials**.
4. Tạo **OAuth client ID** mới (Loại ứng dụng: Web application).
5. Thêm URI chuyển hướng (Authorized redirect URIs): `http://localhost:4000/auth/google/callback`
6. Mở file `docker-compose.yml` trong mã nguồn và cập nhật phần `environment` của service `backend`:

```yaml
    environment:
      # ... các cấu hình khác ...
      GOOGLE_CLIENT_ID: "Client-ID-của-bạn-tại-đây"
      GOOGLE_CLIENT_SECRET: "Client-Secret-của-bạn-tại-đây"
      GOOGLE_CALLBACK_URL: "http://localhost:4000/auth/google/callback"
```

Sau khi sửa file cấu hình, hãy khởi động lại ứng dụng bằng lệnh:

```bash
docker compose up -d
```
