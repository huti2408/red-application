import { IsString, IsNumber, IsOptional, IsDecimal, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  productName: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDecimal()
  @Min(0)
  price: number;

  @IsNumber()
  categoryId: number;
} 