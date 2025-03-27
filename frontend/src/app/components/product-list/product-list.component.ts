import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-4">
      <h2>Danh sách sản phẩm</h2>
      
      <!-- Search and Filter -->
      <div class="row mb-3">
        <div class="col-md-3">
          <input type="text" class="form-control" placeholder="Tìm kiếm..." [(ngModel)]="search">
        </div>
        <div class="col-md-3">
          <select class="form-control" [(ngModel)]="sortBy">
            <option value="">Sắp xếp theo</option>
            <option value="productName">Tên sản phẩm</option>
            <option value="price">Giá</option>
          </select>
        </div>
        <div class="col-md-3">
          <select class="form-control" [(ngModel)]="sortOrder">
            <option value="ASC">Tăng dần</option>
            <option value="DESC">Giảm dần</option>
          </select>
        </div>
        <div class="col-md-3">
          <button class="btn btn-primary" (click)="loadProducts()">Tìm kiếm</button>
        </div>
      </div>

      <!-- Error Message -->
      <div *ngIf="error" class="alert alert-danger">
        {{ error }}
      </div>

      <!-- Loading Spinner -->
      <div *ngIf="isLoading" class="text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Đang tải...</span>
        </div>
      </div>

      <!-- Product Table -->
      <table *ngIf="!isLoading" class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên sản phẩm</th>
            <th>Danh mục</th>
            <th>Giá</th>
            <th>Hình ảnh</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let product of products">
            <td>{{ product.id }}</td>
            <td>{{ product.productName }}</td>
            <td>{{ product.category?.categoryName }}</td>
            <td>{{ product.price | currency:'VND' }}</td>
            <td>
              <img *ngIf="product.imageUrl" [src]="product.imageUrl" alt="Product image" style="max-width: 50px;">
            </td>
            <td>
              <button class="btn btn-sm btn-info me-2" (click)="onEditProduct(product)">Sửa</button>
              <button class="btn btn-sm btn-danger" (click)="confirmDelete(product.id)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- No Products Message -->
      <div *ngIf="!isLoading && products.length === 0" class="alert alert-info">
        Không có sản phẩm nào
      </div>

      <!-- Pagination -->
      <nav *ngIf="!isLoading && totalPages > 1">
        <ul class="pagination">
          <li class="page-item" [class.disabled]="currentPage === 1">
            <a class="page-link" (click)="changePage(currentPage - 1)">Trước</a>
          </li>
          <li class="page-item" *ngFor="let page of getPages()" [class.active]="page === currentPage">
            <a class="page-link" (click)="changePage(page)">{{ page }}</a>
          </li>
          <li class="page-item" [class.disabled]="currentPage === totalPages">
            <a class="page-link" (click)="changePage(currentPage + 1)">Sau</a>
          </li>
        </ul>
      </nav>
    </div>
  `,
  styles: [`
    .pagination {
      cursor: pointer;
    }
    .page-link {
      cursor: pointer;
    }
  `]
})
export class ProductListComponent implements OnInit {
  @Output() editProduct = new EventEmitter<Product>();
  
  products: Product[] = [];
  currentPage = 1;
  totalPages = 1;
  search = '';
  sortBy = '';
  sortOrder: 'ASC' | 'DESC' = 'ASC';
  isLoading = false;
  error: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.error = null;
    
    this.productService.getProducts(this.currentPage, this.search, this.sortBy, this.sortOrder)
      .subscribe({
        next: (response) => {
          this.products = response.data || [];
          this.totalPages = response.meta.totalPages;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading products:', error);
          this.error = 'Có lỗi xảy ra khi tải danh sách sản phẩm';
          this.isLoading = false;
        }
      });
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadProducts();
    }
  }

  getPages(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  onEditProduct(product: Product): void {
    this.editProduct.emit(product);
  }

  confirmDelete(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      this.deleteProduct(id);
    }
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.loadProducts();
      },
      error: (error) => {
        console.error('Error deleting product:', error);
      }
    });
  }
} 