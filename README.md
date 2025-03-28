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

#### 1. Di chuyển vào thư mục backend:
```bash
cd backend
```

#### 2. Cài đặt dependencies:
```bash
npm install
```
#### 3. Tạo Database và User
1. Mở SQL Server Management Studio
2. Kết nối với SQL Server của bạn
3. Mở file `sql/init.sql` và chạy các câu lệnh SQL để:
   - Tạo database REDDB
   - Tạo user red_user với password yourpassword
   - Cấp quyền db_owner cho user
#### 4. Cấu hình database trong file `.env`:
```
DB_HOST=localhost
DB_PORT=1433
DB_USERNAME=your_username
DB_PASSWORD=yourpassword
DB_DATABASE=REDDB
```

#### 5. Khởi động server:
```bash
npm start
```
Ứng dụng sẽ chạy tại `http://localhost:3000`
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

#### Categories
- GET `/categories` - Lấy danh sách categories

#### Products
- GET `/products` - Lấy danh sách sản phẩm
- GET `/products/:id` - Lấy chi tiết sản phẩm
- POST `/products` - Tạo sản phẩm mới
- PUT `/products/:id` - Cập nhật sản phẩm
- DELETE `/products/:id` - Xóa sản phẩm
- GET `/products/category/:categoryId` - Lấy sản phẩm theo category