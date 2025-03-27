## Backend setup

# Backend API

## Yêu cầu hệ thống
- Node.js
- SQL Server
- npm hoặc yarn

## Cài đặt

### 1. Cấu hình Database

#### 1.1. Tạo Database và User
1. Mở SQL Server Management Studio
2. Kết nối với SQL Server của bạn
3. Mở file `sql/init.sql` và chạy các câu lệnh SQL để:
   - Tạo database REDDB
   - Tạo user red_user với password kCKTXxjrMkLNvD89
   - Cấp quyền db_owner cho user

#### 1.2. Cấu hình Kết Nối
1. Tạo file `.env` trong thư mục gốc của project với nội dung:
```env
DB_HOST=localhost
DB_PORT=1433
DB_USERNAME=red_user
DB_PASSWORD=kCKTXxjrMkLNvD89
DB_DATABASE=REDDB
```

### 2. Cài đặt Dependencies
```bash
npm install
```

### 3. Chạy Chương Trình
```bash
npm start
```
Chương trình sẽ tự động tạo các bảng trong database dựa trên các entity đã định nghĩa.

### 4. Insert Dữ Liệu Mẫu
1. Mở file `sql/init.sql`
2. Chạy các câu lệnh INSERT để thêm dữ liệu mẫu:
   - 4 categories: Điện thoại, Laptop, Phụ kiện, Đồng hồ
   - 8 products thuộc các categories tương ứng

## API Endpoints

### Categories
- GET `/categories` - Lấy danh sách categories

### Products
- GET `/products` - Lấy danh sách sản phẩm
- GET `/products/:id` - Lấy chi tiết sản phẩm
- POST `/products` - Tạo sản phẩm mới
- PUT `/products/:id` - Cập nhật sản phẩm
- DELETE `/products/:id` - Xóa sản phẩm
- POST `/products/upload/:id` - Upload ảnh sản phẩm
- GET `/products/category/:categoryId` - Lấy sản phẩm theo category

## Lưu ý
- Đảm bảo SQL Server đang chạy và có thể kết nối được
- Port mặc định của ứng dụng là 3000

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```