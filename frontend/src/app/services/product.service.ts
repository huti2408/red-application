import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductResponse } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getProducts(page: number = 1, search: string = '', sortBy: string = '', sortOrder: 'ASC' | 'DESC' = 'ASC'): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.baseUrl}/products`, {
      params: {
        page: page.toString(),
        search,
        sortBy,
        sortOrder
      }
    });
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
  }

  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/products`, productData);
  }

  updateProduct(id: number, productData: FormData): Observable<Product> {
    // Kiểm tra xem có file ảnh không
    if (productData.has('image')) {
      // Nếu có file ảnh, gửi FormData
      return this.http.put<Product>(`${this.baseUrl}/products/${id}`, productData);
    }

    // Nếu không có file ảnh, chuyển FormData thành object
    const data: any = {};
    productData.forEach((value, key) => {
      if (key === 'price' || key === 'categoryId') {
        data[key] = Number(value);
      } else {
        data[key] = value;
      }
    });
    // Gửi object
    return this.http.put<Product>(`${this.baseUrl}/products/${id}`, data);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/products/${id}`);
  }

  uploadImage(file: File): Observable<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post<{ imageUrl: string }>(`${this.baseUrl}/products/upload`, formData);
  }

  getProductsByCategory(categoryId: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.baseUrl}/products/category/${categoryId}`);
  }

  getCategories(): Observable<{ id: number; categoryName: string }[]> {
    return this.http.get<{ id: number; categoryName: string }[]>(`${this.baseUrl}/categories`);
  }
} 