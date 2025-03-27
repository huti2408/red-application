export interface Category {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: number;
  productName: string;
  imageUrl: string | null;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  category: {
    id: number;
    categoryName: string;
  };
}

export interface ProductResponse {
  data: Product[];
  meta: {
    total: number;
    page: string;
    limit: number;
    totalPages: number;
  };
} 