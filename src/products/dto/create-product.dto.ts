import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProductType } from '../entities/product.entity';
import { Size, Temp } from '../entities/drink.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'coffee' })
  @IsString()
  name: string;

  @ApiProperty({ example: '...' })
  @IsString()
  desc: string;

  @ApiProperty({ example: 1.5 })
  @IsNumber()
  price: number;

  @ApiProperty({ enum: ProductType, example: 'drink' })
  @IsEnum(ProductType)
  type: ProductType;

  @ApiProperty({ example: 100 })
  @IsOptional()
  @IsNumber()
  stock: number;
}

export class FoodProductDto extends CreateProductDto {
  @ApiProperty({ example: 'icecream' })
  @IsString()
  food_type: string;

  @ApiProperty({ example: ['milk', 'cream'] })
  @IsArray()
  ingredients: string[];
}

export class DrinkProductDto extends CreateProductDto {
  @ApiProperty({ enum: Size, example: 'sm' })
  @IsEnum(Size)
  size: Size;

  @ApiProperty({ example: false })
  @IsBoolean()
  sugar: boolean;

  @ApiProperty({ enum: Temp, example: 'hot' })
  @IsEnum(Temp)
  temp: Temp;

  @ApiProperty({ example: 'coffee' })
  @IsString()
  drink_type: string;
}
