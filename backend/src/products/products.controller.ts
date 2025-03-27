import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, HttpStatus, HttpCode } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindAllProductsDto } from './dto/find-all-products.dto';
import { Product } from '../entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    try {
      return await this.productsService.create(createProductDto);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAll(@Query() query: FindAllProductsDto) {
    try {
      return await this.productsService.findAll(query);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    try {
      return await this.productsService.findOne(+id);
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
    try {
      return await this.productsService.update(+id, updateProductDto);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<void> {
    try {
      return await this.productsService.remove(+id);
    } catch (error) {
      throw error;
    }
  }

  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }), // 5MB
          new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/i }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<Product> {
    try {
      return await this.productsService.uploadImage(+id, file);
    } catch (error) {
      throw error;
    }
  }

  @Get('category/:categoryId')
  async findByCategory(@Param('categoryId') categoryId: string): Promise<Product[]> {
    try {
      return await this.productsService.findByCategory(+categoryId);
    } catch (error) {
      throw error;
    }
  }
}
