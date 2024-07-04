import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FoodService } from '../services/food.service';
import { FoodProductDto } from '../dto/create-product.dto';
import { SearchParams } from '../dto/search-params.dto';
import { UpdateDrinkDto } from '../dto/update-product.dto';

@ApiTags('products/food')
@Controller('products/food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  async create(@Body() createFoodDto: FoodProductDto) {
    return this.foodService.create(createFoodDto);
  }

  @Get()
  async findAll(@Query() query: SearchParams) {
    return this.foodService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.foodService.findOne(+id);
  }

  @Patch(':id')
  async updateDrink(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateDrinkDto,
  ) {
    return this.foodService.update(+id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.foodService.remove(+id);
  }
}
