# RealEstateDoc Item Management System

Ứng dụng quản lý items với các chức năng cơ bản: tạo, cập nhật, đọc, xóa mềm, sắp xếp, lọc, tìm kiếm và tải lên tài liệu/hình ảnh.

## Công nghệ sử dụng

- Frontend: Angular 17
- Backend: NestJS
- Database: MS SQL Server
- ORM: TypeORM

## Yêu cầu hệ thống

- Node.js (v18 trở lên)
- MS SQL Server
- Angular CLI
- NestJS CLI

## Cài đặt

### Backend

1. Di chuyển vào thư mục backend:
```bash
cd backend
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Cấu hình database trong file `.env`:
```
DB_HOST=localhost
DB_PORT=1433
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=RealEstateDoc
```

4. Chạy migrations:
```bash
npm run migration:run
```

5. Khởi động server:
```bash
npm run start:dev
```

### Frontend

1. Di chuyển vào thư mục frontend:
```bash
cd frontend
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Khởi động ứng dụng:
```bash
ng serve
```

Ứng dụng sẽ chạy tại `http://localhost:4200`

## API Endpoints

### Items

- GET /api/items - Lấy danh sách items
- GET /api/items/:id - Lấy thông tin chi tiết item
- POST /api/items - Tạo item mới
- PUT /api/items/:id - Cập nhật item
- DELETE /api/items/:id - Xóa mềm item
- GET /api/items/search - Tìm kiếm items
- GET /api/items/sort - Sắp xếp items
- POST /api/items/upload - Tải lên file 