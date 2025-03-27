import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {
  @Input() product: Product | null = null;
  @Input() categories: { id: number; categoryName: string }[] = [];
  @Output() submitProduct = new EventEmitter<FormData>();
  @Output() cancel = new EventEmitter<void>();

  productForm: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  isLoading = false;
  imageError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      categoryId: [null, [Validators.required]],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
    if (this.product) {
      this.productForm.patchValue({
        productName: this.product.productName,
        description: this.product.description,
        price: this.product.price,
        categoryId: this.product.category.id,
        imageUrl: this.product.imageUrl
      });
      this.imagePreview = this.product.imageUrl || null;
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        this.imageError = 'Kích thước file không được vượt quá 5MB';
        return;
      }
      if (!file.type.startsWith('image/')) {
        this.imageError = 'File phải là hình ảnh';
        return;
      }
      this.imageError = null;
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const formData = new FormData();
      const formValue = this.productForm.value;

      // Thêm các trường vào FormData
      formData.append('productName', formValue.productName);
      formData.append('description', formValue.description);
      formData.append('price', formValue.price.toString());
      formData.append('categoryId', formValue.categoryId.toString());

      // Xử lý ảnh
      if (this.selectedFile) {
        // Nếu có file mới được chọn
        formData.append('image', this.selectedFile);
      }

      // Log để kiểm tra dữ liệu
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      this.submitProduct.emit(formData);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
} 