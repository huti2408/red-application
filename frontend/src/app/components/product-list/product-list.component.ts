import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html'
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
  private baseUrl = 'http://localhost:3000';

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

  getImageUrl(imageUrl: string | null): string | null {
    return imageUrl ? `${this.baseUrl}${imageUrl}` : null;
  }
} 