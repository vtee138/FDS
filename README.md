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
