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
import { DrinkService } from '../services/drink.service';
import { DrinkProductDto } from '../dto/create-product.dto';
import { SearchParams } from '../dto/search-params.dto';
import { UpdateDrinkDto } from '../dto/update-product.dto';

@ApiTags('products')
@Controller('products/drink')
export class DrinkController {
  constructor(private readonly drinkService: DrinkService) {}

  @Post()
  async create(@Body() createDrinkDto: DrinkProductDto) {
    return this.drinkService.create(createDrinkDto);
  }

  @Get()
  async findAll(@Query() query: SearchParams) {
    return this.drinkService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.drinkService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDrinkDto: UpdateDrinkDto,
  ) {
    return this.drinkService.update(+id, updateDrinkDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.drinkService.remove(+id);
  }
}
