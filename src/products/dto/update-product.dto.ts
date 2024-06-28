import { PartialType } from '@nestjs/swagger';
import {
  CreateProductDto,
  DrinkProductDto,
  FoodProductDto,
} from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
export class UpdateFoodDto extends PartialType(FoodProductDto) {}
export class UpdateDrinkDto extends PartialType(DrinkProductDto) {}
