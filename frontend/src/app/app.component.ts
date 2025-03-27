import { Component } from '@angular/core';
import { ProductService } from './services/product.service';
import { Product } from './models/product.model';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, RouterModule, HttpClientModule, ProductListComponent, ProductFormComponent],
  standalone: true
})
export class AppComponent {
  showProductForm = false;
  selectedProduct: Product | null = null;
  categories: { id: number; categoryName: string }[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(private productService: ProductService) {
    this.loadCategories();
  }

  loadCategories(): void {
    this.isLoading = true;
    this.error = null;
    this.productService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.error = 'Có lỗi xảy ra khi tải danh sách danh mục';
        this.isLoading = false;
      }
    });
  }

  onAddProduct(): void {
    this.selectedProduct = null;
    this.showProductForm = true;
  }

  onEditProduct(product: Product): void {
    this.selectedProduct = product;
    this.showProductForm = true;
  }

  onProductSubmit(formData: FormData): void {
    this.isLoading = true;
    this.error = null;

    if (this.selectedProduct) {
      // Update existing product
      this.productService.updateProduct(this.selectedProduct.id, formData).subscribe({
        next: () => {
          this.showProductForm = false;
          this.selectedProduct = null;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error updating product:', error);
          this.error = 'Có lỗi xảy ra khi cập nhật sản phẩm';
          this.isLoading = false;
        }
      });
    } else {
      // Create new product
      this.productService.createProduct(formData).subscribe({
        next: () => {
          this.showProductForm = false;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error creating product:', error);
          this.error = 'Có lỗi xảy ra khi tạo sản phẩm mới';
          this.isLoading = false;
        }
      });
    }
  }

  onCancelForm(): void {
    this.showProductForm = false;
    this.selectedProduct = null;
    this.error = null;
  }
}
