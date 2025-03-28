import { IsString, IsNumber, IsOptional, Min, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  productName: string;

  @IsNumber()
  @Min(0)
  @Transform(({ value }) => Number(value))
  price: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @Transform(({ value }) => Number(value))
  categoryId: number;
} 