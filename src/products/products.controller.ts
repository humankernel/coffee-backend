import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { DrinkProductDto, FoodProductDto } from './dto/create-product.dto';
import {
  UpdateDrinkDto,
  UpdateFoodDto,
  UpdateProductDto,
} from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('food')
  async create(@Body() createFoodDto: FoodProductDto) {
    return this.productsService.createFood(createFoodDto);
  }

  @Post('drink')
  async createDrink(@Body() createDrinkDto: DrinkProductDto) {
    return this.productsService.createDrink(createDrinkDto);
  }

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch('food/:id')
  async updateFood(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateFoodDto,
  ) {
    return this.productsService.updateFood(+id, updateProductDto);
  }

  @Patch('drink/:id')
  async updateDrink(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateDrinkDto,
  ) {
    return this.productsService.updateDrink(+id, updateProductDto);
  }

  @Patch('raw/:id')
  async updateRaw(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
