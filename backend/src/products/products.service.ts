import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindAllProductsDto } from './dto/find-all-products.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProductsService {
  private readonly allowedSortFields = ['productName', 'price', 'amount', 'createdAt'];

  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) { }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const product = this.productsRepository.create({
        ...createProductDto,
        category: { id: createProductDto.categoryId }
      });
      return await this.productsRepository.save(product);
    } catch (error) {
      throw new BadRequestException('Failed to create product: ' + error.message);
    }
  }

  async findAll(options: FindAllProductsDto) {
    try {
      const { page = 1, limit = 10, sortBy, sortOrder, category, minPrice, maxPrice, search } = options;
      const queryBuilder = this.productsRepository.createQueryBuilder('product')
        .leftJoinAndSelect('product.category', 'category');

      if (category) {
        queryBuilder.andWhere('category.name = :category', { category });
      }

      if (minPrice !== undefined) {
        queryBuilder.andWhere('product.price >= :minPrice', { minPrice });
      }

      if (maxPrice !== undefined) {
        queryBuilder.andWhere('product.price <= :maxPrice', { maxPrice });
      }

      if (search) {
        queryBuilder.andWhere('product.productName LIKE :search', { search: `%${search}%` });
      }

      if (sortBy && sortOrder) {
        if (!this.allowedSortFields.includes(sortBy)) {
          throw new BadRequestException(`Invalid sort field: ${sortBy}`);
        }
        queryBuilder.orderBy(`product.${sortBy}`, sortOrder);
      } else {
        queryBuilder.orderBy('product.createdAt', 'DESC');
      }

      queryBuilder.skip((page - 1) * limit).take(limit);

      const [products, total] = await queryBuilder.getManyAndCount();

      return {
        data: products,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to fetch products: ' + error.message);
    }
  }

  async findOne(id: number): Promise<Product> {
    try {
      const product = await this.productsRepository.findOne({
        where: { id },
        relations: ['category']
      });
      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      return product;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to fetch product: ' + error.message);
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    try {
      const product = await this.findOne(id);
      const updatedProduct = {
        ...product,
        ...updateProductDto,
        category: updateProductDto.categoryId ? { id: updateProductDto.categoryId } : product.category
      };
      return await this.productsRepository.save(updatedProduct);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to update product: ' + error.message);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const product = await this.findOne(id);
      await this.productsRepository.softDelete(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to delete product: ' + error.message);
    }
  }

  async uploadImage(id: number, file: Express.Multer.File): Promise<Product> {
    try {
      const product = await this.findOne(id);
      const uploadDir = path.join(__dirname, '../../uploads');

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const fileName = `${id}-${Date.now()}${path.extname(file.originalname)}`;
      const filePath = path.join(uploadDir, fileName);

      fs.writeFileSync(filePath, file.buffer);

      // Xóa ảnh cũ nếu có
      if (product.imageUrl) {
        const oldImagePath = path.join(__dirname, '../../', product.imageUrl);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      product.imageUrl = `/uploads/${fileName}`;
      return await this.productsRepository.save(product);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to upload image: ' + error.message);
    }
  }

  async findByCategory(categoryId: number): Promise<Product[]> {
    try {
      const products = await this.productsRepository.find({
        where: { category: { id: categoryId } },
        relations: ['category']
      });
      if (!products.length) {
        throw new NotFoundException(`No products found for category ID ${categoryId}`);
      }
      return products;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to fetch products by category: ' + error.message);
    }
  }
}
