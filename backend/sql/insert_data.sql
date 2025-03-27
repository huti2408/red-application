INSERT INTO categories (name) VALUES
(N'Điện thoại'),
(N'Laptop'),
(N'Phụ kiện'),
(N'Đồng hồ');
GO

INSERT INTO products (productName, description, price, categoryId) VALUES
(N'iPhone 14 Pro Max', N'Điện thoại iPhone 14 Pro Max 256GB', 29990000, 1),
(N'Samsung Galaxy S23 Ultra', N'Điện thoại Samsung Galaxy S23 Ultra 512GB', 27990000, 1),
(N'MacBook Pro M2', N'Laptop MacBook Pro M2 14 inch', 39990000, 2),
(N'Dell XPS 13', N'Laptop Dell XPS 13 9315', 29990000, 2),
(N'Tai nghe Bluetooth', N'Tai nghe không dây chống ồn', 2900000, 3),
(N'Bàn phím cơ', N'Bàn phím cơ RGB', 1900000, 3),
(N'Apple Watch Series 8', N'Đồng hồ thông minh Apple Watch Series 8', 15990000, 4),
(N'Samsung Galaxy Watch 5', N'Đồng hồ thông minh Samsung Galaxy Watch 5', 9990000, 4);
GO 