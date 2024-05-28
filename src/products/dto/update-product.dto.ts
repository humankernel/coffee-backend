import { PartialType } from '@nestjs/swagger';
import {
  CreateProductDto,
  DrinkProductDto,
  FoodProductDto,
} from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
export class UpdateDrinkDto extends PartialType(DrinkProductDto) {}
export class UpdateFoodDto extends PartialType(FoodProductDto) {}
